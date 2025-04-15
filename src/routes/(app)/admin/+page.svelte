<script lang="ts">
    import { enhance } from '$app/forms';
    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import Trash from '@lucide/svelte/icons/trash';

    export let data;
    export let form;
</script>

<form method="post" action="?/add" class="flex flex-col gap-2 mb-4 mt-4" use:enhance>
    <label for="username">Username
        <input name="username" id="username" required/><br />
    </label>
    <label for="password">Password
        <input type="password" name="password" id="password" required/><br />
    </label>
    <label for="first_name">First Name
        <input name="first_name" id="first_name" required/><br />
    </label>
    <label for="last_name">Last Name
        <input name="last_name" id="last_name" required/><br />
    </label>
    <label for="email">Email
        <input type="email" name="email" id="email" /><br />
    </label>
    <button type="submit" class="bg-green-600 text-white text-base px-4 py-2 rounded hover:bg-green-700 w-fit ml-1">
        Submit
    </button>
</form>

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}


<DatatableClient showSlot={true} data={data.userData} columns={["first_name", "last_name", "email"]} display_columns={["First Name", "Last Name", "Email"]}>
    <svelte:fragment slot="remove" let:row>
    <form method="post" action="/admin?/remove" use:enhance>
        <input type="hidden" name="user_id" value={row.user_id}/>
        <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
            <Trash size={16} /> Remove
        </button>
    </form>
    </svelte:fragment>
</DatatableClient>

<form method="post" action="?/add_course" class="flex flex-col gap-2" use:enhance>
    <label for="course_number">Course Number
        <input name="course_number" id="course_number" required/><br />
    </label>
    <label for="course_name">Course Name
        <input name="course_name" id="course_name" required/><br />
    </label>
    <label for="status">Status
        <select name="status" id="status" required>
          {#each ["active", "inactive", "archived"] as status}
          <option value={status}>{status}</option>
          {/each}
        </select>
    </label>
    <label for="start_date">Start Date
        <input type="date" name="start_date" id="start_date" /><br />
    </label>
    <label for="end_date">End Date
        <input type="date" name="end_date" id="end_date" /><br />
    </label>
    <button type="submit" style="background-color: green; color: white; border: none; padding: 4px 8px; font-size: 16px; border-radius: 4px;cursor: pointer;">
        Submit
    </button>
</form>

{#if form?.message}
	<p>{form.message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}

<DatatableClient showSlot={true} data={data.courseData} columns={["course_number", "course_name", "status"]} display_columns={["Course Number", "Course Name", "Status"]}>
    <svelte:fragment slot="remove" let:row>
    <form method="post" action="/admin?/remove_course" use:enhance>
        <input type="hidden" name="course_id" value={row.course_id}/>
        <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
            <Trash size={16} /> Remove
        </button>
    </form>
    </svelte:fragment>
</DatatableClient>
