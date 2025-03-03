<script>
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
    import { Menu, House, BookMarked, BookCheck, BookOpenCheck, Users, SquareFunction } from "lucide-svelte";
    import { page } from '$app/stores';
    export let data;
</script>

<AppRail class="float-left -ml-5 mr-10 -mt-5 h-screen">
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

    <AppRailAnchor href="/{data.course.course_id}" title="Assignments" class="assignment-link" selected={$page.url.pathname === `/${data.course.course_id}`}>
        <svelte:fragment slot="lead">
            <BookMarked />
        </svelte:fragment>
        <div>Assignments</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/grades" title="Grades" selected={$page.url.pathname === `/${data.course.course_id}/grades`}>
        <svelte:fragment slot="lead">
            <BookCheck />
        </svelte:fragment>
        <div>Grades</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/gradebook" title="Gradebook" selected={$page.url.pathname === `/${data.course.course_id}/gradebook`}>
        <svelte:fragment slot="lead">
            <BookOpenCheck />
        </svelte:fragment>
        <div>Gradebook</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/students" title="Students" selected={$page.url.pathname === `/${data.course.course_id}/students`}>
        <svelte:fragment slot="lead">
            <Users />
        </svelte:fragment>
        <div>Students</div>
    </AppRailAnchor>

    <AppRailAnchor href="/{data.course.course_id}/statements" title="Statements" selected={$page.url.pathname === `/${data.course.course_id}/statements`}>
        <svelte:fragment slot="lead">    
            <SquareFunction />
        </svelte:fragment>
        <div>Statements</div>
    </AppRailAnchor>
</AppRail>

<div class="body">
    <slot/>
</div>
