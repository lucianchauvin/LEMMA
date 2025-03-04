<script>
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { Menu, House, CalendarDays, BookMarked, BookCheck, BookOpenCheck, Users, SquareFunction } from "lucide-svelte";
    import { fade, slide } from "svelte/transition"
    import CourseComponent from '$lib/components/CourseComponent.svelte';
    import TaskComponent from '$lib/components/TaskComponent.svelte';
    export let data;
</script>

<div class="all flex flex-nowrap">
<AppRail class="float-left -ml-5 mr-11 -mt-5 h-screen shadow-lg shadow-surface-900">
    <AppRailAnchor>
        <svelte:fragment slot="lead">
            <Menu />
        </svelte:fragment>
    </AppRailAnchor>

    <AppRailAnchor href="/" title="Home" class="home-link" selected={true}>
        <svelte:fragment slot="lead">
            <House />
        </svelte:fragment>
        <div>Home</div>
    </AppRailAnchor>

    <AppRailAnchor href="/calendar" title="Calendar" class="calendar-link" selected={false}>
        <svelte:fragment slot="lead">
            <CalendarDays />
        </svelte:fragment>
        <div>Calendar</div>
    </AppRailAnchor>
</AppRail>

<div class="left-side pr-5 basis-[70%]">
    <h2 class="h2 pb-2 ml-2 font-semibold border-b-2 border-surface-200" in:fade|global={{ delay: 300, duration: 300 }}>Courses</h2>
    <div class="pt-8 courses-container flex flex-wrap gap-20">
        {#each data.courses as { course_id, course_name, course_number, color }}
            <CourseComponent {course_id} {course_name} {course_number} {color} />
        {/each}
    </div>
</div>

<div class="right-side pl-5 h-screen border-l-2 border-surface-200" in:fade={{ delay: 300, duration: 300 }}>
    <h2 class="h2 pb-2 ml-2 font-semibold border-b-2 border-surface-200" in:fade|global={{ delay: 300, duration: 300 }}>Assignments</h2>
    <div class="todo-container pt-4 grid grid-cols-1 gap-2" in:fade|global={{ delay: 300, duration: 300 }}>
        <h4 style="color:crimson;" class="h4 pb-2 ml-2 font-semibold">Overdue</h4>
        <TaskComponent course_id={0} course_number={"CSCE222"} assignment_id={0} assignment_name={"Learn LEAN"} assignment_due_date={"Mar 1"} color={"darkgreen"} date_color={"crimson"} />
        <h4 style="color:darkorange;" class="h4 pt-5 pb-2 ml-2 font-semibold">Due This Week</h4>
        <TaskComponent course_id={0} course_number={"CSCE222"} assignment_id={0} assignment_name={"HW 1 - Propostional Logic"} assignment_due_date={"Mar 11"} color={"darkgreen"} date_color={"darkorange"} />
        <h4 style="color:black;" class="h4 pt-5 pb-2 ml-2 font-semibold">Due Later</h4>
        <TaskComponent course_id={0} course_number={"MATH415"} assignment_id={0} assignment_name={"Algebruh Moment"} assignment_due_date={"Mar 18"} color={"maroon"} date_color={"black"} />
    </div>
</div>
</div>
