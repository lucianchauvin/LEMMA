<script>
    export let data;
</script>

<h1 style="text-align: center;">Courses</h1>

<style>
    .rectangle {
        width: 200px; 
        height: 30px; 
        position: absolute; /* Position rectangles relative to the container or viewport */
        border: 2px solid black; /* Add black border with size 2px */
    }

    .dark-green {
        background-color: darkgreen;
        top: 175px; 
        left: 400px; 
    }
    
    .yellow {
        background-color: yellow;
        top: 175px;
        left: 700px; 
    }

    .border-rectangle {
        width: 200px;
        height: 100px; 
        position: absolute;
        border: 2px solid black; /* Create border lines */
    }

    .border-dark-green {
        top: 205px; /* Position below the dark-green rectangle */
        left: 400px; /* Align with dark-green rectangle */
    }

    .border-yellow {
        top: 205px; /* Position below the yellow rectangle */
        left: 700px; /* Align with yellow rectangle */
    }
</style>


<div class="rectangle dark-green"></div> <!-- First rectangle at x = 350px, y = 150px -->
<div class="rectangle yellow"></div> <!-- Second rectangle at x = 100px, y = 150px -->

<!-- Border rectangles below dark green and yellow -->
<div class="border-rectangle border-dark-green"></div> <!-- Border rectangle below dark green -->
<div class="border-rectangle border-yellow"></div> <!-- Border rectangle below yellow -->