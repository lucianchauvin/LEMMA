<script>
    import "../app.css";
    import { Avatar } from '@skeletonlabs/skeleton-svelte';
    import Triangle from "@lucide/svelte/icons/triangle";
</script>

<div class="h-screen flex flex-col w-full">

<header class="header h-20 bg-surface-700 flex shadow-md shadow-surface-900">
    <div class="home flex items-center gap-2">
        <a href="/" class="btn bg-initial drop-shadow-xl">
            <Triangle size=48 color="#57cfa7" />
        </a>
        <h1 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h1>
    </div>

    <div class="admin flex items-center ml-auto mr-10">
        <button type="button" class="btn btn-sm rounded-full bg-surface-50 preset-outlined-error-500 hover:preset-filled-error-500 shadow-lg shadow-surface-900 text-error-600">
            <a href="/admin">Admin Panel</a>
        </button>
    </div>

    <div class="pfp flex items-center p-2">
        <Avatar name="A Z" background="bg-secondary-200"/>
    </div>
</header>

<main class="flex-grow">
    <slot></slot>
</main>
</div>
