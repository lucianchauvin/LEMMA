<script>import "../app.css";
import { Avatar } from '@skeletonlabs/skeleton';
</script>

<style>
    .body {
        padding: 20px;
    }
</style>

<!-- Blue Header -->
<header class="header bg-surface-700 flex">
    <div class="home flex items-center">
        <button type="button" class="btn bg-initial drop-shadow-xl">
            <a href="/">
                <img src="/logo.svg" alt="Home" width="50" height="50">
            </a>
        </button>
        <h2 class="h2 drop-shadow-xl font-medium text-primary-50">LEMMA</h2>
    </div>

    <div class="admin flex items-center ml-auto mr-10">
        <button type="button" class="btn btn-sm border-2 border-error-600 bg-surface-100 hover:variant-filled-error shadow-lg shadow-surface-900 text-error-600">
            <a href="/admin">Admin Panel</a>
        </button>
    </div>

    <div class="pfp flex items-center p-2">
        <Avatar initials="AZ" background="bg-secondary-200"/>
    </div>
</header>

<div class="body">
    <slot/>
</div>
