<script>import "../app.css";
import { page } from '$app/stores';

// Reactive derived page title
$: pageTitle = $page.data?.title || "LEMMA";</script>

<style>
    .body {
        padding: 20px;
    }
</style>

<!-- Blue Header -->
<header class="header bg-surface-500 flex">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl">
            <a href="/">
                <img src="/home-icon.svg" alt="Home" width="75" height="75">
            </a>
        </button>
        <h1 class="h1 drop-shadow-xl font-semibold text-primary-100">{pageTitle}</h1>
    </div>

    <div class="admin flex items-center ml-auto mr-10">
        <button type="button" class="btn btn-sm variant-filled-error rounded-xl ring-2 ring-error-900">
            <a href="/admin">Admin Panel</a>
        </button>
    </div>
</header>

<div class="body">
    <slot/>
</div>
