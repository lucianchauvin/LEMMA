<script>
    import {AppRail, AppRailTile, AppRailAnchor} from '@skeletonlabs/skeleton';

</script>


<AppRail class="vertical-rail">
    <svelte:fragment slot="lead">
        <AppRailAnchor href="">
            <img src="Hamburger_Icon.png" alt="Hamburger Icon" width=60px height=60px>
        </AppRailAnchor>
    </svelte:fragment>

    <AppRailTile value={0} title="Home">
        <svelte:fragment slot="lead">
            <img src="/home-icon.svg" alt="Home" width="60" height="60">
        </svelte:fragment>
        <span>Home</span>
    </AppRailTile>

    <AppRailTile value={1} title="Grades">
        <svelte:fragment slot="lead">
            <img src="/CheckMark.jpg" alt="Grades" width="60" height="60">
        </svelte:fragment>
        <span>Grades</span>
    </AppRailTile>

    <AppRailTile value={2} title="GradeBook">
        <svelte:fragment slot="lead">
            <img src="/GradeBook.png" alt="Grade Book" width="60" height="60">
        </svelte:fragment>
        <span>Grade Book</span>
    </AppRailTile>

    <AppRailTile value={3} title="Students">
        <svelte:fragment slot="lead">
            <img src="/Student.png" alt="Students" width="60" height="60">
        </svelte:fragment>
        <span>Students</span>
    </AppRailTile>

    <AppRailTile value={4} title="Statements">
        <svelte:fragment slot="lead">
            <img src="/LightBulb.png" alt="Statements" width="60" height="60">
        </svelte:fragment>
        <span>Statements</span>
    </AppRailTile>
</AppRail>