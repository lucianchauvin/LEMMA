<script>
    import { page } from '$app/stores';
    const assignmentsData = $page.data.assignments ?? [];
    export let data;
</script>

<p>{data.course.description}</p>

<div class="table-wrapper pr-3">
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
                    <td class="p-3"> <center> {assignments.assignment_name} </center> </td>
                    <td class="p-3"> <center> {assignments.assignment_description} </center></td>
                    <td class="p-3"> <center> {assignments.due_date.toLocaleDateString()} </center></td>
                    {#if assignments.active === true}
                        <td class="p-3"> <center>Yes</center> </td>
                    {:else}
                        <td class="p-3 bg-error-400"> <center>No</center> </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
