<script>
    export let data;
    export let form;

    import Trash from '@lucide/svelte/icons/trash';

    import { enhance } from "$app/forms";
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Assignments</h2>

{#if data.permissions.create_assignments.access}
<div>
    <form method="post" action="?/create" enctype="multipart/form-data" class="flex flex-col gap-2" use:enhance>
        <input type="hidden" name="courseId" value={data.course.id} />
        <label for="name">Name:</label>
        <input name="name" id="assignment-name" />
        <label for="description">Description:</label>
        <textarea name="description" id="assignment-description"></textarea>
        <label for="active">Active:</label>
        <input type="checkbox" name="active" value="yes" checked>
        <label for="dueDate">Due Date:</label>
        <input type="date" name="dueDate" value={new Date().toISOString().split('T')[0]}>
        <button class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600" id="submit">Submit</button>
    </form>
</div>
{/if}

<div class="table-wrapper pt-8 pr-3">
    <table class="table border border-gray-200 shadow-lg rounded-lg">
        <thead class="bg-gray-100">
            <tr class="!text-center">
                <th class="p-3"> Assignment Name </th>
                <th class="p-3"> Assignment Description </th>
                <th class="p-3"> Due Date </th>
                <th class="p-3"> Open? </th>
                {#if data.permissions.delete_assignments.access}
                <th class="p-3"> Remove </th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each (data.assignments ?? []) as assignment}
                <tr class="border-t border-gray-300 text-center">
                    <td class="p-3 {!assignment.active && 'bg-error-100'}"> 
                        <a class="anchor" href="/{data.course.id}/assignment/{assignment.assignment_id}/{data.studentAssignments.find(sa => sa.assignment_id === assignment.assignment_id)?.student_assignment_id ?? ''}">
                            {assignment.assignment_name}
                        </a>
                    </td>
                    <td class="p-3 {!assignment.active && 'bg-error-100'}"> {assignment.assignment_description}</td>
                    <td class="p-3 {!assignment.active && 'bg-error-100'}"> {assignment.due_date?.toLocaleDateString() ?? 'None'}</td>
                    {#if assignment.active === true}
                        <td class="p-3"> Yes </td>
                    {:else}
                        <td class="p-3 bg-error-100"> No </td>
                    {/if}
                    {#if data.permissions.delete_assignments.access}
                    <td>
                    <form method="POST" action="?/delete" enctype="multipart/form-data" use:enhance>
                        <input type="hidden" name="courseId" value={data.course.id} />
                        <input type="hidden" name="assignmentId" value={assignment.assignment_id} />
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

{#if form?.message}
  <p>{form.message}</p>
{/if}
{#if form?.error}
  <p>{form.error}</p>
{/if}

