<script lang="ts">
    export let data;
    import { haveHeader } from '$lib/stores/header';
    $haveHeader = true;
</script>

<h1>{data.reading.name}</h1>
