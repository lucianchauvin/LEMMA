<script>import "../app.css";
import {Avatar} from '@skeletonlabs/skeleton';
import { page } from '$app/stores';
</script>

<style>
    .header {
        height: 100px;
        display: flex;
        align-items: center;
        background-color: #000080;
        color: cyan;
    }

    .home {
        width: 50%;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .admin {
        position: absolute;
        width: 50%;
        right: 150px;

        border: 3px solid cyan;
        border-radius: 50%;
        padding: 15px; 
        width: 125px; 
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .user-login-icon {
        position: absolute;  
        border-radius: 50%; 
        right: 1%;  
    }

    .LEMMA_Triangle  {
        background-color: #000080;
        width: 90px;
        height: 90px;
        margin-right: 10px; 
        filter: invert(100%);
    }

    .LEMMA_Text {
        margin-left: 40px; /* Space between triangle and text */
        font-size: 60px; 
    }
</style>

<!-- Blue Header -->
<div class="header">
    <div class="home">
    <a href="/">
        <img src="/LEMMA_Triangle.png" alt="LMS Logo" class="LEMMA_Triangle" />
    </a>
    <div class="LEMMA_Text">LEMMA</div>  

    </div>
    <div class="user-login-icon">
        <Avatar src="/user_login_icon.png" alt="Sign Out" style="width: 80px; height: 80px;"></Avatar>
    </div>
    <div class="admin">
        <a href="/admin">Admin Panel</a>
    </div>
</div>

<div class="body">
    <slot></slot>
</div>
