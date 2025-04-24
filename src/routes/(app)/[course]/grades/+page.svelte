<script lang="ts">
    export let data;

    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import BookCheck from '@lucide/svelte/icons/book-check'; 
</script>

<div class="flex flex-col gap-4">
<h1 class="h1 text-3xl font-bold flex items-center gap-2">
    <BookCheck size={30} /> 
    <p>Grades</p>
</h1>
<hr>

<DatatableClient data={data.assignments} columns={["assignment_name", "grade"]} display_columns={[ "Assignment", "Grade"]} />
</div>
