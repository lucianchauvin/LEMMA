<script lang="ts">
    export let data;

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;
</script>

<h1 class="h1">{data.assignment.name}</h1>

{#if data.edit}
<a href="{urlBase}/{data.edit.student_assignment_id}" class="btn preset-filled">Edit Assignment</a>
{/if}

<div class="table-container">
<table class="table ">
    <thead>
        <tr>
            <th>Student</th> 
            <th>Grade</th>
        </tr>
    </thead>
    <tbody>
        {#each data.students as student}
            <tr>
                <td><a href="{urlBase}/{student.student_assignment_id}">{student.username}</a></td>
                <td>{student.grade}</td>
            </tr>
        {/each}
    </tbody>

</table>
</div>
