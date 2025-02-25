<script>
    export let data;
    import CourseComponent from '$lib/components/CourseComponent.svelte';
</script>


<h1> <center> Courses </center></h1>
<div class="courses-container">
    <ul class="courses">
        {#each data.courses as { course_id, course_name, course_number, color }}
            <a href="/{course_id}">
                <CourseComponent CourseName={course_name} CourseNumber={course_number} CourseColor={color} />
            </a>
        {/each}
    </ul>
</div>

<style>
    .courses-container {
        
        display: flex;
        justify-content: center; /* Centers horizontally */
    }

    .courses {
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        justify-content: start;
        gap: 50px;
    }
</style>

