<script lang="ts">
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    import Users from '@lucide/svelte/icons/users';
    import BookPlus from '@lucide/svelte/icons/book-plus';
    import Trash from '@lucide/svelte/icons/trash';
    import Pencil from '@lucide/svelte/icons/pencil';
    import Check from '@lucide/svelte/icons/check';
    import X from '@lucide/svelte/icons/x';

    import DatatableClient from '$lib/components/client/Datatable.svelte';
    import Flatpickr from '$lib/components/Flatpickr.svelte';
    import CheckboxEditor from '$lib/components/CheckboxEditor.svelte';

    let editing: {id: string, col: string} | null = null;

    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    };

    const flatpickrOpts = {
      dateFormat: "Y-m-d H:i"
    }

    const userColumnConfig = {
      first_name: {
        editable: true,
        editPerm: (row) => true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'text',
            name: 'firstName',
            class: 'input',
            value: row.first_name ?? ''
          }
        })
      },
      last_name: {
        editable: true,
        editPerm: (row) => true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'text',
            name: 'lastName',
            class: 'input',
            value: row.last_name ?? ''
          }
        })
      },
      username: {
        editable: true,
        editPerm: (row) => true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'text',
            name: 'username',
            class: 'input',
            value: row.username ?? ''
          }
        })
      },
      password: {
        render: (row) => ({
          element: 'span',
          children: '********'
        }),
        editable: true,
        editPerm: (row) => true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'password',
            name: 'password',
            class: 'input',
            value: ''
          }
        })
      },
      email: {
        editable: true,
        editPerm: (row) => true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'email',
            name: 'email',
            class: 'input',
            value: row.email ?? ''
          }
        })
      },
      is_super_admin: {
        render: (row) => ({
          element: 'span',
          children: (row.is_super_admin) ? 'Yes' : 'No'
        }),
        editable: true,
        editPerm: (row) => data.user.id !== row.user_id,
        editor: (row) => ({
          component: CheckboxEditor,
          props: {
            name: 'admin',
            checked: row.is_super_admin
          }
        })
      }
    }

    const courseColumnConfig = {
      course_number: {
        render: (row) => ({
          element: 'a',
          props: {
            class: "anchor",
            href: `/${row.course_id}`
          },
          children: row.course_number ?? ''
        }),
        editable: true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'text',
            name: 'courseNumber',
            class: 'input',
            value: row.course_number ?? ''
          }
        })
      },
      course_name: {
        editable: true,
        editor: (row) => ({
          element: 'input',
          props: {
            type: 'text',
            name: 'courseName',
            class: 'input',
            value: row.course_name ?? ''
          }
        })
      },
      status: {
        editable: true,
        editor: (row) => ({
          element: 'select',
          props: {
            class: 'select',
            name: 'status',
            value: row.status ?? '',
          },
          childrens: [
            {
              element: 'option',
              props: {
                value: 'active'
              },
              children: 'active'
            },
            {
              element: 'option',
              props: {
                value: 'inactive'
              },
              children: 'inactive'
            },
            {
              element: 'option',
              props: {
                value: 'archived'
              },
              children: 'archived'
            }
          ]
        })
      },
      start_date: {
        render: (row) => ({
          element: 'span',
          children: row.start_date?.toLocaleString('en-US', options).replace(',', '') ?? 'None'
        }),
        editable: true,
        editor: (row) => ({
          component: Flatpickr,
          props: {
            name: 'startDate',
            value: row.start_date,
            options: flatpickrOpts,
          }
        })
      },
      end_date: {
        render: (row) => ({
          element: 'span',
          children: row.end_date?.toLocaleString('en-US', options).replace(',', '') ?? 'None'
        }),
        editable: true,
        editor: (row) => ({
          component: Flatpickr,
          props: {
            name: 'endDate',
            value: row.end_date,
            options: flatpickrOpts
          }
        })
      }
    }
</script>
<div class="p-4 flex flex-col gap-4 w-full">
<h1 class="text-xl font-bold flex items-center gap-2">
			<Users size={24} /> Add Users
</h1>
<form class="grid grid-cols-4 gap-4" method="post" action="?/add" enctype="multipart/form-data" use:enhance>
    <label class="label col-span-2">
        <span>Username</span>
        <input class="input" name="username" id = username type="text" placeholder="Username" required />
    </label>

    <label class="label col-span-2">
        <span>Password</span>
        <input class="input" name="password" id = password type="password" placeholder="Password" required />
    </label>

    <label class="label col-span-2">
        <span>First Name</span>
        <input class="input" name="first_name" id = first_name type="text" placeholder="First Name" required />
    </label>

    <label class="label col-span-2">
        <span>Last Name</span>
        <input class="input" name="last_name" id = last_name type="text" placeholder="Last Name" required />
    </label>

    <label class="label col-span-2">
        <span>Email</span>
        <input type = "email" class="input" name="email" id = email placeholder="email@example.com" required />
    </label>

    <label class="label">
        <span>Admin?</span> <br>
        <input class="checkbox" type = "checkbox" value="yes" name="is_admin"/>
    </label>
    <button type="submit" class="btn variant-filled-primary self-end">Submit</button>
</form>

{#if form?.user_message}
	<p>{form.user_message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}
<br>

<DatatableClient removeSlot={true} data={data.userData} columns={["first_name", "last_name", "username", "password", "email", "is_super_admin"]} display_columns={["First Name", "Last Name", "Username", "Password", "Email", "Admin"]}>
    <svelte:fragment slot="cell" let:row let:col>
    <div class="flex items-center gap-2">
      {#if editing?.id === row.user_id && editing?.col === col}
        {@const editor = (userColumnConfig[col]?.editable) ? userColumnConfig[col]?.editor?.(row) : {}}
        <form method="POST" action="?/update_user" class="w-full flex items-center gap-2">
          {#if editor.element}
          <svelte:element this={editor.element} {...editor.props} />
          {:else if editor.component}
          <svelte:component this={editor.component} {...editor.props} />
          {/if}
          <input type="hidden" name="userId" value={row.user_id} />
          <button type="submit" class="text-green-600"><Check size={16} /></button>
          <button type="button" on:click={() => editing = null} class="text-red-600"><X size={16} /></button>
        </form>
      {:else}
        {@const display = userColumnConfig[col]?.render?.(row) ?? {element: 'span', children: row[col]}}
        <div class="w-full flex justify-between">
        <svelte:element this={display.element} {...display.props}>
          {display.children}
        </svelte:element>
        {#if col in userColumnConfig && userColumnConfig[col].editable && userColumnConfig[col].editPerm?.(row)}
          <button on:click={() => editing = { id: row.user_id, col: col }}>
            <Pencil size={16} />
          </button>
        {/if}
        </div>
      {/if}
    </div>
    </svelte:fragment>

    <svelte:fragment slot="remove" let:row>
    <form method="post" action="?/remove" use:enhance>
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
<form class="grid grid-cols-4 gap-4" method="post" action="?/add_course" enctype="multipart/form-data" use:enhance>
    <label class="label pt-4 col-span-2">
        <span>Course Number</span>
        <input class="input" name="course_number" id = course_number type="text" placeholder="CSCE101" required />
    </label>
    <label class="label pt-4 col-span-2">
        <span>Course Name</span>
        <input class="input" name="course_name" id = course_name type="text" placeholder="Intro to Computing" required />
    </label>
    <label class="label pt-4">
        <span>Start Date</span>
        <Flatpickr name="start_date" options={flatpickrOpts} />
    </label>
    <label class="label pt-4">
        <span>End Date</span>
        <Flatpickr name="end_date" options={flatpickrOpts} />
    </label>

    <label class="label pt-4">
        <span>Status</span>
        <select class="select" name="status" id="status" required>
          {#each ["active", "inactive", "archived"] as status}
          <option value={status}>{status}</option>
          {/each}
        </select>
    </label>
    <button type="submit" class="btn variant-filled-primary self-end">Submit</button>
</form>

{#if form?.course_message}
	<p>{form.course_message}</p>
{/if}
{#if form?.error}
	<p>{form.error}</p>
{/if}

<DatatableClient removeSlot={true} data={data.courseData} columns={["course_number", "course_name", "status", "start_date", "end_date"]} display_columns={["Course Number", "Course Name", "Status", "Start Date", "End Date"]}>
    <svelte:fragment slot="cell" let:row let:col>
    <div class="flex items-center gap-2">
      {#if editing?.id === row.course_id && editing?.col === col}
        {@const editor = (courseColumnConfig[col]?.editable) ? courseColumnConfig[col]?.editor?.(row) : {}}
        <form method="POST" action="?/update_course" class="w-full flex items-center gap-2">
          {#if editor.element}
          <svelte:element this={editor.element} {...editor.props}>
            {#each editor.childrens as children}
              <svelte:element this={children.element} {...children.props}>
                {children.children}
              </svelte:element>
            {/each}
          </svelte:element>
          {:else if editor.component}
          <svelte:component this={editor.component} {...editor.props} />
          {/if}
          <input type="hidden" name="courseId" value={row.course_id} />
          <button type="submit" class="text-green-600"><Check size={16} /></button>
          <button type="button" on:click={() => editing = null} class="text-red-600"><X size={16} /></button>
        </form>
      {:else}
        {@const display = courseColumnConfig[col]?.render?.(row) ?? {element: 'span', children: row[col]}}
        <div class="w-full flex justify-between">
        <svelte:element this={display.element} {...display.props}>
          {display.children}
        </svelte:element>
        {#if col in courseColumnConfig && courseColumnConfig[col].editable}
          <button on:click={() => editing = { id: row.course_id, col: col }}>
            <Pencil size={16} />
          </button>
        {/if}
        </div>
      {/if}
    </div>
    </svelte:fragment>

    <svelte:fragment slot="remove" let:row>
    <form method="post" action="?/remove_course" use:enhance>
        <input type="hidden" name="course_id" value={row.course_id}/>
        <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
            <Trash size={16} /> Remove
        </button>
    </form>
    </svelte:fragment>
</DatatableClient>
</div>
