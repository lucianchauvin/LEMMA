<script lang="ts">
  import Button from '@smui/button';
</script>

<div class="home-container">
  <img src="/Canvas_Home.png" width="50" alt="Canvas Home Sign">
  <h1 class="home-text">Home Page</h1>
</div>
<div class="line"></div>

<Button on:click = {() => alert('Button clicked!')}>Click Me!</Button>

<style>
  .home-container {
    display: flex;
    align-items: center; /* Center the items vertically */
    justify-content: center; /* Centers the content horizontally */
  }

  .home-text {
    margin-left: 20px; /* Adds space between image and text */
  }
  
  /* Line below the image and text */
  .line{
    width: 100%; 
    border-bottom: 2px solid black; /* Adds a line */
    margin-top: 15px; /* Adds space between the image+caption and the line */
  }
</style>