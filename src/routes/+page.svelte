<script>
    export let data;
    import CourseComponent from '$lib/components/CourseComponent.svelte';
</script>

<h2 class="h2">Courses</h2>

<div class="courses-container">
<ul class="courses">
    {#each data.courses as { course_id, course_name, course_number, color }}
        <li>
        <a href="{course_id}">
            <CourseComponent CourseName={course_name} CourseNumber={course_number} CourseColor={color}/>
        </a>
        </li> 
    {/each}
</ul>
</div>

<style>
    .courses-container {
        width: 75%;
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
