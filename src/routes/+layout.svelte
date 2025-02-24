<script>
    import { page } from '$app/stores';
    
    // Reactive derived page title
    $: pageTitle = $page.data?.title || "LEMMA";

    import {Avatar} from '@skeletonlabs/skeleton';
</script>

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
        position: absolute;  
        border-radius: 50%; 
        right: 1%;  
    }

    .LEMMA_Triangle  {
        background-color: #000080;
        width: 60px;
        height: 60px;
        margin-right: 10px; 
    }

    .body {
        padding: 20px;
    }
</style>

<div class="header"> 
    <a href = "/">
        <img src="/LEMMA_Triangle.png" alt="LMS Logo" class="LEMMA_Triangle">
    </a>
    <h1>{pageTitle}</h1> 
    <div class="user-login-icon">
        <Avatar src="/user_login_icon.png" alt="Sign Out" style="width: 55px; height: 55px;"/>
    </div>
</div>

<div class="body">
    <slot/>
</div>

