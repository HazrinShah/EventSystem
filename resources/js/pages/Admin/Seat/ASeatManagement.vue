<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Seat Management</h1>
            <p class="text-sm text-muted-foreground">Manage seat layouts for each event</p>
        </div>
    </div>

    <div v-if="!events.length" class="flex flex-col items-center justify-center py-24 text-center">
        <LayoutTemplate class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No events found</h3>
        <p class="text-sm text-muted-foreground mt-1">Create an event first before managing seats.</p>
    </div>

    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Seat Limit</TableHead>
                        <TableHead>Seats Added</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="event in events" :key="event.eventID">
                        <TableCell class="font-medium">{{ event.title }}</TableCell>
                        <TableCell>{{ event.seat_limit ?? '—' }}</TableCell>
                        <TableCell>{{ event.seat_count }}</TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                :class="event.has_seats ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                                {{ event.status }}
                            </span>
                        </TableCell>
                        <TableCell>
                            <Link :href="`/events/${event.eventID}/seats`">
                                <Button size="sm" variant="outline" class="bg-yellow-100 border-yellow-400 text-black cursor-pointer hover:bg-yellow-200 hover:text-black">
                                    <LayoutTemplate class="h-3.5 w-3.5 mr-1.5 text-black" />
                                    Manage Seats
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { LayoutTemplate } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

defineProps({
    events: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Seat Management', href: '/seats' }],
    },
});
</script>
