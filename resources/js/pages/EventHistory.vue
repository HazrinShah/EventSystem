<template>
    <div class="min-h-[calc(100vh-65px)] bg-slate-50/50 pb-10">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-8 md:px-10 border-b border-slate-100 bg-white">
            <div>
                <h1 class="text-3xl font-bold tracking-tight text-slate-900">Events History</h1>
                <p class="text-sm text-slate-500 mt-1 font-medium">Archive of all past and current events</p>
            </div>
            
            <!-- Filters -->
            <div class="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-center">
                <button
                    @click="filterStatus = 'all'"
                    :class="[
                        'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
                        filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    ]"
                >
                    All
                </button>
                <button
                    @click="filterStatus = 'open'"
                    :class="[
                        'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
                        filterStatus === 'open' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    ]"
                >
                    Open
                </button>
                <button
                    @click="filterStatus = 'closed'"
                    :class="[
                        'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer',
                        filterStatus === 'closed' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    ]"
                >
                    Closed
                </button>
            </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredEvents.length === 0" class="flex flex-col items-center justify-center py-32 text-center px-4">
            <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
                <History class="h-10 w-10 text-slate-400" />
            </div>
            <h3 class="text-xl font-bold text-slate-900">No events found</h3>
            <p class="text-sm text-slate-500 mt-2 max-w-sm">No events match the selected status filter.</p>
        </div>

        <!-- Cards grid -->
        <section v-else class="grid grid-cols-1 gap-6 p-6 md:p-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card v-for="event in filteredEvents" :key="event.eventID" class="group flex flex-col overflow-hidden border border-slate-200/60 shadow-sm bg-white hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 rounded-2xl relative">
                
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

                    <!-- Status Badge Overlay (Only in History) -->
                    <div class="absolute top-3 right-3 shadow-sm">
                        <span 
                            v-if="event.status === 'open'"
                            class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"
                        >
                            Open
                        </span>
                        <span 
                            v-else
                            class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                            Closed
                        </span>
                    </div>

                    <!-- Date Badge Overlay -->
                    <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20 flex flex-col items-center">
                        <p class="text-xs font-bold text-slate-800 uppercase tracking-wide">
                            {{ event.start_date }}
                            <span v-if="event.end_date && event.end_date !== event.start_date">- {{ event.end_date }}</span>
                        </p>
                    </div>
                </div>
                
                <CardContent class="flex-1 p-5 space-y-3">
                    <h3 class="text-lg font-bold text-slate-900 leading-tight line-clamp-1" :title="event.title">{{ event.title }}</h3>
                    
                    <div class="space-y-2 text-sm text-slate-500 font-medium mt-1">
                        <div class="flex items-center gap-2.5">
                            <Clock class="h-4 w-4 text-slate-400" />
                            <span>{{ event.start_time }} <span v-if="event.end_time">- {{ event.end_time }}</span></span>
                        </div>
                        <div class="flex items-start gap-2.5">
                            <MapPin class="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                            <span class="line-clamp-2 leading-snug">{{ event.location }}</span>
                        </div>
                    </div>
                </CardContent>

                <!-- Action Footer -->
                <div class="flex flex-col border-t border-slate-100 bg-slate-50/50">
                    <div class="flex w-full">
                        <button @click="openViewDialog(event)" class="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors">
                            <Eye class="h-4 w-4" /> View
                        </button>

                        <div v-if="role === 'user'" class="w-px bg-slate-200"></div>

                        <!-- User Specific Actions -->
                        <template v-if="role === 'user'">
                            <!-- Closed Event Status/Actions -->
                            <template v-if="event.status === 'closed'">
                                <div v-if="event.rsvps?.length && event.rsvps[0].status === 'confirmed'" class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-500 bg-slate-100/50">
                                    Attended
                                </div>
                                <div v-else class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-400 bg-slate-100/30 cursor-not-allowed">
                                    Ended
                                </div>
                            </template>

                            <!-- Open Event Status/Actions -->
                            <template v-else>
                                <template v-if="event.rsvps?.length && event.rsvps[0].status === 'pending'">
                                    <Link :href="`/events/${event.eventID}/select-seat`" class="flex-1">
                                        <button class="w-full h-full cursor-pointer flex items-center justify-center gap-2 py-3 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                                            <CalendarCheck class="h-4 w-4" /> Pick Seat
                                        </button>
                                    </Link>
                                </template>
                                
                                <template v-else-if="event.rsvps?.length && event.rsvps[0].status === 'confirmed'">
                                    <div class="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50/80">
                                        Confirmed
                                    </div>
                                </template>
                                
                                <template v-else>
                                    <button @click="openRsvpDialog(event)" class="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                                        <CalendarCheck class="h-4 w-4" /> RSVP
                                    </button>
                                </template>
                            </template>
                        </template>

                        <!-- Admin / SuperAdmin actions - we just show standard info -->
                        <template v-else>
                            <div class="w-px bg-slate-200"></div>
                            <Link :href="event.status === 'open' ? `/events/${event.eventID}/seats` : '#'" class="flex-1" :class="{ 'pointer-events-none opacity-40': event.status === 'closed' }">
                                <button :disabled="event.status === 'closed'" class="w-full h-full cursor-pointer flex items-center justify-center gap-2 py-3 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors disabled:cursor-not-allowed">
                                    <LayoutTemplate class="h-4 w-4" /> {{ event.status === 'closed' ? 'Closed' : 'Layout' }}
                                </button>
                            </Link>
                        </template>
                    </div>
                    
                    <!-- Status badge row (Only show pax if RSVP is confirmed) -->
                    <div v-if="role === 'user' && event.rsvps?.length && event.rsvps[0].status === 'confirmed'" class="px-5 py-2.5 bg-emerald-100/50 border-t border-emerald-100 flex items-center justify-center text-xs font-medium text-emerald-800">
                        Attendance confirmed for {{ event.rsvps[0].pax }} pax
                    </div>
                </div>
            </Card>
        </section>

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
                                <span class="flex items-center gap-1.5"><CalendarDays class="h-4 w-4 text-white/70" /> {{ selectedEvent?.start_date }} <span v-if="selectedEvent?.end_date && selectedEvent?.end_date !== selectedEvent?.start_date">- {{ selectedEvent?.end_date }}</span></span>
                                <span class="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                                <span class="flex items-center gap-1.5"><Clock class="h-4 w-4 text-white/70" /> {{ selectedEvent?.start_time }} <span v-if="selectedEvent?.end_time">- {{ selectedEvent?.end_time }}</span></span>
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
                    </div>

                    <div class="px-6 py-5 border-t border-slate-100 bg-slate-50 flex justify-end">
                        <button @click="closeViewDialog" class="cursor-pointer px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10 w-full sm:w-auto">
                            Close Details
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

        <!-- RSVP Dialog -->
        <Dialog :open="isRsvpDialogOpen" @update:open="val => !val && closeRsvpDialog()">
            <DialogContent class="sm:max-w-[425px] rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
                <div class="max-h-[90vh] overflow-y-auto w-full">
                    <div class="px-6 py-5 border-b border-slate-100 bg-indigo-600">
                        <DialogTitle class="text-xl font-bold text-white">Event RSVP</DialogTitle>
                        <DialogDescription class="text-indigo-100 mt-1">Fill in your attendance details for {{ selectedEvent?.title }}.</DialogDescription>
                    </div>

                    <form @submit.prevent="submitRsvp" class="p-6 space-y-5 bg-slate-50/50">
                        <div class="space-y-2">
                            <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Number of Pax</Label>
                            <Input v-model="rsvpForm.pax" type="number" min="1" required placeholder="e.g. 2" class="rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-white shadow-sm" />
                            <span v-if="rsvpForm.errors.pax" class="text-xs text-red-500 font-medium">{{ rsvpForm.errors.pax }}</span>
                        </div>
                        <div class="space-y-2">
                            <Label class="text-xs font-bold text-slate-600 uppercase tracking-wider">Note <span class="text-slate-400 font-normal normal-case ml-1">(optional)</span></Label>
                            <textarea v-model="rsvpForm.note" rows="3" placeholder="Any special dietary requirements or requests..." class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm transition-shadow"></textarea>
                            <span v-if="rsvpForm.errors.note" class="text-xs text-red-500 font-medium">{{ rsvpForm.errors.note }}</span>
                        </div>

                        <div class="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-200 mt-6">
                            <button type="button" @click="closeRsvpDialog" class="cursor-pointer px-5 py-2.5 text-sm font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto">
                                Cancel
                            </button>
                            <button type="submit" :disabled="rsvpForm.processing" class="cursor-pointer px-6 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md shadow-indigo-600/20 w-full sm:w-auto flex items-center justify-center gap-2">
                                <CalendarCheck v-if="!rsvpForm.processing" class="w-4 h-4" />
                                {{ rsvpForm.processing ? 'Submitting...' : 'Confirm RSVP' }}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm, router, Link, usePage } from '@inertiajs/vue3';
import { CalendarDays, MapPin, CalendarX, ImageOff, CalendarCheck, Eye, Clock, Info, History, LayoutTemplate } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

const props = defineProps({
    events: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'History', href: '/history' }],
    },
});

const page = usePage();
const role = computed(() => page.props.auth.user?.role || 'user');

// Filtering
const filterStatus = ref('all');

const filteredEvents = computed(() => {
    if (filterStatus.value === 'all') {
        return props.events;
    }
    return props.events.filter(event => event.status === filterStatus.value);
});

// View dialog state
const isViewDialogOpen = ref(false);
const selectedEvent = ref(null);
function openViewDialog(event) { selectedEvent.value = event; isViewDialogOpen.value = true; }
function closeViewDialog() { isViewDialogOpen.value = false; selectedEvent.value = null; }

// RSVP dialog state
const isRsvpDialogOpen = ref(false);
const rsvpForm = useForm({ eventID: null, pax: '', note: '' });

function openRsvpDialog(event) {
    selectedEvent.value = event;
    rsvpForm.eventID = event.eventID;
    isRsvpDialogOpen.value = true;
}
function closeRsvpDialog() {
    isRsvpDialogOpen.value = false;
    selectedEvent.value = null;
    rsvpForm.reset();
}
function submitRsvp() {
    rsvpForm.post('/rsvp', { onSuccess: () => closeRsvpDialog() });
}
</script>
