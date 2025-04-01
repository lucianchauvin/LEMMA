<script>
    export let data;
    export let form;

    import { enhance } from "$app/forms";
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Assignments</h2>

{#if data.permissions.create_assignments.access}
<div>
    <form method="post" action="?/create" enctype="multipart/form-data" class="flex flex-col gap-2" 
    use:enhance={({formData}) => formData.append('courseId', data.course.id)}
    >
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

    {#if form?.message}
      <p>{form.message}</p>
    {/if}
    {#if form?.error}
      <p>{form.error}</p>
    {/if}
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
            </tr>
        </thead>
        <tbody>
            {#each (data.assignments ?? []) as assignments}
                <tr class="border-t border-gray-300 text-center">
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> 
                        <a class="anchor" href="/{data.course.id}/assignment/{assignments.assignment_id}">
                            {assignments.assignment_name}
                        </a>
                    </td>
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> {assignments.assignment_description}</td>
                    <td class="p-3 {!assignments.active && 'bg-error-100'}"> {assignments.due_date?.toLocaleDateString() ?? 'None'}</td>
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
