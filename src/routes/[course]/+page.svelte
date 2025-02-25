<script>
    import { AppShell } from '@skeletonlabs/skeleton';
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
        cursor: pointer;
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
        cursor: pointer;
    }

    .HomeTile img {
        filter: grayscale(100%) brightness(0%);
    }

    .OtherTile {
        width: 60px;
        height: 60px;
        background-color: azure;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

</style>

<AppShell>
    <div style="display: flex; flex-direction: row; height: 100%;">

        <div style="width: 60px; background-color: #f4f4f4; padding-top: 20px; display: flex; flex-direction: column; align-items: center;">
            <div class="CourseNavigationTile" on:click={() => alert('Bars clicked')}>
                <div class="BarsSolid">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div class="HomeTile" on:click={() => alert('Home clicked')}>
                <img src="/home-icon.svg" alt="House" width="15px" height="15px" style="margin-top: 10px;"> 
                <h1 style="font-size: 10px;"> Home </h1>
            </div>

            <div class="OtherTile" on:click={() => alert('Grades clicked')}>
                <img src="/CheckMark.jpg" alt="Grades" width="20px" height="20px" style="margin-top: 10px;">
                <h1 style="font-size: 10px;"> Grades </h1>
            </div>

            <div class="OtherTile" on:click={() => alert('Grade Book clicked')}>
                <img src="/GradeBook.png" alt="GradeBook" width="20px" height="20px" style="margin-top: 10px;">
                <h1 style="font-size: 10px;"> Grade Book </h1>
            </div>

            <div class="OtherTile" on:click={() => alert('Students clicked')}>
                <img src="/Student.png" alt="Students" width="20px" height="20px" style="margin-top: 10px;">
                <h1 style="font-size: 10px;"> Students </h1>
            </div>

            <div class="OtherTile" on:click={() => alert('Statements clicked')}>
                <img src="/LightBulb.png" alt="Light Bulb Icon" width="20px" height="20px" style="margin-top: 10px;">
                <h1 style="font-size: 10px;"> Statements </h1>
            </div>
        </div>
    </div>
</AppShell>