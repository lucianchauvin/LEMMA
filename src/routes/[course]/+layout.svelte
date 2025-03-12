<script>
    export let data;
    import { Navigation } from '@skeletonlabs/skeleton-svelte';
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

<div class="h-full flex flex-nowrap">
<Navigation classes="float-left h-full shadow-lg shadow-surface-900" tilesJustify="justify-start">
    {#snippet header()}
    <Navigation.Tile href="#" title="Menu"><Menu /></Navigation.Tile>
    {/snippet}

    {#snippet tiles()}
    <Navigation.Tile href="/" label="Home" id="home-link" selected={$page.url.pathname === "/"}><House /></Navigation.Tile>
    <Navigation.Tile href="/calendar" label="Calendar" class="calendar-link" selected={$page.url.pathname === "/calendar"}><CalendarDays /></Navigation.Tile>

    <Navigation.Tile href="/{data.course.course_id}" label="Assignments" class="assignment-link" selected={$page.url.pathname === `/${data.course.course_id}`}><BookMarked /></Navigation.Tile>

    <Navigation.Tile href="/{data.course.course_id}/grades" label="Grades" selected={$page.url.pathname === `/${data.course.course_id}/grades`}><BookCheck /></Navigation.Tile>

    <Navigation.Tile href="/{data.course.course_id}/gradebook" label="Gradebook" selected={$page.url.pathname === `/${data.course.course_id}/gradebook`}><BookOpenCheck /></Navigation.Tile>

    <Navigation.Tile href="/{data.course.course_id}/students" label="Students" selected={$page.url.pathname === `/${data.course.course_id}/students`}><Users /></Navigation.Tile>

    <Navigation.Tile href="/{data.course.course_id}/statements" label="Statements" selected={$page.url.pathname === `/${data.course.course_id}/statements`}><SquareFunction /></Navigation.Tile>
    {/snippet}
</Navigation>

<div class="body p-5 flex-1 mr-5">
    {#key data.url}
        <div in:fade|global={{ delay: 300, duration: 300 }} out:fade={{ duration: 300 }}>
            <slot/>
        </div>
    {/key}
</div>
</div>
