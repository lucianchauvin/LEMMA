<script lang="ts">
    export let children;
</script>

<style>
    .rectangle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background-color: blue;
    }

    .content {
        margin-top: 100px; /* Push content below the rectangle */
    }
</style>


<!-- Blue rectangle at (0,0) -->
<div class="rectangle"></div>
<img src="/Canvas_Home.png" alt="Home" style="position: absolute; top: 15px; left: 15px; width: 75px; height: 75px;" />

<!-- Render child pages below -->
<div class="content">
    <slot />
</div>

