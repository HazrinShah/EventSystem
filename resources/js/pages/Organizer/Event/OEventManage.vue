<script setup>
import { Link } from '@inertiajs/vue3';
import { ArrowLeft, Users, CalendarDays, Clock, MapPin, CheckCircle, XCircle } from 'lucide-vue-next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import OrganizerLayout from '@/layouts/OrganizerLayout.vue';

const props = defineProps({
    event: { type: Object, required: true }
});
</script>

<template>
    <OrganizerLayout :breadcrumbs="[
        { title: 'Organizer Dashboard', href: '/organizer/dashboard' },
        { title: 'Event Management', href: '#' }
    ]">
    <div class="flex items-center gap-4 border-b px-6 py-4 bg-white">
        <Link href="/organizer/dashboard">
            <Button variant="outline" size="icon" class="h-8 w-8">
                <ArrowLeft class="w-4 h-4" />
            </Button>
        </Link>
        <div>
            <h1 class="text-xl font-semibold">Manage Event: {{ event.title }}</h1>
            <p class="text-sm text-muted-foreground">Review RSVPs and attendees for your event.</p>
        </div>
    </div>

    <div class="p-6 grid lg:grid-cols-3 gap-6">
        <!-- Event Details Sidebar -->
        <div class="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle class="text-lg">Event Details</CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                    <img v-if="event.image" :src="`/storage/${event.image}`" class="w-full h-40 object-cover rounded-md" />
                    
                    <div class="space-y-3 text-sm">
                        <div class="flex gap-3">
                            <CalendarDays class="w-5 h-5 text-indigo-600 shrink-0" />
                            <div>
                                <p class="font-medium text-slate-900">Date</p>
                                <p class="text-slate-500">{{ event.date }}</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <Clock class="w-5 h-5 text-indigo-600 shrink-0" />
                            <div>
                                <p class="font-medium text-slate-900">Time</p>
                                <p class="text-slate-500">{{ event.time }}</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <MapPin class="w-5 h-5 text-indigo-600 shrink-0" />
                            <div>
                                <p class="font-medium text-slate-900">Location</p>
                                <p class="text-slate-500">{{ event.location }}</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <Users class="w-5 h-5 text-indigo-600 shrink-0" />
                            <div>
                                <p class="font-medium text-slate-900">Seat Limit</p>
                                <p class="text-slate-500">{{ event.seat_limit > 0 ? event.seat_limit : 'Unlimited' }}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card class="bg-indigo-50 border-indigo-100">
                <CardContent class="p-6 text-center">
                    <div class="text-4xl font-bold text-indigo-600 mb-2">{{ event.rsvps?.length || 0 }}</div>
                    <div class="text-sm font-medium text-indigo-900 uppercase tracking-wide">Total RSVPs</div>
                </CardContent>
            </Card>
        </div>

        <!-- RSVPs Table -->
        <div class="lg:col-span-2">
            <Card class="h-full">
                <CardHeader>
                    <CardTitle class="text-lg">Attendee List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div v-if="!event.rsvps || event.rsvps.length === 0" class="text-center py-12 text-slate-500">
                        <Users class="w-12 h-12 mx-auto text-slate-300 mb-3" />
                        <p>No one has RSVP'd to this event yet.</p>
                    </div>

                    <Table v-else>
                        <TableHeader class="bg-slate-50">
                            <TableRow>
                                <TableHead>Attendee</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead class="text-right">RSVP Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="rsvp in event.rsvps" :key="rsvp.rsvpID">
                                <TableCell>
                                    <div class="font-medium">{{ rsvp.user?.name }}</div>
                                    <div class="text-xs text-slate-500">{{ rsvp.user?.email }}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge 
                                        :class="[
                                            'uppercase px-2.5 py-1 text-[10px] tracking-wider font-bold rounded-full',
                                            rsvp.status === 'Confirmed' || rsvp.status === 'confirm' ? 'bg-emerald-100 text-emerald-800' : 
                                            rsvp.status === 'Cancelled' || rsvp.status === 'cancel' ? 'bg-rose-100 text-rose-800' : 
                                            'bg-slate-100 text-slate-800'
                                        ]"
                                    >
                                        {{ rsvp.status }}
                                    </Badge>
                                </TableCell>
                                <TableCell class="text-right text-sm text-slate-500">
                                    {{ new Date(rsvp.created_at).toLocaleDateString() }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
    </OrganizerLayout>
</template>
