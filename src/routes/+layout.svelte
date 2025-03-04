<script>
    import "../app.css";

    import { haveHeader } from '$lib/stores/header';
    import { Triangle } from 'lucide-svelte';
</script>

<style>
    .header {
        height: 100px;
        display: flex;
        padding: 0 20px;
    }

    .home {
        width: 50%;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .admin {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: end;
    }
</style>

<div class="h-screen">
    {#if ($haveHeader)}
    <header class="grid grid-cols-[auto_1fr_auto] p-4 bg-surface-800 text-primary-100">
        <div class="home">
        <a href="/" class="text-primary-100">
            <Triangle size={48}/>
        </a>

        <h1 class="h1">LEMMA</h1>
        </div>

        <div></div>

        <div>
            <a class="btn variant-filled pr-4" href="/admin">Admin Panel</a>
        </div>
    </header>
    <main class="p-8">
        <slot/>
    </main>

    {:else}
        <slot/>
    {/if}
</div>
