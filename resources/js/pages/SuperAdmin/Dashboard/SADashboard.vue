<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Dashboard', href: '/dashboard' }],
    },
});

defineProps({
    stats: {
        type: Object,
        default: () => ({
            totalEvents: 0,
            totalAdmins: 0,
            totalUsers: 0,
            totalRsvps: 0,
        }),
    },
});
</script>

<template>
    <Head title="Super Admin Dashboard" />

    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Super Admin Dashboard</h1>
            <p class="text-sm text-muted-foreground">System overview and management</p>
        </div>
    </div>

    <div class="p-6 space-y-6">
        <!-- Stats cards -->
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="rounded-xl border bg-card p-5 shadow-sm">
                <p class="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Total Events</p>
                <p class="text-3xl font-bold">{{ stats.totalEvents }}</p>
            </div>
            <div class="rounded-xl border bg-card p-5 shadow-sm">
                <p class="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Admins</p>
                <p class="text-3xl font-bold">{{ stats.totalAdmins }}</p>
            </div>
            <div class="rounded-xl border bg-card p-5 shadow-sm">
                <p class="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Users</p>
                <p class="text-3xl font-bold">{{ stats.totalUsers }}</p>
            </div>
            <div class="rounded-xl border bg-card p-5 shadow-sm">
                <p class="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">Total RSVPs</p>
                <p class="text-3xl font-bold">{{ stats.totalRsvps }}</p>
            </div>
        </div>

        <!-- Quick links -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <a href="/events" class="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
                <p class="font-semibold text-sm">Manage Events</p>
                <p class="text-xs text-muted-foreground mt-1">View, create, assign admins to events</p>
            </a>
            <a href="/admin-users" class="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
                <p class="font-semibold text-sm">Manage Admins</p>
                <p class="text-xs text-muted-foreground mt-1">Create, update, deactivate admin accounts</p>
            </a>
            <a href="/rsvp" class="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
                <p class="font-semibold text-sm">RSVP Monitor</p>
                <p class="text-xs text-muted-foreground mt-1">View all RSVPs across all events</p>
            </a>
        </div>
    </div>
</template>
