<script>
    import {page} from '$app/stores';
    import Users from '@lucide/svelte/icons/users'; // Importing the Users icon
    const usersRoleData = $page.data.user_roles ?? [];
    const usersData = $page.data.users ?? [];
    export let data;

    // Filter users who are students
    const students = usersData.filter(user => {
        return usersRoleData.some(role => role.user_id === user.user_id && role.role_name === 'student')
    });
</script>

<div class ="table-container">
    <h1 class="text-xl font-bold flex items-center gap-2">
        <Users size={24} /> Students
    </h1>

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
                </tr>
            {/each}
        </tbody>
    </table>
</div>
