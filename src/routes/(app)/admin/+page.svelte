<script lang="ts">
    import { enhance } from '$app/forms';
    import DatatableClient from '$lib/components/client/Datatable.svelte';

    export let data;
    export let form;

    // Import trash button
    import Users from '@lucide/svelte/icons/users';

    $: console.log(data.userData);

</script>






<h1 class="text-xl font-bold flex items-center gap-2">
			<Users size={24} /> Users
</h1>

<form method="post" action="?/add" class="flex flex-col gap-2" use:enhance>
    <label for="username">Username
        <input name="username" id="username" required/><br />
    </label>
    <label for="password">Password
        <input type="password" name="password" id="password" required/><br />
    </label>
    <label for="first_name">First Name
        <input name="first_name" id="first_name" required/><br />
    </label>
    <label for="last_name">Last Name
        <input name="last_name" id="last_name" required/><br />
    </label>
    <label for="email">Email
        <input type="email" name="email" id="email" /><br />
    </label>
    <button type="submit">Submit</button>
</form>

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}


<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<DatatableClient data={data.userData} columns={["first_name", "last_name", "email"]} display_columns={["First Name", "Last Name", "Email"]}>
    <svelte:fragment slot="remove" let:i>
    <form method="post" action="/admin?/remove" use:enhance>
        <input type="hidden" name="user_id" value={data.userData[i].user_id}/>
        <button type="submit">Remove</button>
    </form>
    </svelte:fragment>
</DatatableClient>