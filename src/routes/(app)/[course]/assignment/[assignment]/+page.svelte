<script lang="ts">
    export let data;

    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import Users from '@lucide/svelte/icons/users';

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;

    let editing: {id: string, col: string} | null = null;

    const columnConfig = {
      username: {
        render: (row) => ({
          element: 'a',
          props: {
            class: "anchor",
            href: `${urlBase}/{student.student_assignment_id}`,
          },
          children: row.username ?? 'No student name found'
        }),
      },
    }

</script>

<div class="flex flex-col gap-4">
<h1 class="h1 text-3xl font-bold flex items-center gap-2">
    <Users size={30} /> 
    <p>Student Assignments</p>
</h1>
<hr>

{#if data.edit}
<a href="{urlBase}/{data.edit.student_assignment_id}" class="btn variant-filled">Edit Assignment</a>
{/if}

<DatatableClient rowsPerPage={10} data={data.students ?? []} columns={["username", "grade"]} display_columns={["Student", "Grade"]}>
    <svelte:fragment slot="cell" let:row let:col>
    {@const display = columnConfig[col]?.render(row) ?? {element: 'span', children: row[col]}}
    <div class="w-full flex justify-between">
    <svelte:element this={display.element} {...display.props}>
      {display.children}
    </svelte:element>
    </div>
    </svelte:fragment>
</DatatableClient>
</div>
