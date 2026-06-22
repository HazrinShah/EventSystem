<script setup>
import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import { FileText, CheckCircle, XCircle, Eye, CalendarDays, Clock, MapPin, User as UserIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Proposals Management', href: '/admin/proposals' }],
    },
});

defineProps({
    proposals: { type: Array, default: () => [] }
});

const approveModalOpen = ref(false);
const rejectModalOpen = ref(false);
const selectedProposal = ref(null);

const approveForm = useForm({
    valid_from: '',
    valid_until: '',
});

const rejectForm = useForm({
    admin_remarks: '',
});

const openApproveModal = (prop) => {
    selectedProposal.value = prop;
    // Set default dates: from today to event date + 2 days
    const today = new Date().toISOString().split('T')[0];
    const eventDate = new Date(prop.date);
    eventDate.setDate(eventDate.getDate() + 2);
    const validUntil = eventDate.toISOString().split('T')[0];

    approveForm.valid_from = today;
    approveForm.valid_until = validUntil;
    approveModalOpen.value = true;
};

const openRejectModal = (prop) => {
    selectedProposal.value = prop;
    rejectForm.admin_remarks = '';
    rejectModalOpen.value = true;
};

const submitApprove = () => {
    if(!selectedProposal.value) return;
    approveForm.post(`/admin/proposals/${selectedProposal.value.proposalID}/approve`, {
        onSuccess: () => {
            approveModalOpen.value = false;
        }
    });
};

const submitReject = () => {
    if(!selectedProposal.value) return;
    rejectForm.post(`/admin/proposals/${selectedProposal.value.proposalID}/reject`, {
        onSuccess: () => {
            rejectModalOpen.value = false;
        }
    });
};
</script>

<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Event Proposals</h1>
            <p class="text-sm text-muted-foreground">Manage and review event proposals from users.</p>
        </div>
    </div>

    <div v-if="!proposals.length" class="flex flex-col items-center justify-center py-24 text-center">
        <FileText class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No proposals found</h3>
        <p class="text-sm text-muted-foreground mt-1">There are no pending proposals to review.</p>
    </div>

    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm bg-white overflow-hidden">
            <Table>
                <TableHeader class="bg-slate-50">
                    <TableRow>
                        <TableHead>Proposer</TableHead>
                        <TableHead>Proposal Details</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="prop in proposals" :key="prop.proposalID">
                        <TableCell>
                            <div class="font-medium text-slate-900">{{ prop.user?.name }}</div>
                            <div class="text-xs text-slate-500">{{ prop.user?.email }}</div>
                        </TableCell>
                        <TableCell>
                            <div class="font-bold text-slate-900 mb-1">{{ prop.title }}</div>
                            <div class="flex items-center gap-3 text-xs text-slate-600">
                                <span class="flex items-center gap-1"><CalendarDays class="w-3 h-3"/> {{ prop.date }}</span>
                                <span class="flex items-center gap-1"><Clock class="w-3 h-3"/> {{ prop.time }}</span>
                                <span class="flex items-center gap-1"><MapPin class="w-3 h-3"/> {{ prop.location }}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <a :href="`/storage/${prop.approval_document}`" target="_blank" class="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 transition-colors">
                                <Eye class="w-3 h-3 mr-1.5" /> View Doc
                            </a>
                        </TableCell>
                        <TableCell>
                            <Badge 
                                :class="[
                                    'uppercase px-2.5 py-1 text-[10px] tracking-wider font-bold shadow-sm rounded-full',
                                    prop.status === 'approved' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 
                                    prop.status === 'rejected' ? 'bg-rose-500 hover:bg-rose-600 text-white' : 
                                    'bg-amber-400 hover:bg-amber-500 text-amber-950'
                                ]"
                            >
                                {{ prop.status }}
                            </Badge>
                        </TableCell>
                        <TableCell class="text-right">
                            <div class="flex justify-end gap-2" v-if="prop.status === 'pending'">
                                <Button size="sm" variant="outline" class="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800" @click="openApproveModal(prop)">
                                    <CheckCircle class="w-4 h-4 mr-1.5" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" class="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:text-rose-800" @click="openRejectModal(prop)">
                                    <XCircle class="w-4 h-4 mr-1.5" /> Reject
                                </Button>
                            </div>
                            <div v-else class="text-xs text-slate-400 font-medium italic">
                                Action taken
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>

    <!-- Approve Modal -->
    <AlertDialog :open="approveModalOpen" @update:open="approveModalOpen = $event">
        <AlertDialogContent>
            <form @submit.prevent="submitApprove">
                <AlertDialogHeader>
                    <AlertDialogTitle>Approve Proposal & Create Event</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to approve <strong>{{ selectedProposal?.title }}</strong>. This will automatically create an Event and assign Organizer mode to the user during the validity period below.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div class="grid gap-4 py-4">
                    <div class="grid gap-2">
                        <Label>Organizer Access - Valid From</Label>
                        <Input v-model="approveForm.valid_from" type="date" required />
                    </div>
                    <div class="grid gap-2">
                        <Label>Organizer Access - Valid Until</Label>
                        <Input v-model="approveForm.valid_until" type="date" required />
                    </div>
                </div>
                
                <AlertDialogFooter>
                    <AlertDialogCancel type="button" @click="approveModalOpen = false">Cancel</AlertDialogCancel>
                    <Button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white" :disabled="approveForm.processing">
                        Confirm Approval
                    </Button>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    </AlertDialog>

    <!-- Reject Modal -->
    <AlertDialog :open="rejectModalOpen" @update:open="rejectModalOpen = $event">
        <AlertDialogContent>
            <form @submit.prevent="submitReject">
                <AlertDialogHeader>
                    <AlertDialogTitle>Reject Proposal</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please provide a reason for rejecting <strong>{{ selectedProposal?.title }}</strong>. This will be visible to the user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div class="grid gap-4 py-4">
                    <div class="grid gap-2">
                        <Label>Rejection Remarks</Label>
                        <textarea v-model="rejectForm.admin_remarks" rows="3" class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required placeholder="State the reason for rejection..."></textarea>
                    </div>
                </div>
                
                <AlertDialogFooter>
                    <AlertDialogCancel type="button" @click="rejectModalOpen = false">Cancel</AlertDialogCancel>
                    <Button type="submit" variant="destructive" :disabled="rejectForm.processing">
                        Reject Proposal
                    </Button>
                </AlertDialogFooter>
            </form>
        </AlertDialogContent>
    </AlertDialog>

</template>
