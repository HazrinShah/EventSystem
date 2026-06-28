<template>
    <div class="flex items-center justify-between border-b px-6 py-4">
        <div>
            <h1 class="text-xl font-semibold">User Management</h1>
            <p class="text-sm text-muted-foreground">Create, update and deactivate user accounts</p>
        </div>
        <Button size="sm" @click="openCreateDialog" class="bg-green-600 hover:bg-green-600 cursor-pointer text-white">
            <Plus class="h-4 w-4 mr-2" />Add User
        </Button>
    </div>

    <div class="p-6 pb-0 space-y-6">
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500">Filter & Search</h2>
            <div class="flex flex-wrap items-center gap-4 w-full">

                <div class="relative w-full sm:max-w-xs">
                    <Input 
                        v-model="search"
                        type="text"
                        placeholder="Search by name or email..." 
                        @keyup.enter="applyFilters"
                        :disabled="isLoading"
                    />
                </div>

                <div class="w-full sm:max-w-[180px]">
                     <Select v-model="role" :disabled="isLoading">
                        <SelectTrigger class="w-full cursor-pointer">
                            <SelectValue placeholder="All Roles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter Role</SelectLabel>
                                <SelectItem value="all" class="cursor-pointer">All Roles</SelectItem>
                                <SelectItem value="superadmin" class="cursor-pointer">Super Admin</SelectItem>
                                <SelectItem value="admin" class="cursor-pointer">Admin</SelectItem>
                                <SelectItem value="user" class="cursor-pointer">User</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div class="w-full sm:max-w-[180px]">
                     <Select v-model="status" :disabled="isLoading">
                        <SelectTrigger class="w-full cursor-pointer">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter Status</SelectLabel>
                                <SelectItem value="all" class="cursor-pointer">All Statuses</SelectItem>
                                <SelectItem value="active" class="cursor-pointer">Active</SelectItem>
                                <SelectItem value="inactive" class="cursor-pointer">Inactive</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button @click="applyFilters" :disabled="isLoading" class="w-full sm:max-w-[140px] cursor-pointer flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
                    <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                    <span>{{ isLoading ? 'Searching...' : 'Search' }}</span>
                </Button>

                <Button 
                    v-if="search || (status && status !== 'all') || (role && role !== 'all')"
                    @click="resetFilters"
                    :disabled="isLoading"
                    variant="ghost"
                    class="text-xs cursor-pointer bg-gray-200 hover:bg-gray-300"
                >
                    Reset
                </Button>
            </div>
        </div>
    </div>

    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="p-6">
        <div class="rounded-lg border shadow-sm bg-white overflow-hidden">
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
                    <TableRow v-for="i in 5" :key="i" class="animate-pulse">
                        <TableCell><div class="h-4 bg-slate-200 rounded w-24 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-32 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-20 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-16 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-16 my-2"></div></TableCell>
                        <TableCell><div class="h-4 bg-slate-200 rounded w-32 my-2"></div></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!admins.data || !admins.data.length" class="flex flex-col items-center justify-center py-24 text-center">
        <Users class="h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold">No users yet</h3>
        <p class="text-sm text-muted-foreground mt-1 mb-4">Create a user account to get started.</p>
        <Button size="sm" @click="openCreateDialog"><Plus class="h-4 w-4 mr-2" />Add User</Button>
    </div>

    <!-- Table -->
    <div v-else class="p-6">
        <div class="rounded-lg border shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead @click="sortBy('name')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Name
                                <ArrowUp v-if="filters.sort_field === 'name' && filters.sort_direction === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="filters.sort_field === 'name' && filters.sort_direction === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>                        
                        
                        <TableHead @click="sortBy('email')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Email
                                <ArrowUp v-if="filters.sort_field === 'email' && filters.sort_direction === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="filters.sort_field === 'email' && filters.sort_direction === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>

                        <TableHead @click="sortBy('phone')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Phone
                                <ArrowUp v-if="filters.sort_field === 'phone' && filters.sort_direction === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="filters.sort_field === 'phone' && filters.sort_direction === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>
                       
                        <TableHead @click="sortBy('role')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Role
                                <ArrowUp v-if="filters.sort_field === 'role' && filters.sort_direction === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="filters.sort_field === 'role' && filters.sort_direction === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>

                        <TableHead @click="sortBy('is_active')" class="cursor-pointer hover:bg-muted/50 select-none">
                            <div class="flex items-center">
                                Status
                                <ArrowUp v-if="filters.sort_field === 'is_active' && filters.sort_direction === 'asc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowDown v-else-if="filters.sort_field === 'is_active' && filters.sort_direction === 'desc'" class="w-3.5 h-3.5 ml-1" />
                                <ArrowUpDown v-else class="w-3.5 h-3.5 ml-1 text-gray-400" />
                            </div>
                        </TableHead>

                        <TableHead class="select-none">
                            <div class="flex items-center">
                                Actions
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="admin in admins.data" :key="admin.userID">
                        <TableCell class="font-medium">{{ admin.name }}</TableCell>
                        <TableCell>{{ admin.email }}</TableCell>
                        <TableCell>{{ admin.phone ?? '—' }}</TableCell>
                        <TableCell>
                            <span class="rounded-full px-2 py-0.5 text-xs font-medium"
                                :class="{
                                    'bg-purple-100 text-purple-700': admin.role === 'superadmin',
                                    'bg-blue-100 text-blue-700': admin.role === 'admin',
                                    'bg-emerald-100 text-emerald-700': admin.role === 'user',
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
                                <Button size="sm" variant="secondary" @click="openEditDialog(admin)" class="bg-blue-600 hover:bg-blue-600 cursor-pointer text-white">
                                    <Pencil class="h-3.5 w-3.5 text-white" />Edit
                                </Button>
                                <Button v-if="admin.is_active" size="sm" variant="destructive" @click="confirmDeactivate(admin)" class="bg-red-600 hover:bg-red-600 cursor-pointer text-white">
                                    <ShieldMinus class="h-3.5 w-3.5 text-white" />Deactivate
                                </Button>
                                <Button v-else size="sm" variant="outline" @click="confirmReactivate(admin)" class="bg-green-600 hover:bg-green-600 cursor-pointer text-white hover:text-white">
                                    <ShieldPlus class="h-3.5 w-3.5 text-white" />Reactivate
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 rounded-b-lg">
            <div class="text-sm text-slate-500 font-medium">
                Showing <span class="font-semibold text-slate-800">{{ admins.from || 0 }}</span> to 
                <span class="font-semibold text-slate-800">{{ admins.to || 0 }}</span> of 
                <span class="font-semibold text-slate-800">{{ admins.total }}</span> users
            </div>
            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 font-medium whitespace-nowrap">Items per page:</span>
                    <Select v-model="itemPerPage" class="cursor-pointer">
                        <SelectTrigger class="w-[70px] h-8 cursor-pointer bg-white border-slate-200 text-xs shadow-sm">
                            <SelectValue placeholder="10"/>
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
                        :page="admins.current_page"
                        @update:page="handlePageChange"
                        :items-per-page="Number(itemPerPage)" 
                        :total="admins.total"
                    >
                        <PaginationContent v-slot="{ items }" class="flex items-center gap-1.5">
                            <PaginationPrevious class="cursor-pointer hover:bg-slate-200 border border-slate-200 shadow-sm transition duration-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white" />
                            <template v-for="(item, index) in items" :key="index">
                                <PaginationItem
                                    v-if="item.type === 'page'"
                                    :value="item.value"
                                    :is-active="item.value === admins.current_page"
                                    class="cursor-pointer transition duration-200 rounded-lg text-xs font-semibold"
                                    :class="item.value === admins.current_page 
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

    <!-- Create Dialog -->
    <Dialog :open="isCreateDialogOpen" @update:open="val => !val && closeCreateDialog()">
        <DialogContent class="max-w-sm">
            <DialogHeader>
                <DialogTitle>Create User</DialogTitle>
                <DialogDescription>Add a new user, admin or super admin account.</DialogDescription>
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
                        <option value="user">User</option>
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
                    <Button type="button" variant="outline" @click="closeCreateDialog" class="bg-red-600 hover:bg-red-600 text-white cursor-pointer hover:text-white">Cancel</Button>
                    <Button type="submit" :disabled="createForm.processing" class="bg-green-600 hover:bg-green-600 text-white cursor-pointer">
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
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>Update user account details.</DialogDescription>
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
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <DialogFooter class="pt-2">
                    <Button type="button" variant="outline" @click="closeEditDialog" class="bg-red-600 hover:bg-red-600 cursor-pointer text-white">Cancel</Button>
                    <Button type="submit" :disabled="editForm.processing" class="bg-blue-600 hover:bg-blue-600 cursor-pointer text-white">
                        {{ editForm.processing ? 'Saving...' : 'Save Changes' }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>

    <!-- Deactivate Dialog -->
    <AlertDialog :open="isDeactivateDialogOpen" @update:open="val => !val && (isDeactivateDialogOpen = false)">
        <AlertDialogContent class="max-w-sm">
            <AlertDialogHeader>
                <AlertDialogTitle>Deactivate User</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to deactivate <strong>{{ selectedAdmin?.name }}</strong>? They will be logged out and cannot log in to the system.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="isDeactivateDialogOpen = false" class="bg-gray-100 hover:bg-gray-200 cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction @click="handleDeactivate" class="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                    Yes, Deactivate
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <!-- Reactivate Dialog -->
    <AlertDialog :open="isReactivateDialogOpen" @update:open="val => !val && (isReactivateDialogOpen = false)">
        <AlertDialogContent class="max-w-sm">
            <AlertDialogHeader>
                <AlertDialogTitle>Reactivate User</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to reactivate <strong>{{ selectedAdmin?.name }}</strong>? They will be able to log in and access the system.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="isReactivateDialogOpen = false" class="bg-gray-100 hover:bg-gray-200 cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction @click="handleReactivate" class="bg-green-600 text-white hover:bg-green-700 cursor-pointer">
                    Yes, Reactivate
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import { Plus, Pencil, Users, ShieldMinus, ShieldPlus, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const props = defineProps({
    admins: { type: Object, default: () => ({ data: [], links: [] }) },
    filters: { type: Object, default: () => ({ search: '' }) }
});

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'User Management', href: '/admin-users' }],
    },
});

// Create
const isCreateDialogOpen = ref(false);
const createForm = useForm({ name: '', email: '', phone: '', role: 'user', password: '' });

function openCreateDialog() { isCreateDialogOpen.value = true; }
function closeCreateDialog() { isCreateDialogOpen.value = false; createForm.reset(); }
function submitCreate() {
    createForm.post('/admin-users', { onSuccess: closeCreateDialog });
}

// Edit
const isEditDialogOpen = ref(false);
const editingUserID = ref(null);
const editForm = useForm({ name: '', email: '', phone: '', role: 'user' });

function openEditDialog(admin) {
    editingUserID.value = admin.userID;
    Object.assign(editForm, { name: admin.name, email: admin.email, phone: admin.phone ?? '', role: admin.role });
    isEditDialogOpen.value = true;
}
function closeEditDialog() { isEditDialogOpen.value = false; editForm.reset(); }
function submitEdit() {
    editForm.post(`/admin-users/${editingUserID.value}`, { onSuccess: closeEditDialog });
}

// Deactivate / Reactivate Dialogs State
const isDeactivateDialogOpen = ref(false);
const isReactivateDialogOpen = ref(false);
const selectedAdmin = ref(null);

function confirmDeactivate(admin) {
    selectedAdmin.value = admin;
    isDeactivateDialogOpen.value = true;
}

function confirmReactivate(admin) {
    selectedAdmin.value = admin;
    isReactivateDialogOpen.value = true;
}

function handleDeactivate() {
    if (!selectedAdmin.value) return;
    router.post(`/admin-users/${selectedAdmin.value.userID}/deactivate`, {}, {
        onSuccess: () => {
            isDeactivateDialogOpen.value = false;
            selectedAdmin.value = null;
        }
    });
}

function handleReactivate() {
    if (!selectedAdmin.value) return;
    router.post(`/admin-users/${selectedAdmin.value.userID}/reactivate`, {}, {
        onSuccess: () => {
            isReactivateDialogOpen.value = false;
            selectedAdmin.value = null;
        }
    });
}

// search function
const search = ref(props.filters?.search || '');
const status = ref(props.filters?.status || 'all');
const role = ref(props.filters?.role || 'all');
const itemPerPage = ref(props.filters?.per_page ? String(props.filters.per_page) : '10');

const isLoading = ref(false);

function applyFilters() {
    isLoading.value = true;
    router.get('/admin-users', {
        search: search.value,
        status: status.value === 'all' ? undefined : status.value,
        role: role.value === 'all' ? undefined : role.value,
        per_page: itemPerPage.value,
        sort_field: props.filters?.sort_field,
        sort_direction: props.filters?.sort_direction,
    }, {
        preserveState: true,
        replace: true,
        preserveScroll: true,
        onFinish: () => { isLoading.value = false; }
    });
}

function resetFilters() {
    search.value = '';
    status.value = 'all';
    role.value = 'all';
    itemPerPage.value = '10';
    applyFilters();
}

watch(itemPerPage, (newVal, oldVal) => {
    if(newVal !== oldVal) applyFilters();
});

function handlePageChange(page) {
    if (page !== props.admins.current_page) {
        isLoading.value = true;
        router.get('/admin-users', {
            page: page,
            search: search.value,
            status: status.value === 'all' ? undefined : status.value,
            role: role.value === 'all' ? undefined : role.value,
            per_page: itemPerPage.value,
            sort_field: props.filters?.sort_field,
            sort_direction: props.filters?.sort_direction,
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => { isLoading.value = false; }
        });
    }
}

function sortBy(field) {
    let direction = 'asc';
    if (props.filters?.sort_field === field && props.filters?.sort_direction === 'asc') {
        direction = 'desc';
    }

    router.get('/admin-users', { 
        search: search.value,
        status: status.value === 'all' ? undefined : status.value,
        role: role.value === 'all' ? undefined : role.value,
        per_page: itemPerPage.value,
        sort_field: field, 
        sort_direction: direction 
    }, {
        preserveState: true,
        replace: true,
        preserveScroll: true
    });
}
 
</script>
