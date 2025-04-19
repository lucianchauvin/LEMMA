<script>
    export let data;

    import { fade, slide } from "svelte/transition"
    import CourseComponent from '$lib/components/CourseComponent.svelte';
    import TaskComponent from '$lib/components/TaskComponent.svelte';
</script>

<div class="left-side ml-12 pr-5 basis-[70%]">
    <h2 class="h2 pb-2 ml-2 font-semibold border-b-2 border-surface-200" in:fade|global={{ delay: 300, duration: 300 }}>Courses</h2>
    <div class="pt-8 courses-container flex flex-wrap gap-5">
        {#each data.courses as { course_id, course_name, course_number, color }}
            <CourseComponent {course_id} {course_name} {course_number} {color} />
        {/each}
    </div>
</div>

<div class="right-side pl-5 border-l-2 border-surface-200" in:fade={{ delay: 300, duration: 300 }}>
    <h2 class="h2 pb-2 ml-2 font-semibold border-b-2 border-surface-200" in:fade|global={{ delay: 300, duration: 300 }}>Assignments</h2>
    <div class="todo-container pt-4 grid grid-cols-1 gap-2" in:fade|global={{ delay: 300, duration: 300 }}>
        <h4 style="color:crimson;" class="h4 pb-2 ml-2 font-semibold">Overdue</h4>
        {#each data.assignments as { course_number, assignment_name, active, due_date, color, date_color }}
            {#if active === true && date_color === 'crimson'}
                <TaskComponent {course_number} {assignment_name} {due_date} {color} {date_color} />
            {/if}
        {/each}
        <h4 style="color:darkorange;" class="h4 pt-5 pb-2 ml-2 font-semibold">Due Today</h4>
        {#each data.assignments as { course_number, assignment_name, active, due_date, color, date_color }}
            {#if active === true && date_color === 'darkorange'}
                <TaskComponent {course_number} {assignment_name} {due_date} {color} {date_color} />
            {/if}
        {/each}
        <h4 style="color:black;" class="h4 pt-5 pb-2 ml-2 font-semibold">Due This Week</h4>
        {#each data.assignments as { course_number, assignment_name, active, due_date, color, date_color }}
            {#if active === true && date_color === 'black'}
                <TaskComponent {course_number} {assignment_name} {due_date} {color} {date_color} />
            {/if}
        {/each}
    </div>
</div>
