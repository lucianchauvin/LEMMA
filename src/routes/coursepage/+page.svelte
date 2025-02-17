<svg width="100%" height="1000">
  <!-- Rectangle shape, filling the entire width -->
  <rect x="0" y="0" width="100%" height="100" fill="#0077be" />
  
  <!-- Triangle (Home roof) -->
  <polygon points="5,40 50,10 100,40" fill="white" />
  
  <rect x="5" y="40" width="95" height="15" fill="white" />

  <rect x="5" y="55" width="30" height="40" fill="white" />

  <rect x="35" y="55" width="35" height="10" fill="white" />

  <rect x="70" y="55" width="30" height="40" fill="white" />

  <text x="120"  y="75"  font-size="50"  text-anchor="start" fill="white" alignment-baseline="middle">
    {"Home Page"}
  </text>

  <text x="50%" y="140" font-size="30" text-anchor="middle" fill="black">
    Courses
  </text>

  <a href = "coursepage/grades">
    <rect x="63.5%" y="200" width="200" height="40" fill="#808080" stroke="black" stroke-width="3" /> 
    <text x="75%" y = "230" font-size="25" text-anchor="middle" fill="black">
      Grades
    </text>
  </a>

  <rect x="1200" y="145" width="210" height="25" fill="#0077be" stroke = "black" stroke-width ="3" />
  <!-- Grid of white squares with black borderlines -->
  {#each Array(5).fill(0) as _, rowIndex}
    {#each Array(7).fill(0) as _, colIndex}
      <rect x={1200 + colIndex * 30} y={170 + rowIndex * 30} 
        width="30" height="30" fill="white" stroke="black" stroke-width="3" />
    {/each}
  {/each}
</svg>


