<script>
    import { enhance } from '$app/forms';
    import Users from '@lucide/svelte/icons/user';
    import UserPlus from '@lucide/svelte/icons/user-plus';
    import Trash from '@lucide/svelte/icons/trash';
    export let data;

    // Filter users who are students
    $: students = data.users.filter((user) => {
        return data.user_roles.some((role) => role.user_id === user.user_id && role.role_name === 'student')
    });

    // Filter users who are students and are not assigned to the course
    $: nonAssignedStudents = data.users.filter((user) => {
        return !data.user_roles.some((role) => role.user_id === user.user_id && role.role_name);
    });
</script>

<div class ="table-container">
    <h1 class="text-xl font-bold flex items-center gap-2">
        <Users size={24} /> Students
    </h1>

    <form method="POST" action="?/add" class="mt-4 flex gap-2" use:enhance>
        <!-- Dropdown to select student (showing non-assigned students) -->
        <select name="user_id" required class="p-2 border rounded w-48">
            <option value="" disabled selected>Select a student</option>
            {#each nonAssignedStudents as student}
                <option value={student.user_id}>{student.first_name} {student.last_name}</option>
            {/each}
        </select>
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
