<template>
    <!-- Header -->
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Events</h1>
            <p class="text-sm text-muted-foreground">Manage all events and assign admins</p>
        </div>
        <Link href="/add-events">
            <Button size="sm" class="bg-green-700 cursor-pointer text-white hover:bg-green-900">
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
            <Button size="sm" class="bg-green-700 cursor-pointer text-white hover:bg-green-900"><Plus class="h-4 w-4 mr-2" />Add Event</Button>
        </Link>
    </div>

    <!-- Cards grid -->
    <section v-else class="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="event in events" :key="event.eventID" class="flex flex-col overflow-hidden border border-border shadow-md bg-card hover:shadow-lg transition-shadow duration-200">
            <div class="relative h-44 w-full bg-muted">
                <img v-if="event.image" :src="`/storage/${event.image}`" :alt="event.title" class="h-full w-full object-cover" />
                <div v-else class="flex h-full w-full items-center justify-center">
                    <ImageOff class="h-8 w-8 text-muted-foreground" />
                </div>
            </div>
            <CardHeader class="pb-2">
                <CardTitle class="text-base">{{ event.title }}</CardTitle>
            </CardHeader>
            <CardContent class="flex-1 space-y-2 text-sm text-muted-foreground pb-2">
                <div class="flex items-center gap-2">
                    <CalendarDays class="h-3.5 w-3.5 shrink-0" />
                    <span>{{ event.date }} · {{ event.time }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <MapPin class="h-3.5 w-3.5 shrink-0" />
                    <span class="truncate">{{ event.location }}</span>
                </div>
                <!-- Assigned admins -->
                <div v-if="event.assigned_admins?.length" class="flex flex-wrap gap-1 pt-1">
                    <span
                        v-for="admin in event.assigned_admins"
                        :key="admin.userID"
                        class="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 text-xs px-2 py-0.5"
                    >
                        {{ admin.name }}
                        <button @click="removeAdmin(event, admin)" class="hover:text-blue-900 ml-0.5">×</button>
                    </span>
                </div>
                <div v-else class="text-xs text-muted-foreground italic">No admin assigned</div>
            </CardContent>
            <CardFooter class="flex gap-2 pt-2 flex-wrap">
                <Button @click="openViewDialog(event)" variant="outline" size="sm" class="flex-1 cursor-pointer bg-yellow-100 border-yellow-400 hover:bg-yellow-200">
                    <Eye class="h-3.5 w-3.5 mr-1.5" />View
                </Button>
                <Button @click="openEditDialog(event)" variant="outline" size="sm" class="flex-1 cursor-pointer bg-green-100 border-green-400 hover:bg-green-200">
                    <Pencil class="h-3.5 w-3.5 mr-1.5" />Edit
                </Button>
                <Button @click="openAssignDialog(event)" variant="outline" size="sm" class="flex-1 cursor-pointer bg-blue-100 border-blue-400 hover:bg-blue-200">
                    <UserPlus class="h-3.5 w-3.5 mr-1.5" />Assign
                </Button>
                <Button @click="openDeleteDialog(event)" variant="destructive" size="sm" class="flex-1 cursor-pointer text-black hover:bg-red-600">
                    <Trash2 class="h-3.5 w-3.5 mr-1.5" />Delete
                </Button>
            </CardFooter>
        </Card>
    </section>

    <!-- Delete dialog -->
       <Dialog :open="isDeleteDialogOpen" @update:open="val => !val && closeDeleteDialog()">
        <DialogContent class="max-w-sm">
            <DialogHeader>
                <DialogTitle>Delete Event — {{ selectedEvent?.title }}</DialogTitle>
                <DialogDescription>Are you sure you want to delete this event?</DialogDescription>
            </DialogHeader>
            <DialogFooter class="pt-4">
                <Button variant="outline" @click="closeDeleteDialog" class="bg-blue-600 cursor-pointer text-black hover:bg-blue-600">Cancel</Button>
                <Button @click="submitDelete" class="bg-red-600 cursor-pointer text-black hover:bg-red-600">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

    <!-- Assign Admin Dialog -->
    <Dialog :open="isAssignDialogOpen" @update:open="val => !val && closeAssignDialog()">
        <DialogContent class="max-w-sm">
            <DialogHeader>
                <DialogTitle>Assign Admin — {{ selectedEvent?.title }}</DialogTitle>
                <DialogDescription>Select an admin to assign to this event.</DialogDescription>
            </DialogHeader>
            <div class="space-y-3 pt-2">
                <Label>Admin</Label>
                <select v-model="selectedAdminID" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option disabled value="">-- Select admin --</option>
                    <option v-for="admin in admins" :key="admin.userID" :value="admin.userID">
                        {{ admin.name }} ({{ admin.role }})
                    </option>
                </select>
            </div>
            <DialogFooter class="pt-4">
                <Button variant="outline" @click="closeAssignDialog" class="bg-red-600 cursor-pointer text-black hover:bg-red-600">Cancel</Button>
                <Button @click="submitAssign" :disabled="!selectedAdminID" class="bg-blue-600 cursor-pointer text-black hover:bg-blue-600">Assign</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

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
                        <Label>Seat Limit <span class="text-xs text-muted-foreground">(0 = unlimited)</span></Label>
                        <Input v-model="editForm.seat_limit" type="number" min="0" />
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
                    <Button type="button" variant="outline" @click="closeEditDialog" class="bg-red-600 cursor-pointer text-black hover:bg-red-600" >Cancel</Button>
                    <Button type="submit" :disabled="editForm.processing" variant="outline" class="bg-blue-600 cursor-pointer hover:bg-blue-600">
                        {{ editForm.processing ? 'Saving...' : 'Save Changes' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

    <!-- View Dialog -->
    <Dialog :open="isViewDialogOpen" @update:open="val => !val && closeViewDialog()">
        <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
            <div class="relative h-52 w-full bg-muted">
                <img v-if="selectedEvent?.image" :src="`/storage/${selectedEvent.image}`" :alt="selectedEvent?.title" class="h-full w-full object-cover" />
                <div v-else class="flex h-full w-full items-center justify-center">
                    <ImageOff class="h-10 w-10 text-muted-foreground" />
                </div>
            </div>
            <div class="p-6 space-y-5" v-if="selectedEvent">
                <h2 class="text-xl font-semibold">{{ selectedEvent.title }}</h2>
                <div class="flex flex-wrap gap-4 text-sm">
                    <div class="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays class="h-4 w-4" /><span>{{ selectedEvent.date }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-muted-foreground">
                        <Clock class="h-4 w-4" /><span>{{ selectedEvent.time }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-muted-foreground">
                        <MapPin class="h-4 w-4" /><span>{{ selectedEvent.location }}</span>
                    </div>
                </div>
                <Separator />
                <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">About this event</p>
                    <p class="text-sm leading-relaxed whitespace-pre-line">{{ selectedEvent.description }}</p>
                </div>
                <div v-if="selectedEvent.assigned_admins?.length">
                    <p class="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Assigned Admins</p>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="admin in selectedEvent.assigned_admins" :key="admin.userID"
                            class="rounded-full bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                            {{ admin.name }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="px-6 pb-6">
                <Button variant="outline" class="w-full bg-red-600 cursor-pointer hover:bg-red-600" @click="closeViewDialog">Close</Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import { Pencil, Trash2, Plus, Eye, CalendarDays, MapPin, CalendarX, ImageOff, Clock, UserPlus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const props = defineProps({
    events: { type: Array, default: () => [] },
    admins: { type: Array, default: () => [] }, // list of admin users for assign dropdown
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Events', href: '/events' }],
    },
});

// Edit
const isEditDialogOpen = ref(false);
const editForm = useForm({ id: null, title: '', description: '', date: '', time: '', location: '', seat_limit: 0, image: null, layoutImage: null });

function openEditDialog(event) {
    Object.assign(editForm, {
        id: event.eventID, title: event.title, description: event.description,
        date: event.date, time: event.time, location: event.location,
        seat_limit: event.seat_limit ?? 0, image: null, layoutImage: null,
    });
    isEditDialogOpen.value = true;
}
function closeEditDialog() { isEditDialogOpen.value = false; editForm.reset(); }
function submitEdit() { editForm.post(`/events/${editForm.id}`, { forceFormData: true, onSuccess: closeEditDialog }); }

// View
const isViewDialogOpen = ref(false);
const selectedEvent = ref(null);
function openViewDialog(event) { selectedEvent.value = event; isViewDialogOpen.value = true; }
function closeViewDialog() { isViewDialogOpen.value = false; selectedEvent.value = null; }


// Assign admin
const isAssignDialogOpen = ref(false);
const selectedAdminID = ref('');

function openAssignDialog(event) {
    selectedEvent.value = event;
    selectedAdminID.value = '';
    isAssignDialogOpen.value = true;
}
function closeAssignDialog() { isAssignDialogOpen.value = false; selectedEvent.value = null; }

function submitAssign() {
    router.post(`/events/${selectedEvent.value.eventID}/assign-admin`, {
        userID: selectedAdminID.value,
    }, { onSuccess: closeAssignDialog });
}

function removeAdmin(event, admin) {
    if (!confirm(`Remove ${admin.name} from this event?`)) return;
    router.post(`/events/${event.eventID}/remove-admin`, { userID: admin.userID });
}

// Delete
const isDeleteDialogOpen = ref(false);

function openDeleteDialog(event) {
    selectedEvent.value = event;
    isDeleteDialogOpen.value = true;
}

function closeDeleteDialog() {
    isDeleteDialogOpen.value = false;
    selectedEvent.value = null;
}

function submitDelete() {
    if (!selectedEvent.value) return;
    router.post(`/events/${selectedEvent.value.eventID}/delete`, {}, {
        onSuccess: closeDeleteDialog,
    });
}
</script>
