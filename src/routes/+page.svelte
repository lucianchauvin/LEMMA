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

  <a href = "coursepage.svelte">
    <rect x="43.5%" y="200" width="200" height="40" fill="#008000" stroke="black" stroke-width="3" /> 
    <text x="50%" y = "230" font-size="25" text-anchor="middle" fill="white">
      CSCE222
    </text>
    <rect x="43.5%" y="240" width="200" height="120" fill="white" stroke="black" stroke-width="3" />
    <text x="50%" y = "275" font-size="15" text-anchor="middle" fill="w==black">
      Discrete Structures for
      <tspan x="50%" dy="20">Computing</tspan>
    </text>
  </a>
</svg>


