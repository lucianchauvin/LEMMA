<script>

</script>

<style>
    .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        background-color: #000080; 
        color: white; /* Text color */
    }
    
    .LEMMA_Triangle {
        /* Setting width and height to 0 prevents rectangular formation */
        width: 0;
        height: 0;
        border-right: 30px solid transparent;   /* slanted sides of triangle */
        border-left: 30px solid transparent;    /* slanted sides of triangle */
        border-bottom: 45px solid white;    /* base of triangle */
        background: transparent;
        position: relative; /* Important to position the inner triangle */
        left: 10px;
    }

    .LEMMA_Triangle::after {
        content: "";
        position: absolute;  /* ensures the triangle is inside LEMMA_Triangle */
        top: 7px;  /* move inner triangle 5 pixels down from top */
        left: -20px;  
        border-left: 20px solid transparent;  
        border-right: 20px solid transparent;  
        border-bottom: 35px solid #000080;  /* same color as the header background color to create a hollow effect */
    }

    .LEMMA_Text {
        margin-left: 40px; /* Space between triangle and text */
        font-size: 30px;
    }

    .body {
        padding: 20px;
    }
</style>

<div class="header"> 
    <div class="LEMMA_Triangle"> </div>
    <div class="LEMMA_Text">LEMMA</div>  <!-- Added LEMMA text here -->
</div>

<div class="body">
    <slot/>
</div>
