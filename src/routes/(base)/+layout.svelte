<script>
    export let data;
    import { page } from '$app/stores';

    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';

    import Menu from '@lucide/svelte/icons/menu'; 
    import House from '@lucide/svelte/icons/house'; 
    import CalendarDays from '@lucide/svelte/icons/calendar-days'; 
    import Triangle from "@lucide/svelte/icons/triangle";
</script>

<div class="h-screen w-screen relative">
<header class="fixed top-0 w-screen z-50 h-20 header bg-surface-700 p-2 flex justify-between shadow-md shadow-surface-900">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl text-primary-400">
            <a href="/">
                <Triangle size=48 />
            </a>
        </button>
        <h2 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h2>
    </div>

    <div class="flex items-center gap-4">
    {#if data.user && data.user.isAdmin}
    <a id="admin" href="/admin" class="btn btn-sm border-2 border-error-600 bg-surface-100 hover:variant-filled-error shadow-lg shadow-surface-900 text-error-600" data-sveltekit-reload>
        Admin Panel
    </a>
    {/if}

    {#if data.session}
    <form method="GET" action="/logout">
      <button id="logout" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Logout</button>
    </form>
    {:else}
      <a id="login" href="/login" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Login</a>
    {/if}
    </div>
</header>

<AppRail class="fixed left-0 z-50 shadow-lg shadow-surface-900">
    <AppRailAnchor>
        <svelte:fragment slot="lead">
            <Menu />
        </svelte:fragment>
    </AppRailAnchor>

    <AppRailAnchor href="/" title="Home" class="home-link" selected={$page.url.pathname === "/"}>
        <svelte:fragment slot="lead">
            <House />
        </svelte:fragment>
        <div>Home</div>
    </AppRailAnchor>

    <AppRailAnchor href="/calendar" title="Calendar" class="calendar-link" selected={$page.url.pathname === "/calendar"}>
        <svelte:fragment slot="lead">
            <CalendarDays />
        </svelte:fragment>
        <div>Calendar</div>
    </AppRailAnchor>
</AppRail>

<div class="mt-20 ml-20 flex-1 flex flex-nowrap p-5">
<slot />
</div>
</div>
