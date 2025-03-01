<script>
    import "../app.css";

    import { haveHeader } from '$lib/stores/header';
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
    <header class="header bg-surface-500 text-primary-100">
        <div class="home">
        <a href="/">
            <img src="/home-icon.svg" alt="Home" width="75" height="75">
        </a>

        <h1 class="h1">LEMMA</h1>
        </div>

        <div class="admin">
            <a href="/admin">Admin Panel</a>
        </div>
    </header>
    <main class="p-8">
        <slot/>
    </main>

    {:else}
        <slot/>
    {/if}
</div>
