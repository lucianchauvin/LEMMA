<script>
    export let data;
    import { page } from '$app/state';

    import { Avatar } from '@skeletonlabs/skeleton';
    import Triangle from "@lucide/svelte/icons/triangle";

    import { goto } from '$app/navigation'; 
    import { onMount } from 'svelte';

    const excludeChecks = ['/login', '/logout', '/signup'];

    onMount(() => {
        if(!data.session && !excludeChecks.includes(page.url.pathname))
            goto('/login');
    })
</script>

<div class="h-screen">
<header class="header bg-surface-700 p-2 flex justify-between shadow-md shadow-surface-900">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl text-primary-400">
            <a href="/" data-sveltekit-reload>
                <Triangle size=48 />
            </a>
        </button>
        <h2 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h2>
    </div>

    <div class="flex items-center gap-4">
    <a id="admin" href="/admin" class="btn btn-sm border-2 border-error-600 bg-surface-100 hover:variant-filled-error shadow-lg shadow-surface-900 text-error-600" data-sveltekit-reload>
        Admin Panel
    </a>

    <!-- <div id="pfp"> -->
    <!--     <Avatar initials="AZ" background="bg-secondary-200"/> -->
    <!-- </div> -->

    {#if data.session}
    <form method="GET" action="/logout" data-sveltekit-reload>
      <button id="logout" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Logout</button>
    </form>
    {:else}
      <a id="login" href="/login" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Login</a>
    {/if}
    </div>
</header>

<main class="h-full p-5">
    <slot></slot>
</main>
</div>
