<script lang="ts">
    import { enhance } from '$app/forms';
    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import Trash from '@lucide/svelte/icons/trash';

    export let data;
    export let form;
    export let form2;

    let no = false;

    // Import trash button
    import Users from '@lucide/svelte/icons/users';
    import BookPlus from '@lucide/svelte/icons/book-plus';

    $: console.log(data.userData);
    // $: console.log(data.courseData);

</script>
<div class="p-4">
<br>
<h1 class="text-xl font-bold flex items-center gap-2">
			<Users size={24} /> Add Users
</h1>
<form method="post" action="?/add" enctype="multipart/form-data" use:enhance>
    <label class="label pt-4">
        <span>Username</span>
        <input class="input" name="username" id = username type="text" placeholder="Username" />
    </label>

    <label class="label pt-4">
        <span>Password</span>
        <input class="input" name="password" id = password type="text" placeholder="Password" />
    </label>

    <label class="label pt-4">
        <span>First Name</span>
        <input class="input" name="first_name" id = first_name type="text" placeholder="First Name" />
    </label>

    <label class="label pt-4">
        <span>Last Name</span>
        <input class="input" name="last_name" id = last_name type="text" placeholder="Last Name" />
    </label>

    <label class="label pt-4">
        <span>Email</span>
        <input type = "email" class="input" name="email" id = email placeholder="email@example.com" />
    </label>

    <label class="label pt-4">
        <input type = "checkbox" value="yes" name="is_admin"/>
        <span>Admin?</span>
    </label>
    
    <button type="submit" class="btn variant-filled-primary mt-8">Submit</button>
</form>

{#if form?.user_message}
	<p>{form.user_message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}
<br>

<DatatableClient showSlot={true} data={data.userData} columns={["first_name", "last_name", "email"]} display_columns={["First Name", "Last Name", "Email"]}>
    <svelte:fragment slot="remove" let:row>
    <form method="post" action="/admin?/remove" use:enhance>
        <input type="hidden" name="user_id" value={row.user_id}/>
        {#if data.user.id != row.user_id}
        <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                <Trash size={16} /> Remove
        </button>
        {/if}
    </form>
    </svelte:fragment>
</DatatableClient>

<h1 class="h1 text-xl font-bold flex items-center">
    <BookPlus size={24} /> Add Courses
</h1>
<form method="post" action="?/add_course" enctype="multipart/form-data" use:enhance>
    <label class="label pt-4">
        <span>Course Number</span>
        <input class="input" name="course_number" id = course_number type="text" placeholder="CSCE101" />
    </label>
    <label class="label pt-4">
        <span>Course Name</span>
        <input class="input" name="course_name" id = course_name type="text" placeholder="Intro to Computing" />
    </label>

    <label class="label pt-4">
        <span>Status</span>
        <select name="status" id="status" required>
          {#each ["active", "inactive", "archived"] as status}
          <option value={status}>{status}</option>
          {/each}
        </select>
    </label>

    <label class="label pt-4">
        <span>Start Date</span>
        <input type="date" class="input" name="start_date" id = start_date />
    </label>
    <label class="label pt-4">
        <span>End Date</span>
        <input type="date" class="input" name="end_date" id = end_date/>
    </label>
    <button type="submit" class="btn variant-filled-primary mt-8">Submit</button>
</form>

{#if form?.course_message}
	<p>{form.course_message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}


<br>

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
</div>