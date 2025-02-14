<script>
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h2>Other pages</h2>
<ul>
    {#each data.courses as { course_id, course_name }}
        <li><a href="/{course_id}">{course_name}</a></li> 
    {/each}
</ul>
