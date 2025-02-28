<script lang="ts">
    export let data;
</script>

<h1 class="h1">{data.assignment.name}</h1>

<a href="{data.editAssignment.student_assignment_id}">Edit Assignment</a>

<ul>
    {#each data.studentAssignments as assignment}
        <li href="">{assignment.student_id}</li>
    {/each}
</ul>

