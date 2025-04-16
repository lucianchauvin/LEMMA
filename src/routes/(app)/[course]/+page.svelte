<script lang="ts">
    export let data;
    export let form;
    
    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import Trash from '@lucide/svelte/icons/trash';

    import flatpickr from "flatpickr";
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";

    let inputDatetime;
    let localMessage = '';

    const columns = [...["assignment_name", "assignment_description", "due_date"], ...((data.permissions.view_inactive_assigned_course_assignments.access) ? ['active'] : []) ];
    const display_columns = [...["Assignment Name", "Assignment Description", "Due Date"], ...((data.permissions.view_inactive_assigned_course_assignments.access) ? ['Active'] : []) ];
    const rowClass = (row) => !row.active && 'bg-error-100';

    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    function validateDate() {
        const val = inputDatetime.value;
        const date = new Date(val);
        return val && !isNaN(date.getTime());
    }

    onMount(() => {
        flatpickr(inputDatetime, {
            enableTime: true,
            dateFormat: "Y-m-d H:i"
        });
    });
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Assignments</h2>

{#if data.permissions.create_assignments.access}
<div>
    <form method="post" action="?/create" enctype="multipart/form-data" class="flex flex-col gap-2" use:enhance={({cancel}) => {
        if (!validateDate()) {
            localMessage = 'Please enter a valid date and time.'
            cancel();
            return;
        }
        localMessage = '';
    }}>
        <input type="hidden" name="courseId" value={data.course.id} />
        <label for="name">Name:</label>
        <input name="name" id="assignment-name" required/>
        <label for="description">Description:</label>
        <textarea name="description" id="assignment-description"></textarea>
        <label for="active">Active:</label>
        <input type="checkbox" name="active" value="yes" checked>
        <label for="dueDate">Due Date:</label>
        <input name="dueDate" bind:this={inputDatetime}>
        <button class="btn btn-sm border-2 border-surface-600 bg-surface-100 hover:variant-filled-surface text-surface-600" id="submit">Submit</button>
    </form>
</div>
{/if}

{#if localMessage || form?.message}
  <p>{localMessage || form.message}</p>
{/if}
{#if form?.error}
  <p>{form.error}</p>
{/if}

<DatatableClient rowsPerPage={10} removeSlot={data.permissions.delete_assignments.access} data={data.assignments ?? []} columns={columns} display_columns={display_columns} rowClass={rowClass}>
    <svelte:fragment slot="cell" let:row let:col>
    {#if col === "assignment_name"}
        <a 
            class="anchor" 
            href="/{data.course.id}/assignment/{row.assignment_id}/{data.studentAssignments.find(sa => sa.assignment_id === row.assignment_id)?.student_assignment_id ?? ''}">
            {row.assignment_name}
        </a>
    {:else if col === "due_date"}
        {row.due_date?.toLocaleString('en-US', options).replace(',','') ?? 'None'}
    {:else if col === "active"}
        {#if row.active}
        <span>Yes</span>
        {:else}
        <span class="bg-error-100">No</span>
        {/if}
    {:else}
        {row[col] ?? ''}
    {/if}
    </svelte:fragment>

    <svelte:fragment slot="remove" let:row>
        <form method="POST" action="?/delete" enctype="multipart/form-data" use:enhance>
            <input type="hidden" name="courseId" value={data.course.id} />
            <input type="hidden" name="assignmentId" value={row.assignment_id} />
            <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                <Trash size={16} /> Remove
            </button>
        </form>
    </svelte:fragment>
</DatatableClient>
