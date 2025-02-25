<script>
    import {Avatar} from '@skeletonlabs/skeleton';
</script>

<style>
    .header {
        width: 100%;
        height: 70px;
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
        width: 70px;
        height: 70px;
        margin-right: 10px; 
    }

    .LEMMA_Text {
        margin-left: 40px; /* Space between triangle and text */
        font-size: 30px;
    }

</style>

<div class="header"> 
    <a href = "/">
        <img src="/LEMMA_Triangle.png" alt="LMS Logo" class="LEMMA_Triangle">
    </a>
    <div class="LEMMA_Text">LEMMA</div>  
    <div class="user-login-icon">
        <Avatar src="/user_login_icon.png" alt="Sign Out" style="width: 65px; height: 65px;"/>
    </div>
</div>

<div class="body">
    <slot/>
</div>

