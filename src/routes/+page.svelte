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
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white; /* White text*/
    }

    .dark-green {
        background-color: darkgreen;
        top: 175px; 
        left: 400px; 
    }
    
    .maroon {
        background-color: maroon;
        top: 175px;
        left: 700px; 
    }

    .border-rectangle {
        width: 200px;
        height: 100px; 
        position: absolute;
        border: 2px solid black; /* Create border lines */
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .border-dark-green {
        top: 205px; 
        left: 400px; 
        color: black;
    }

    .border-maroon {
        top: 205px; 
        left: 700px; 
        color: black;
    }
</style>


<div class="rectangle dark-green"> CSCE222 </div> 
<div class="rectangle maroon"> MATH415 </div> 

<!-- Border rectangles below dark green and yellow -->
<div class="border-rectangle border-dark-green"> Discrete Mathematics </div> 
<div class="border-rectangle border-maroon"> Modern Algebra </div> 