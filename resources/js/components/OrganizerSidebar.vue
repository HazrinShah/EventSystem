<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { LayoutGrid, Calendar, UserCheck, LayoutTemplate, ArrowLeft } from 'lucide-vue-next';
import { computed } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems = computed<NavItem[]>(() => [
    { title: 'Dashboard', href: '/organizer/dashboard', icon: LayoutGrid },
    { title: 'My Events', href: '/organizer/events', icon: Calendar },
    { title: 'RSVPs', href: '/organizer/rsvps', icon: UserCheck },
    { title: 'Seats', href: '/organizer/seats', icon: LayoutTemplate },
]);

const footerNavItems: NavItem[] = [
    {
        title: 'Back to User',
        href: '/dashboard',
        icon: ArrowLeft,
    }
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset" class="border-r-indigo-100 bg-indigo-50/30">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link href="/organizer/dashboard">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <!-- Custom Footer for "Back to User" -->
            <SidebarMenu>
                <SidebarMenuItem v-for="item in footerNavItems" :key="item.title">
                    <SidebarMenuButton as-child class="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 font-medium transition-colors">
                        <Link :href="item.href">
                            <component :is="item.icon" class="w-4 h-4 mr-2" />
                            <span>{{ item.title }}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <div class="mt-2"></div>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
