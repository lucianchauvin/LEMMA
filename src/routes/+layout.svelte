<script>
  import { page } from '$app/stores';
  
  // Reactive derived page title
  $: pageTitle = $page.data?.title || "LEMMA";
</script>

<style>
    /* Top Blue Header */
    .header {
        height: 100px;
        display: flex;
        padding: 0 20px;
        color: #fff;
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

    .body {
        padding: 20px;
    }
</style>

<!-- Blue Header -->
<div class="header">
    <div class="home">
    <a href="/">
        <img src="/home-icon.svg" alt="Home" width="75" height="75">
    </a>

    <h1>{pageTitle}</h1>
    </div>

    <div class="admin">
        <a href="/admin">Admin Panel</a>
    </div>
</div>

<div class="body">
    <slot/>
</div>
