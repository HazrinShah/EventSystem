<template>
    <div class="p-6">
        <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div class="p-8">
                <h5 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Add New Event</h5>
                <form @submit.prevent="submit" class="space-y-5">
                    <div class="grid grid-cols-2 gap-5">
                        <div class="col-span-2">
                            <Label for="title" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Event Name</Label>
                            <Input type="text" id="title" v-model="form.title" class="border border-gray-300" placeholder="Enter event name"/>
                            <span v-if="form.errors.title" class="mt-1 text-xs text-red-500">{{ form.errors.title }}</span>
                        </div>
                        <div class="col-span-2">
                            <Label for="description" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
                            <textarea id="description" v-model="form.description" rows="4" class="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white" placeholder="Enter description"></textarea>
                            <span v-if="form.errors.description" class="mt-1 text-xs text-red-500">{{ form.errors.description }}</span>
                        </div>
                        <div>
                            <Label for="date" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Date</Label>
                            <Input type="date" id="date" v-model="form.date" class="border border-gray-300"/>
                            <span v-if="form.errors.date" class="mt-1 text-xs text-red-500">{{ form.errors.date }}</span>
                        </div>
                        <div>
                            <Label for="time" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Time</Label>
                            <Input type="time" id="time" v-model="form.time" class="border border-gray-300"/>
                            <span v-if="form.errors.time" class="mt-1 text-xs text-red-500">{{ form.errors.time }}</span>
                        </div>
                        <div>
                            <Label for="location" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                            <Input type="text" id="location" v-model="form.location" class="border border-gray-300" placeholder="Enter location"/>
                            <span v-if="form.errors.location" class="mt-1 text-xs text-red-500">{{ form.errors.location }}</span>
                        </div>
                        <div>
                            <Label for="image" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Image</Label>
                            <Input type="file" id="image" accept="image/*" @input="form.image = $event.target.files[0]" class="border border-gray-300"/>
                            <span v-if="form.errors.image" class="mt-1 text-xs text-red-500">{{ form.errors.image }}</span>
                        </div>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="submit" class="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Create</button>
                        <Link href="/events" class="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function submit() {
    form.post('/events');
}

const form = useForm({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: null,
});

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Event', href: '/events' },
            { title: 'Add Event', href: '/add-events' },
        ],
    },
});
</script>
