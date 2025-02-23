<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">


<style>
    .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        background-color: #000080; 
        color: cyan; /* Text color */
    }

    .user-login-icon {
        background-color: #000080; /* Set the background color to the same as the header */
        border-radius: 50%;  
        position: absolute;  
        right: 2%;  
    }

    .LEMMA_Triangle  {
        background-color: #000080;
        width: 60px;
        height: 60px;
        margin-right: 10px; 
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
    <img src="/LEMMA_Triangle.png" alt="LMS Logo" width="50" height="50" class="LEMMA_Triangle">
    <div class="LEMMA_Text h2">LEMMA</div>  
    
    <img src="/user_login_icon.png" alt="Sign Out" width="40" height="40" class="user-login-icon">

</div>


<div class="body">
    <slot/>
</div>
