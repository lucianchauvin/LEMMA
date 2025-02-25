<script lang="ts">
    import {AppRail, AppRailAnchor} from '@skeletonlabs/skeleton';
</script>

<AppRail>
    <svelte:fragment slot="lead">
        <AppRailAnchor href="">
            <img src="Hamburger_Icon.png" alt="Hamburger Icon" width=60px height=60px>
            
        </AppRailAnchor>
    </svelte:fragment>

    <AppRailAnchor href="/" title="Home" class="home-link">
        <img src="/House_Icon.png" alt="Home" width="60px" height="60px" >
        <div> Home </div>
    </AppRailAnchor>

    <AppRailAnchor href="/grades" title="Grades">
        <img src="/CheckMark.png" alt="Grades" width="60px" height="60px">
        <div>Grades</div>
    </AppRailAnchor>

    <AppRailAnchor href="/gradebook" title="GradeBook">
        <img src="/GradeBook.png" alt="Grade Book" width="60px" height="60px">
        <div>Grade Book</div>
    </AppRailAnchor>

    <AppRailAnchor href="/students" title="Students">
        <img src="/Student.png" alt="Students" width="60px" height="60px">
    </AppRailAnchor>

    <AppRailAnchor href="/statements" title="Statements">
        <img src="/LightBulb.png" alt="Statements" width="60px" height="60px">
        <div>Statements</div>
    </AppRailAnchor>
</AppRail>