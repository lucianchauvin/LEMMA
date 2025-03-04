<script>
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { Menu, House, CalendarDays, BookMarked, BookCheck, BookOpenCheck, Users, SquareFunction } from "lucide-svelte";
    import { fade } from "svelte/transition"
    import { page } from '$app/stores';
    export let data;
</script>

<div class="flex">
<AppRail class="float-left -ml-5 mr-16 -mt-5 h-screen shadow-lg shadow-surface-900">
    <AppRailAnchor>
        <svelte:fragment slot="lead">
            <Menu />
        </svelte:fragment>
    </AppRailAnchor>

    <AppRailAnchor href="/" title="Home" class="home-link" selected={$page.url.pathname === "/"}>
        <svelte:fragment slot="lead">
            <House />
        </svelte:fragment>
        <div>Home</div>
    </AppRailAnchor>

    <AppRailAnchor href="/" title="Calendar" class="calendar-link" selected={$page.url.pathname === "/calendar"}>
        <svelte:fragment slot="lead">
            <CalendarDays />
        </svelte:fragment>
        <div>Calendar</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}" title="Assignments" class="assignment-link" selected={$page.url.pathname === `/${data.course.course_id}`}>
        <svelte:fragment slot="lead">
            <BookMarked />
        </svelte:fragment>
        <div>Course Assignments</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/grades" title="Grades" selected={$page.url.pathname === `/${data.course.course_id}/grades`}>
        <svelte:fragment slot="lead">
            <BookCheck />
        </svelte:fragment>
        <div>Course Grades</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/gradebook" title="Gradebook" selected={$page.url.pathname === `/${data.course.course_id}/gradebook`}>
        <svelte:fragment slot="lead">
            <BookOpenCheck />
        </svelte:fragment>
        <div>Course Gradebook</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/students" title="Students" selected={$page.url.pathname === `/${data.course.course_id}/students`}>
        <svelte:fragment slot="lead">
            <Users />
        </svelte:fragment>
        <div>Course Students</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/statements" title="Statements" selected={$page.url.pathname === `/${data.course.course_id}/statements`}>
        <svelte:fragment slot="lead">    
            <SquareFunction />
        </svelte:fragment>
        <div>Course Statements</div>
    </AppRailAnchor>
</AppRail>

<div class="body flex-1 mr-5">
    {#key data.url}
        <div in:fade|global={{ delay: 300, duration: 300 }} out:fade={{ duration: 300 }}>
            <slot/>
        </div>
    {/key}
</div>
</div>
