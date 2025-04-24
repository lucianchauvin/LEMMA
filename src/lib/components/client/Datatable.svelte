<script lang="ts">
	//Import local datatable components
	import ThSort from '$lib/components/client/ThSort.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import Search from '$lib/components/client/Search.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';

	// Enable slot
	export let removeSlot = false;

	// import data from '$lib/components/data';

	//Import handler from SSD
  import { DataHandler } from '@vincjo/datatables/legacy';
  import { onMount } from 'svelte';

	// Initialize data, handler, and loading state
	export let data = [];
	export let columns = [];
	export let display_columns = [];
  export let rowsPerPage = 5;
  export let rowClass: (row: any) => string = () => '';

	$: handler = new DataHandler(data, { rowsPerPage });
	let rows = [];
  $: {
    handler.getRows().subscribe(($rows) => {
		  rows = $rows;
		})
  }
</script>

<div class=" overflow-x-auto space-y-4">
<!-- Header -->
<header class="flex justify-between gap-4">
  <Search {handler} />
  <RowsPerPage {handler} />
</header>

<table class="table table-hover table-compact w-full table-auto">
  <thead>
    <tr>
      {#each columns as col, i}
      <ThSort {handler} orderBy={col}>{display_columns[i]}</ThSort>
      {/each}
      {#if removeSlot}
        <th scope="col"></th>
      {/if}
    </tr>
      
    <tr>
      {#each columns as col}
      <ThFilter {handler} filterBy={col} />
      {/each}
      {#if removeSlot}
      <th></th>
      {/if}
    </tr>
  </thead>
  <tbody>
    {#each rows as row}
      <tr class="{rowClass(row)}">
        {#each columns as col}
        <td><slot name="cell" {row} {col}>{row[col] ?? ''}</slot></td>
        {/each}
        {#if removeSlot}
          <td><slot name="remove" {row}></slot></td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>
<!-- Footer -->
<footer class="flex justify-between">
  <RowCount {handler} />
  <Pagination {handler} />
</footer>
</div>
