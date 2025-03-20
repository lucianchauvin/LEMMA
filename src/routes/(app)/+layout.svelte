<script>
    import { Avatar } from '@skeletonlabs/skeleton';
    import Triangle from "@lucide/svelte/icons/triangle";
</script>

<div class="h-screen">
<header class="header bg-surface-700 p-2 flex justify-between shadow-md shadow-surface-900">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl text-primary-400">
            <a href="/">
                <Triangle size=48 />
            </a>
        </button>
        <h2 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h2>
    </div>

    <div class="flex items-center gap-4">
    <button id="admin" type="button" class="btn btn-sm border-2 border-error-600 bg-surface-100 hover:variant-filled-error shadow-lg shadow-surface-900 text-error-600">
        <a href="/admin">Admin Panel</a>
    </button>

    <!-- <div id="pfp"> -->
    <!--     <Avatar initials="AZ" background="bg-secondary-200"/> -->
    <!-- </div> -->

    <form method="GET" action="/logout" data-sveltekit-reload>
      <button id="logout" type="button" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface shadow-lg shadow-surface-900 text-surface-600">Logout</button>
    </form>
    </div>
</header>

<main class="p-5">
    <slot></slot>
</main>
</div>
