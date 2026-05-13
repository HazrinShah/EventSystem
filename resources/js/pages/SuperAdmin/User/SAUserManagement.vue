<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">Admin Management</h1>
            <p class="text-sm text-muted-foreground">Create, update and deactivate admin accounts</p>
        </div>
        <Button size="sm" @click="openCreateDialog">
            <Plus class="h-4 w-4 mr-2" />Add Admin
        </Button>
    </div>

    <!-- Empty state -->
    <div v-if="!admins.length" class="flex flex-col items-center justify-center py-24 text-center">
        <Users class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No admins yet</h3>
        <p class="text-sm text-muted-foreground mt-1 mb-4">Create an admin account to get started.</p>
        <Button size="sm" @click="openCreateDialog"><Plus class="h-4 w-4 mr-2" />Add Admin</Button>
    </div>

    <!-- Table -->
    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="admin in admins" :key="admin.userID">
                        <TableCell class="font-medium">{{ admin.name }}</TableCell>
                        <TableCell>{{ admin.email }}</TableCell>
                        <TableCell>{{ admin.phone ?? '—' }}</TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                :class="{
                                    'bg-purple-100 text-purple-700': admin.role === 'superadmin',
                                    'bg-blue-100 text-blue-700': admin.role === 'admin',
                                }">
                                {{ admin.role }}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                :class="admin.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                                {{ admin.is_active ? 'Active' : 'Inactive' }}
                            </span>
                        </TableCell>
                        <TableCell>
                            <div class="flex gap-2">
                                <Button size="sm" variant="secondary" @click="openEditDialog(admin)">
                                    <Pencil class="h-3.5 w-3.5" />
                                </Button>
                                <Button v-if="admin.is_active" size="sm" variant="destructive" @click="deactivate(admin)">
                                    Deactivate
                                </Button>
                                <Button v-else size="sm" variant="outline" @click="reactivate(admin)">
                                    Reactivate
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>

    <!-- Create Dialog -->
    <Dialog :open="isCreateDialogOpen" @update:open="val => !val && closeCreateDialog()">
        <DialogContent class="max-w-sm">
            <DialogHeader>
                <DialogTitle>Create Admin</DialogTitle>
                <DialogDescription>Add a new admin or super admin account.</DialogDescription>
            </DialogHeader>
            <form @submit.prevent="submitCreate" class="space-y-3 pt-2">
                <div class="space-y-1.5">
                    <Label>Name</Label>
                    <Input v-model="createForm.name" type="text" required />
                    <span v-if="createForm.errors.name" class="text-xs text-red-500">{{ createForm.errors.name }}</span>
                </div>
                <div class="space-y-1.5">
                    <Label>Email</Label>
                    <Input v-model="createForm.email" type="email" required />
                    <span v-if="createForm.errors.email" class="text-xs text-red-500">{{ createForm.errors.email }}</span>
                </div>
                <div class="space-y-1.5">
                    <Label>Phone</Label>
                    <Input v-model="createForm.phone" type="text" />
                </div>
                <div class="space-y-1.5">
                    <Label>Role</Label>
                    <select v-model="createForm.role" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <div class="space-y-1.5">
                    <Label>Password</Label>
                    <Input v-model="createForm.password" type="password" required />
                    <span v-if="createForm.errors.password" class="text-xs text-red-500">{{ createForm.errors.password }}</span>
                </div>
                <DialogFooter class="pt-2">
                    <Button type="button" variant="outline" @click="closeCreateDialog">Cancel</Button>
                    <Button type="submit" :disabled="createForm.processing">
                        {{ createForm.processing ? 'Creating...' : 'Create' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog :open="isEditDialogOpen" @update:open="val => !val && closeEditDialog()">
        <DialogContent class="max-w-sm">
            <DialogHeader>
                <DialogTitle>Edit Admin</DialogTitle>
                <DialogDescription>Update admin account details.</DialogDescription>
            </DialogHeader>
            <form @submit.prevent="submitEdit" class="space-y-3 pt-2">
                <div class="space-y-1.5">
                    <Label>Name</Label>
                    <Input v-model="editForm.name" type="text" required />
                    <span v-if="editForm.errors.name" class="text-xs text-red-500">{{ editForm.errors.name }}</span>
                </div>
                <div class="space-y-1.5">
                    <Label>Email</Label>
                    <Input v-model="editForm.email" type="email" required />
                    <span v-if="editForm.errors.email" class="text-xs text-red-500">{{ editForm.errors.email }}</span>
                </div>
                <div class="space-y-1.5">
                    <Label>Phone</Label>
                    <Input v-model="editForm.phone" type="text" />
                </div>
                <div class="space-y-1.5">
                    <Label>Role</Label>
                    <select v-model="editForm.role" class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <DialogFooter class="pt-2">
                    <Button type="button" variant="outline" @click="closeEditDialog">Cancel</Button>
                    <Button type="submit" :disabled="editForm.processing">
                        {{ editForm.processing ? 'Saving...' : 'Save Changes' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import { Plus, Pencil, Users } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

defineProps({
    admins: { type: Array, default: () => [] },
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Admin Management', href: '/admin-users' }],
    },
});

// Create
const isCreateDialogOpen = ref(false);
const createForm = useForm({ name: '', email: '', phone: '', role: 'admin', password: '' });

function openCreateDialog() { isCreateDialogOpen.value = true; }
function closeCreateDialog() { isCreateDialogOpen.value = false; createForm.reset(); }
function submitCreate() {
    createForm.post('/admin-users', { onSuccess: closeCreateDialog });
}

// Edit
const isEditDialogOpen = ref(false);
const editingUserID = ref(null);
const editForm = useForm({ name: '', email: '', phone: '', role: 'admin' });

function openEditDialog(admin) {
    editingUserID.value = admin.userID;
    Object.assign(editForm, { name: admin.name, email: admin.email, phone: admin.phone ?? '', role: admin.role });
    isEditDialogOpen.value = true;
}
function closeEditDialog() { isEditDialogOpen.value = false; editForm.reset(); }
function submitEdit() {
    editForm.post(`/admin-users/${editingUserID.value}`, { onSuccess: closeEditDialog });
}

// Deactivate / Reactivate
function deactivate(admin) {
    if (!confirm(`Deactivate ${admin.name}? They will be logged out and cannot log in.`)) return;
    router.post(`/admin-users/${admin.userID}/deactivate`);
}
function reactivate(admin) {
    if (!confirm(`Reactivate ${admin.name}?`)) return;
    router.post(`/admin-users/${admin.userID}/reactivate`);
}
</script>
