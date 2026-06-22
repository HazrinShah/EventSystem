<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import OrganizerLayout from '@/layouts/OrganizerLayout.vue';


const props = defineProps({
    event: { type: Object, required: true },
    seats: { type: Array, default: () => [] }
});

defineOptions({
    layout: OrganizerLayout,
})

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const seats        = ref(props.seats ?? [])
const selectedSeat = ref(null)
const showModal    = ref(false)
const isPlacingMode = ref(false)
const newSeatLabel  = ref('')
const loading       = ref(false)
const message       = ref('')
const messageType   = ref('info')
const lastUpdated   = ref(null)
const flash         = ref(false)
let pollInterval    = null

const totalSeats     = computed(() => seats.value.length)
const bookedSeats    = computed(() => seats.value.filter(s => s.status === 'booked').length)
const selectedSeats  = computed(() => seats.value.filter(s => s.status === 'selected').length)
const availableSeats = computed(() => seats.value.filter(s => s.status === 'available').length)

function showMessage(text, type = 'info') {
    message.value = text
    messageType.value = type
    setTimeout(() => { message.value = '' }, 3500)
}

function seatColor(seat) {
    if (seat.status === 'booked')   return 'bg-red-500 border-red-300'
    if (seat.status === 'selected') return 'bg-amber-400 border-amber-200'
    return 'bg-emerald-500 border-emerald-300'
}

function seatCursor(seat) {
    if (isPlacingMode.value) return ''
    if (seat.status === 'booked') return 'cursor-not-allowed'
    return 'cursor-pointer'
}

function handleImageClick(e) {
    if (!isPlacingMode.value) return
    if (!newSeatLabel.value.trim()) {
        showMessage('Please enter a seat label first.', 'error')
        return
    }

    // cek duplicate label (case-insensitive) sebelum call API
    const duplicate = seats.value.some(
        s => s.label.toLowerCase() === newSeatLabel.value.trim().toLowerCase()
    )
    if (duplicate) {
        showMessage(`Label "${newSeatLabel.value.trim()}" already exists. Use a different label.`, 'error')
        return
    }

    const rect     = e.target.getBoundingClientRect()
    const xPercent = ((e.clientX - rect.left)  / rect.width)  * 100
    const yPercent = ((e.clientY - rect.top)   / rect.height) * 100

    axios.post('/api/seats', {
        eventID:   props.event.eventID,
        label:     newSeatLabel.value.trim(),
        x_percent: xPercent,
        y_percent: yPercent,
    })
    .then(res => {
        seats.value.push(res.data.seat)
        newSeatLabel.value = ''
        showMessage(`Seat "${res.data.seat.label}" placed.`, 'success')
    })
    .catch(err => {
        showMessage(err.response?.data?.message ?? 'Failed to place seat.', 'error')
    })
}

function openSeatModal(seat) {
    if (isPlacingMode.value) return
    selectedSeat.value = seat
    showModal.value = true
}

function closeModal() {
    showModal.value    = false
    selectedSeat.value = null
}

function deleteSeat() {
    if (!selectedSeat.value || selectedSeat.value.status === 'booked') return
    loading.value = true

    axios.delete(`/api/seats/${selectedSeat.value.seatID}`)
    .then(() => {
        seats.value = seats.value.filter(s => s.seatID !== selectedSeat.value.seatID)
        showMessage(`Seat "${selectedSeat.value.label}" deleted.`, 'success')
        closeModal()
    })
    .catch(() => {
        showMessage('Failed to delete seat.', 'error')
    })
    .finally(() => { loading.value = false })
}

function deleteAllSeats() {
    if (!confirm('Delete ALL seats for this event? This cannot be undone.')) return
    loading.value = true

    axios.delete(`/api/events/${props.event.eventID}/seats`)
    .then(() => {
        seats.value = []
        showMessage('All seats deleted.', 'success')
    })
    .catch(err => {
        showMessage(err.response?.data?.message ?? 'Failed to delete seats.', 'error')
    })
    .finally(() => { loading.value = false })
}

// polling
async function fetchStatus() {
    try {
        const res = await axios.get(`/api/events/${props.event.eventID}/seat-status-admin`)
        const updated = res.data.seats

        // update existing seats status
        updated.forEach(s => {
            const existing = seats.value.find(e => e.seatID === s.seatID)
            if (existing) {
                existing.status = s.status
            } else {
                // new seat added by another admin session — push it in
                seats.value.push(s)
            }
        })

        // remove seats that were deleted elsewhere
        const updatedIDs = updated.map(s => s.seatID)
        seats.value = seats.value.filter(s => updatedIDs.includes(s.seatID))

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
</script>

<template>
    <div class="p-6 space-y-5">

        <!-- Header -->
        <div class="flex items-start justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">{{ event.title }}</h1>
                <p class="text-sm text-muted-foreground mt-0.5">Seat layout editor — click the map to place seats</p>
            </div>
        </div>

        <!-- Stats Row -->
        <div class="grid grid-cols-4 gap-3">
            <div class="rounded-lg border bg-card p-3 text-center shadow-sm">
                <p class="text-2xl font-bold">{{ totalSeats }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">Total Seats</p>
            </div>
            <div class="rounded-lg border bg-card p-3 text-center shadow-sm">
                <p class="text-2xl font-bold text-emerald-600">{{ availableSeats }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">Available</p>
            </div>
            <div class="rounded-lg border bg-card p-3 text-center shadow-sm">
                <p class="text-2xl font-bold text-amber-500">{{ selectedSeats }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">Selected</p>
            </div>
            <div class="rounded-lg border bg-card p-3 text-center shadow-sm">
                <p class="text-2xl font-bold text-red-500">{{ bookedSeats }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">Booked</p>
            </div>
        </div>

        <!-- Feedback Message -->
        <transition name="toast">
            <div variant="outline"
                v-if="message"
                :class="{
                    'border-blue-600 text-black bg-blue-100' : messageType === 'info',
                    'border-green-600 text-black bg-green-100' : messageType === 'success',
                    'border-red-600 text-black bg-red-100' : messageType === 'error',
                }"
                class="fixed top-5 right-5 z-50 flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm"
            >
                {{ message }}
            </div>
        </transition>

        <!-- Toolbar -->
        <div class="flex flex-col gap-3">
            <div class="flex flex-wrap items-center gap-3">
                <button
                    @click="isPlacingMode = !isPlacingMode"
                    :class="isPlacingMode
                        ? 'bg-amber-500 hover:bg-amber-600'
                        : 'bg-indigo-600 hover:bg-indigo-700'"
                    class="cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                    {{ isPlacingMode ? '✕ Stop Placing' : '＋ Place Seats' }}
                </button>

                <!-- Delete All -->
                <Button
                    v-if="seats.length"
                    @click="deleteAllSeats"
                    :disabled="loading"
                    class="cursor-pointer text-sm px-3 py-1.5 bg-red-600 disabled:opacity-40 transition hover:bg-red-700 hover:text-white"
                >
                    Delete All Seats
                </Button>
            </div>

            <div v-if="isPlacingMode" class="flex flex-wrap items-center gap-3">
                <input
                    v-model="newSeatLabel"
                    type="text"
                    placeholder="Label e.g. A1"
                    class="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    @keydown.enter.prevent
                />

                <span class="text-xs text-muted-foreground">
                    Click on the map to place a seat
                </span>
            </div>
        </div>

        <!-- Legend + refresh indicator -->
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-5 text-xs text-muted-foreground">
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Available
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Selected (held by user)
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Booked
                </div>
            </div>
             <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span class="w-2 h-2 rounded-full inline-block bg-green-500 animate-pulse"></span>
                Live · Updated {{ lastUpdated }}
            </div>
        </div>

        <!-- Layout Map -->
        <div
            class="relative inline-block rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md w-full"
            :style="{ cursor: isPlacingMode ? 'crosshair' : 'default' }"
        >
            <!-- Venue Image -->
            <img
                v-if="event.layoutImage"
                :src="`/storage/${event.layoutImage}`"
                @click="handleImageClick"
                class="block w-full select-none"
                draggable="false"
            />
            <div
                v-else
                class="w-full h-72 flex items-center justify-center bg-muted text-muted-foreground text-sm"
                @click="handleImageClick"
            >
                No layout image. Upload one when editing the event.
            </div>

            <!-- Seats on map -->
            <template v-for="seat in seats" :key="seat.seatID">
                <div
                    :style="{
                        position: 'absolute',
                        left: seat.x_percent + '%',
                        top: seat.y_percent + '%',
                        transform: 'translate(-50%, -50%)',
                    }"
                    class="group"
                >
                    <!-- Seat Dot -->
                    <div
                        @click.stop="openSeatModal(seat)"
                        :class="[
                            'w-5 h-5 rounded-full border-2 shadow transition-transform',
                            seatColor(seat),
                            seatCursor(seat),
                            (!isPlacingMode && seat.status !== 'booked') ? 'hover:scale-125' : '',
                        ]"
                    />

                    <!-- Tooltip -->
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
                        {{ seat.label }}
                        <span class="ml-1 opacity-60 capitalize">({{ seat.status }})</span>
                    </div>
                </div>
            </template>
        </div>

        <!-- Seat Detail Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div
                    v-if="showModal && selectedSeat"
                    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                    @click.self="closeModal"
                >
                    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4">

                        <h2 class="text-lg font-bold mb-1">Seat {{ selectedSeat.label }}</h2>
                        <p class="text-sm text-muted-foreground mb-5">
                            Status:
                            <span :class="{
                                'text-emerald-600 font-medium' : selectedSeat.status === 'available',
                                'text-amber-500 font-medium'   : selectedSeat.status === 'selected',
                                'text-red-500 font-medium'     : selectedSeat.status === 'booked',
                            }">
                                {{ selectedSeat.status.charAt(0).toUpperCase() + selectedSeat.status.slice(1) }}
                            </span>
                        </p>

                        <div class="flex justify-end gap-2">
                            <button
                                @click="closeModal"
                                class="cursor-pointer px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                            >
                                Close
                            </button>
                            <button
                                v-if="selectedSeat.status !== 'booked'"
                                @click="deleteSeat"
                                :disabled="loading"
                                class="cursor-pointer px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
                            >
                                {{ loading ? 'Deleting...' : 'Delete Seat' }}
                            </button>
                        </div>

                    </div>
                </div>
            </Transition>
        </Teleport>

    </div>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s, transform 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }

.toast-enter-active, .toast-leave-active { transition: all 0.4s ease}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>