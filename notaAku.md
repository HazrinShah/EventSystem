Access control

untuk role atau access control guna response custom dekat app/http/responses/
bind dia dekat dalam fortifyserviceprovider app/http/providers/
pastu add routes dekat web

ni tak jadi, i dunno why
---

tapi cara lagi senang tanpa custom response class:

1. tukar `home` dalam `config/fortify.php` kepada `/redirect` asal dia `/dashboard`
   - sebab fortify guna value `home` tu untuk redirect lepas login/register
   - kalau letak `/dashboard` terus, semua orang pergi sana regardless of role

2. buat route `/redirect` dalam `routes/web.php` dalam group `auth` + `verified`
   - dalam route tu check `auth()->user()->role`
   - kalau `admin` → redirect ke `dashboard`
   - kalau lain → redirect ke `udashboard`

3. tak perlu custom response class langsung, logic semua dalam route je

nota: `Fortify::redirects('login', $closure)` nampak macam boleh guna closure tapi actually dia expect static string, so closure tak jalan — sebab tu kena guna cara redirect route ni

---

untuk protect page supaya user tak boleh masuk page admin (dan sebaliknya):

1. buat middleware `app/Http/Middleware/EnsureRole.php`
   - check `$request->user()->role` vs role yang kita pass
   - kalau tak match → `abort(403)`

2. register middleware alias dalam `bootstrap/app.php`
   - `'role' => EnsureRole::class`

3. dalam `routes/web.php`, wrap routes dalam group ikut role:
   - `Route::middleware('role:admin')->group(...)` → untuk page admin
   - `Route::middleware('role:user')->group(...)` → untuk page user

nota penting: any page baru kena letak dalam group yang betul, kalau letak luar group — tak de protection

---

pasal sidebar / layout untuk page baru:

tak payah import sidebar manually dekat setiap page.

sebabnya — dalam `resources/js/app.ts`, ada satu function yang automatically assign layout ikut nama page:
- page nama `Welcome` → no layout (sebab welcome page takde sidebar)
- page dalam folder `auth/` → pakai AuthLayout (page login, register)
- page dalam folder `settings/` → pakai AppLayout + SettingsLayout
- semua page lain → pakai AppLayout (yang ada sidebar tu)

so bila kau buat page baru contoh `resources/js/pages/Events.vue`, sidebar automatically ada sebab dia masuk kategori "semua page lain".

benda satu-satunya kau perlu letak dalam page baru tu ialah breadcrumb (tu navigation kecik kat atas yang tunjuk kau dekat mana):

```vue
<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineOptions({
    layout: {
        breadcrumbs: [
            { title: 'Events', href: '/events' },
        ],
    },
});
</script>

<template>
    <Head title="Events" />
    <!-- content page kau -->
</template>
```

kalau taknak breadcrumb pun takpe, sidebar still keluar jugak.

---

nak tambah page baru dalam sidebar navigation:

pergi `resources/js/components/AppSidebar.vue`, tambah item dalam array `mainNavItems`:

```ts
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Events',     // nama yang keluar kat sidebar
        href: '/events',     // url page tu
        icon: Calendar,      // icon dari lucide-vue-next
    },
];
```

jangan lupa import icon baru kat bahagian atas:
```ts
import { LayoutGrid, Calendar } from 'lucide-vue-next';
```

untuk cari icon — pergi https://lucide.dev/icons/

---

pasal `dashboard()` dalam sidebar — tu sebenarnya function yang auto-generated oleh Wayfinder.

ada 2 cara nak set href untuk sidebar item:

**cara 1 — Wayfinder (auto-sync dengan route)**
1. tambah route dalam `web.php`
2. run `php artisan wayfinder:generate`
3. import function dan guna:
```ts
import { events } from '@/routes';
{ title: 'Events', href: events(), icon: Calendar }
```
bagus sebab kalau URL route berubah, function auto update

**cara 2 — hardcode string (lebih senang)**
```ts
{ title: 'Events', href: '/events', icon: Calendar }
```
tak payah import, tak payah run command
tapi kalau tukar URL dalam `web.php`, kena update sidebar manually jugak

untuk project kecik, cara 2 pun okay je

---

nak buat sidebar tunjuk menu berbeza untuk admin dan user:

dalam `resources/js/components/AppSidebar.vue`:

**1. ambil data user yang tengah login**
```ts
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const isAdmin = computed(() => page.props.auth.user?.role === 'admin');
```
- `usePage()` — cara nak access shared data dari Laravel (termasuk user yang login)
- `computed` — value dia auto update bila role berubah
- `isAdmin` — jadi `true` kalau role === 'admin', `false` kalau lain

**2. buat nav items ikut role**
```ts
const mainNavItems = computed<NavItem[]>(() => isAdmin.value
    ? [
        // items untuk admin
        { title: 'Dashboard', href: dashboard(), icon: LayoutGrid },
    ]
    : [
        // items untuk user
        { title: 'Dashboard', href: udashboard(), icon: LayoutGrid },
    ]
);
```
- kalau `isAdmin.value` true → tunjuk array admin
- kalau false → tunjuk array user
- nak tambah page baru, letak dalam array yang betul je

**3. logo pun redirect ikut role**
```html
<Link :href="isAdmin ? dashboard() : udashboard()">
```
- klik logo → admin pergi `/dashboard`, user pergi `/udashboard`
