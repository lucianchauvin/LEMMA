<script>
    export let data;
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { fade } from "svelte/transition"
    import { page } from '$app/stores';

    import Menu from '@lucide/svelte/icons/menu'; 
    import House from '@lucide/svelte/icons/house'; 
    import CalendarDays from '@lucide/svelte/icons/calendar-days'; 
    import BookMarked from '@lucide/svelte/icons/book-marked'; 
    import BookCheck from '@lucide/svelte/icons/book-check'; 
    import BookOpenCheck from '@lucide/svelte/icons/book-open-check'; 
    import Users from '@lucide/svelte/icons/users'; 
    import SquareFunction from '@lucide/svelte/icons/square-function'; 
</script>

<div class="h-full flex">
<AppRail class="h-full float-left shadow-lg shadow-surface-900">
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

    <AppRailAnchor href="/calendar" title="Calendar" class="calendar-link" selected={$page.url.pathname === "/calendar"}>
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

    {#if data.user.student}
    <AppRailAnchor href="/{data.course.course_id}/grades" title="Grades" selected={$page.url.pathname === `/${data.course.course_id}/grades`}>
        <svelte:fragment slot="lead">
            <BookCheck />
        </svelte:fragment>
        <div>Course Grades</div>
    </AppRailAnchor>
    {/if}

    {#if data.permissions.view_course_grades.access}
    <AppRailAnchor href="/{data.course.course_id}/gradebook" title="Gradebook" selected={$page.url.pathname === `/${data.course.course_id}/gradebook`}>
        <svelte:fragment slot="lead">
            <BookOpenCheck />
        </svelte:fragment>
        <div>Course Gradebook</div>
    </AppRailAnchor>
    {/if}

    {#if data.permissions.view_course_users.access && (data.permissions.view_course_users.target_roles === undefined || data.permissions.view_course_users.target_roles.includes('student'))}
    <AppRailAnchor href="/{data.course.course_id}/students" title="Students" selected={$page.url.pathname === `/${data.course.course_id}/students`}>
        <svelte:fragment slot="lead">
            <Users />
        </svelte:fragment>
        <div>Course Students</div>
    </AppRailAnchor>
    {/if}

    {#if data.permissions.view_course_statements.access}
    <AppRailAnchor href="/{data.course.course_id}/statements" title="Statements" selected={$page.url.pathname === `/${data.course.course_id}/statements`}>
        <svelte:fragment slot="lead">    
            <SquareFunction />
        </svelte:fragment>
        <div>Course Statements</div>
    </AppRailAnchor>
    {/if}
</AppRail>

<div class="body flex-1 flex flex-nowrap p-10">
    {#key data.url}
        <div in:fade|global={{ delay: 300, duration: 300 }} out:fade={{ duration: 300 }} class="flex-1">
            <slot/>
        </div>
    {/key}
</div>
</div>
