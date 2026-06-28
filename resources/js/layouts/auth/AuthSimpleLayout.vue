<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col items-center justify-center bg-indigo-50 p-6 md:p-10"
    >
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4 mb-8">
                    <Link
                        :href="home()"
                        class="flex flex-col items-center gap-2 font-medium"
                    >
                    <img src="/storage/pictures/logoEMS.png" alt="" class="h-21 w-auto rounded-md">
                    </Link>

                    <div class="space-y-1 text-center">
                        <h1 class="text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
                        <p class="text-sm text-gray-500">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <div class="bg-white px-8 py-10 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
