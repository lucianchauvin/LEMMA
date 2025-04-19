<script>
    import { enhance } from '$app/forms';
    import BookKey from '@lucide/svelte/icons/book-key';
    import Trash from '@lucide/svelte/icons/trash';
    import BookPlus from '@lucide/svelte/icons/book-plus';
    import DatatableClient from '$lib/components/client/Datatable.svelte';
    export let data;
    export let form;
</script>

<div class="flex flex-col gap-4">
<h1 class="h1 text-3xl font-bold flex items-center gap-2">
    <BookKey size={30} /> 
    <p>Course Statements</p>
</h1>
<hr>

    <DatatableClient removeSlot={true} data={data.statements} columns={["statement_name", "statement_type", "statement_description", "statement_category"]} display_columns={["Statement Name", "Statement Type", "Statement Description", "Statement Category"]}>
        <svelte:fragment slot="remove" let:row>
            <form class="flex justify-center" method="POST" action="?/remove" use:enhance>
                <input type="hidden" name="statement_id" value={row.statement_id} />
                <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                    <Trash size={16} /> Remove
                </button>
            </form>
        </svelte:fragment>
    </DatatableClient>

    <h1 class="h1 text-xl font-bold flex items-center">
        <BookPlus size={24} /> Add Course Statement
    </h1>

    <form method="POST" action="?/add" enctype="multipart/form-data" use:enhance>
        <label class="label pt-4">
            <span>Statement Name</span>
            <input class="input" name="statement_name" type="text" placeholder="Statement Name" />
        </label>

        <label class="label pt-2">
            <span>Statement Type</span>
            <select class="select" name="statement_type">
                <option value="tactic">Tactic</option>
                <option value="definition">Definition</option>
                <option value="theorem">Theorem</option>
            </select>
        </label>

        <label class="label pt-2">
            <span>Statement Description</span>
            <textarea class="textarea" name="statement_description" rows="4" placeholder="Statement Description"></textarea>
        </label>		

        <label class="label pt-4">
            <span>Statement Category</span>
            <input class="input" name="statement_category" type="text" placeholder="Statement Category" />
        </label>

        <label class="label pt-4">
            <span>Type Statement File here</span>
            <textarea class="textarea" name="statement_file" rows="4" placeholder="Statement File"></textarea>
        </label>

        <button type="submit" class="btn variant-filled-primary mt-8">Submit</button>
        {#if form?.message}
            <p>{form.message}</p>
        {/if}
        {#if form?.error}
            <p>{form.error}</p>
        {/if}
    </form>
</div>
