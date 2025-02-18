<script lang="ts">
    export let children;
</script>

<style>
    /* Top Blue Header */
    .header {
        width: 100%;
        height: 100px;
        background-color: blue;
        display: flex;
        align-items: center; /* Centers content vertically */
        padding: 0 20px;
    }

    .header img {
        width: 75px;
        height: 75px;
    }

    .content {
        margin-top: 20px; /* Adds space below the header */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>

<!-- Blue Header -->
<div class="header">
    <img src="/Canvas_Home.png" alt="Home">
</div>

<!-- Space for Sean's Component -->
<div class="sean-component-container">
    <slot></slot> <!-- This allows Sean's component to be inserted dynamically -->
</div>