<script>
    export let data;
    import { page } from '$app/state';

    import { Avatar } from '@skeletonlabs/skeleton';
    import Triangle from "@lucide/svelte/icons/triangle";

    import { goto } from '$app/navigation'; 
    import { onMount } from 'svelte';
</script>

<div class="h-screen w-screen relative">
<header class="fixed top-0 w-screen z-50 h-20 header bg-surface-700 p-2 flex justify-between shadow-md shadow-surface-900">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl text-primary-400">
            <a href="/{(data.user && data.user.isAdmin) ? 'admin': ''}">
                <Triangle size=48 />
            </a>
        </button>
        <h2 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h2>
    </div>

    <div class="flex items-center gap-4">
    {#if data.session}
    <form method="GET" action="/logout">
      <button id="logout" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Logout</button>
    </form>
    {:else}
      <a id="login" href="/login" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Login</a>
    {/if}
    </div>
</header>

<div class="mt-20 flex-1">
    <slot></slot>
</div>
</div>
