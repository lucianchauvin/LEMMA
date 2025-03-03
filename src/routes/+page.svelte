<script>
    import CourseComponent from '$lib/components/CourseComponent.svelte';
    import { fade, slide } from "svelte/transition"
    export let data;
</script>

<div class="left-side pr-5 float-left h-screen">
    <h2 class="h2 pb-8 ml-2 font-semibold transition" in:fade|global={{ delay: 300, duration: 300 }}>Courses</h2>

    <div class="courses-container flex flex-wrap gap-20">
        {#each data.courses as { course_id, course_name, course_number, color }}
                <button type="button" class="btn flex-none p-0 rounded-xl shadow-lg shadow-surface-500 shadow-lg shadow-surface-700 shadow-lg shadow-surface-900" in:slide|global={{ delay: 300, duration: 300 }}>
                    <a href="/{course_id}">
                        <CourseComponent CourseName={course_name} CourseNumber={course_number} CourseColor={color}/>
                    </a>
                </button> 
        {/each}
    </div>
</div>

<div class="right-side pl-5 h-screen border-l-2 border-surface-200 float-right" in:fade={{ delay: 300, duration: 300 }}>
    <div class="right-side-upper border-b-2 border-surface-200" in:fade={{ delay: 300, duration: 300 }}>
        <div class="calendar-container flex flex-wrap gap-20">
            <h2 class="h2 pb-8 ml-2 font-semibold" in:fade|global={{ delay: 300, duration: 300 }}>Calendar Placeholder</h2>
        </div>
    </div>
    <div class="right-side-lower">
        <div class="todo-container flex flex-wrap gap-20">
            <h2 class="h2 pb-8 ml-2 font-semibold" in:fade|global={{ delay: 300, duration: 300 }}>To Do Placeholder</h2>
        </div>
    </div>
</div>