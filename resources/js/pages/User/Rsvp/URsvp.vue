<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">My RSVPs</h1>
            <p class="text-sm text-muted-foreground">View and manage your event registrations</p>
        </div>
    </div>

    <div v-if="!rsvps.length" class="flex flex-col items-center justify-center py-24 text-center">
        <ClipboardList class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No RSVPs yet</h3>
        <p class="text-sm text-muted-foreground mt-1">Browse events and register to get started.</p>
    </div>

    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead @click="sortBy('event.title')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Event
                                <ArrowUp v-if="sortField === 'event.title' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="sortField === 'event.title' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead @click="sortBy('event.date')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Date & Time
                                <ArrowUp v-if="sortField === 'event.date' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="sortField === 'event.date' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead @click="sortBy('event.location')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Location
                                <ArrowUp v-if="sortField === 'event.location' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="sortField === 'event.location' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead @click="sortBy('pax')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Pax
                                <ArrowUp v-if="sortField === 'pax' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="sortField === 'pax' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead @click="sortBy('seat_label')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Seat
                                <ArrowUp v-if="sortField === 'seat_label' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="sortField === 'seat_label' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead @click="sortBy('status')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Status
                                <ArrowUp v-if="sortField === 'status' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="sortField === 'status' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                        <TableHead class="text-right select-none">
                            <div class="flex items-center justify-end">
                                Action
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="rsvp in sortedRsvps" :key="rsvp.rsvpID">
                        <TableCell class="font-medium">{{ rsvp.event.title }}</TableCell>
                        <TableCell class="text-muted-foreground">{{ rsvp.event.start_date }} <span v-if="rsvp.event.end_date && rsvp.event.end_date !== rsvp.event.start_date"> - {{ rsvp.event.end_date }}</span> · {{ rsvp.event.start_time }} <span v-if="rsvp.event.end_time"> - {{ rsvp.event.end_time }}</span></TableCell>
                        <TableCell class="text-muted-foreground">{{ rsvp.event.location }}</TableCell>
                        <TableCell>{{ rsvp.pax }}</TableCell>
                        <TableCell>
                            <span v-if="rsvp.seat_label?.length" class="flex gap-1 flex-wrap">
                                <div v-for="label in rsvp.seat_label" :key="label"
                                    class="px-2 py-0.5 bg-slate-100 rounded text-xs font-mono">
                                    {{ label }}
                                </div>
                            </span>
                            <span v-else class="text-xs text-muted-foreground">—</span>
                        </TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                                :class="{
                                    'bg-green-100 text-green-700': rsvp.status === 'confirmed',
                                    'bg-yellow-100 text-yellow-700': rsvp.status === 'pending',
                                }">
                                {{ rsvp.status }}
                            </span>
                        </TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2">
                                <!-- View seat layout -->
                                <Button
                                    v-if="rsvp.event.has_seats"
                                    variant="outline" size="sm"
                                    class="border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-700 cursor-pointer"
                                    @click="router.visit(`/events/${rsvp.event.eventID}/seat-view`)"
                                >
                                    <Eye class="h-4 w-4 mr-1" /> View
                                </Button>

                                <!-- View Receipt (confirmed only) -->
                                <Button
                                    v-if="rsvp.status === 'confirmed'"
                                    size="sm" variant="outline"
                                    class="border-emerald-400 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-700 cursor-pointer"
                                    @click="openReceipt(rsvp)"
                                >
                                    Receipt
                                </Button>

                                <!-- Pick seat (pending only) -->
                                <Button
                                    v-if="rsvp.status === 'pending' && rsvp.event.has_seats"
                                    size="sm" variant="outline"
                                    class="border-yellow-400 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-700 cursor-pointer"
                                    @click="router.visit(`/events/${rsvp.event.eventID}/select-seat`)"
                                >
                                    Pick Seat
                                </Button>

                                <!-- Cancel RSVP -->
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" size="sm" class="border-red-700 bg-red-100 text-red-700 hover:text-red-700 hover:bg-red-200 cursor-pointer">
                                            <Trash2 class="h-4 w-4 mr-1" /> Cancel
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will cancel your RSVP for <strong>{{ rsvp.event.title }}</strong>.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>No, keep it</AlertDialogCancel>
                                            <AlertDialogAction @click="cancelRsvp(rsvp.rsvpID)" class="bg-red-600 hover:bg-red-700">
                                                Yes, Cancel RSVP
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        
        <!-- Receipt Modal -->
        <Dialog :open="showReceiptModal" @update:open="val => !val && closeReceipt()">
            <DialogContent class="sm:max-w-[450px] p-0 rounded-2xl overflow-hidden border-0 shadow-2xl">
                <div class="px-6 py-5 border-b border-slate-100 bg-white">
                    <DialogTitle class="text-xl font-bold text-slate-900">Seat Confirmation Receipt</DialogTitle>
                    <DialogDescription class="text-sm font-medium text-slate-500 mt-1">Thank you! Your seats are confirmed.</DialogDescription>
                </div>
                
                <div class="p-6 bg-slate-50/50 flex flex-col items-center">
                    <div ref="receiptRef" v-if="selectedReceiptRsvp" class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full max-w-[350px]">
                        <div class="text-center border-b border-slate-200 pb-4 mb-4">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-3">
                                <CheckCircle class="w-6 h-6" />
                            </div>
                            <h3 class="font-bold text-lg text-slate-900">{{ selectedReceiptRsvp.event.title }}</h3>
                            <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest">RSVP-{{ selectedReceiptRsvp.rsvpID.toString().padStart(4, '0') }}</p>
                        </div>
                        
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Date</span>
                                <span class="font-semibold text-slate-900">{{ selectedReceiptRsvp.event.start_date }} <span v-if="selectedReceiptRsvp.event.end_date && selectedReceiptRsvp.event.end_date !== selectedReceiptRsvp.event.start_date"> - {{ selectedReceiptRsvp.event.end_date }}</span></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Time</span>
                                <span class="font-semibold text-slate-900">{{ selectedReceiptRsvp.event.start_time }} <span v-if="selectedReceiptRsvp.event.end_time"> - {{ selectedReceiptRsvp.event.end_time }}</span></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Location</span>
                                <span class="font-semibold text-slate-900 line-clamp-1 max-w-[150px] text-right">{{ selectedReceiptRsvp.event.location }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-slate-500 font-medium">Total Pax</span>
                                <span class="font-semibold text-slate-900">{{ selectedReceiptRsvp.pax }}</span>
                            </div>
                            <div class="pt-3 border-t border-slate-100 flex justify-between items-start">
                                <span class="text-slate-500 font-medium">Seats</span>
                                <div class="flex flex-wrap gap-1 justify-end max-w-[150px]">
                                    <span v-for="label in selectedReceiptRsvp.seat_label" :key="label" class="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100">
                                        {{ label }}
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
                    <Button @click="closeReceipt" variant="outline" class="font-semibold cursor-pointer">
                        Close
                    </Button>
                    <Button @click="downloadReceipt" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm cursor-pointer">
                        Download Image
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { ClipboardList, Eye, Trash2, ArrowUp, ArrowDown, ArrowUpDown, CheckCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toPng } from 'html-to-image'

const props = defineProps({
    rsvps: { type: Array, default: () => [] },
})

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'My RSVPs', href: '/my-rsvps' }],
    },
})

const showReceiptModal = ref(false);
const selectedReceiptRsvp = ref(null);
const receiptRef = ref(null);

function openReceipt(rsvp) {
    selectedReceiptRsvp.value = rsvp;
    showReceiptModal.value = true;
}

function closeReceipt() {
    showReceiptModal.value = false;
    setTimeout(() => { selectedReceiptRsvp.value = null; }, 300);
}

async function downloadReceipt() {
    if (!receiptRef.value || !selectedReceiptRsvp.value) return;
    try {
        const dataUrl = await toPng(receiptRef.value, { 
            cacheBust: true,
            pixelRatio: 2,
            style: { transform: 'none' }
        });
        const link = document.createElement('a');
        link.download = `Receipt_${selectedReceiptRsvp.value.event.title.replace(/\s+/g, '_')}.png`;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Error generating receipt:', error);
        alert('Failed to generate receipt. Please try again.');
    }
}

function cancelRsvp(rsvpID) {
    router.post(`/rsvp/${rsvpID}/cancel`)
}

const sortField = ref('');
const sortDirection = ref('asc');

function sortBy(field) {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }
}

const sortedRsvps = computed(() => {
    let result = [...props.rsvps];

    if (!sortField.value) return result;

    result.sort((a, b) => {
        let valA, valB;

        switch (sortField.value) {
            case 'event.title':
                valA = a.event?.title || '';
                valB = b.event?.title || '';
                break;
            case 'event.date':
                valA = a.event?.date || '';
                valB = b.event?.date || '';
                break;
            case 'event.location':
                valA = a.event?.location || '';
                valB = b.event?.location || '';
                break;
            case 'pax':
                valA = a.pax || 0;
                valB = b.pax || 0;
                break;
            case 'seat_label':
                valA = a.seat_label?.[0] || '';
                valB = b.seat_label?.[0] || '';
                break;
            case 'status':
                valA = a.status || '';
                valB = b.status || '';
                break;
            default:
                return 0;
        }

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
    });

    return result;
});
</script>
