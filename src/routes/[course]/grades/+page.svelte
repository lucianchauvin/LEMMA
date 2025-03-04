<script lang="ts">
    export let data;
</script>

{#if data.assignments.length > 0}
<ul class="assignments">
	{#each data.assignments as {assignment_name, username, course_name, grade, course_id}}
        {#if (username == 'marfung')}
        <li>
            Course: <strong>{course_name}</strong>
            Assignment: <strong>{assignment_name}</strong>
            Student: <strong>{username}</strong>
            Grade: <strong>{grade}</strong>
        </li>
        {/if}
        {/each}
        
</ul>
{:else}
	<p>No assignments available.</p>
{/if}