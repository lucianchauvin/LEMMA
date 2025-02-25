<script>
    import {AppRail, AppRailTile} from '@skeletonlabs/skeleton';
</script>

<style>
    .CourseNavigationTile {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        background-color: azure;
        border-radius: 8px;
    }


    .BarsSolid {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
    }

    .BarsSolid div {
        width: 100%;
        height: 4px;
        background-color: black;
        border-radius: 2px;
    }
</style>

<AppRail>
    <AppRailTile group="" name="" value="">
        <div class="CourseNavigationTile">
            <div class="BarsSolid">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </AppRailTile>
</AppRail>