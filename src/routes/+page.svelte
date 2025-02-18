<script>
    export let data;
</script>

<h1 style="text-align: center;">Courses</h1>

<style>
    .courses-container {
        display: flex;
        justify-content: center;
        gap: 50px; /* Space between courses */
        margin-top: 20px;
    }

    .course {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .rectangle {
        width: 200px; 
        height: 30px; 
        border: 2px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white;
    }

    .dark-green {
        background-color: darkgreen;
    }

    .maroon {
        background-color: maroon;
    }

    .border-rectangle {
        width: 200px;
        height: 100px; 
        border: 2px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .sean-component-container {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }
</style>

<!-- Courses Container -->
<div class="courses-container">
    <!-- Course 1 -->
    <div class="course">
        <div class="rectangle dark-green">CSCE222</div>
        <div class="border-rectangle">Discrete Mathematics</div>
    </div>

    <!-- Course 2 -->
    <div class="course">
        <div class="rectangle maroon">MATH415</div>
        <div class="border-rectangle">Modern Algebra</div>
    </div>
</div>
