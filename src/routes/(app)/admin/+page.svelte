<script lang="ts">
    import { enhance } from '$app/forms';
    import DatatableClient from '$lib/components/client/Datatable.svelte';

    export let data;
    export let form;

    // Import trash button
    import {Users, UserPlus, Trash} from '@lucide/svelte'; 
</script>



<!-- <form method="post" action="?/add" class="flex flex-col gap-2" use:enhance>
    <label for="username">Username
        <input name="username" id="username" /><br />
    </label>
    <label for="password">Password
        <input type="password" name="password" id="password" /><br />
    </label>
    <button class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600" id="login">Login</button>
</form> -->

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}

<h1 class="text-xl font-bold flex items-center gap-2">
			<Users size={24} /> Users
</h1>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<DatatableClient data={data.userData} columns={["first_name", "last_name", "email"]} display_columns={["First Name", "Last Name", "Email"]}/>