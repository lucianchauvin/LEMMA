<script lang="ts">
    export let children;
</script>

<style>
    /* Top Blue Header */
    .header {
        width: 100%;
        height: 100px;
        background-color: blue;
        display: flex;
        align-items: center; /* Centers content vertically */
        padding: 0 20px;
    }

    .header img {
        width: 75px;
        height: 75px;
    }

    .content {
        margin-top: 20px; /* Adds space below the header */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Courses Section */
    .courses-container {
        display: flex;
        justify-content: center; /* Centers horizontally */
        gap: 50px; /* Adds spacing between courses */
        margin-top: 20px;
    }

    .course {
        width: 200px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white;
        border: 2px solid black;
    }

    .dark-green {
        background-color: darkgreen;
    }

    .maroon {
        background-color: maroon;
    }

    /* Course Descriptions */
    .course-description {
        width: 200px;
        height: 100px;
        border: 2px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 0; 
    }

</style>

<!-- Blue Header -->
<div class="header">
    <img src="/Canvas_Home.png" alt="Home">
</div>

<!-- Page Content -->
<div class="content">
    <h1>Courses</h1>

    <div class="courses-container">
        <!-- Course 1 -->
        <div>
            <div class="course dark-green">CSCE222</div>
            <div class="course-description">Discrete Mathematics</div>
        </div>

        <!-- Course 2 -->
        <div>
            <div class="course maroon">MATH415</div>
            <div class="course-description">Modern Algebra</div>
        </div>
    </div>
</div>
