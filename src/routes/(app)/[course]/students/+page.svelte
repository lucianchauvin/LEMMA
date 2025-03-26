<script>
    import { enhance } from '$app/forms';
    import {Users, UserPlus, Trash} from '@lucide/svelte'; 
    export let data;

    // Filter users who are students
    let students = data.users.filter((user) => {
        return data.user_roles.some((role) => role.user_id === user.user_id && role.role_name === 'student')
    });

</script>

<div class ="table-container">
    <h1 class="text-xl font-bold flex items-center gap-2">
        <Users size={24} /> Students
    </h1>

    <form method="POST" action="?/add" class="mt-4 flex gap-2" use:enhance>
        <input type="text" name="first_name" placeholder="First Name" required class="p-2 border rounded" />
        <input type="text" name="last_name" placeholder="Last Name" required class="p-2 border rounded" />
        <button type="submit" class="p-2 bg-green-500 text-white rounded flex items-center gap-1">
            <UserPlus size={16} /> Add Student
        </button>
    </form>

    <table class="table table-hover mt-4">
        <thead>
            <tr>
                <th class="p-3 text-center">Student Name</th>
                <th class="p-3 text-center">Email</th>
            </tr>
        </thead>
        <tbody>
            {#each students as student}
                <tr class="text-center">
                    <td>{student.first_name} {student.last_name}</td>
                    <td>{student.email}</td>
                    <td>
                        <form method="POST" action="?/remove" use:enhance>
                            <input type="hidden" name="user_id" value={student.user_id} />
                            <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                                <Trash size={16} /> Remove
                            </button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
