<script>
  // Course Customization
  export let color = "white"
  export let CourseColor = "red";
  export let CourseNumber = "Course #";
  export let CourseName = "Course Name";
</script>

<div class="square-container">
  <div class="small-rectangle rounded-t-xl" style="background-color: {CourseColor};">
    {CourseNumber}
  </div>
  <div class="square rounded-b-xl" style="background-color: {color};">
    <div class="square-text">
      {CourseName}
    </div>
  </div>
</div>

<style>
  .square-container {
    display: inline-block;
    position: relative;
  }

  .square {
    width: 200px;
    height: 140px;
    display: inline-block;
    border: 2px solid black;
    padding-top: 45px;
  }

  .small-rectangle {
    width: 200px;
    height: 40px;
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: white;
  }

  .square-text {
    text-align: center;
    font-size: 18px;
    font-weight: normal;
    color: black;
  }

</style>
