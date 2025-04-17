<script>
    import { enhance } from '$app/forms';
    import Users from '@lucide/svelte/icons/user';
    import UserPlus from '@lucide/svelte/icons/user-plus';
    import Trash from '@lucide/svelte/icons/trash';
    export let data;
    export let form;

    import DatatableClient from '$lib/components/client/Datatable.svelte';
</script>

<div class="flex flex-col gap-2">
<h1 class="h1 text-xl font-bold flex items-center">
    <Users size={24} /> Course Users
</h1>

{#if data.permissions.update_course_users.access}
<form method="POST" action="?/add" class="mt-4 flex gap-2" use:enhance>
    <select name="user_id" required class="p-2 border rounded w-48">
        <option value="" disabled selected>Select a user</option>
        {#each data.new_users as user}
            <option value={user.user_id}>{user.first_name} {user.last_name}</option>
        {/each}
    </select>
    <select name="role" class="p-2 border rounded w-36" required>
        <option value="" disabled selected>Select a role</option>
        {#each data.permissions.update_course_users.target_roles as role}
            <option value={role}>{role}</option>
        {/each}
    </select>
    <button type="submit" class="p-2 bg-green-500 text-white rounded flex items-center gap-1">
        <UserPlus size={16} /> Add Course User
    </button>
</form>
{/if}



<DatatableClient removeSlot={data.permissions.update_course_users.access} data={data.users} columns={["name", "email", "role_name"]} display_columns={[ "Name", "Email", "Role"]}>
    <svelte:fragment slot="remove" let:row>
        {#if data.permissions.update_course_users.target_roles?.includes(row.role_name)}
        <form class="flex justify-center" method="POST" action="?/remove" use:enhance>
            <input type="hidden" name="user_id" value={row.user_id} />
            <input type="hidden" name="role" value={row.role_name} />
            <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                <Trash size={16} /> Remove
            </button>
        </form>
        {/if}
    </svelte:fragment>
</DatatableClient>

{#if form?.message}
    {form.message}
{:else if form?.error}
    {form.error}
{/if}

</div>
