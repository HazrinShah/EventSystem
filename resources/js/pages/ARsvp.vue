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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Pax</TableHead>
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
                            <Button v-if="rsvp.status === 'pending'" size="sm" @click="assignSeat(rsvp)">
                                Assign Seat
                            </Button>
                            <span v-else class="text-xs text-muted-foreground">—</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup>
import { router } from '@inertiajs/vue3';
import { ClipboardList } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

defineProps({
    rsvps: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'RSVP', href: '/rsvp' }],
    },
});

function assignSeat(rsvp) {
    if (!confirm(`Assign seat for ${rsvp.user.name}?`)) return;
    router.post(`/rsvp/${rsvp.rsvpID}/assign`);
}
</script>
