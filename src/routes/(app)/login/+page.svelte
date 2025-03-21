<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { onDestroy } from "svelte";

    let errorMessage = "";
    let successMessage = "";

    // Subscribe to form error and success messages
    const unsubscribe = page.subscribe(($page) => {
        errorMessage = $page.form?.message ?? "";
        successMessage = $page.form?.success ? "Successfully logged in!" : "";

        if (errorMessage) {
            // Display the alert with the error message
            alert(errorMessage); // This will trigger the browser's native alert box
        }
    });

    onDestroy(unsubscribe);

</script>

<div class="h-full flex justify-center mt-4">
<div class="h-1/4 w-1/4 flex flex-col gap-2">
    <h1>Sign in</h1>
        <!-- Display success message if the user logs in successfully -->
        {#if successMessage}
            <div class="success-message">{successMessage}</div>
        {/if}

    <form method="post" class="flex flex-col gap-2" use:enhance>
        <label for="username">Username</label>
        <input name="username" id="username" type="text" required /><br />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required /><br />
        <button class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600">Login</button>
    </form>
    <a id="signup" href="/signup" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600">Signup</a>
</div>
</div>

<style>
    .success-message {
        color: green;
    }
</style>
