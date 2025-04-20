<script lang="ts">
    export let data;
    export let form;
    
    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import BookMarked from '@lucide/svelte/icons/book-marked'; 
    import Trash from '@lucide/svelte/icons/trash';
    import Pencil from '@lucide/svelte/icons/pencil';
    import Check from '@lucide/svelte/icons/check';
    import X from '@lucide/svelte/icons/x';

    import Flatpickr from '$lib/components/Flatpickr.svelte';
    import CheckboxEditor from '$lib/components/CheckboxEditor.svelte';
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";

    let inputDatetime;
    let localMessage = '';
    let editing: {id: string, col: string} | null = null;

    const columns = [...["assignment_name", "assignment_description", "due_date"], ...((data.permissions.view_inactive_assigned_course_assignments.access) ? ['active'] : []) ];
    const display_columns = [...["Assignment Name", "Assignment Description", "Due Date"], ...((data.permissions.view_inactive_assigned_course_assignments.access) ? ['Active'] : []) ];
    const rowClass = (row) => (!row.active) ? 'even:!bg-error-100 odd:!bg-error-50 even:hover:!bg-error-200/70 odd:hover:!bg-error-200/70': '';

    const columnConfig = {
      assignment_name: {
        render: (row) => ({
          element: 'a',
          props: {
            class: "anchor",
            href: `/${data.course.id}/assignment/${row.assignment_id}/${data.studentAssignments.find(sa => sa.assignment_id === row.assignment_id)?.student_assignment_id ?? ''}`,
          },
          children: row.assignment_name ?? 'None'
        }),
        editable: true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'text',
            name: 'name',
            class: 'input',
            value: row.assignment_name ?? ''
          }
        })
      },
      assignment_description: {
        render: (row) => ({
          element: 'span',
          children: row.assignment_description ?? 'None'
        }),
        editable: true,
        editor: (row) => ({
          element: 'textarea',
          props: {
            type: 'text',
            name: 'description',
            class: 'textarea',
            value: row.assignment_description ?? ''
          }
        })
      },
      due_date: {
        render: (row) => ({
          element: 'span',
          children: row.due_date?.toLocaleString('en-US', options).replace(',', '') ?? 'None'
        }),
        editable: true,
        editor: (row) => ({
          component: Flatpickr,
          props: {
            name: 'dueDate',
            value: row.due_date
          }
        })
      },
      active: {
        render: (row) => ({
          element: 'span',
          children: row.active ? 'active' : 'inactive'
        }),
        editable: true,
        editor: (row) => ({
          element: 'select',
          props: {
            class: 'select',
            name: 'active',
            value: row.status ?? '',
          },
          childrens: [
            {
              element: 'option',
              props: {
                value: 'active'
              },
              children: 'active'
            },
            {
              element: 'option',
              props: {
                value: 'inactive'
              },
              children: 'inactive'
            },
          ]
        })
      }
    }

    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    function validateDate(val) {
        const date = new Date(val);
        return val && !isNaN(date.getTime());
    }
</script>

<div class="flex flex-col gap-4">
<h1 class="h1 text-3xl font-bold flex items-center gap-2">
    <BookMarked size={30} /> 
    <p>Course Assignments</p>
</h1>
<hr>

{#if data.permissions.create_assignments.access}
<div>
    <form method="post" action="?/create" enctype="multipart/form-data" class="grid grid-cols-2 gap-4" use:enhance={({formData, cancel}) => {
        if (!validateDate(formData.get('dueDate'))) {
            localMessage = 'Please enter a valid date and time.'
            cancel();
            return;
        }
        localMessage = '';
    }}>
        <input type="hidden" name="courseId" value={data.course.id} />
        <label class="label">
            <span>Name</span>
            <input class="input" name="name" id="assignment-name" required/>
        </label>
        <label class="label">
            <span>Due Date</span>
            <Flatpickr name="dueDate" />
        </label>
        <label class="label">
            <span>Description</span>
            <textarea class="textarea" name="description" id="assignment-description"></textarea>
        </label>
        <label class="label">
            <span>Active</span> <br>
            <select class="select" name="active">
                <option value="active">active</option>
                <option value="inactive">inactive</option>
            </select>
        </label>
        <button class="col-span-2 btn variant-filled-primary" id="submit">Submit</button>
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
    <div class="flex items-center gap-2">
      {#if editing?.id === row.assignment_id && editing?.col === col}
        {@const editor = (columnConfig[col]?.editable) ? columnConfig[col]?.editor(row) : {}}
        <form method="POST" action="?/update" class="w-full flex items-center gap-2">
          {#if editor.element}
          <svelte:element this={editor.element} {...editor.props}>
            {#each editor.childrens as children}
              <svelte:element this={children.element} {...children.props}>
                {children.children}
              </svelte:element>
            {/each}
          </svelte:element>
          {:else if editor.component}
          <svelte:component this={editor.component} {...editor.props} />
          {/if}
          <input type="hidden" name="assignmentId" value={row.assignment_id} />
          <button type="submit" class="text-green-600"><Check size={16} /></button>
          <button type="button" on:click={() => editing = null} class="text-red-600"><X size={16} /></button>
        </form>
      {:else}
        {@const display = columnConfig[col]?.render(row) ?? {element: 'span', children: row[col]}}
        <div class="w-full flex justify-between">
        <svelte:element this={display.element} {...display.props}>
          {display.children}
        </svelte:element>
        {#if data.permissions.update_assignments.access && col in columnConfig && columnConfig[col].editable}
          <button on:click={() => editing = { id: row.assignment_id, col: col }}>
            <Pencil size={16} />
          </button>
        {/if}
        </div>
      {/if}
    </div>
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
</div>
