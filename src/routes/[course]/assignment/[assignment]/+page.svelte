<script lang="ts">
    export let data;

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;
</script>

<h1 class="h1">{data.assignment.name}</h1>

<a href="{urlBase}/{data.edit.student_assignment_id}">Edit Assignment</a>

<ul>
    {#each data.students as student}
        <li> 
            <a href="{urlBase}/{student.student_assignment_id}">{student.username}</a>
        </li>
    {/each}
</ul>

