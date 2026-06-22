<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">RSVP Management</h1>
            <p class="text-sm text-muted-foreground">Review and manage event RSVPs</p>
        </div>
    </div>

    <!-- Main Content Container -->
    <div class="p-6 space-y-6">
        
        <!-- Filters Box Container -->
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500">Filter & Search</h2>
            <div class="flex flex-wrap items-center gap-4 w-full">

                <div class="relative w-full sm:max-w-xs">
                    <Input 
                        v-model="search"
                        type="text"
                        placeholder="Search user, event, seat or note..." 
                        @keyup.enter="applyFilters"
                        :disabled="isLoading"
                    />
                </div>

                <div class="w-full sm:max-w-[180px]">
                     <Select v-model="status" :disabled="isLoading">
                        <SelectTrigger class="w-full cursor-pointer">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter Status</SelectLabel>
                                    <SelectItem value="all" class="cursor-pointer">
                                    All Statuses
                                    </SelectItem>
                                    <SelectItem value="confirmed" class="cursor-pointer">
                                    Confirmed
                                    </SelectItem>
                                    <SelectItem value="pending" class="cursor-pointer">
                                    Pending
                                    </SelectItem>
                                    <SelectItem value="cancelled" class="cursor-pointer">
                                    Cancelled
                                    </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button @click="applyFilters" :disabled="isLoading" class=" cursor-pointer flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
                    <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                    <span>{{ isLoading ? 'Searching...' : 'Search' }}</span>
                </Button>

                <Button 
                    v-if="search || (status && status !== 'all')"
                    @click="resetFilters"
                    :disabled="isLoading"
                    variant="ghost"
                    class="text-xs cursor-pointer bg-gray-200 hover:bg-gray-300"
                >
                    Reset
                </Button>
            </div>
        </div>

        <!-- Skeleton Loading State -->
        <div v-if="isLoading" class="rounded-lg border shadow-sm bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Pax</TableHead>
                        <TableHead>Seat</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="i in 3" :key="i" class="animate-pulse">
                        <TableCell><div class="h-4 bg-slate-200 rounded w-24 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-32 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-8 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-20 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-16 my-2"></div></TableCell>
                        <TableCell><div class="h-6 bg-slate-200 rounded-full w-16 my-2"></div></TableCell>
                        <TableCell><div class="h-8 bg-slate-200 rounded w-20 my-2"></div></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <!-- Table / Empty state (Visible only when not loading) -->
        <template v-else>
            <div v-if="filteredRsvps.length === 0" class="flex flex-col items-center justify-center py-24 text-center border rounded-lg bg-white shadow-sm">
                <ClipboardList class="h-12 w-12 text-muted-foreground mb-4" />
                <h3 class="text-lg font-semibold">No RSVPs found</h3>
                <p class="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
            </div>

            <div v-else class="rounded-lg border shadow-sm bg-white">
                <div class="max-h-[550px] overflow-y-auto relative">
                    <Table>
                        <TableHeader class="sticky top-0 bg-white z-10">
                            <TableRow>
                                <TableHead @click="sortBy('name')" class="cursor-pointer hover:bg-muted/50 select-none">
                                    <div class="flex items-center">
                                        Name
                                        <ArrowUp v-if="sortField === 'name' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowDown v-else-if="sortField === 'name' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                    </div>
                                </TableHead>

                                <TableHead @click="sortBy('event.title')" class="cursor-pointer hover:bg-muted/50 select-none">
                                    <div class="flex items-center">
                                        Event
                                        <ArrowUp v-if="sortField === 'event.title' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowDown v-else-if="sortField === 'event.title' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                    </div>
                                </TableHead>

                                <TableHead @click="sortBy('pax')" class="cursor-pointer hover:bg-muted/50 select-none">
                                    <div class="flex items-center">
                                        Pax
                                        <ArrowUp v-if="sortField === 'pax' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowDown v-else-if="sortField === 'pax' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                    </div>
                                </TableHead>

                                <TableHead @click="sortBy('seat_label')" class="cursor-pointer hover:bg-muted/50 select-none">
                                    <div class="flex items-center">
                                        Seat
                                        <ArrowUp v-if="sortField === 'seat_label' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowDown v-else-if="sortField === 'seat_label' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                    </div>
                                </TableHead>

                                <TableHead @click="sortBy('note')" class="cursor-pointer hover:bg-muted/50 select-none">
                                    <div class="flex items-center">
                                        Note
                                        <ArrowUp v-if="sortField === 'note' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowDown v-else-if="sortField === 'note' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                    </div>
                                </TableHead>

                                <TableHead @click="sortBy('status')" class="cursor-pointer hover:bg-muted/50 select-none">
                                    <div class="flex items-center">
                                        Status
                                        <ArrowUp v-if="sortField === 'status' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowDown v-else-if="sortField === 'status' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                        <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                    </div>
                                </TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="rsvp in paginatedRsvps" :key="rsvp.rsvpID">
                                <TableCell class="font-medium">{{ rsvp.user.name }}</TableCell>
                                <TableCell>{{ rsvp.event.title }}</TableCell>
                                <TableCell>{{ rsvp.pax }}</TableCell>
                                <TableCell class="max-w-[200px]">
                                    <div v-if="rsvp.seat_label?.length" class="flex gap-1 flex-wrap">
                                        <div v-for="label in rsvp.seat_label" :key="label"
                                            class="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs font-mono whitespace-nowrap">
                                            {{ label }}
                                        </div>
                                    </div>
                                    <span v-else class="text-xs text-muted-foreground">—</span>
                                </TableCell>
                                <TableCell class="text-muted-foreground">{{ rsvp.note ?? '-' }}</TableCell>
                                <TableCell>
                                    <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                        :class="{
                                            'bg-green-100 text-green-700': rsvp.status === 'confirmed',
                                            'bg-yellow-100 text-yellow-700': rsvp.status === 'pending',
                                            'bg-red-100 text-red-700': rsvp.status === 'cancelled',
                                        }">
                                        {{ rsvp.status }}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                class="text-white bg-red-500 cursor-pointer hover:bg-red-700 hover:text-white"
                                                :disabled="rsvp.status === 'cancelled'"
                                            >
                                                <CalendarX2 class="h-4 w-4 mr-1 text-white" style="transform: translateY(-0.35px);" /> Cancel
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will cancel the RSVP for <strong>{{ rsvp.event.title }}</strong>.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel class="bg-blue-600 text-white hover:bg-blue-700 hover:text-white cursor-pointer">No, keep it</AlertDialogCancel>
                                                <AlertDialogAction @click="cancelRsvp(rsvp.rsvpID)" class="bg-red-600 text-white hover:bg-red-700 hover:text-white cursor-pointer">
                                                    Yes, Cancel RSVP
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div class="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 rounded-b-lg">
                        <div class="text-sm text-slate-500 font-medium">
                            Showing <span class="font-semibold text-slate-800">{{ showingStart }}</span> to 
                            <span class="font-semibold text-slate-800">{{ showingEnd }}</span> of 
                            <span class="font-semibold text-slate-800">{{ totalRsvps }}</span> RSVPs
                        </div>

                        <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <div class="flex items-center gap-2">
                                <span class="text-xs text-slate-500 font-medium whitespace-nowrap">Items per page:</span>
                                
                                <Select 
                                    v-model="itemPerPage" 
                                    class="cursor-pointer"
                                >
                                    <SelectTrigger class="w-[70px] h-8 cursor-pointer bg-white border-slate-200 text-xs shadow-sm">
                                        <SelectValue placeholder="5"/>
                                    </SelectTrigger>
                                    <SelectContent class="cursor-pointer">
                                        <SelectItem value="5" class="text-xs">5</SelectItem>
                                        <SelectItem value="10" class="text-xs">10</SelectItem>
                                        <SelectItem value="25" class="text-xs">25</SelectItem>
                                        <SelectItem value="50" class="text-xs">50</SelectItem>
                                        <SelectItem value="100" class="text-xs">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Pagination 
                                    v-model:page="currentPage" 
                                    :items-per-page="itemPerPage" 
                                    :total="totalRsvps"
                                >
                                    <PaginationContent v-slot="{ items }" class="flex items-center gap-1.5">
                                        <PaginationPrevious class="cursor-pointer hover:bg-slate-200 border border-slate-200 shadow-sm transition duration-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white" />

                                        <template v-for="(item, index) in items" :key="index">
                                            <PaginationItem
                                                v-if="item.type === 'page'"
                                                :value="item.value"
                                                :is-active="item.value === currentPage"
                                                class="cursor-pointer transition duration-200 rounded-lg text-xs font-semibold"
                                                :class="item.value === currentPage 
                                                    ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:text-white font-bold shadow-md' 
                                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm'"
                                            >
                                                {{ item.value }}
                                            </PaginationItem>
                                            <PaginationEllipsis v-else-if="item.type === 'ellipsis'" :key="`ellipsis-${index}`" class="text-slate-400" />
                                        </template>

                                        <PaginationNext class="cursor-pointer hover:bg-slate-200 border border-slate-200 shadow-sm transition duration-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white" />
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
import { ClipboardList, Trash2, CalendarX2, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent,
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader,
    AlertDialogTitle, 
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

import OrganizerLayout from '@/layouts/OrganizerLayout.vue';

const props = defineProps({
    rsvps: { type: Array, default: () => [] }
});

defineOptions({
    layout: OrganizerLayout,
});

// Reactive state for search and filter status
const search = ref('');
const status = ref('all');

// Applied state to trigger filtering only on button click or enter key
const activeSearch = ref('');
const activeStatus = ref('all');

// Loading state
const isLoading = ref(false);

// Computed property to perform lightning-fast client-side filtering
const filteredRsvps = computed(() => {
    return props.rsvps.filter(rsvp => {
        // Filter by status
        if (activeStatus.value && activeStatus.value !== 'all') {
            if (rsvp.status !== activeStatus.value) return false;
        }

        // Filter by search query
        if (activeSearch.value) {
            const query = activeSearch.value.toLowerCase().trim();
            const userName = rsvp.user?.name?.toLowerCase() || '';
            const eventTitle = rsvp.event?.title?.toLowerCase() || '';
            const note = rsvp.note?.toLowerCase() || '';
            const seatLabels = rsvp.seat_label?.map(l => l.toLowerCase()).join(' ') || '';

            return userName.includes(query) || 
                   eventTitle.includes(query) || 
                   note.includes(query) || 
                   seatLabels.includes(query);
        }

        return true;
    });
});

function applyFilters() {
    isLoading.value = true;
    // Simulate high-performance database loading duration for premium UX feel
    setTimeout(() => {
        activeSearch.value = search.value;
        activeStatus.value = status.value;
        isLoading.value = false;
    }, 450);
}

function resetFilters() {
    isLoading.value = true;
    setTimeout(() => {
        search.value = '';
        status.value = 'all';
        activeSearch.value = '';
        activeStatus.value = 'all';
        isLoading.value = false;
    }, 300);
}

function cancelRsvp(rsvpID) {
    if (confirm('Cancel this RSVP?')) {
        router.post(`/organizer/rsvps/${rsvpID}/cancel`);
    }
}


// PAGINATION & SORTING
const currentPage = ref(1);
const itemPerPage = ref(5);
const sortField = ref('');
const sortDirection = ref('asc');

const sortedRsvps = computed(() => {
    let result = [...filteredRsvps.value];

    if (!sortField.value) return result;

    result.sort((a, b) => {
        let valA, valB;

        switch (sortField.value) {
            case 'name':
                valA = a.user?.name || '';
                valB = b.user?.name || '';
                break;
            case 'event.title':
                valA = a.event?.title || '';
                valB = b.event?.title || '';
                break;
            case 'pax':
                valA = a.pax || 0;
                valB = b.pax || 0;
                break;
            case 'seat_label':
                valA = a.seat_label?.[0] || '';
                valB = b.seat_label?.[0] || '';
                break;
            case 'note':
                valA = a.note || '';
                valB = b.note || '';
                break;
            case 'status':
                valA = a.status || '';
                valB = b.status || '';
                break;
            default:
                return 0;
        }

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
        return 0;
    });

    return result;
});

const totalRsvps = computed(() => sortedRsvps.value.length);

const paginatedRsvps = computed(() => {
    const startIndex = (currentPage.value - 1) * itemPerPage.value;
    const endIndex = (currentPage.value) * itemPerPage.value;
    return sortedRsvps.value.slice(startIndex, endIndex);
})

const showingStart = computed(() => {
    if (totalRsvps.value === 0) return 0;
    return (currentPage.value - 1) * itemPerPage.value + 1;
});

const showingEnd = computed(() => {
    return Math.min(currentPage.value * itemPerPage.value, totalRsvps.value);
});

watch(itemPerPage, () => {
  currentPage.value = 1
})

function sortBy(field) {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }
}


</script>
