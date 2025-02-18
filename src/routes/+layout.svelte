<script>
  import { page } from '$app/stores';
  
  // Reactive derived page title
  $: pageTitle = $page.data?.title || "LEMMA";
</script>

<style>
    /* Top Blue Header */
    .header {
        width: 100%;
        height: 100px;
        background-color: blue;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 0 20px;
        color: #fff;
    }

    .body {
        padding: 20px;
    }
</style>

<!-- Blue Header -->
<div class="header">
    <a href="/">
        <img src="/home-icon.svg" alt="Home" width="75" height="75">
    </a>

    <h1>{pageTitle}</h1>
</div>

<div class="body">
    <slot/>
</div>
