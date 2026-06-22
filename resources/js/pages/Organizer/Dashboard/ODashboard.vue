<script setup>
import { Link } from '@inertiajs/vue3';
import { Calendar, Users, Activity, Settings, ArrowRight, Clock, MapPin } from 'lucide-vue-next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import OrganizerLayout from '@/layouts/OrganizerLayout.vue';

defineProps({
    events: { type: Array, default: () => [] }
});

defineOptions({
    layout: OrganizerLayout,
});
</script>

<template>
    <div>
        <div class="flex items-center justify-between border-b px-6 py-4">
            <div>
                <h1 class="text-xl font-semibold">Organizer Dashboard</h1>
                <p class="text-sm text-muted-foreground mt-1">Manage the events you are authorized to organize.</p>
            </div>
        </div>

        <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <Link href="/organizer/events" class="block cursor-pointer">
                    <Card class="hover:shadow-md transition-shadow h-full">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Total Events</CardTitle>
                            <Calendar class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">{{ events.length }}</div>
                            <p class="text-xs text-muted-foreground mt-1">
                                Events assigned to you
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/organizer/rsvps" class="block cursor-pointer">
                    <Card class="hover:shadow-md transition-shadow h-full">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">Total Attendees</CardTitle>
                            <Users class="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-2xl font-bold">
                                {{ events.reduce((sum, e) => sum + (e.rsvps_count || 0), 0) }}
                            </div>
                            <p class="text-xs text-muted-foreground mt-1">
                                Total RSVPs across your events
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                
                <Card class="h-full">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Account Status</CardTitle>
                        <Activity class="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-green-600">Active</div>
                        <p class="text-xs text-muted-foreground mt-1">
                            Organizer privileges enabled
                        </p>
                    </CardContent>
                </Card>

            </div>
        </div>
    </div>
</template>
