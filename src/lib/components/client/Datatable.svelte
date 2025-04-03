<script>
	//Import local datatable components
	import ThSort from '$lib/components/client/ThSort.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import Search from '$lib/components/client/Search.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';

	

	// import data from '$lib/components/data';

	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables/legacy';
    import { onMount } from 'svelte';



	// Initialize data, handler, and loading state
	export let data = [];
	export let columns = [];
	export let display_columns = [];

	let handler;
	let isLoading = true;
	let rows = [];

	onMount(() => {
		try {
			handler = new DataHandler(data, { rowsPerPage: 5 });

			const unsubscribe = handler.getRows().subscribe(($rows) => {
				rows = $rows;
				console.log('Updated rows:', rows);
			});
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			isLoading = false; // Data fetching done
		}
	});


	// $: console.log('Fetched data (reactive log):', data);
	$: {
		if (handler) {
			console.log('Handler rows:', rows);
		}
	}
	//Init data handler - CLIENT
	
</script>

<!-- Render table when data is ready -->
{#if !isLoading && data.length > 0 && handler}
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
					<th scope="col">Remove Users</th>
				</tr>
					
				<tr>
					{#each columns as col}
					<ThFilter {handler} filterBy={col} />
					{/each}
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row, i}
					<tr>
						{#each columns as col}
						<td>{row[col]}</td>
						{/each}
						<td><slot name="remove" {i}></slot></td>
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
{:else}
	<p>Loading data...</p>
{/if}
