<script>
    import { page } from '$app/stores';
    const assignmentsData = $page.data.assignments ?? [];
    export let data;
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Assignments</h2>

<p>{data.course.description}</p>

<div class="table-wrapper pt-8 pr-3">
    <table class="table border border-gray-200 shadow-lg rounded-lg">
        <thead class="bg-gray-100">
            <tr>
                <th class="p-3 "><center> Assignment Name </center></th>
                <th class="p-3 "><center> Assignment Description </center></th>
                <th class="p-3 "><center> Due Date </center></th>
                <th class="p-3 "><center> Open? </center></th>
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
