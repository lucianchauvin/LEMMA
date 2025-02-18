  
<script>
  // Course Customization
  export let color = "white"
  export let CourseColor = "red";
  export let CourseNumber = "Course #";
  export let CourseName = "Course Name";

</script>

<div class="shape-container">
  <div class="square-container">
    <div class="small-rectangle" style="background-color: {CourseColor};">
      {CourseNumber}
    </div>
    <div class="square" style="background-color: {color};">
      <div class="square-text">
        {CourseName}
      </div>
    </div>
  </div>
</div>

<style>
  .shape-container {
    text-align: center;
    position: relative;
  }

  .square-container {
    display: inline-block;
    position: relative;
  }

  .square {
    width: 200px;
    height: 140px;
    display: inline-block;
    border: 3px solid black;
    padding-top: 45px;
  }

  .small-rectangle {
    width: 200px;
    height: 45px;
    border: 3px solid black;
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
