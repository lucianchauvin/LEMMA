<script>
    import { enhance } from '$app/forms';
    import BookKey from '@lucide/svelte/icons/book-key';
    import Trash from '@lucide/svelte/icons/trash';
    import DatatableClient from '$lib/components/client/Datatable.svelte';
    export let data;
</script>

<div class="flex flex-col gap-2">
    <h1 class="h1 text-xl font-bold flex items-center">
        <BookKey size={24} /> Course Statements
    </h1>

<DatatableClient showSlot={true} data={data.statements} columns={["statement_name", "statement_type", "statement_description", "statement_category"]} display_columns={["Statement Name", "Statement Type", "Statement Description", "Statement Category"]}>
    <svelte:fragment slot="remove" let:row>
        <form class="flex justify-center" method="POST" action="?/remove" use:enhance>
            <input type="hidden" name="statement_id" value={row.statement_id} />
            <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                <Trash size={16} /> Remove
            </button>
        </form>
    </svelte:fragment>
</DatatableClient>

<h2 class="h2 pt-8 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Add A Statement</h2>

<label class="label pt-4">
    <span>Statement Name</span>
    <input class="input" type="text" placeholder="Statement Name" />
</label>


<label class="label pt-2">
	<span>Statement Type</span>
	<select class="select">
		<option value="1">Tactic</option>
		<option value="2">Definition</option>
		<option value="3">Theorem</option>
	</select>
</label>

<label class="label pt-2">
	<span>Statement Description</span>
	<textarea class="textarea" rows="4" placeholder="Statement Description"></textarea>
</label>		

<label class="label pt-4">
    <span>Statement Category</span>
    <input class="input" type="text" placeholder="Statement Category" />
</label>

<label class="label pt-4">
    <span>Upload Lean File for Statement</span>
    <input class="input" type="file" />
</label>

<button type="button" class="btn variant-filled-primary mt-8">Submit</button>
<button type="button" class="btn variant-filled-error mt-8">Clear All Fields</button>

</div>
