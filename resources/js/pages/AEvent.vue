<template>
    <!-- Header -->
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Events</h1>
            <p class="text-sm text-muted-foreground">Manage and monitor all events</p>
        </div>
        <Link href="/add-events">
            <Button size="sm">
                <Plus class="h-4 w-4 mr-2" />
                Add Event
            </Button>
        </Link>
    </div>

    <!-- Empty state -->
    <div v-if="!events.length" class="flex flex-col items-center justify-center py-24 text-center">
        <CalendarX class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No events yet</h3>
        <p class="text-sm text-muted-foreground mt-1 mb-4">Get started by creating your first event.</p>
        <Link href="/add-events">
            <Button size="sm">
                <Plus class="h-4 w-4 mr-2" />
                Add Event
            </Button>
        </Link>
    </div>

    <!-- Cards grid -->
    <section v-else class="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="event in events" :key="event.eventID" class="flex flex-col overflow-hidden border border-border shadow-md bg-card hover:shadow-lg transition-shadow duration-200">
            <div class="relative h-44 w-full bg-muted">
                <img
                    v-if="event.image"
                    :src="`/storage/${event.image}`"
                    :alt="event.title"
                    class="h-full w-full object-cover"
                />
                <div v-else class="flex h-full w-full items-center justify-center">
                    <ImageOff class="h-8 w-8 text-muted-foreground" />
                </div>
            </div>
            <CardHeader class="pb-2">
                <CardTitle class="text-base">{{ event.title }}</CardTitle>
            </CardHeader>
            <CardContent class="flex-1 space-y-1 text-sm text-muted-foreground pb-2">
                <div class="flex items-center gap-2">
                    <CalendarDays class="h-3.5 w-3.5 shrink-0" />
                    <span>{{ event.date }} · {{ event.time }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <MapPin class="h-3.5 w-3.5 shrink-0" />
                    <span class="truncate">{{ event.location }}</span>
                </div>
            </CardContent>
            <CardFooter class="flex gap-2 pt-2">
                <Button @click="openViewDialog(event)" variant="outline" size="sm" class="flex-1">
                    <Eye class="h-3.5 w-3.5 mr-1.5" />View
                </Button>
                <Button @click="openEditDialog(event)" variant="secondary" size="sm" class="flex-1">
                    <Pencil class="h-3.5 w-3.5 mr-1.5" />Edit
                </Button>
                <Button @click="deleteEvent(event)" variant="destructive" size="sm" class="flex-1">
                    <Trash2 class="h-3.5 w-3.5 mr-1.5" />Delete
                </Button>
            </CardFooter>
        </Card>
    </section>

    <!-- Edit Dialog -->
    <Dialog :open="isEditDialogOpen" @update:open="val => !val && closeEditDialog()">
        <DialogContent class="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>Update the event details below.</DialogDescription>
            </DialogHeader>
            <form @submit.prevent="submitEdit" class="space-y-4 pt-2">
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 space-y-1.5">
                        <Label>Title</Label>
                        <Input v-model="editForm.title" type="text" required />
                    </div>
                    <div class="col-span-2 space-y-1.5">
                        <Label>Description</Label>
                        <textarea v-model="editForm.description" rows="3" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"></textarea>
                    </div>
                    <div class="space-y-1.5">
                        <Label>Date</Label>
                        <Input v-model="editForm.date" type="date" />
                    </div>
                    <div class="space-y-1.5">
                        <Label>Time</Label>
                        <Input v-model="editForm.time" type="time" />
                    </div>
                    <div class="col-span-2 space-y-1.5">
                        <Label>Location</Label>
                        <Input v-model="editForm.location" type="text" />
                    </div>
                    <div class="col-span-2 space-y-1.5">
                        <Label>Image</Label>
                        <Input @input="editForm.image = $event.target.files[0]" type="file" accept="image/*" />
                    </div>
                    <div class="col-span-2 space-y-1.5">
                        <Label>Layout Image</Label>
                        <Input @input="editForm.layoutImage = $event.target.files[0]" type="file" accept="image/*" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" @click="closeEditDialog">Cancel</Button>
                    <Button type="submit" :disabled="editForm.processing">
                        {{ editForm.processing ? 'Saving...' : 'Save Changes' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

    <!-- View Dialog -->
    <Dialog :open="isViewDialogOpen" @update:open="val => !val && closeViewDialog()">
        <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
            <!-- Image banner -->
            <div class="relative h-52 w-full bg-muted">
                <img
                    v-if="selectedEvent?.image"
                    :src="`/storage/${selectedEvent.image}`"
                    :alt="selectedEvent?.title"
                    class="h-full w-full object-cover"
                />
                <div v-else class="flex h-full w-full items-center justify-center">
                    <ImageOff class="h-10 w-10 text-muted-foreground" />
                </div>
            </div>

            <div class="p-6 space-y-5" v-if="selectedEvent">
                <div>
                    <h2 class="text-xl font-semibold">{{ selectedEvent.title }}</h2>
                </div>

                <div class="flex flex-wrap gap-4 text-sm">
                    <div class="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays class="h-4 w-4" />
                        <span>{{ selectedEvent.date }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-muted-foreground">
                        <Clock class="h-4 w-4" />
                        <span>{{ selectedEvent.time }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-muted-foreground">
                        <MapPin class="h-4 w-4" />
                        <span>{{ selectedEvent.location }}</span>
                    </div>
                    <div class="relative h-52 w-full bg-muted">
                        <img
                            v-if="selectedEvent?.layoutImage"
                            :src="`/storage/${selectedEvent.layoutImage}`"
                            :alt="selectedEvent?.title"
                            class="h-full w-full object-cover"
                        />
                        <div v-else class="flex h-full w-full items-center justify-center">
                            <ImageOff class="h-10 w-10 text-muted-foreground" />
                        </div>
                    </div>

                </div>

                <Separator />

                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">About this event</p>
                    <p class="text-sm leading-relaxed whitespace-pre-line">{{ selectedEvent.description }}</p>
                </div>
            </div>

            <div class="px-6 pb-6">
                <Button variant="outline" class="w-full" @click="closeViewDialog">Close</Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import { Pencil, Trash2, Plus, Eye, CalendarDays, MapPin, CalendarX, ImageOff, Clock } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

defineProps({
    events: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Events', href: '/events' }],
    },
});

// Edit
const isEditDialogOpen = ref(false);
const editForm = useForm({ id: null, title: '', description: '', date: '', time: '', location: '', image: null , layoutImage: null });

function openEditDialog(event) {
    Object.assign(editForm, { id: event.eventID, title: event.title, description: event.description, date: event.date, time: event.time, location: event.location, image: null, layoutImage: null });
    isEditDialogOpen.value = true;
}
function closeEditDialog() { isEditDialogOpen.value = false; editForm.reset(); }
function submitEdit() { editForm.post(`/events/${editForm.id}`, { forceFormData: true, onSuccess: closeEditDialog }); }

// View
const isViewDialogOpen = ref(false);
const selectedEvent = ref(null);
function openViewDialog(event) { selectedEvent.value = event; isViewDialogOpen.value = true; }
function closeViewDialog() { isViewDialogOpen.value = false; selectedEvent.value = null; }

// Delete
function deleteEvent(event) {
    if (!confirm('Confirm delete this event?')) return;
    router.post(`/events/${event.eventID}/delete`);
}
</script>
