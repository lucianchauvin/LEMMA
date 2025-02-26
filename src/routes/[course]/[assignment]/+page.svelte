<script lang="ts">
    export let data;
</script>

<h1>{data.assignment.name}</h1>

<ul>
    {#each data.studentAssignments as assignment}
        <li href="">{assignment.student_id}</li>
    {/each}
</ul>

<form
    action="?/upload"
    method="post"
    enctype="multipart/form-data"
>
<input>
<label>
<input 
    type="file"
    name="file"
    id="student-file"
/>
</label>

<button>Upload</button>

</form>
