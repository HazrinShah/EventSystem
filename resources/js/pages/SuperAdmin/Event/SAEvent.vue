<template>
    <div class="min-h-[calc(100vh-65px)] bg-slate-50/50 pb-10">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-8 md:px-10 border-b border-slate-100 bg-white">
            <div>
                <h1 class="text-3xl font-bold tracking-tight text-slate-900">Events Directory</h1>
                <p class="text-sm text-slate-500 mt-1 font-medium">Manage all events and assign organizers</p>
            </div>
            <Link href="/add-events">
                <button class="cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 w-full sm:w-auto">
                    <Plus class="h-4 w-4" />
                    Create New Event
                </button>
            </Link>
        </div>

        <!-- Empty state -->
        <div v-if="!events.length" class="flex flex-col items-center justify-center py-32 text-center px-4">
            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
                <CalendarX class="h-10 w-10 text-slate-400" />
            </div>
            <h3 class="text-xl font-bold text-slate-900">No events found</h3>
            <p class="text-sm text-slate-500 mt-2 mb-6 max-w-sm">There are no events in the system yet. Get started by creating one.</p>
            <Link href="/add-events">
                <button class="cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20">
                    <Plus class="h-4 w-4" />
                    Create Event
                </button>
            </Link>
        </div>

        <!-- Cards grid -->
        <section v-else class="grid grid-cols-1 gap-6 p-6 md:p-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card v-for="event in events" :key="event.eventID" class="group flex flex-col overflow-hidden border border-slate-200/60 shadow-sm bg-white hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 rounded-2xl relative">
                
                <!-- Image Area -->
                <div class="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                        v-if="event.image"
                        :src="`/storage/${event.image}`"
                        :alt="event.title"
                        class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div v-else class="flex h-full w-full items-center justify-center bg-slate-100/50">
                        <div class="flex flex-col items-center gap-2 text-slate-400">
                            <ImageOff class="h-8 w-8 opacity-50" />
                            <span class="text-xs font-medium">No cover image</span>
                        </div>
                    </div>

                    <!-- Date Badge Overlay -->
                    <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
                        <p class="text-xs font-bold text-slate-800 uppercase tracking-wide">{{ event.date }}</p>
                    </div>
                </div>
                
                <CardContent class="flex-1 p-5 space-y-3">
                    <h3 class="text-lg font-bold text-slate-900 leading-tight line-clamp-1" :title="event.title">{{ event.title }}</h3>
                    
                    <div class="space-y-2 text-sm text-slate-500 font-medium mt-1">
                        <div class="flex items-center gap-2.5">
                            <Clock class="h-4 w-4 text-slate-400" />
                            <span>{{ event.time }}</span>
                        </div>
                        <div class="flex items-start gap-2.5">
                            <MapPin class="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                            <span class="line-clamp-2 leading-snug">{{ event.location }}</span>
                        </div>
                    </div>

                    <!-- Assigned admins -->
                    <div v-if="event.assigned_admins?.length" class="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                        <span
                            v-for="admin in event.assigned_admins"
                            :key="admin.userID"
                            class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50/80 text-indigo-700 text-[11px] font-bold px-2 py-1 border border-indigo-100"
                        >
                            <User class="w-3 h-3" />
                            {{ admin.name }}
                            <button @click.stop="removeAdmin(event, admin)" class="hover:text-red-600 hover:bg-red-100 rounded ml-0.5 transition-colors" title="Remove admin">
                                <X class="w-3.5 h-3.5" />
                            </button>
                        </span>
                    </div>
                    <div v-else class="text-xs font-medium text-slate-400 mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                        <UserMinus class="w-3.5 h-3.5" /> No admin assigned
                    </div>
                </CardContent>

                <!-- Action Footer -->
                <div class="grid grid-cols-4 border-t border-slate-100 bg-slate-50/50">
                    <button @click="openViewDialog(event)" class="cursor-pointer flex items-center justify-center gap-1.5 py-3 text-[11px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors uppercase tracking-wider">
                        <Eye class="h-3.5 w-3.5" /> View
                    </button>
                    <button @click="openEditDialog(event)" class="cursor-pointer flex items-center justify-center gap-1.5 py-3 text-[11px] font-bold text-slate-600 border-l border-slate-100 hover:text-amber-600 hover:bg-amber-50/50 transition-colors uppercase tracking-wider">
                        <Pencil class="h-3.5 w-3.5" /> Edit
                    </button>
                    <button @click="openAssignDialog(event)" class="cursor-pointer flex items-center justify-center gap-1.5 py-3 text-[11px] font-bold text-slate-600 border-l border-slate-100 hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors uppercase tracking-wider">
                        <UserPlus class="h-3.5 w-3.5" /> Assign
                    </button>
                    <button @click="openDeleteDialog(event)" class="cursor-pointer flex items-center justify-center gap-1.5 py-3 text-[11px] font-bold text-slate-600 border-l border-slate-100 hover:text-red-600 hover:bg-red-50/50 transition-colors uppercase tracking-wider">
                        <Trash2 class="h-3.5 w-3.5" /> Delete
                    </button>
                </div>
            </Card>
        </section>

        <!-- Delete dialog -->
        <Dialog :open="isDeleteDialogOpen" @update:open="val => !val && closeDeleteDialog()">
            <DialogContent class="sm:max-w-[400px] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
                <div class="px-6 py-5 border-b border-red-100 bg-red-50 flex items-center gap-3">
                    <div class="p-2 bg-red-100 rounded-full text-red-600"><AlertTriangle class="w-5 h-5" /></div>
                    <div>
                        <DialogTitle class="text-lg font-bold text-red-900">Delete Event</DialogTitle>
                        <DialogDescription class="text-sm font-medium text-red-700/80 mt-0.5">This action cannot be undone.</DialogDescription>
                    </div>
                </div>
                <div class="p-6 bg-white">
                    <p class="text-sm text-slate-600 leading-relaxed">Are you sure you want to permanently delete <strong class="text-slate-900">{{ selectedEvent?.title }}</strong>? All associated RSVPs, seats, and data will be removed.</p>
                </div>
                <div class="px-6 py-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
                    <button @click="closeDeleteDialog" class="cursor-pointer px-5 py-2.5 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button @click="submitDelete" class="cursor-pointer px-6 py-2.5 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md shadow-red-600/20">
                        Delete Event
                    </button>
                </div>
            </DialogContent>
        </Dialog>

        <!-- Assign Admin Dialog -->
        <Dialog :open="isAssignDialogOpen" @update:open="val => !val && closeAssignDialog()">
            <DialogContent class="sm:max-w-[425px] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
                <div class="px-6 py-5 border-b border-slate-100 bg-white">
                    <DialogTitle class="text-xl font-bold text-slate-900">Assign Admin</DialogTitle>
                    <DialogDescription class="text-sm font-medium text-slate-500 mt-1">Select an admin to manage {{ selectedEvent?.title }}.</DialogDescription>
                </div>
                <div class="p-6 space-y-4 bg-slate-50/50">
                    <div class="space-y-2">
                        <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Select Admin</Label>
                        <select v-model="selectedAdminID" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm cursor-pointer">
                            <option disabled value="">-- Choose an administrator --</option>
                            <option v-for="admin in admins" :key="admin.userID" :value="admin.userID">
                                {{ admin.name }} ({{ admin.role }})
                            </option>
                        </select>
                    </div>
                </div>
                <div class="px-6 py-4 bg-white flex justify-end gap-3 border-t border-slate-100">
                    <button @click="closeAssignDialog" class="cursor-pointer px-5 py-2.5 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button @click="submitAssign" :disabled="!selectedAdminID" class="cursor-pointer px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md shadow-indigo-600/20">
                        Assign Admin
                    </button>
                </div>
            </DialogContent>
        </Dialog>

        <!-- Edit Dialog -->
        <Dialog :open="isEditDialogOpen" @update:open="val => !val && closeEditDialog()">
            <DialogContent class="sm:max-w-[600px] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
                <div class="max-h-[90vh] overflow-y-auto w-full">
                    <div class="px-6 py-5 border-b border-slate-100 bg-white">
                        <DialogTitle class="text-xl font-bold text-slate-900">Edit Event</DialogTitle>
                        <DialogDescription class="text-sm font-medium text-slate-500 mt-1">Make changes to your event details.</DialogDescription>
                    </div>
                    
                    <form @submit.prevent="submitEdit" class="p-6 space-y-6 bg-slate-50/50">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div class="sm:col-span-2 space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Event Title</Label>
                                <Input v-model="editForm.title" type="text" required class="rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white shadow-sm" />
                            </div>
                            <div class="sm:col-span-2 space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Description</Label>
                                <textarea v-model="editForm.description" rows="4" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm transition-shadow"></textarea>
                            </div>
                            <div class="space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Date</Label>
                                <Input v-model="editForm.date" type="date" class="rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white shadow-sm" />
                            </div>
                            <div class="space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Time</Label>
                                <Input v-model="editForm.time" type="time" class="rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white shadow-sm" />
                            </div>
                            <div class="sm:col-span-2 space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Location</Label>
                                <Input v-model="editForm.location" type="text" class="rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white shadow-sm" />
                            </div>
                            
                            <div class="space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Cover Image</Label>
                                <div class="flex items-center gap-3">
                                    <Input @input="editForm.image = $event.target.files[0]" type="file" accept="image/*" class="rounded-xl border-slate-200 bg-white text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 shadow-sm" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Layout Image</Label>
                                <Input @input="editForm.layoutImage = $event.target.files[0]" type="file" accept="image/*" class="rounded-xl border-slate-200 bg-white text-xs file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 shadow-sm" />
                            </div>

                            <div class="sm:col-span-2 space-y-2 pt-2">
                                <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Seat Limit <span class="text-slate-400 font-normal normal-case ml-1">(0 = unlimited)</span></Label>
                                <Input v-model.number="editForm.seat_limit" type="number" min="0" class="rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white w-full sm:w-1/2 shadow-sm" />
                            </div>
                        </div>
                        
                        <div class="pt-6 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-200">
                            <button type="button" @click="closeEditDialog" class="cursor-pointer px-5 py-2.5 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto">
                                Cancel
                            </button>
                            <button type="submit" :disabled="editForm.processing" class="cursor-pointer px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md shadow-indigo-600/20 w-full sm:w-auto">
                                {{ editForm.processing ? 'Saving Changes...' : 'Save Changes' }}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

        <!-- View Dialog -->
        <Dialog :open="isViewDialogOpen" @update:open="val => !val && closeViewDialog()">
            <DialogContent class="p-0 rounded-2xl overflow-hidden border-0 shadow-2xl sm:max-w-[700px]">
                <div class="max-h-[90vh] overflow-y-auto w-full">
                    <!-- Cover Banner -->
                    <div class="relative h-64 sm:h-72 w-full bg-slate-100">
                        <img
                            v-if="selectedEvent?.image"
                            :src="`/storage/${selectedEvent.image}`"
                            class="h-full w-full object-cover"
                        />
                        <div v-else class="flex h-full w-full items-center justify-center bg-slate-100">
                            <ImageOff class="h-12 w-12 text-slate-300" />
                        </div>
                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
                        
                        <div class="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-sm">{{ selectedEvent?.title }}</h2>
                            <div class="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
                                <span class="flex items-center gap-1.5"><CalendarDays class="h-4 w-4 text-white/70" /> {{ selectedEvent?.date }}</span>
                                <span class="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                                <span class="flex items-center gap-1.5"><Clock class="h-4 w-4 text-white/70" /> {{ selectedEvent?.time }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 sm:p-8 space-y-8 bg-white">
                        <div class="flex items-start gap-3 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                            <MapPin class="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                            <div>
                                <p class="text-xs font-bold text-indigo-900/60 uppercase tracking-wider mb-1">Venue Location</p>
                                <p class="text-sm font-medium text-slate-800 leading-relaxed">{{ selectedEvent?.location }}</p>
                            </div>
                        </div>

                        <div v-if="selectedEvent?.description">
                            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <Info class="h-4 w-4 text-slate-400" /> About Event
                            </h3>
                            <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{{ selectedEvent?.description }}</p>
                        </div>

                        <div v-if="selectedEvent?.layoutImage" class="space-y-3">
                            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                                <LayoutTemplate class="h-4 w-4 text-slate-400" /> Venue Layout
                            </h3>
                            <div class="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-slate-50">
                                <img
                                    :src="`/storage/${selectedEvent.layoutImage}`"
                                    class="w-full h-auto object-contain max-h-[400px] hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        <div v-if="selectedEvent?.assigned_admins?.length" class="space-y-3 pt-6 border-t border-slate-100">
                            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                                <User class="h-4 w-4 text-slate-400" /> Event Admins
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="admin in selectedEvent.assigned_admins" :key="admin.userID"
                                    class="flex items-center gap-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1.5 border border-slate-200">
                                    <User class="w-3.5 h-3.5 opacity-50" />
                                    {{ admin.name }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="px-6 py-5 border-t border-slate-100 bg-slate-50 flex justify-end">
                        <button @click="closeViewDialog" class="cursor-pointer px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10 w-full sm:w-auto">
                            Close Details
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import { Pencil, Trash2, Plus, Eye, CalendarDays, MapPin, CalendarX, ImageOff, Clock, UserPlus, User, UserMinus, X, Info, LayoutTemplate, AlertTriangle } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

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
