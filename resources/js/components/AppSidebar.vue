<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { BookOpen, Calendar, FolderGit2, LayoutGrid, UserCheck, LayoutTemplate} from 'lucide-vue-next';
import { computed } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import NavFooter from '@/components/NavFooter.vue';
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
import { dashboard, udashboard } from '@/routes';
import type { NavItem } from '@/types';

const page = usePage();
const isAdmin = computed(() => page.props.auth.user?.role === 'admin');

const mainNavItems = computed<NavItem[]>(() => isAdmin.value
    ? [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Events',
            href: '/events',
            icon: Calendar,
        }, 
        {
            title: 'Rsvps',
            href: '/rsvp',
            icon: UserCheck,
        }, 
        {
            title: 'Seats',
            href: '/seats',
            icon: LayoutTemplate,
        },   

        // tambah page admin lain kat sini
    ]
    : [
        {
            title: 'Dashboard',
            href: udashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Events',
            href: '/uevents',
            icon: Calendar,
        },
        // tambah page user lain kat sini
    ]
);

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#vue',
        icon: BookOpen,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="isAdmin ? dashboard() : udashboard()">
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
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
