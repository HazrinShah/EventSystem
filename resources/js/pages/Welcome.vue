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
    <div class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
        
        <div class="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
            <main class="flex w-full max-w-[335px] flex-col-reverse overflow-hidden rounded-lg lg:max-w-4xl lg:flex-row">
                <div class="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                    <div class="mb-4 flex items-center gap-2">
                        <span class="flex h-7 w-7 items-center justify-center rounded-md bg-[#4f46e5]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" stroke-width="2"/>
                                <path d="M16 2v4M8 2v4M3 10h18" stroke="white" stroke-width="2" stroke-linecap="round"/>
                                <circle cx="8" cy="15" r="1.5" fill="white"/>
                                <circle cx="12" cy="15" r="1.5" fill="white"/>
                                <circle cx="16" cy="15" r="1.5" fill="white"/>
                            </svg>
                        </span>
                        <span class="text-xs font-semibold uppercase tracking-widest text-[#4f46e5] dark:text-[#818cf8]">EMS</span>
                    </div>
                    <h1 class="mb-1 text-lg font-semibold">Your events, all in one place</h1>
                    <p class="mb-5 text-[#706f6c] dark:text-[#A1A09A]">
                        Whether you're hosting or attending — discover events,<br />RSVP with ease and never miss a seat.
                    </p>
                    <ul class="mb-6 flex flex-col gap-3">
                        <li class="flex items-start gap-3">
                            <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] dark:bg-[#1e1b4b]">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </span>
                            <span>Browse &amp; discover upcoming events near you</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] dark:bg-[#1e1b4b]">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </span>
                            <span>RSVP in seconds and get your seat confirmed instantly</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] dark:bg-[#1e1b4b]">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </span>
                            <span>Organizers can create events, manage RSVPs, and notify attendees</span>
                        </li>
                    </ul>
                    <div class="mb-6 flex gap-4 text-center">
                        <div class="flex-1 rounded-md bg-[#f5f5f4] px-3 py-2 dark:bg-[#1c1c1b]">
                            <div class="text-base font-semibold text-[#4f46e5]">Events</div>
                            <div class="text-[11px] text-[#706f6c] dark:text-[#A1A09A]">Browse &amp; host</div>
                        </div>
                        <div class="flex-1 rounded-md bg-[#f5f5f4] px-3 py-2 dark:bg-[#1c1c1b]">
                            <div class="text-base font-semibold text-[#4f46e5]">RSVPs</div>
                            <div class="text-[11px] text-[#706f6c] dark:text-[#A1A09A]">Quick &amp; easy</div>
                        </div>
                        <div class="flex-1 rounded-md bg-[#f5f5f4] px-3 py-2 dark:bg-[#1c1c1b]">
                            <div class="text-base font-semibold text-[#4f46e5]">Seats</div>
                            <div class="text-[11px] text-[#706f6c] dark:text-[#A1A09A]">Secured &amp; notified</div>
                        </div>
                    </div>
                    <div class="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                        <nav class="flex items-center justify-end gap-4">
                            <Link
                                v-if="$page.props.auth.user"
                                :href="dashboardHref"
                                class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                            <template v-else>
                                <Link
                                    :href="login()"
                                    class="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    v-if="canRegister"
                                    :href="register()"
                                    class="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                >
                                    Register
                                </Link>
                            </template>
                        </nav>
                    </div>
                    <!-- <ul class="flex gap-3 text-sm leading-normal">
                        <li>
                            <a
                                href="https://cloud.laravel.com"
                                target="_blank"
                                class="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                            >
                                Deploy now
                            </a>
                        </li>
                    </ul> -->
                </div>
            </main>
        </div>
    </div>
</template>
