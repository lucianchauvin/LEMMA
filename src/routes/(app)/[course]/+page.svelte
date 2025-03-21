<script>
    import { page } from '$app/stores';
    const assignmentsData = $page.data.assignments ?? [];
    export let data;
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Assignments</h2>


<div class="table-wrapper pt-8 pr-3">
    <table class="table border border-gray-200 shadow-lg rounded-lg">
        <thead class="bg-gray-100">
<<<<<<< HEAD:src/routes/[course]/+page.svelte
            <tr>
                <th class="p-3 text-center"> Assignment Name </th>
                <th class="p-3 text-center"> Assignment Description </th>
                <th class="p-3 text-center"> Due Date </th>
                <th class="p-3 text-center"> Open? </th>
=======
            <tr class="!text-center">
                <th class="p-3"> Assignment Name </th>
                <th class="p-3"> Assignment Description </th>
                <th class="p-3"> Due Date </th>
                <th class="p-3"> Open? </th>
>>>>>>> main:src/routes/(app)/[course]/+page.svelte
            </tr>
        </thead>
        <tbody>
            {#each assignmentsData as assignments}
                <tr class="border-t border-gray-300 text-center">
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> 
                        <a class="anchor" href="/{data.course.id}/assignment/{assignments.assignment_id}">
                            {assignments.assignment_name}
                        </a>
                    </td>
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> {assignments.assignment_description}</td>
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> {assignments.due_date.toLocaleDateString()}</td>
                    {#if assignments.active === true}
                        <td class="p-3"> Yes </td>
                    {:else}
                        <td class="p-3 bg-error-100"> No </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
