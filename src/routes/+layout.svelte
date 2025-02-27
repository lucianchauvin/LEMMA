<script>import "../app.css";
import { page } from '$app/stores';

// Reactive derived page title
$: pageTitle = $page.data?.title || "LEMMA";</script>



<!-- Blue Header -->
<div class="header">
    <a href="/">
        <img src="/home-icon.svg" alt="Home" width="75" height="75" />
    </a>

    <h1>{pageTitle}</h1>
</div>

<div class="body">
    <slot></slot>
</div>
<style>
    /* Top Blue Header */
    .header {
        width: 100%;
        height: 100px;
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
