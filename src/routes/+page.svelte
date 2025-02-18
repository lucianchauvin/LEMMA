<script>
    export let data;
    import CourseComponent from '$lib/components/CourseComponent.svelte';
</script>

<a href="/" title="Go to Home" target="_blank">
    <img class="img-responsive img hidden-xs hidden-sm" id="tamuwhitelogo" style="max-width: 300px" src="home-icon.jpg" alt="House Icon">
    <img class="img-responsive img visible-xs visible-sm" id="tamuwhitelogo_sm" style="max-height: 50px; padding:0.2em" src="https://cdn.eis.tamu.edu/public/images/TAM-Primary-white.png" alt="TAMU Logo">
  </a>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h2>Other pages</h2>
<ul>
    {#each data.courses as { course_id, course_name }}
        <li><a href="/{course_id}">{course_name}</a></li> 
    {/each}
</ul>

  
<CourseComponent CourseColor = "green" CourseName = "Discrete Structures for Computing" CourseNumber = "CSCE 222" top = "-100px" left = "-100px" margin = "0px"/>
  