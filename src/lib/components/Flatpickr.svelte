<script>
  import flatpickr from 'flatpickr';
  import 'flatpickr/dist/flatpickr.min.css';

  import { onMount, onDestroy } from 'svelte';
  export let value = '';
  export let options = {
    enableTime: true,
    dateFormat: "Y-m-d H:i"
  };
  export let name = '';

  let inputEl;
  let picker;

  onMount(() => {
    console.log(options);
    picker = flatpickr(inputEl, {
      ...options,
      defaultDate: value,
      onChange: ([selected]) => {
        value = selected?.toISOString(); // or any format you want
      }
    });
  });

  onDestroy(() => {
    picker?.destroy();
  });
</script>

<input
  bind:this={inputEl}
  bind:value
  name={name}
  type="text"
  class="p-2 border rounded"
/>
