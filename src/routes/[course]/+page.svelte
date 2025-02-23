<script>
    export let data;
</script>

<p>{data.course.description}</p>

<ul>
    {#each data.assignments as { assignment_id, assignment_name }}
        <li>
        <a href="/{data.course.course_id}/{assignment_id}">
            {assignment_name}
        </a>
        </li> 
    {/each}
</ul>

