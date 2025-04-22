<script lang="ts">
  export let name: string;
  export let checked: boolean;
</script>

<input type="hidden" name={`_${name}`} value="false" />
<input class="checkbox" type="checkbox" name={name} value="true" checked={checked} />
