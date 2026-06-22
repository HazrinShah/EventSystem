<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-vue-next'

const props = defineProps({
    event: Object,
    seats: Array,
    rsvp:  Object, // rsvp.seat_label = array of booked seat labels for this user
})

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'My RSVPs', href: '/my-rsvps' },
            { title: 'Seat Layout', href: '#' },
        ],
    },
})

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken   = true

const seats      = ref(props.seats ?? [])
const lastUpdated = ref(null)
const flash       = ref(false)
let pollInterval  = null

//polling
async function fetchStatus() {
    try {
        const res = await axios.get(`/api/events/${props.event.eventID}/seat-status`)
        res.data.seats.forEach(updated => {
            const seat = seats.value.find(s => s.seatID === updated.seatID)
            if (seat) {
                seat.status  = updated.status
                seat.is_mine = updated.is_mine
            }
        })
        // update timestamp and flash indicator
        lastUpdated.value = new Date().toLocaleTimeString()
        flash.value = true
        setTimeout(() => { flash.value = false }, 1500)
    } catch (e) {
        // silent fail
    }
}

onMounted(() => {
    lastUpdated.value = new Date().toLocaleTimeString()
    pollInterval = setInterval(fetchStatus, 500)
})

onUnmounted(() => clearInterval(pollInterval))

// kaler seat
function isMyBookedSeat(seat) {
    return props.rsvp?.seat_label?.includes(seat.label)
}

function seatColor(seat) {
    if (isMyBookedSeat(seat))       return 'bg-purple-500 border-purple-300'
    if (seat.is_mine)               return 'bg-purple-400 border-purple-200' // selected by me (pending confirm)
    if (seat.status === 'booked')   return 'bg-red-500 border-red-400'
    if (seat.status === 'selected') return 'bg-amber-400 border-amber-200'
    return 'bg-emerald-500 border-emerald-300'
}

function seatTooltip(seat) {
    if (isMyBookedSeat(seat)) return 'your seat'
    if (seat.is_mine)         return 'your selection'
    return seat.status
}
</script>

<template>
    <div class="p-6 space-y-5">

        <div class="space-y-3">
            <Button
                variant="ghost"
                size="sm"
                @click="router.visit('/my-rsvps')"
                class="cursor-pointer -ml-2.5 bg-blue-600 text-white hover:bg-blue-600  hover:text-white"
            >
                <ArrowLeft class="h-4 w-4" />
                Back
            </Button>
            <div>
                <h1 class="text-2xl font-bold tracking-tight">{{ event.title }}</h1>
                <p class="text-sm text-muted-foreground mt-0.5">
                    Seat layout
                </p>
            </div>
        </div>

        <div class="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Pax: <strong class="text-foreground">{{ rsvp.pax }}</strong></span>
            <span>Status:
                <strong :class="{
                    'text-green-600': rsvp.status === 'confirmed',
                    'text-yellow-600': rsvp.status === 'pending',
                }">{{ rsvp.status }}</strong>
            </span>
        </div>

        <!-- Legend + refresh indicator -->
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-5 text-xs text-muted-foreground">
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Your Seat
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Booked
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Selected (Hold)
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Available
                </div>
            </div>
            <!-- Live refresh indicator -->
            <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span class="w-2 h-2 rounded-full inline-block bg-green-500 animate-pulse"></span>
                Live · Updated {{ lastUpdated }}
            </div>
        </div>

        <!-- layout image -->
        <div class="relative inline-block rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md w-full">
            <img
                v-if="event.layoutImage"
                :src="`/storage/${event.layoutImage}`"
                class="block w-full select-none pointer-events-none"
                draggable="false"
            />
            <div v-else class="w-full h-72 flex items-center justify-center bg-muted text-muted-foreground text-sm">
                No layout image for this event.
            </div>

            <!-- seat -->
            <template v-for="seat in seats" :key="seat.seatID">
                <div
                    :style="{
                        position: 'absolute',
                        left: seat.x_percent + '%',
                        top:  seat.y_percent + '%',
                        transform: 'translate(-50%, -50%)',
                    }"
                    class="group"
                >
                    <div :class="['w-5 h-5 rounded-full border-2 shadow transition-transform', seatColor(seat)]" />
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
                        {{ seat.label }}
                        <span class="ml-1 opacity-60 capitalize">({{ seatTooltip(seat) }})</span>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
