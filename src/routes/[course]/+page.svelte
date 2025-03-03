<script>
    import { page } from '$app/stores';
    const assignmentsData = $page.data.assignments ?? [];
    export let data;
</script>

<p>{data.course.description}</p>

<ul>
    {#each data.assignments as { assignment_id, assignment_name }}
        <li>
        <a href="/{data.course.id}/assignment/{assignment_id}">
            {assignment_name}
        </a>
        </li> 
    {/each}
    {#each data.readings as { reading_id, reading_name }}
        <li>
        <a href="/{data.course.id}/reading/{reading_id}">
            {reading_name}
        </a>
        </li> 
    {/each}

</ul>
