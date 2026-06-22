<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { Calendar, Users, CheckCircle, Clock } from 'lucide-vue-next';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

defineProps({
    stats: {
        type: Object,
        default: () => ({
            myEvents: 0,
            totalRsvps: 0,
            pendingRsvps: 0,
            confirmedRsvps: 0,
        }),
    },
});
</script>

<template>
    <Head title="Admin Dashboard" />

    <div class="flex h-full flex-1 flex-col gap-6 p-6">
        <!-- Header Welcome Section -->
        <div class="flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                Organizer Dashboard
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
                Welcome back! Here's a live status of your events and active RSVPs.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">

            <Link href="/events" class="block group cursor-pointer">
                <Card class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40">
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
                    <CardHeader class="p-5 pb-0 flex flex-row items-center justify-between">
                        <CardTitle class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            My Events
                        </CardTitle>
                        <div class="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 transition-colors group-hover:bg-violet-100/70 dark:group-hover:bg-violet-950/40">
                            <Calendar class="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent class="p-5 pt-2 pb-3">
                        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                            {{ stats.myEvents }}
                        </h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            Total events created and managed by you.
                        </p>
                    </CardContent>
                    <CardFooter class="p-5 pt-0 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                        <span>Manage events</span>
                        <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </CardFooter>
                </Card>
            </Link>

            <Link href="/rsvp" class="block group cursor-pointer">
                <Card class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40">
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <CardHeader class="p-5 pb-0 flex flex-row items-center justify-between">
                        <CardTitle class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Total RSVPs
                        </CardTitle>
                        <div class="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-100/70 dark:group-hover:bg-blue-950/40">
                            <Users class="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent class="p-5 pt-2 pb-3">
                        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                            {{ stats.totalRsvps }}
                        </h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            Total response count across all your events.
                        </p>
                    </CardContent>
                    <CardFooter class="p-5 pt-0 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                        <span>Monitor RSVPs</span>
                        <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </CardFooter>
                </Card>
            </Link>

            <Link href="/rsvp" class="block group cursor-pointer">
                <Card class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40">
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                    <CardHeader class="p-5 pb-0 flex flex-row items-center justify-between">
                        <CardTitle class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Confirmed RSVPs
                        </CardTitle>
                        <div class="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 transition-colors group-hover:bg-emerald-100/70 dark:group-hover:bg-emerald-950/40">
                            <CheckCircle class="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent class="p-5 pt-2 pb-3">
                        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                            {{ stats.confirmedRsvps }}
                        </h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            Registered guests successfully confirmed.
                        </p>
                    </CardContent>
                    <CardFooter class="p-5 pt-0 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span>See confirmed</span>
                        <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </CardFooter>
                </Card>
            </Link>

            <Link href="/rsvp" class="block group cursor-pointer">
                <Card class="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900/40">
                    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    <CardHeader class="p-5 pb-0 flex flex-row items-center justify-between">
                        <CardTitle class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Pending RSVPs
                        </CardTitle>
                        <div class="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 transition-colors group-hover:bg-amber-100/70 dark:group-hover:bg-amber-950/40">
                            <Clock class="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent class="p-5 pt-2 pb-3">
                        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                            {{ stats.pendingRsvps }}
                        </h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            RSVPs awaiting approval or seat allocation.
                        </p>
                    </CardContent>
                    <CardFooter class="p-5 pt-0 border-t border-slate-50 dark:border-slate-900/50 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <span>Review pending</span>
                        <span class="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    </div>
</template>
