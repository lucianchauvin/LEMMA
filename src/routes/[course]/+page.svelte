<script>
    export let data;
</script>

<p>{data.course.description}</p>

<ul>
    {#each data.assignments as { assignment_id, assignment_name }}
        <li>
        <a href="/{data.course.id}/{assignment_id}">
            {assignment_name}
        </a>
        </li> 
    {/each}
</ul>

<div>
    <a href="/{data.course.id}/student_management_instructor">Student Management</a>
</div>
<div>
    <a href="/{data.course.id}/grades">Grades</a>
</div>
<div>
    <a href="/{data.course.id}/gradebook">Gradebook</a>
</div>