<script>
    import "../app.css";
    import { page } from '$app/stores'; 
    import { Avatar } from '@skeletonlabs/skeleton';
    import { Triangle } from "lucide-svelte";
    import { onMount, onDestroy } from "svelte";
    import { browser } from '$app/environment';  

    let showLogOutPanel = false;
    let isLoginPage = false;

    $:  {
        isLoginPage = $page.url.pathname === '/login';
    }

    function togglePanel()
    {
        showLogOutPanel = !showLogOutPanel;
        console.log('Toggling panel, showLogOutPanel:', showLogOutPanel);  // Debug log

    }

    //If the click is outside the panel, then the panel closes.  
    function handleClickOutside(event) {
        if (!event.target.closest(".pfp-container")) {
            showLogOutPanel = false;
        }
    }

    onMount(() => {
        if (browser) {
            document.addEventListener("click", handleClickOutside);
        }
    });

    onDestroy(() => {
        if (browser) {
            document.removeEventListener("click", handleClickOutside);
        }
    });
</script>

{#if isLoginPage === false}
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
            <button type="button" class="btn btn-sm border-2 border-error-600 bg-surface-100 hover:variant-filled-error shadow-lg shadow-surface-900 text-error-600">
                <a href="/admin">Admin Panel</a>
            </button>
        </div>

        <div class="pfp flex items-center p-2 pfp-container">

            <button on:click={togglePanel} >
                <Avatar initials="AZ" background="bg-secondary-200"/>
            </button>

            {#if showLogOutPanel}
                <div class="absolute bg-white border border-gray-300 rounded shadow-lg mt-2 w-40">
                    <a href = "/login" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded"> Log Out</a>
                </div>
            {/if}

        </div>
    </header>

    <style>
    
    </style>
{/if}

<main class="p-5">
    <slot></slot>
</main>
