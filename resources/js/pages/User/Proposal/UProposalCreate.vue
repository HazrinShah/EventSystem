<template>
    <div class="flex items-center gap-4 border-b px-6 py-4">
        <Link href="/my-proposals">
            <Button variant="outline" size="icon" class="h-8 w-8">
                <ArrowLeft class="w-4 h-4" />
            </Button>
        </Link>
        <div>
            <h1 class="text-xl font-semibold">Submit New Proposal</h1>
            <p class="text-sm text-muted-foreground">Fill in the details for your new event to get administrative approval.</p>
        </div>
    </div>

    <div class="p-6">
        <div class="rounded-lg border bg-white shadow-sm">
            <div class="p-6 sm:p-8">
                <form @submit.prevent="submit" class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        <div class="sm:col-span-2">
                            <Label class="mb-2 block text-sm font-medium">Event Title</Label>
                            <Input v-model="form.title" type="text" placeholder="E.g. Annual Tech Symposium" required />
                        </div>
                        
                        <div class="sm:col-span-2">
                            <Label class="mb-2 block text-sm font-medium">Description</Label>
                            <textarea v-model="form.description" rows="4" class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required></textarea>
                        </div>

                        <div>
                            <Label class="mb-2 block text-sm font-medium">Date</Label>
                            <Input v-model="form.date" type="date" required />
                        </div>
                        
                        <div>
                            <Label class="mb-2 block text-sm font-medium">Time</Label>
                            <Input v-model="form.time" type="time" required />
                        </div>
                        
                        <div class="sm:col-span-2">
                            <Label class="mb-2 block text-sm font-medium">Location</Label>
                            <Input v-model="form.location" type="text" placeholder="E.g. Main Auditorium" required />
                        </div>

                        <div>
                            <Label class="mb-2 block text-sm font-medium">Cover Image <span class="text-muted-foreground font-normal">(Optional)</span></Label>
                            <Input @input="form.image = $event.target.files[0]" type="file" accept="image/*" class="cursor-pointer" />
                        </div>
                        
                        <div>
                            <Label class="mb-2 block text-sm font-medium">Event Layout Image <span class="text-muted-foreground font-normal">(Optional)</span></Label>
                            <Input @input="form.layoutImage = $event.target.files[0]" type="file" accept="image/*" class="cursor-pointer" />
                        </div>
                        
                        <div>
                            <Label class="mb-2 block text-sm font-medium">Seat Limit <span class="text-muted-foreground font-normal">(0 = unlimited)</span></Label>
                            <Input v-model.number="form.seat_limit" type="number" min="0" placeholder="0" />
                        </div>

                        <div class="sm:col-span-2 mt-2 p-5 rounded-lg border bg-slate-50">
                            <Label class="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
                                <FileCheck class="w-4 h-4" /> Proof of Approval Document
                            </Label>
                            <p class="text-xs text-slate-500 mb-3">Please upload an official approval letter or document (PDF, JPG, PNG).</p>
                            <Input @input="form.approval_document = $event.target.files[0]" type="file" accept=".pdf,.jpg,.jpeg,.png" class="bg-white cursor-pointer" required />
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                        <Link href="/my-proposals">
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" :disabled="form.processing" class="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <span v-if="form.processing">Submitting...</span>
                            <span v-else>Submit Proposal</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm, Link } from '@inertiajs/vue3';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileCheck } from 'lucide-vue-next';

const form = useForm({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    seat_limit: '',
    approval_document: null,
    image: null,
    layoutImage: null,
});

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'My Proposals', href: '/my-proposals' },
            { title: 'New Proposal', href: '/my-proposals/create' }
        ],
    },
});

const submit = () => {
    form.post('/my-proposals');
};
</script>
