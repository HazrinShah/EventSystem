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

---

## RSVP Feature

**Idea dia:**
- User boleh RSVP untuk event — isi berapa pax dan note
- Admin boleh tengok semua RSVP dalam table, pastu assign seat

---

**Apa yang dibuat:**

**1. `Rsvp` model — tambah `$primaryKey` dan `$fillable`**
- `$primaryKey = 'rsvpID'` sebab kita guna custom PK
- `$fillable` = `['userID', 'eventID', 'pax', 'note', 'status']`

**2. `RsvpController` — dua method:**
- `store()` — untuk user submit RSVP, check duplicate dulu sebelum save, status default `pending`
- `index()` — untuk admin, fetch semua RSVP dengan data user dan event sekali guna `with(['user', 'event'])`

**3. Routes dalam `web.php`:**
- `GET /rsvp` dalam `role:admin` group → admin tengok semua RSVP
- `POST /rsvp` dalam `role:user` group → user submit RSVP
- `GET /uevents` dalam `role:user` group → user tengok semua events

**4. `EventController` — tambah `userIndex()` method:**
- Fetch semua events, tapi load sekali RSVP user yang login je guna eager loading:
```php
Event::with(['rsvps' => function($q) use ($userID) {
    $q->where('userID', $userID);
}])->get();
```
- Render `UEvent` page

**5. `Event` model — ada `rsvps()` relationship:**
- `hasMany(Rsvp::class, 'eventID', 'eventID')`

**6. `UEvent.vue` — page user:**
- Tunjuk semua event dalam grid cards
- Kalau belum RSVP → ada button RSVP → click → dialog form keluar (isi pax + note)
- Kalau dah RSVP → button tukar jadi status badge (pending/confirmed)

**7. `ARsvp.vue` — page admin:**
- Table tunjuk semua RSVP dengan nama user, event, pax, note, status
- Ada button "Assign Seat" untuk RSVP yang masih pending

---

**nota penting:**
- `with(['user', 'event'])` — eager loading, elak N+1 query problem (query satu kali je, bukan loop)
- prevent duplicate RSVP guna `Rsvp::where(...)->exists()` sebelum create

---

## Masalah EventController — `index()` hilang

**Apa jadi:**
masa nak tambah `userIndex()` dalam EventController, code `index()` yang lama tersalah letak dalam method `userIndex()` — lepas `return` statement. Code lepas `return` tak akan jalan langsung, so `index()` effectively hilang.

```php
// SALAH — code lepas return tak jalan
public function userIndex(){
    ...
    return Inertia::render('UEvent', [...]);

    // ni tak akan jalan sebab dah return atas tu
    $events = Event::all();
    return Inertia::render('AEvent', [...]);
}
```

**Penyelesaian:**
Kena buat dua method berasingan:

```php
// untuk admin
public function index(){
    $events = Event::all();
    return Inertia::render('AEvent', ['events' => $events]);
}

// untuk user
public function userIndex(Request $request){
    $userID = $request->user()->userID;
    $events = Event::with(['rsvps' => fn($q) => $q->where('userID', $userID)])->get();
    return Inertia::render('UEvent', ['events' => $events]);
}
```

**Nota:** Satu method = satu tanggungjawab. Jangan letak dua `return` dalam satu method — yang kedua tak akan jalan.

---

## RSVP Flow — User Side (detail)

### Macam mana page tahu user dah RSVP ke belum

Dalam `EventController@userIndex`, kita load events dengan filter RSVP user yang login je:

```php
$userID = $request->user()->userID;

$events = Event::with(['rsvps' => function($q) use ($userID) {
    $q->where('userID', $userID);
}])->get();
```

- `with(['rsvps' => ...])` — eager load relationship, tapi dengan condition
- `$q->where('userID', $userID)` — filter, ambil RSVP milik user ni je, bukan semua RSVP
- Hasilnya, setiap event dalam array tu ada `rsvps` array — kalau user dah RSVP, ada 1 item. Kalau belum, array kosong.

---

### Vue — cara display ikut status RSVP

Dalam `UEvent.vue`, kita check `event.rsvps?.length`:

```vue
<!-- Kalau dah RSVP — tunjuk status badge -->
<div v-if="event.rsvps?.length">
    <span>{{ event.rsvps[0].status }}</span>  <!-- pending / confirmed -->
    <span>{{ event.rsvps[0].pax }} pax</span>
</div>

<!-- Kalau belum RSVP — tunjuk button -->
<Button v-else @click="openRsvpDialog(event)">RSVP</Button>
```

- `event.rsvps?.length` — `?.` tu optional chaining, elak error kalau `rsvps` null
- `event.rsvps[0]` — ambil RSVP pertama (memang satu je sebab kita prevent duplicate)

---

### Dialog form

Bila user click RSVP:
1. `openRsvpDialog(event)` dipanggil — simpan event dalam `selectedEvent` dan set `rsvpForm.eventID`
2. Dialog terbuka dengan form pax + note
3. Submit → `rsvpForm.post('/rsvp')` hantar ke backend
4. Kalau berjaya → `closeRsvpDialog()` dipanggil, form reset, dialog tutup

```js
const rsvpForm = useForm({
    eventID: null,  // auto set masa openRsvpDialog()
    pax: '',
    note: '',
});

function submitRsvp() {
    rsvpForm.post('/rsvp', {
        onSuccess: () => closeRsvpDialog(),
    });
}
```

---

### Backend — `RsvpController@store`

```php
// 1. validate input
$validated = $request->validate([...]);

// 2. check duplicate
$exists = Rsvp::where('userID', $request->user()->userID)
              ->where('eventID', $validated['eventID'])
              ->exists();

if ($exists) {
    return back()->withErrors(['rsvp' => 'Already RSVP\'d']);
}

// 3. save dengan status pending
Rsvp::create([
    ...$validated,
    'userID' => $request->user()->userID,
    'status' => 'pending',
]);

// 4. redirect balik ke page sama (Inertia auto refresh data)
return back();
```

- `return back()` dengan Inertia akan trigger page reload — so card akan auto update tunjuk status badge
- `...$validated` — spread operator, gabungkan array validated dengan field tambahan

---

## Cancel RSVP

**Cara cancel RSVP yang betul — delete record, bukan update status**

Asal plan nak update status jadi `cancelled`, tapi cara lagi baik adalah delete terus record dari DB. Sebabnya:
- User boleh RSVP balik untuk event yang sama (fresh start)
- Kalau update status je, duplicate check akan block dia dari RSVP balik
- Lebih clean — takde "cancelled" records bersepah dalam DB

**Controller (`RsvpController@cancel`):**
```php
public function cancel($rsvpID)
{
    Rsvp::where('rsvpID', $rsvpID)
        ->where('userID', auth()->user()->userID)  // security — user hanya boleh cancel RSVP dia sendiri
        ->firstOrFail()
        ->delete();

    return back();
}
```

- `where('userID', ...)` — prevent user A cancel RSVP user B
- `firstOrFail()` — kalau tak jumpa record, auto 404
- `delete()` — buang terus dari DB

**Route:**
```php
// dalam role:user group
Route::post('/rsvp/{rsvpID}/cancel', [RsvpController::class, 'cancel'])->name('rsvp.cancel');
```

**Vue (`UEvent.vue`):**
```js
function cancelRsvp(rsvpID) {
    if (!confirm('Cancel your RSVP?')) return;
    router.post(`/rsvp/${rsvpID}/cancel`);
}
```

Lepas cancel, Inertia auto refresh page — card akan tunjuk button RSVP balik.

**Nota:** `$primaryKey` dalam model kena betul — kalau salah eja (contoh `$primarykey` huruf kecil), Laravel guna `id` by default dan query akan fail.


## Seat Allocation
**backend interact with frontend**

Vue captures click → computes percentages → sends POST request
SeatController@store receives it
Creates seat in DB
Returns JSON seat object
Vue updates its local seat array to render it on the layout

✅ This is why your store() method is still an API endpoint. Even though you’re using Inertia, you still call it via Axios for dynamic seat creation.

---

# SEAT PAGE

## Errors yang jadi dan cara fix

**1. `@/lib/axios` not found**
- Error: `Failed to resolve import "@/lib/axios"`
- Sebab: axios tak install dalam project
- Fix: `npm install axios`, pastu import terus `import axios from 'axios'`

**2. `/storage/undefined` 403**
- Error: `GET /storage/undefined 403`
- Sebab: `event.layoutImage` adalah `null` tapi Vue cuba render `/storage/null` → jadi `/storage/undefined`
- Fix: tambah `v-if` guard pada image tag:
```html
<img v-if="event.layoutImage" :src="`/storage/${event.layoutImage}`" />
<div v-else>No layout image uploaded.</div>
```

**3. Axios 403 pada POST requests**
- Error: `403 Forbidden` bila axios buat request
- Sebab: CSRF token tak disertakan dalam axios request
- Fix: tambah dalam script setup:
```js
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
```

**4. Wrong field names dalam axios calls**
- Error: seat tak tersimpan / assign tak jalan
- Sebab: code guna `event.id`, `seat.id`, `rsvp.id` tapi primary key sebenar adalah `eventID`, `seatID`, `rsvpID`
- Fix: tukar semua ke nama yang betul:
```js
// SALAH
event.id → event.eventID
seat.id  → seat.seatID
rsvp.id  → rsvp.rsvpID
rsvp.name → rsvp.user.name  // sebab name ada dalam relationship user
```

**5. API routes guna `auth:sanctum` je**
- Error: 403 pada API calls dari browser
- Sebab: `auth:sanctum` untuk API token auth, tapi kita guna session-based auth (web)
- Fix: tambah `web` middleware sekali dalam `api.php`:
```php
Route::middleware(['auth:sanctum', 'web'])->group(function() { ... });
```

**6. `$rsvps` undefined dalam SeatController**
- Error: `Undefined variable $rsvps`
- Sebab: variable `$rsvps` dipass ke Inertia tapi tak pernah di-define dalam method
- Fix: fetch RSVPs untuk event tu dulu:
```php
$rsvps = $event->rsvps()->with('user')->where('status', 'pending')->get();
```

**7. `seats.eventID` column not found**
- Error: `Unknown column 'seats.eventID'`
- Sebab: migration asal ada `eventID` tapi migration update lepas tu drop column tu tanpa sengaja
- Fix: buat migration baru untuk tambah balik `eventID` dalam `seats` table

---

## API Routes 404 — api.php tak registered

**Error:** `404 Not Found` pada `/api/seats` dan `/api/assign-seat`

**Sebab:** `api.php` tak di-include dalam `bootstrap/app.php`. Laravel 11 ke atas kena explicitly register api routes dalam `withRouting()`.

**Fix — tambah `api:` dalam `bootstrap/app.php`:**
```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',  // tambah ni
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

Lepas tambah, verify routes registered dengan:
```bash
php artisan route:list --path=api
```

**Nota:** Dalam Laravel 11, `api.php` tak auto-load macam Laravel 10 ke bawah. Kena register manually dalam `bootstrap/app.php`.

---

## API Auth — Sanctum vs Session

**Masalah:** API routes guna `auth:sanctum` tapi app kita guna session-based auth (Fortify), bukan token-based.

**Perbezaan:**
- `auth:sanctum` — untuk API token auth (mobile apps, SPA dengan token)
- `auth` — untuk session-based auth (web browser dengan cookie/session)

Sebab kita guna Fortify + Inertia (web app biasa), kita guna session. So API routes pun kena guna `auth` je, bukan `auth:sanctum`.

**Fix dalam `routes/api.php`:**
```php
// SALAH
Route::middleware(['auth:sanctum', 'web'])->group(function() { ... });

// BETUL
Route::middleware(['web', 'auth'])->group(function() { ... });
```

`web` middleware kena ada sekali sebab dia yang handle session, cookie, dan CSRF untuk web requests.

---

## Migration Error — "Incorrect table name"

Bila run `php artisan migrate`, dapat error macam ni:
```
SQLSTATE[42000]: Syntax error or access violation: 1103 Incorrect table name 'seat_assignments'
```

Nampak pelik sebab nama table tu betul je. Tapi sebenarnya masalahnya ada newline tersembunyi dalam string nama table tu. Bila kau tulis migration, mungkin kau tekan Enter masa taip nama table, jadi jadi macam ni dalam code:

```php
// SALAH — ada newline dalam string
Schema::table('seat_assignments
', function (Blueprint $table) {
```

MySQL nampak nama table tu sebagai `seat_assignments\n` (dengan newline kat hujung) — tu yang dia kata "Incorrect table name".

Fix dia senang je — pastikan nama table dalam satu baris:

```php
// BETUL
Schema::table('seat_assignments', function (Blueprint $table) {
```

Kalau jumpa error ni, check migration file kau — tengok ada tak newline atau space pelik dalam string nama table.
