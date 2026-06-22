<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Seat Management</h1>
            <p class="text-sm text-muted-foreground">Manage seat layouts for each event</p>
        </div>
    </div>

    <div class="p-6 space-y-6">

        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500">Filter & Search</h2>
            <div class="flex flex-wrap items-center gap-4 w-full">

                <div class="relative w-full sm:max-w-xs">
                    <Input 
                        v-model="search"
                        type="text"
                        placeholder="Search event title or limits..." 
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
                                    <SelectItem value="seatsadded" class="cursor-pointer">
                                    Seats Added
                                    </SelectItem>
                                    <SelectItem value="noseats" class="cursor-pointer">
                                    No Seats
                                    </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button @click="applyFilters" :disabled="isLoading" class="w-full sm:max-w-[140px] cursor-pointer flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
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
                        <TableHead>Event</TableHead>
                        <TableHead>Seat Limit</TableHead>
                        <TableHead>Seats Added</TableHead>
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
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <template v-else>
            <!-- Case 1: No events created yet in the database -->
            <div v-if="!events.length" class="flex flex-col items-center justify-center py-24 text-center border rounded-lg bg-white shadow-sm">
                <LayoutTemplate class="h-12 w-12 text-muted-foreground mb-4" />
                <h3 class="text-lg font-semibold">No events found</h3>
                <p class="text-sm text-muted-foreground mt-1">Create an event first before managing seats.</p>
            </div>

            <!-- Case 2: Events exist, but filters returned 0 matches -->
            <div v-else-if="filteredEvents.length === 0" class="flex flex-col items-center justify-center py-24 text-center border rounded-lg bg-white shadow-sm">
                <LayoutTemplate class="h-12 w-12 text-muted-foreground mb-4" />
                <h3 class="text-lg font-semibold">No matching events</h3>
                <p class="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
            </div>

            <!-- Case 3: Display filtered list -->
            <div v-else class="rounded-lg border shadow-sm bg-white">
                <Table>
                    <TableHeader class="sticky top-0 bg-white z-10">
                        <TableRow>
                            <TableHead @click="sortBy('title')" class="cursor-pointer hover:bg-muted/50 select-none">
                                <div class="flex items-center">
                                    Event
                                    <ArrowUp v-if="sortField === 'title' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                    <ArrowDown v-else-if="sortField === 'title' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                    <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                </div>
                            </TableHead>
                            <TableHead @click="sortBy('seat_limit')" class="cursor-pointer hover:bg-muted/50 select-none">
                                <div class="flex items-center">
                                    Seat Limit
                                    <ArrowUp v-if="sortField === 'seat_limit' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                    <ArrowDown v-else-if="sortField === 'seat_limit' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                    <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                                </div>
                            </TableHead>
                            <TableHead @click="sortBy('seat_count')" class="cursor-pointer hover:bg-muted/50 select-none">
                                <div class="flex items-center">
                                    Seats Added
                                    <ArrowUp v-if="sortField === 'seat_count' && sortDirection === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                    <ArrowDown v-else-if="sortField === 'seat_count' && sortDirection === 'desc'" class="w-3.5 h-3.5 ml-1" />
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
                            <TableHead class="select-none">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="event in paginatedItem" :key="event.eventID">
                            <TableCell class="font-medium">{{ event.title }}</TableCell>
                            <TableCell>{{ event.seat_limit ?? '—' }}</TableCell>
                            <TableCell>{{ event.seat_count }}</TableCell>
                            <TableCell>
                                <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                    :class="event.has_seats ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                                    {{ event.status }}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link :href="`/events/${event.eventID}/seats`">
                                    <Button size="sm" variant="outline" class="bg-yellow-100 border-yellow-400 text-black cursor-pointer hover:bg-yellow-200 hover:text-black">
                                        <LayoutTemplate class="h-3.5 w-3.5 mr-1.5 text-black" />
                                        Manage Seats
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <!-- Modern Premium Footer Pagination Bar -->
                <div class="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 rounded-b-lg">
                    <!-- Left Side: Dynamic Entries Summary -->
                    <div class="text-sm text-slate-500 font-medium">
                        Showing <span class="font-semibold text-slate-800">{{ showingStart }}</span> to 
                        <span class="font-semibold text-slate-800">{{ showingEnd }}</span> of 
                        <span class="font-semibold text-slate-800">{{ totalItems }}</span> events
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
                                    :total="totalItems"
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
        </template>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { LayoutTemplate, Loader2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps({
    events: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Seat Management', href: '/seats' }],
    },
});

const search = ref('');
const status = ref('all');

// Applied state to trigger filtering only on button click or enter key
const activeSearch = ref('');
const activeStatus = ref('all');

const isLoading = ref(false);

// Computed property to perform lightning-fast client-side filtering
const filteredEvents = computed(() => {
    return props.events.filter(event => {
        // Filter by status
        if (activeStatus.value && activeStatus.value !== 'all') {
            const statusMap = {
                seatsadded: 'Seats Added',
                noseats: 'No Seats'
            };
            if (event.status !== statusMap[activeStatus.value]) return false;
        }

        // Filter by search query
        if (activeSearch.value) {
            const query = activeSearch.value.toLowerCase().trim();
            const title = event.title?.toLowerCase() || '';
            const seatLimit = event.seat_limit?.toString() || '';
            const seatCount = event.seat_count?.toString() || '';

            return title.includes(query) || 
                   seatLimit.includes(query) || 
                   seatCount.includes(query);
        }

        return true;
    });
});

function applyFilters() {
    isLoading.value = true;
    // Simulate query loading duration for premium UX feel
    setTimeout(() => {
        activeSearch.value = search.value;
        activeStatus.value = status.value;
        currentPage.value = 1; // Reset to page 1 for new search
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
        currentPage.value = 1; // Reset to page 1 on filter reset
        isLoading.value = false;
    }, 300);
}


// PAGINATION & SORTING

const currentPage = ref(1);
const itemPerPage = ref(5);
const sortField = ref('');
const sortDirection = ref('asc');

function sortBy(field) {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }
}

const sortedEvents = computed(() => {
    let result = [...filteredEvents.value];

    if (!sortField.value) return result;

    result.sort((a, b) => {
        let valA, valB;

        switch (sortField.value) {
            case 'title':
                valA = a.title || '';
                valB = b.title || '';
                break;
            case 'seat_limit':
                valA = a.seat_limit || 0;
                valB = b.seat_limit || 0;
                break;
            case 'seat_count':
                valA = a.seat_count || 0;
                valB = b.seat_count || 0;
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


const totalItems = computed(() => sortedEvents.value.length);

const paginatedItem = computed(() => {
    const startIndex = (currentPage.value - 1) * itemPerPage.value;
    const endIndex = startIndex + itemPerPage.value;
    return sortedEvents.value.slice(startIndex, endIndex);
})

const showingStart = computed(() => {
    if (totalItems.value === 0) return 0;
    return (currentPage.value - 1) * itemPerPage.value + 1;
});

const showingEnd = computed(() => {
    return Math.min(currentPage.value * itemPerPage.value, totalItems.value);
});

watch(itemPerPage, () => {
    currentPage.value = 1;
});




</script>
