<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">My Event Proposals</h1>
            <p class="text-sm text-muted-foreground">Manage and track your submitted event proposals.</p>
        </div>
        <Link href="/my-proposals/create">
            <Button size="sm">
                <Plus class="w-4 h-4 mr-1" />
                New Proposal
            </Button>
        </Link>
    </div>

    <div v-if="!proposals.length" class="flex flex-col items-center justify-center py-24 text-center">
        <FileText class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No proposals yet</h3>
        <p class="text-sm text-muted-foreground mt-1">Submit your first event proposal to get approval.</p>
        <Link href="/my-proposals/create" class="mt-4">
            <Button variant="outline">Submit a Proposal</Button>
        </Link>
    </div>

    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Proposal Title</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="prop in proposals" :key="prop.proposalID">
                        <TableCell class="font-medium">{{ prop.title }}</TableCell>
                        <TableCell class="text-muted-foreground">{{ prop.date }} · {{ prop.time }}</TableCell>
                        <TableCell class="text-muted-foreground">{{ prop.location }}</TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                                :class="{
                                    'bg-green-100 text-green-700': prop.status === 'approved',
                                    'bg-yellow-100 text-yellow-700': prop.status === 'pending',
                                    'bg-red-100 text-red-700': prop.status === 'rejected',
                                }">
                                {{ prop.status }}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { Plus, FileText } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'My Proposals', href: '/my-proposals' }],
    },
});

defineProps({
    proposals: { type: Array, default: () => [] }
});
</script>
