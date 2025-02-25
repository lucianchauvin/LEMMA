<script lang="ts">
    import {AppRail, AppRailAnchor} from '@skeletonlabs/skeleton';
    import {page} from '$app/stores';
</script>

<AppRail>
    <svelte:fragment slot="lead">
        <AppRailAnchor href="">
            <img src="Hamburger_Icon.png" alt="Hamburger Icon" width=60px height=60px>
        </AppRailAnchor>
    </svelte:fragment>


    <AppRailAnchor href="/" title="Home" class="home-link" selected={$page.url.pathname === "/"}>
        <svelte:fragment slot="lead">
            <img src="/House_Icon.png" alt="Home" width=60px height=60px>
        </svelte:fragment>
        <div>Home</div>
    </AppRailAnchor>

    <AppRailAnchor href="/grades" title="Grades" selected={$page.url.pathname === "/grades"}>
        <svelte:fragment slot="lead">
            <img src="/CheckMark.png" alt="Grades" width=60px height=60px>
        </svelte:fragment>
        <div>Grades</div>
    </AppRailAnchor>

    <AppRailAnchor href="/gradebook" title="GradeBook" selected={$page.url.pathname === "/gradebook"}>
        <svelte:fragment slot="lead">
            <img src="/GradeBook.png" alt="Grade Book" width=60px height=60px>
        </svelte:fragment>
        <div>Grade Book</div>
    </AppRailAnchor>

    <AppRailAnchor href="/students" title="Students" selected={$page.url.pathname === "/students"}>
        <svelte:fragment slot="lead">
            <img src="/Student.png" alt="Students" width=60px height=60px>
        </svelte:fragment>
        <div>Students</div>
    </AppRailAnchor>

    <AppRailAnchor href="/statements" title="Statements" selected={$page.url.pathname === "/statements"}>
        <svelte:fragment slot="lead">    
            <img src="/LightBulb.png" alt="Statements" width=60px height=60px>
        </svelte:fragment>
        <div>Statements</div>
    </AppRailAnchor>
</AppRail>