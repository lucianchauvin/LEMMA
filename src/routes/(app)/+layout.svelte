<script>
    import { Avatar } from '@skeletonlabs/skeleton-svelte';
    import Triangle from "@lucide/svelte/icons/triangle";
</script>

<div class="h-screen">
<header class="header bg-surface-700 flex shadow-md shadow-surface-900">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl">
            <a href="/">
                <Triangle size=48 color="#57cfa7" />
            </a>
        </button>
        <h2 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h2>
    </div>

    <div class="admin flex items-center ml-auto mr-10">
        <button type="button" class="btn btn-sm border-2 border-error-600 bg-surface-100 hover:preset-filled-error-500 shadow-lg shadow-surface-900 text-error-600">
            <a href="/admin">Admin Panel</a>
        </button>
    </div>

    <div class="pfp flex items-center p-2">
        <Avatar name="A Z" background="bg-secondary-200"/>
    </div>
</header>

<main class="p-5">
    <slot></slot>
</main>
</div>
