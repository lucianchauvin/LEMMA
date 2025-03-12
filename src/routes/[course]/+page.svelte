<script>
    import { page } from '$app/stores';
    const assignmentsData = $page.data.assignments ?? [];
    export let data;
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Assignments</h2>


<div class="table-wrapper pt-8 pr-3">
    <table class="table border border-gray-200 shadow-lg rounded-lg">
        <thead class="bg-gray-100">
            <tr>
                <th class="p-3 text-center"> Assignment Name </th>
                <th class="p-3 text-center"> Assignment Description </th>
                <th class="p-3 text-center"> Due Date </th>
                <th class="p-3 text-center"> Open? </th>
            </tr>
        </thead>
        <tbody>
            {#each assignmentsData as assignments}
                <tr class="border-t border-gray-300">
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> <center> {assignments.assignment_name} </center> </td>
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> <center> {assignments.assignment_description} </center></td>
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> <center> {assignments.due_date.toLocaleDateString()} </center></td>
                    {#if assignments.active === true}
                        <td class="p-3"> <center>Yes</center> </td>
                    {:else}
                        <td class="p-3 bg-error-100"> <center>No</center> </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
