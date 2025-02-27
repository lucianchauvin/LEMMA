<script>
import {Avatar} from '@skeletonlabs/skeleton';
import "../app.css";
</script>



<div class="header"> 
    <a href="/">
        <img src="/LEMMA_Triangle.png" alt="LMS Logo" class="LEMMA_Triangle" />
    </a>
    <div class="LEMMA_Text">LEMMA</div>  
    <div class="user-login-icon">
        <Avatar src="/user_login_icon.png" alt="Sign Out" style="width: 55px; height: 55px;"></Avatar>
    </div>
</div>

<style>
    .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        background-color: #000080;
        color: cyan; 
    }

    .user-login-icon {
        position: absolute;  
        border-radius: 50%; 
        right: 1%;  
    }

    .LEMMA_Triangle  {
        background-color: #000080;
        width: 60px;
        height: 60px;
        margin-right: 10px; 
        filter: invert(100%);
    }

    .LEMMA_Text {
        margin-left: 40px; /* Space between triangle and text */
        font-size: 30px; 
    }

</style>

<div class="body">
    <slot></slot>
</div>
