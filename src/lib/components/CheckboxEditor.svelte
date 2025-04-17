<script lang="ts">
  export let name: string;
  export let checked: boolean;
</script>

<input type="hidden" name={name} value="false" />
<input type="checkbox" name={name} value="true" checked={checked} />
