<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { Calendar, TicketCheck, MapPin, Clock } from 'lucide-vue-next';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface Event {
    eventID: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    location: string;
    image: string | null;
}

defineProps<{
    stats: {
        totalBooked: number;
        upcomingEvents: Event[];
    }
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: '/dashboard',
            },
        ],
    },
});
</script>

<template>
    <Head title="User Dashboard" />

    <div class="flex h-full flex-1 flex-col gap-6 p-4">
        <!-- Welcome Message -->
        <div class="mb-2">
            <h1 class="text-2xl font-bold tracking-tight">Welcome back!</h1>
            <p class="text-muted-foreground mt-1">Here is an overview of your events and RSVPs.</p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
            <!-- Total Booked Stats -->
            <Card class="bg-white border-gray-200 dark:border-gray-800">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-foreground/80">
                        Total RSVPs
                    </CardTitle>
                    <div class="p-2 bg-indigo-500/20 rounded-full">
                        <TicketCheck class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ stats.totalBooked }}</div>
                    <p class="text-xs text-muted-foreground mt-1">
                        Events you have registered for
                    </p>
                </CardContent>
            </Card>

            <!-- Upcoming Events Stats -->
            <Card class="bg-white border-gray-200 dark:border-gray-800 ">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-foreground/80">
                        Upcoming Events
                    </CardTitle>
                    <div class="p-2 bg-indigo-500/20 rounded-full">
                        <Calendar class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ stats.upcomingEvents.length }}</div>
                    <p class="text-xs text-muted-foreground mt-1">
                        Events approaching soon
                    </p>
                </CardContent>
            </Card>
        </div>

        <div class="mt-6 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold tracking-tight">Your Upcoming Events</h3>
                <Link href="/uevents" class="text-sm font-medium text-primary hover:underline">
                    <button class="cursor-pointer flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 w-full sm:w-auto">
                        <Calendar class="h-4 w-4" />
                        View all events
                    </button>
                </Link>
            </div>
            
            <div v-if="stats.upcomingEvents.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card v-for="event in stats.upcomingEvents" :key="event.eventID" class="group hover:border-primary/50 transition-colors overflow-hidden flex flex-col">
                    <CardHeader class="bg-muted/30 pb-4">
                        <CardTitle class="text-base truncate" :title="event.title">{{ event.title }}</CardTitle>
                        <CardDescription class="mt-2 text-primary font-medium flex items-center gap-2">
                            <Calendar class="h-3.5 w-3.5" />
                            <span>{{ new Date(event.start_date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) }} <span v-if="event.end_date && event.end_date !== event.start_date">- {{ new Date(event.end_date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) }}</span></span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="pt-4 flex-1">
                        <div class="text-sm text-muted-foreground flex flex-col gap-2">
                            <div class="flex items-start gap-2">
                                <Clock class="h-4 w-4 mt-0.5 shrink-0 opacity-70" />
                                <span>{{ event.start_time || 'TBD' }} <span v-if="event.end_time">- {{ event.end_time }}</span></span>
                            </div>
                            <div class="flex items-start gap-2">
                                <MapPin class="h-4 w-4 mt-0.5 shrink-0 opacity-70" />
                                <span class="line-clamp-2">{{ event.location }}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div v-else class="flex flex-col items-center justify-center p-12 flex-1 min-h-[300px] border border-dashed rounded-xl bg-muted/20 text-center">
                <div class="bg-muted p-4 rounded-full mb-4">
                    <Calendar class="h-10 w-10 text-muted-foreground opacity-50" />
                </div>
                <h4 class="text-base font-medium">No upcoming events</h4>
                <p class="text-sm text-muted-foreground mt-1 mb-6 max-w-sm">You haven't RSVP'd to any upcoming events yet. Discover what's happening and secure your spot!</p>
                <Link href="/uevents" class="bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-2 shadow-sm">
                    Browse Events
                </Link>
            </div>
        </div>
    </div>
</template>
