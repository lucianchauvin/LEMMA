<script lang="ts">
    import {AppRail, AppRailTile, AppRailAnchor} from '@skeletonlabs/skeleton';
    let currentTile: number = 0;
</script>

<AppRail>
    <svelte:fragment slot="lead">
        <AppRailAnchor href="">
            <img src="Hamburger_Icon.png" alt="Hamburger Icon" width=60px height=60px>
        </AppRailAnchor>
    </svelte:fragment>

    <AppRailAnchor href="/" title="Home">
        <img src="/home-icon.svg" alt="Home" width="60px" height="60px">
        <span>Home</span>
    </AppRailAnchor>

    <AppRailAnchor href="/grades" title="Grades">
        <img src="/CheckMark.jpg" alt="Grades" width="60px" height="60px">
        <span>Grades</span>
    </AppRailAnchor>

    <AppRailAnchor href="/gradebook" title="GradeBook">
        <img src="/GradeBook.png" alt="Grade Book" width="60px" height="60px">
        <span>Grade Book</span>
    </AppRailAnchor>

    <AppRailAnchor href="/students" title="Students">
        <img src="/Student.png" alt="Students" width="60px" height="60px">
        <span>Students</span>
    </AppRailAnchor>

    <AppRailAnchor href="/statements" title="Statements">
        <img src="/LightBulb.png" alt="Statements" width="60px" height="60px">
        <span>Statements</span>
    </AppRailAnchor>
</AppRail>