<script lang="ts">
    export let form;

    import { enhance } from "$app/forms";
</script>

<div class="h-full flex justify-center mt-4">
<div class="h-1/4 w-1/4 flex flex-col gap-2">
<h1>Sign in</h1>
<form method="post" class="flex flex-col gap-2" use:enhance>
    <label for="username">Username
        <input name="username" id="username" /><br />
    </label>
    <label for="password">Password
        <input type="password" name="password" id="password" /><br />
    </label>
    <button class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600" id="login">Login</button>
</form>
<a id="signup" href="/signup" class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600">Signup</a>

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}
</div>
</div>


