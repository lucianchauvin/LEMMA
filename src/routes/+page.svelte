<script>
    export let data;
    import CourseComponent from '$lib/components/CourseComponent.svelte';
</script>

<h2 class="h2 pb-8 ml-2">Courses</h2>

<div class="courses-container flex flex-wrap gap-20">
    {#each data.courses as { course_id, course_name, course_number, color }}
        <div class="flex-none rounded-xl shadow-xl shadow-surface-500 shadow-xl shadow-surface-700 shadow-xl shadow-surface-900">
            <a href="/{course_id}">
                <CourseComponent CourseName={course_name} CourseNumber={course_number} CourseColor={color}/>
            </a>
        </div> 
    {/each}
</div>
