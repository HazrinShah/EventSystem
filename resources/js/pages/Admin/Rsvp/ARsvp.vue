<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">RSVP Management</h1>
            <p class="text-sm text-muted-foreground">Review and manage event RSVPs</p>
        </div>
    </div>

    <div v-if="!rsvps.length" class="flex flex-col items-center justify-center py-24 text-center">
        <ClipboardList class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No RSVPs yet</h3>
        <p class="text-sm text-muted-foreground mt-1">RSVPs will appear here once users register for events.</p>
    </div>

    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm">
            <div class="max-h-[200px] overflow-y-auto relative">
            <Table>
                <TableHeader sticky top-0 bg-white z-10>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Pax</TableHead>
                        <TableHead>Seat</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="rsvp in rsvps" :key="rsvp.rsvpID">
                        <TableCell class="font-medium">{{ rsvp.user.name }}</TableCell>
                        <TableCell>{{ rsvp.event.title }}</TableCell>
                        <TableCell>{{ rsvp.pax }}</TableCell>
                        <TableCell class="max-w-[200px]">
                            <div v-if="rsvp.seat_label?.length" class="flex gap-1 flex-wrap">
                                <div v-for="label in rsvp.seat_label" :key="label"
                                    class="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-mono whitespace-nowrap">
                                    {{ label }}
                                </div>
                            </div>
                            <span v-else class="text-xs text-muted-foreground">—</span>
                        </TableCell>
                        <TableCell class="text-muted-foreground">{{ rsvp.note ?? '-' }}</TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                :class="{
                                    'bg-green-100 text-green-700': rsvp.status === 'confirmed',
                                    'bg-yellow-100 text-yellow-700': rsvp.status === 'pending',
                                    'bg-red-100 text-red-700': rsvp.status === 'cancelled',
                                }">
                                {{ rsvp.status }}
                            </span>
                        </TableCell>
                        <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm" class="text-white bg-red-500 cursor-pointer hover:bg-red-700 hover:text-white">
                                            <CalendarX2 class="h-4 w-4 mr-1 text-white" style="transform: translateY(-0.35px);" /> Cancel
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
                                            <AlertDialogCancel class="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer">No, keep it</AlertDialogCancel>
                                            <AlertDialogAction @click="cancelRsvp(rsvp.rsvpID)" class="bg-red-600 text-white hover:bg-red-700 hover:text-white cursor-pointer">
                                                Yes, Cancel RSVP
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { router } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
import { ClipboardList, Trash2, CalendarX2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

defineProps({
    rsvps: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'RSVP', href: '/rsvp' }],
    },
});

function cancelRsvp(rsvpID) {
    router.post(`/rsvp/${rsvpID}/cancel`)
}
</script>
