<script>
    import { enhance } from '$app/forms';
    import Users from '@lucide/svelte/icons/user';
    import UserPlus from '@lucide/svelte/icons/user-plus';
    import Trash from '@lucide/svelte/icons/trash';
    export let data;
</script>

<div class ="table-container">
    <h1 class="text-xl font-bold flex items-center gap-2">
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

    <table class="table table-hover mt-4">
        <thead>
            <tr>
                <th class="p-3 text-center">Student Name</th>
                <th class="p-3 text-center">Email</th>
                <th class="p-3 text-center">Role</th>
                {#if data.permissions.update_course_users.target_roles}
                <th class="p-3 text-center">Remove</th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each data.users as user}
                <tr class="text-center">
                    <td>{user.first_name} {user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role_name}</td>
                    {#if data.permissions.update_course_users.target_roles?.includes(user.role_name)}
                    <td>
                        <form class="flex justify-center" method="POST" action="?/remove" use:enhance>
                            <input type="hidden" name="user_id" value={user.user_id} />
                            <input type="hidden" name="role" value={user.role_name} />
                            <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                                <Trash size={16} /> Remove
                            </button>
                        </form>
                    </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
