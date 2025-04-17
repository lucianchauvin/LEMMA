<script lang="ts">
    export let data;

    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import Book from '@lucide/svelte/icons/book'; 
    import KeyRound from '@lucide/svelte/icons/key-round'; 
</script>

<DatatableClient data={data.assignments} columns={["assignment_name", "grade"]} display_columns={[ "Assignment", "Grade"]} />
