<script setup>
// makes reactive variables (UI auto updates when value changes)
import { ref } from 'vue'

// used to call your backend API (/api/...)
import axios from 'axios'

/**
 * Data comes from Laravel:
 
 * event → current event details
 * seats → list of seats (from DB)
 * rsvps → user who RSVP
 */

const props = defineProps({
    event: Object,
    seats: Array,
    rsvps: Array,
})

defineOptions({
    layout: {
        breadcrumbs: [

            {
                title: 'Seat Layout',
                href: '/seats',
            },
        ],
    },
})

/* withCredentials = true
→ send cookies (login session)
withXSRFToken = true
→ send CSRF token automatically

without this:
API akan return 419 CSRF error*/

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


// Local state
// Copy backend seats ke bahagian local supaya kita boleh update UI terus tanpa reload page (setelah buat perubahan seperti tambah/move/delete seat)
const seats = ref(props.seats)
// selectedSeat simpan seatID yang dipilih untuk assign seat nanti
const selectedSeat = ref(null)
// selectedRsvp simpan rsvpID yang dipilih untuk assign seat nanti
const selectedRsvp = ref(null)
// isPlacingMode track samaade user tengah dalam mode letak seat atau tidak (klik kat image untuk letak seat baru)
const isPlacingMode = ref(false)
// newSeatLabel simpan label seat baru yang user nak letak (contoh: A1, B2)
const newSeatLabel = ref('')
const showAssignModal = ref(false)
// loading untuk disable button semasa API call assign seat berjalan, message untuk simpan feedback message (contoh: "Seat A1 assigned to John successfully" atau "Failed to place seat")
const loading = ref(false)
// message untuk simpan feedback message (contoh: "Seat A1 assigned to John successfully" atau "Failed to place seat")
const message = ref('')

// ─── SEAT CREATION ───────────────────────────────────────────

// bila user klik kat image untuk letak seat baru, function ni akan dipanggil
function handleImageClick(event) {
    // kalau bukan dalam mode letak seat, takde pape jadi walaupun user klik kat image
    if (!isPlacingMode.value) return
    //  cek label seat ade tak, kalau takde keluar message error
    if (!newSeatLabel.value.trim()) {
        message.value = 'Please enter a seat label first.'
        return
    }

    // getBoundingClientRect() bagi dapatkan posisi klik user kat image dalam bentuk pixel, 
    // then kira x_percent dan y_percent untuk simpan dalam database 
    // (supaya seat boleh diposisikan dengan betul walaupun layout image berubah saiz)
    // penting sebab kira coordinate berkaitan dengan saiz image, bukan saiz screen atau window
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // ni rumus dia
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    // panggil API untuk simpan seat baru dalam database
    // then update local seats list dengan seat baru yang dikembalikan dari backend (res.data.seat) 
    // supaya UI terus update tanpa reload page
    axios.post('/api/seats', {
        eventID:   props.event.eventID,
        label:     newSeatLabel.value,
        x_percent: xPercent,
        y_percent: yPercent,
    })
    // then ni run kalau API call berjaya je
    // res tu response dari backend, kita expect dia return seat yang baru dibuat dalam res.data.seat
    .then(res => {
        // res tu variable yang hold semua response dri server.
        // data plk ialah tempat yang contain semua info yang request tadi, kalau pakai axios, semua isi yg dihntr oleh server masuk dlm ni 
        // so ni ialah kita push data seat tadi ke dalam list seats yang reactive tu, then UI akan auto update dan tunjuk seat baru tu
        seats.value.push(res.data.seat)
        newSeatLabel.value = ''
        message.value = `Seat "${res.data.seat.label}" placed successfully.`
    })
    // catch ni run kalau API call gagal (contoh: server error, network error, validation error)
    .catch(() => {
        message.value = 'Failed to place seat. Please try again.'
    })
}

// ─── SEAT SELECTION ──────────────────────────────────────────

function selectSeat(seat) {
    if (seat.booked) return  // kalau seat dah booked, dia takleh pilih, kalau tak booked baru code bawah ni jalan
    selectedSeat.value = seat
    showAssignModal.value = true
}

// ─── SEAT ASSIGNMENT ─────────────────────────────────────────

function assignSeat() {

    // pastikan user dah pilih seat dan rsvp sebelum assign, kalau takde keluar message error
    if (!selectedSeat.value || !selectedRsvp.value) {
        message.value = 'Please select a seat and an RSVP.'
        return
    }

    // loading.value = true untuk disable button confirm assign kat modal, supaya user tak klik banyak kali while API call tengah berjalan
    loading.value = true

    // panggil API untuk assign seat based on selected seat dan rsvp
    axios.post('/api/assign-seat', {
        seatID: selectedSeat.value.seatID,
        rsvpID: selectedRsvp.value,
    })
    .then(() => {
        // kita buat ni sebab kita nak update status booked seat tu terus kat UI tanpa kena reload page
        // kalau takde code ni, seat tu akan tetap tunjuk sebagai available walaupun dah assign
        const seat = seats.value.find(s => s.seatID === selectedSeat.value.seatID)
        // kalau ade dia set booked as true
        if (seat) seat.booked = true

        message.value = `Seat "${seat.label}" assigned successfully.`
        closeModal()
    })
    .catch(err => {
        message.value = err.response?.data?.message || 'Assignment failed.'
    })
    .finally(() => {
        // enable balik button confirm assign kat modal
        loading.value = false
    })
}

// ─── DELETE SEAT ─────────────────────────────────────────────
function deleteSeat(seat, event) {
    event.stopPropagation()
    if (seat.booked) return

    axios.delete(`/api/seats/${seat.seatID}`)
    .then(() => {
        seats.value = seats.value.filter(s => s.seatID !== seat.seatID)
        message.value = `Seat "${seat.label}" deleted.`
        closeModal()
    })
    .catch(() => {
        message.value = 'Failed to delete seat.'
    })
}

// ─── HELPERS ─────────────────────────────────────────────────
function closeModal() {
    showAssignModal.value = false
    selectedSeat.value = null
    selectedRsvp.value = null
}

function seatColor(seat) {
    if (seat.booked) return 'bg-red-500'
    if (selectedSeat.value?.id === seat.id) return 'bg-blue-500'
    return 'bg-green-500'
}
</script>

<template>
    <div class="p-6">

        <!-- Page Title -->
        <h1 class="text-2xl font-bold mb-2">Seat Layout — {{ event.name }}</h1>

        <!-- Message / Feedback -->
        <div v-if="message" class="mb-4 px-4 py-2 rounded bg-blue-100 text-blue-800 text-sm">
            {{ message }}
        </div>

        <!-- Toolbar -->
        <div class="flex flex-wrap items-center gap-3 mb-4">

            <!-- Toggle Place Mode -->
            <button
                @click="isPlacingMode = !isPlacingMode"
                :class="isPlacingMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'"
                class="text-white text-sm px-4 py-2 rounded"
            >
                {{ isPlacingMode ? 'Stop Placing' : 'Place Seats' }}
            </button>

            <!-- Seat Label Input (only visible in placing mode) -->
            <input
                v-if="isPlacingMode"
                v-model="newSeatLabel"
                type="text"
                placeholder="Seat label e.g. A1"
                class="border border-gray-300 rounded px-3 py-2 text-sm w-40"
            />

        </div>

        <!-- Legend -->
        <div class="flex items-center gap-4 mb-4 text-sm">
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full bg-green-500 inline-block"></span>
                <span>Available</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full bg-red-500 inline-block"></span>
                <span>Booked</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full bg-blue-500 inline-block"></span>
                <span>Selected</span>
            </div>
        </div>

        <!-- Layout Image + Seats -->
        <div
            class="relative inline-block border border-gray-300 rounded overflow-hidden"
            :style="{ cursor: isPlacingMode ? 'crosshair' : 'default' }"
        >
            <!-- Venue Image -->
            <img
                v-if="event.layoutImage"
                :src="`/storage/${event.layoutImage}`"
                @click="handleImageClick"
                class="block w-full max-w-4xl"
                draggable="false"
            />
            <div v-else class="w-full max-w-4xl h-64 flex items-center justify-center bg-muted text-muted-foreground text-sm">
                No layout image uploaded for this event.
            </div>

            <!-- Seats rendered on top of image -->
            <template v-for="seat in seats" :key="seat.id">
                <div
                    :style="{
                        position: 'absolute',
                        left: seat.x_percent + '%',
                        top: seat.y_percent + '%',
                        transform: 'translate(-50%, -50%)',
                    }"
                    class="group"
                >
                    <!-- Seat Circle -->
                    <div
                        @click="!isPlacingMode && selectSeat(seat)"
                        :class="[
                            'w-5 h-5 rounded-full border-2 border-white shadow',
                            seatColor(seat),
                            seat.booked ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-125 transition-transform',
                        ]"
                    ></div>

                    <!-- Tooltip -->
                    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        {{ seat.label }}
                    </div>

                    <!-- Delete Button (only in placing mode, unbooked seats) -->

                </div>
            </template>
        </div>

        <!-- Assign Seat Modal -->
        <div
            v-if="showAssignModal"
            class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">

                <h2 class="text-lg font-bold mb-4">
                    Assign Seat — {{ selectedSeat?.label }}
                </h2>

                <!-- RSVP Dropdown -->
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Select RSVP (Pending only)
                </label>
                <select
                    v-model="selectedRsvp"
                    class="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
                >
                    <option disabled value="">-- Select a guest --</option>
                    <option
                        v-for="rsvp in rsvps"
                        :key="rsvp.rsvpID"
                        :value="rsvp.rsvpID"
                    >
                        {{ rsvp.user?.name }}
                    </option>
                </select>

                <!-- Modal Actions -->
                <div class="flex justify-end gap-3">
                    <button
                        @click="deleteSeat(selectedSeat, $event)"
                        class="cursor-pointer px-4 py-2 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200"
                        :disabled="loading"
                        >
                        Delete
                    </button>
                    <button
                        @click="closeModal"
                        class="cursor-pointer px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        @click="assignSeat"
                        :disabled="loading"
                        class="cursor-pointer px-4 py-2 text-sm rounded bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                    >
                        {{ loading ? 'Assigning...' : 'Confirm Assign' }}
                    </button>
                </div>

            </div>
        </div>

    </div>
</template>