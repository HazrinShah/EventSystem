<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { login, register } from '@/routes';

withDefaults(
    defineProps<{
        canRegister: boolean;
    }>(),
    {
        canRegister: true,
    },
);

const page = usePage();
const dashboardHref = computed(() => '/dashboard')
</script>

<template>
    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    
        <div class="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 animate-bg-gerak font-sans text-gray-900">
            <header class="bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200">
                <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center">
                        <img src="/storage/pictures/logoEMS.png" alt="logoEMS" class="h-16 w-auto">
                    </div>
                    <nav class="flex items-center gap-4">
                        <Link v-if="$page.props.auth.user" :href="dashboardHref" class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                            Dashboard
                        </Link>
                        <template v-else>
                            <Link :href="login()" class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">
                                Login
                            </Link>
                            <Link v-if="canRegister" :href="register()" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition">
                                Register
                            </Link>
                        </template>
                    </nav>
                    
                </div>
            </header>
            <main>
                <!-- hero section, ni headline besar tu -->
                <div class="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center">
                    <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Manage your event
                        <span class="text-indigo-600 block">with ease</span>
                    </h1>

                    <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                        Streamline your event management process from planning and promotion to ticketing and analytics
                    </p>

                    <div class="mt-10 flex items-center justify-center gap-4">
                        <Link v-if="!$page.props.auth.user" :href="register()" class="rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition hover:-translate-y-1">
                        Start now
                        </Link>

                        <Link v-if="$page.props.auth.user" :href="dashboardHref" class="rounded-lg bg-amber-600 px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-amber-500 transition hover:-translate-y-1">
                        Go to Dashboard
                        </Link>

                    </div>
                </div>
                <!-- abis hero section -->
                <!-- feature sect plakkkk -->
                <div class="bg-white/80 backdrop-blur-md py-16 sm:py-24 rounded-t-3xl border-t border-gray-200 shadow-sm">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
                            
                            <div class="text-center">
                                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900">Discover Events</h3>
                                <p class="mt-4 text-gray-600 text-base">Find upcoming events that match your interests easily.</p>
                            </div>

                            <div class="text-center">
                                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900">Quick RSVP</h3>
                                <p class="mt-4 text-gray-600 text-base">Secure your spot with just a single click and get instant confirmation.</p>
                            </div>

                            <div class="text-center">
                                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                                    <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900">Host Easily</h3>
                                <p class="mt-4 text-gray-600 text-base">Create and manage your own events smoothly with our tools.</p>
                            </div>

                        </div>
                    </div>
                </div>

            </main>
            <!-- footer -->
            <footer class="bg-gray-50 py-8 border-t border-gray-200">
                <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p class="text-sm text-gray-500">
                        &copy; 2026 EMS. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
</template>

<style>
/* backgorund punya gerak ii */
@keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.animate-bg-gerak {
    background-size: 200% 200% !important;
    animation: gradient-x 8s ease infinite;
}
</style>

