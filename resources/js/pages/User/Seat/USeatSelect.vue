<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
import { CheckCircle, ImageOff, CalendarDays, MapPin, Clock } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { toPng } from 'html-to-image';

const props = defineProps({
    event: Object,
    seats: Array,
    rsvp:  Object,
});

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Events', href: '/uevents' },
            { title: 'Select Seat', href: '#' },
        ],
    },
});

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// State
const seats          = ref(props.seats ?? []);
const loading        = ref(false);
const confirmLoading = ref(false);
const message        = ref('');
const messageType    = ref('info');
const now            = ref(Date.now());
const showReceiptModal = ref(false);
const receiptRef     = ref(null);

// Computed
const mySeats      = computed(() => seats.value.filter(s => s.is_mine && s.status === 'selected'));
const selectedCount = computed(() => mySeats.value.length);
const canConfirm   = computed(() => selectedCount.value === props.rsvp.pax);

const earliestExpiry = computed(() => {
    const times = mySeats.value
        .filter(s => s.expires_at)
        .map(s => new Date(s.expires_at).getTime());
    return times.length ? Math.min(...times) : null;
});

const countdownText = computed(() => {
    if (!earliestExpiry.value) return null;
    const diff = Math.max(0, earliestExpiry.value - now.value);
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
});

const countdownDanger = computed(() =>
    earliestExpiry.value && (earliestExpiry.value - now.value) < 60000
);

// Helpers
function showMessage(text, type = 'info') {
    message.value = text;
    messageType.value = type;
    setTimeout(() => { message.value = ''; }, 4000);
}

function seatColor(seat) {
    if (seat.status === 'booked')                        return 'bg-red-500 border-red-400';
    if (seat.is_mine && seat.status === 'selected')      return 'bg-purple-500 border-purple-300';
    if (seat.status === 'selected')                      return 'bg-amber-400 border-amber-200';
    return 'bg-emerald-500 border-emerald-300';
}

function seatCursor(seat) {
    if (seat.status === 'booked')                        return 'cursor-not-allowed opacity-50';
    if (seat.status === 'selected' && !seat.is_mine)     return 'cursor-not-allowed opacity-75';
    return 'cursor-pointer';
}

function seatHover(seat) {
    if (seat.status === 'available' || seat.is_mine) return 'hover:scale-125';
    return '';
}

// Seat Actions
function handleSeatClick(seat) {
    if (loading.value) return;
    if (seat.status === 'booked') return;
    if (seat.status === 'selected' && !seat.is_mine) return;

    if (seat.is_mine && seat.status === 'selected') {
        releaseSeat(seat);
    } else if (seat.status === 'available') {
        selectSeat(seat);
    }
}

function selectSeat(seat) {
    loading.value = true;
    axios.post(`/api/seats/${seat.seatID}/select`)
        .then(res => {
            const target = seats.value.find(s => s.seatID === seat.seatID);
            if (target) {
                target.status     = 'selected';
                target.is_mine    = true;
                target.expires_at = res.data.expires_at;
            }
            showMessage(res.data.message, 'success');
        })
        .catch(err => showMessage(err.response?.data?.message ?? 'Could not select seat.', 'error'))
        .finally(() => { loading.value = false; });
}

function releaseSeat(seat) {
    loading.value = true;
    axios.post(`/api/seats/${seat.seatID}/release`)
        .then(res => {
            const target = seats.value.find(s => s.seatID === seat.seatID);
            if (target) {
                target.status     = 'available';
                target.is_mine    = false;
                target.expires_at = null;
            }
            showMessage(res.data.message, 'info');
        })
        .catch(err => showMessage(err.response?.data?.message ?? 'Could not release seat.', 'error'))
        .finally(() => { loading.value = false; });
}

// Confirm All Seats 
async function confirmSeats() {
    if (!canConfirm.value) return;
    confirmLoading.value = true;
    try {
        for (const seat of mySeats.value) {
            await axios.post('/api/confirm-seat', {
                seatID: seat.seatID,
                rsvpID: props.rsvp.rsvpID,
            });
        }
        showReceiptModal.value = true;
    } catch (err) {
        showMessage(err.response?.data?.message ?? 'Failed to confirm seats.', 'error');
        confirmLoading.value = false;
    }
}

async function downloadReceipt() {
    if (!receiptRef.value) return;
    try {
        const dataUrl = await toPng(receiptRef.value, { 
            cacheBust: true,
            pixelRatio: 2,
            style: { transform: 'none' }
        });
        const link = document.createElement('a');
        link.download = `Receipt_${props.event.title.replace(/\s+/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Error generating receipt:', error);
        alert('Failed to generate receipt. Please try again.');
    }
}

function finishAndRedirect() {
    router.visit('/my-rsvps');
}

// Real-time Poll 
function pollSeats() {
    axios.get(`/api/events/${props.event.eventID}/seat-status`)
        .then(res => {
            res.data.seats.forEach(update => {
                const seat = seats.value.find(s => s.seatID === update.seatID);
                if (seat) {
                    seat.status     = update.status;
                    seat.is_mine    = update.is_mine;
                    seat.expires_at = update.expires_at;
                }
            });
        })
        .catch(() => {}); // silent fail on poll
}

let pollInterval  = null;
let clockInterval = null;

onMounted(() => {
    pollInterval  = setInterval(pollSeats, 5000);
    clockInterval = setInterval(() => { now.value = Date.now(); }, 1000);
});

onUnmounted(() => {
    clearInterval(pollInterval);
    clearInterval(clockInterval);
});
</script>

<template>
    <div class="p-6 space-y-5">

        <!-- Header -->
        <div class="flex items-start justify-between flex-wrap gap-3">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">{{ event.title }}</h1>
                <p class="text-sm text-muted-foreground mt-0.5">
                    Select your <strong>{{ rsvp.pax }}</strong> seat{{ rsvp.pax > 1 ? 's' : '' }} from the map below.
                    Click a purple seat to release it.
                </p>
            </div>

            <!-- Countdown Timer -->
            <div v-if="countdownText" class="text-right rounded-lg border px-4 py-2 bg-card shadow-sm">
                <p class="text-xs text-muted-foreground">Hold expires in</p>
                <p
                    class="text-2xl font-mono font-bold tabular-nums"
                    :class="countdownDanger ? 'text-red-500 animate-pulse' : 'text-amber-500'"
                >
                    {{ countdownText }}
                </p>
            </div>
        </div>

        <!-- Progress + Confirm Button -->
        <div class="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-sm">
            <div class="flex-1">
                <div class="flex items-center justify-between mb-1.5">
                    <p class="text-sm font-medium">Seats selected</p>
                    <p class="text-sm font-bold tabular-nums">{{ selectedCount }} / {{ rsvp.pax }}</p>
                </div>
                <div class="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                        class="h-full rounded-full transition-all duration-500"
                        :class="canConfirm ? 'bg-emerald-500' : 'bg-purple-500'"
                        :style="{ width: `${(selectedCount / rsvp.pax) * 100}%` }"
                    />
                </div>
            </div>
            <Button
                @click="confirmSeats"
                :disabled="!canConfirm || confirmLoading"
                class="shrink-0 bg-blue-600 hover:bg-blue-600 text-white hover:text-white cursor-pointer"
            >
                <CheckCircle class="h-4 w-4 mr-1.5" />
                {{ confirmLoading ? 'Confirming...' : 'Confirm Seats' }}
            </Button>
        </div>

        <!-- Feedback Message -->
        <transition name="toast">
            <div
                v-if="message"
                :class="{
                    'border-blue-600 text-black bg-blue-100'   : messageType === 'info',
                    'border-green-600 text-black bg-green-100': messageType === 'success',
                    'border-red-600 text-black bg-red-100'      : messageType === 'error',
                }"
                class="fixed top-5 right-5 z-50 flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm shadow-lg"
            >
                {{ message }}
            </div>
        </transition>

        <!-- Legend -->
        <div class="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Available
            </div>
            <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Your seat (click to release)
            </div>
            <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Held by someone else
            </div>
            <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Booked
            </div>
        </div>

        <!-- Seat Map -->
        <div
            class="relative inline-block rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md w-full"
        >
            <img
                v-if="event.layoutImage"
                :src="`/storage/${event.layoutImage}`"
                class="block w-full select-none"
                draggable="false"
            />
            <div
                v-else
                class="w-full h-72 flex items-center justify-center bg-muted text-muted-foreground text-sm gap-2"
            >
                <ImageOff class="h-5 w-5" /> No layout image for this event.
            </div>

            <!-- Seat Dots -->
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
                    <div
                        @click="handleSeatClick(seat)"
                        :class="[
                            'w-5 h-5 rounded-full border-2 shadow transition-transform',
                            seatColor(seat),
                            seatCursor(seat),
                            seatHover(seat),
                        ]"
                    />
                    <!-- Tooltip -->
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
                        {{ seat.label }}
                        <span class="ml-1 opacity-60">
                            ({{ seat.is_mine ? 'yours' : seat.status }})
                        </span>
                    </div>
                </div>
            </template>
        </div>

        <!-- Receipt Modal -->
        <Dialog :open="showReceiptModal" @update:open="val => !val && finishAndRedirect()">
            <DialogContent class="sm:max-w-[450px] p-0 rounded-2xl overflow-hidden border-0 shadow-2xl">
                <div class="px-6 py-5 border-b border-slate-100 bg-white">
                    <DialogTitle class="text-xl font-bold text-slate-900">Seat Confirmation Receipt</DialogTitle>
                    <DialogDescription class="text-sm font-medium text-slate-500 mt-1">Thank you! Your seats are confirmed.</DialogDescription>
                </div>
                
                <div class="p-6 bg-slate-50/50 flex flex-col items-center">
                    <div ref="receiptRef" class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full max-w-[350px]">
                        <div class="text-center border-b border-slate-200 pb-4 mb-4">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-3">
                                <CheckCircle class="w-6 h-6" />
                            </div>
                            <h3 class="font-bold text-lg text-slate-900">{{ event.title }}</h3>
                            <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest">RSVP-{{ rsvp.rsvpID.toString().padStart(4, '0') }}</p>
                        </div>
                        
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Date</span>
                                <span class="font-semibold text-slate-900">{{ event.start_date }} <span v-if="event.end_date && event.end_date !== event.start_date"> - {{ event.end_date }}</span></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Time</span>
                                <span class="font-semibold text-slate-900">{{ event.start_time }} <span v-if="event.end_time"> - {{ event.end_time }}</span></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Location</span>
                                <span class="font-semibold text-slate-900 line-clamp-1 max-w-[150px] text-right">{{ event.location }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Total Pax</span>
                                <span class="font-semibold text-slate-900">{{ rsvp.pax }}</span>
                            </div>
                            <div class="pt-3 border-t border-slate-100 flex justify-between items-start">
                                <span class="text-slate-500 font-medium">Seats</span>
                                <div class="flex flex-wrap gap-1 justify-end max-w-[150px]">
                                    <span v-for="seat in mySeats" :key="seat.seatID" class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100">
                                        {{ seat.label }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 pt-4 border-t border-dashed border-slate-200 text-center">
                            <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Show this receipt at the entrance</p>
                        </div>
                    </div>
                </div>

                <div class="px-6 py-4 bg-white flex justify-end gap-3 border-t border-slate-100">
                    <Button @click="downloadReceipt" variant="outline" class="font-semibold cursor-pointer">
                        Download Image
                    </Button>
                    <Button @click="finishAndRedirect" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm cursor-pointer">
                        Go to My RSVPs
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { 
    transition: all 0.4s ease; 
}
.toast-enter-from, .toast-leave-to { 
    opacity: 0; 
    transform: translateX(100px);
}
</style>
