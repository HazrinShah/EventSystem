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
                        <TableCell class="text-muted-foreground">{{ rsvp.event.date }} · {{ rsvp.event.time }}</TableCell>
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { ClipboardList, Eye, Trash2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const props = defineProps({
    rsvps: { type: Array, default: () => [] },
})

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'My RSVPs', href: '/my-rsvps' }],
    },
})

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
