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

<!-- Render child pages below -->
<div class="content">
    <slot />
</div>
