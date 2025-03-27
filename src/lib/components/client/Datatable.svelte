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
	import { getData } from '$lib/components/data';

	// Import trash button
	import { enhance } from '$app/forms';
    import {Users, UserPlus, Trash} from '@lucide/svelte'; 

	// Initialize data, handler, and loading state
	let data = [];
	let handler;
	let isLoading = true;
	let rows = [];

	onMount(async () => {
		try {
			data = await getData();
			console.log('Fetched data:', data);

			handler = new DataHandler(data, { rowsPerPage: 5 });
			console.log('Handler intialized with rows:', handler.getRows());
			// const rows = handler.getRows();

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
	<form method="POST" action="?/add" class="mt-4 flex gap-2" use:enhance>
		<input type="text" name="first_name" placeholder="First Name" required class="p-2 border rounded" />
		<input type="text" name="last_name" placeholder="Last Name" required class="p-2 border rounded" />
		<button type="submit" class="p-2 bg-green-500 text-white rounded flex items-center gap-1">
			<UserPlus size={16} /> Add User
		</button>
	</form>

	<div class=" overflow-x-auto space-y-4">
		<!-- Header -->
		<header class="flex justify-between gap-4">
			<Search {handler} />
			<RowsPerPage {handler} />
		</header>
		<!-- Table -->
		<table class="table table-hover table-compact w-full table-auto">
			<thead>
				<tr>
					<ThSort {handler} orderBy="first_name">First name</ThSort>
					<ThSort {handler} orderBy="last_name">Last name</ThSort>
					<ThSort {handler} orderBy="email">Email</ThSort>
				</tr>
				<tr>
					<ThFilter {handler} filterBy="first_name" />
					<ThFilter {handler} filterBy="last_name" />
					<ThFilter {handler} filterBy="email" />
				</tr>
			</thead>
			<tbody>
				{#each rows as row}
					<tr>
						<td>{row.first_name}</td>
						<td>{row.last_name}</td>
						<td>{row.email}</td>
						<td>
							<form method="POST" action="?/remove" use:enhance>
								<input type="hidden" name="first_id" value={row.first_name} />
								<button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
									<Trash size={16} /> Remove
								</button>
							</form>
						</td>
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
