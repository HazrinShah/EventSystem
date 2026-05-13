<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Events</h1>
            <p class="text-sm text-muted-foreground">Browse and RSVP to upcoming events</p>
        </div>
    </div>

    <div v-if="!events.length" class="flex flex-col items-center justify-center py-24 text-center">
        <CalendarX class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No events available</h3>
        <p class="text-sm text-muted-foreground mt-1">Check back later for upcoming events.</p>
    </div>

    <section v-else class="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card v-for="event in events" :key="event.eventID" class="flex flex-col overflow-hidden border border-border shadow-md hover:shadow-lg transition-shadow duration-200">
            <div class="relative h-44 w-full bg-muted">
                <img v-if="event.image" :src="`/storage/${event.image}`" :alt="event.title" class="h-full w-full object-cover"/>
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
            <CardFooter class="flex flex-col gap-2 pt-2">
                <!-- Buttons row -->
                <div class="flex w-full gap-2">
                    <Button class="flex-1" size="sm" variant="outline" @click="openViewDialog(event)">
                        <Eye class="h-3.5 w-3.5 mr-1.5" />View
                    </Button>
                    <!-- Already RSVP'd -->
                    <template v-if="event.rsvps?.length">
                        <Button
                            v-if="event.rsvps[0].status === 'pending'"
                            class="flex-1" size="sm" variant="destructive"
                            @click="cancelRsvp(event.rsvps[0].rsvpID)">
                            Cancel RSVP
                        </Button>
                        <span v-else class="flex-1 flex items-center justify-center text-xs font-medium px-2 py-1 rounded-md bg-green-100 text-green-700">
                            Confirmed
                        </span>
                    </template>
                    <!-- Not RSVP'd yet -->
                    <Button v-else class="flex-1" size="sm" @click="openRsvpDialog(event)">
                        <CalendarCheck class="h-3.5 w-3.5 mr-1.5" />RSVP
                    </Button>
                </div>
                <!-- Status badge -->
                <div v-if="event.rsvps?.length" class="flex w-full items-center justify-between text-xs text-muted-foreground">
                    <span>{{ event.rsvps[0].pax }} pax</span>
                    <span class="font-medium px-2 py-0.5 rounded-full"
                        :class="{
                            'bg-green-100 text-green-700': event.rsvps[0].status === 'confirmed',
                            'bg-yellow-100 text-yellow-700': event.rsvps[0].status === 'pending',
                        }">
                        {{ event.rsvps[0].status }}
                    </span>
                </div>
            </CardFooter>
        </Card>
    </section>

    <!-- View Dialog -->
    <Dialog :open="isViewDialogOpen" @update:open="val => !val && closeViewDialog()">
        <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
            <div class="relative h-52 w-full bg-muted">
                <img v-if="selectedEvent?.image" :src="`/storage/${selectedEvent.image}`" :alt="selectedEvent?.title" class="h-full w-full object-cover"/>
                <div v-else class="flex h-full w-full items-center justify-center">
                    <ImageOff class="h-10 w-10 text-muted-foreground" />
                </div>
            </div>
            <div class="p-6 space-y-5" v-if="selectedEvent">
                <h2 class="text-xl font-semibold">{{ selectedEvent.title }}</h2>
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

    <!-- RSVP Dialog -->
    <Dialog :open="isRsvpDialogOpen" @update:open="val => !val && closeRsvpDialog()">
        <DialogContent class="max-w-sm">
            <DialogHeader>
                <DialogTitle>RSVP — {{ selectedEvent?.title }}</DialogTitle>
                <DialogDescription>Fill in your attendance details.</DialogDescription>
            </DialogHeader>
            <form @submit.prevent="submitRsvp" class="space-y-4 pt-2">
                <div class="space-y-1.5">
                    <Label>Number of Pax</Label>
                    <Input v-model="rsvpForm.pax" type="number" min="1" required placeholder="e.g. 2" />
                    <span v-if="rsvpForm.errors.pax" class="text-xs text-red-500">{{ rsvpForm.errors.pax }}</span>
                </div>
                <div class="space-y-1.5">
                    <Label>Note <span class="text-muted-foreground">(optional)</span></Label>
                    <textarea v-model="rsvpForm.note" rows="3" placeholder="Any special requests..." class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"></textarea>
                    <span v-if="rsvpForm.errors.note" class="text-xs text-red-500">{{ rsvpForm.errors.note }}</span>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" @click="closeRsvpDialog">Cancel</Button>
                    <Button type="submit" :disabled="rsvpForm.processing">
                        {{ rsvpForm.processing ? 'Submitting...' : 'Submit RSVP' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import { CalendarDays, MapPin, CalendarX, ImageOff, CalendarCheck, Eye, Clock } from 'lucide-vue-next';
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
        breadcrumbs: [{ title: 'Events', href: '/uevents' }],
    },
});

// View
const isViewDialogOpen = ref(false);
const selectedEvent = ref(null);
function openViewDialog(event) { selectedEvent.value = event; isViewDialogOpen.value = true; }
function closeViewDialog() { isViewDialogOpen.value = false; selectedEvent.value = null; }

// RSVP
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

// Cancel
function cancelRsvp(rsvpID) {
    if (!confirm('Cancel your RSVP?')) return;
    router.post(`/rsvp/${rsvpID}/cancel`);
}
</script>
