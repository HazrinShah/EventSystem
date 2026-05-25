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
                        <TableHead>Event</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Pax</TableHead>
                        <TableHead>Seat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="rsvp in rsvps" :key="rsvp.rsvpID">
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
import { router } from '@inertiajs/vue3'
import { ClipboardList, Eye, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

defineProps({
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
</script>
