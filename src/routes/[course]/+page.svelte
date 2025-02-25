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

    .HomeTile {
        width: 60px;
        height: 60px;
        background-color: green;
        margin-top: 100px; 
        display: flex;
        flex-direction: column;  
        align-items: center;     
        justify-content: center; 
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

        <div class="HomeTile">
            <img src="/home-icon.svg" alt="House" width=15px height=15px style="margin-top: 10px;"> 
            <h1 style="font-size: 10px;"> Home </h1>
        </div>
    </AppRailTile>
</AppRail>