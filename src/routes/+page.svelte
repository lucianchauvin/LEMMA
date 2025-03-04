<script>
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { Menu, House, CalendarDays, BookMarked, BookCheck, BookOpenCheck, Users, SquareFunction } from "lucide-svelte";
    import CourseComponent from '$lib/components/CourseComponent.svelte';
    import { fade, slide } from "svelte/transition"
    export let data;
</script>

<div class="all flex flex-wrap">
<AppRail class="float-left -ml-5 mr-16 -mt-5 h-screen shadow-lg shadow-surface-900">
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

    <AppRailAnchor href="/" title="Calendar" class="calendar-link" selected={false}>
        <svelte:fragment slot="lead">
            <CalendarDays />
        </svelte:fragment>
        <div>Calendar</div>
    </AppRailAnchor>
</AppRail>

<div class="left-side pr-5 min-w-[65%] max-w-[65%]">
    <h2 class="h2 pb-8 ml-2 font-semibold transition" in:fade|global={{ delay: 300, duration: 300 }}>Courses</h2>

    <div class="courses-container flex flex-wrap gap-20">
        {#each data.courses as { course_id, course_name, course_number, color }}
            <CourseComponent {course_id} {course_name} {course_number} {color}/>
        {/each}
    </div>
</div>

<div class="right-side pl-5 h-screen border-l-2 border-surface-200 " in:fade={{ delay: 300, duration: 300 }}>
    <div class="right-side-lower">
        <div class="todo-container grid grid-cols-1 gap-5">
            <h2 class="h2 pb-8 ml-2 font-semibold" in:fade|global={{ delay: 300, duration: 300 }}>To Do Placeholder</h2>

        </div>
    </div>
</div>
</div>