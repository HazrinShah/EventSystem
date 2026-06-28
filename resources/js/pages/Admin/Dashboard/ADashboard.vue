<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import { Calendar, Users, CheckCircle, Clock, Filter, TicketCheck } from 'lucide-vue-next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: '/dashboard',
            },
        ],
    },
});

const props = defineProps({
    stats: {
        type: Object,
        default: () => ({
            myEvents: 0,
            totalRsvps: 0,
            pendingRsvps: 0,
            confirmedRsvps: 0,
        }),
    },
    rsvpsData: {
        type: Array,
        default: () => [],
    },
    eventsList: {
        type: Array,
        default: () => [],
    }
});

// Filters
const selectedRange = ref(7); // 7, 15, or 30 days
const selectedEventId = ref('all');
const selectedStatus = ref('all');

// Helper to generate the array of dates for the range
const getDateArray = (days: number) => {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};

// Filtered RSVPs
const filteredRsvps = computed(() => {
    return props.rsvpsData.filter((rsvp: any) => {
        // Event filter
        if (selectedEventId.value !== 'all' && rsvp.eventID !== Number(selectedEventId.value)) {
            return false;
        }
        // Status filter
        if (selectedStatus.value !== 'all' && rsvp.status !== selectedStatus.value) {
            return false;
        }
        return true;
    });
});

// Aggregate data by date
const chartData = computed(() => {
    const dates = getDateArray(selectedRange.value);
    
    const countsByDate = filteredRsvps.value.reduce((acc: Record<string, number>, rsvp: any) => {
        if (rsvp.date && dates.includes(rsvp.date)) {
            acc[rsvp.date] = (acc[rsvp.date] || 0) + (rsvp.pax || 1);
        }
        return acc;
    }, {});

    return dates.map(date => ({
        date,
        formattedDate: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        count: countsByDate[date] || 0
    }));
});

// Period summaries
const periodTotalRsvps = computed(() => {
    return chartData.value.reduce((sum, item) => sum + item.count, 0);
});

const statusBreakdown = computed(() => {
    const counts = { confirmed: 0, pending: 0, cancelled: 0 };
    filteredRsvps.value.forEach((rsvp: any) => {
        const dates = getDateArray(selectedRange.value);
        if (rsvp.date && dates.includes(rsvp.date)) {
            const statusKey = rsvp.status as keyof typeof counts;
            if (statusKey in counts) {
                counts[statusKey] += (rsvp.pax || 1);
            }
        }
    });
    return counts;
});

// Max count for scaling
const maxCount = computed(() => {
    const counts = chartData.value.map(d => d.count);
    const max = Math.max(...counts, 0);
    return max > 0 ? Math.ceil(max * 1.15) : 5; // Scale up slightly, fallback to 5
});

// SVG dimensions
const svgWidth = 800;
const svgHeight = 250;
const padding = { top: 20, right: 30, bottom: 40, left: 40 };

const chartWidth = svgWidth - padding.left - padding.right;
const chartHeight = svgHeight - padding.top - padding.bottom;

// Compute points for SVG path
const points = computed(() => {
    const data = chartData.value;
    if (data.length === 0) return [];
    
    return data.map((d, index) => {
        const x = padding.left + (index / (data.length - 1)) * chartWidth;
        const y = padding.top + chartHeight - (d.count / maxCount.value) * chartHeight;
        return { x, y, data: d };
    });
});

const linePath = computed(() => {
    const pts = points.value;
    if (pts.length === 0) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
});

const areaPath = computed(() => {
    const pts = points.value;
    if (pts.length === 0) return '';
    const line = linePath.value;
    const startX = pts[0].x;
    const endX = pts[pts.length - 1].x;
    const baseY = padding.top + chartHeight;
    return `${line} L ${endX} ${baseY} L ${startX} ${baseY} Z`;
});

// Y-axis grid lines (4 lines)
const yGridLines = computed(() => {
    const lines = [];
    const step = maxCount.value / 3;
    for (let i = 0; i <= 3; i++) {
        const val = Math.round(step * i);
        const y = padding.top + chartHeight - (val / maxCount.value) * chartHeight;
        lines.push({ val, y });
    }
    return lines;
});

// X-axis label positioning
const xLabelStep = computed(() => {
    const len = chartData.value.length;
    if (len <= 7) return 1;
    if (len <= 15) return 2;
    return 5;
});

// Tooltip state
const activePointIndex = ref<number | null>(null);
const tooltipData = computed(() => {
    if (activePointIndex.value === null || !points.value[activePointIndex.value]) return null;
    return points.value[activePointIndex.value];
});
</script>

<template>
    <Head title="Admin Dashboard" />

    <div class="flex h-full flex-1 flex-col gap-6 p-6">
        <!-- Header Welcome Section -->
        <div class="flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                Organizer Dashboard
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
                Welcome back! Here's a live status of your events and active RSVPs.
            </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <!-- My Events Card -->
            <Card class="bg-white border-gray-200 dark:border-gray-800">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-foreground/80">My Events</CardTitle>
                    <div class="p-2 bg-indigo-500/20 rounded-full">
                        <Calendar class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ stats.myEvents }}</div>
                    <p class="text-xs text-muted-foreground mt-1">Total events managed by you</p>
                </CardContent>
            </Card>

            <!-- Total RSVPs Card -->
            <Card class="bg-white border-gray-200 dark:border-gray-800">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-foreground/80">Total RSVPs</CardTitle>
                    <div class="p-2 bg-blue-500/20 rounded-full">
                        <Users class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ stats.totalRsvps }}</div>
                    <p class="text-xs text-muted-foreground mt-1">Total response count across events</p>
                </CardContent>
            </Card>

            <!-- Confirmed RSVPs Card -->
            <Card class="bg-white border-gray-200 dark:border-gray-800">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-foreground/80">Confirmed RSVPs</CardTitle>
                    <div class="p-2 bg-emerald-500/20 rounded-full">
                        <CheckCircle class="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ stats.confirmedRsvps }}</div>
                    <p class="text-xs text-muted-foreground mt-1">Successfully confirmed guests</p>
                </CardContent>
            </Card>

            <!-- Pending RSVPs Card -->
            <Card class="bg-white border-gray-200 dark:border-gray-800">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium text-foreground/80">Pending RSVPs</CardTitle>
                    <div class="p-2 bg-amber-500/20 rounded-full">
                        <Clock class="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div class="text-3xl font-bold">{{ stats.pendingRsvps }}</div>
                    <p class="text-xs text-muted-foreground mt-1">RSVPs awaiting seat allocation</p>
                </CardContent>
            </Card>
        </div>

        <!-- Chart Section -->
        <Card class="bg-white border-gray-200 dark:border-gray-800">
            <CardHeader class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
                <div>
                    <CardTitle class="text-lg font-semibold flex items-center gap-2">
                        RSVP Registration Trends
                    </CardTitle>
                    <CardDescription>Visualizing RSVP activity and trends for your events</CardDescription>
                </div>

                <!-- Filters -->
                <div class="flex flex-wrap items-center gap-3">
                    <!-- Event Filter -->
                    <div class="flex items-center gap-1.5">
                        <Filter class="w-4 h-4 text-slate-400" />
                        <select v-model="selectedEventId" class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                            <option value="all">All Events</option>
                            <option v-for="event in eventsList" :key="event.eventID" :value="event.eventID">
                                {{ event.title }}
                            </option>
                        </select>
                    </div>

                    <!-- Status Filter -->
                    <select v-model="selectedStatus" class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <!-- Range selector buttons -->
                    <div class="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50/50">
                        <button 
                            @click="selectedRange = 7"
                            :class="[selectedRange === 7 ? 'bg-white shadow-sm font-semibold text-slate-800' : 'text-slate-500 hover:text-slate-800']"
                            class="px-3 py-1 text-xs rounded-md transition-all cursor-pointer"
                        >
                            7D
                        </button>
                        <button 
                            @click="selectedRange = 15"
                            :class="[selectedRange === 15 ? 'bg-white shadow-sm font-semibold text-slate-800' : 'text-slate-500 hover:text-slate-800']"
                            class="px-3 py-1 text-xs rounded-md transition-all cursor-pointer"
                        >
                            15D
                        </button>
                        <button 
                            @click="selectedRange = 30"
                            :class="[selectedRange === 30 ? 'bg-white shadow-sm font-semibold text-slate-800' : 'text-slate-500 hover:text-slate-800']"
                            class="px-3 py-1 text-xs rounded-md transition-all cursor-pointer"
                        >
                            30D
                        </button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <!-- Chart Area -->
                <div class="relative w-full overflow-x-auto min-h-[250px] flex items-center justify-center">
                    <svg :viewBox="`0 0 ${svgWidth} ${svgHeight}`" width="100%" class="min-w-[600px] overflow-visible">
                        <!-- Definitions for Gradients -->
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.25" />
                                <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.0" />
                            </linearGradient>
                        </defs>

                        <!-- Horizontal Grid Lines & Y-axis labels -->
                        <g>
                            <line 
                                v-for="line in yGridLines" 
                                :key="line.val"
                                :x1="padding.left" 
                                :y1="line.y" 
                                :x2="svgWidth - padding.right" 
                                :y2="line.y" 
                                stroke="#f1f5f9" 
                                stroke-width="1.5"
                            />
                            <text 
                                v-for="line in yGridLines" 
                                :key="`label-${line.val}`"
                                :x="padding.left - 10" 
                                :y="line.y + 4" 
                                text-anchor="end" 
                                fill="#94a3b8" 
                                class="text-[10px] font-medium font-sans"
                            >
                                {{ line.val }}
                            </text>
                        </g>

                        <!-- Empty State message inside SVG if no data -->
                        <g v-if="periodTotalRsvps === 0">
                            <text :x="svgWidth / 2" :y="svgHeight / 2" text-anchor="middle" fill="#94a3b8" class="text-sm font-medium">
                                No registration records found in this range
                            </text>
                        </g>

                        <!-- Paths (only if data exists) -->
                        <g v-else>
                            <!-- Fill Area -->
                            <path :d="areaPath" fill="url(#chartGradient)" />

                            <!-- Stroke Line -->
                            <path :d="linePath" fill="none" stroke="#4f46e5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

                            <!-- Interactive Interactive Overlay & Points -->
                            <circle 
                                v-for="(p, index) in points" 
                                :key="index"
                                :cx="p.x" 
                                :cy="p.y" 
                                :r="activePointIndex === index ? 6 : 4" 
                                :fill="activePointIndex === index ? '#4f46e5' : '#ffffff'" 
                                stroke="#4f46e5" 
                                :stroke-width="activePointIndex === index ? 3 : 2"
                                class="transition-all duration-150 cursor-pointer"
                                @mouseenter="activePointIndex = index"
                                @mouseleave="activePointIndex = null"
                            />
                        </g>

                        <!-- X-Axis Labels -->
                        <g>
                            <text 
                                v-for="(d, index) in chartData" 
                                :key="index"
                                v-show="index % xLabelStep === 0"
                                :x="padding.left + (index / (chartData.length - 1)) * chartWidth" 
                                :y="svgHeight - 15" 
                                text-anchor="middle" 
                                fill="#94a3b8" 
                                class="text-[10px] font-medium font-sans"
                            >
                                {{ d.formattedDate }}
                            </text>
                        </g>
                    </svg>

                    <!-- HTML Tooltip over SVG -->
                    <div 
                        v-if="tooltipData"
                        :style="{
                            left: `${(tooltipData.x / svgWidth) * 100}%`,
                            top: `${(tooltipData.y / svgHeight) * 100 - 65}px`
                        }"
                        class="absolute bg-slate-900 text-white rounded-lg px-2.5 py-1.5 text-xs shadow-xl pointer-events-none transform -translate-x-1/2 flex flex-col gap-0.5 border border-slate-800 z-10 font-sans"
                    >
                        <span class="font-semibold text-[10px] text-slate-400">{{ tooltipData.data.formattedDate }}</span>
                        <span class="font-bold text-sm text-indigo-300">{{ tooltipData.data.count }} <span class="text-[10px] font-medium text-white">Pax</span></span>
                    </div>
                </div>

                <!-- Chart Footer Summary -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 mt-6 border-t border-slate-100">
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Period Total Pax</span>
                        <span class="text-2xl font-bold mt-1 text-slate-800">{{ periodTotalRsvps }}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status Overview</span>
                        <div class="flex items-center gap-3 mt-2 text-xs font-medium">
                            <span class="flex items-center gap-1 text-emerald-600">
                                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Confirmed ({{ statusBreakdown.confirmed }})
                            </span>
                            <span class="flex items-center gap-1 text-yellow-600">
                                <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Pending ({{ statusBreakdown.pending }})
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
