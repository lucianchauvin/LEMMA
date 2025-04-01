<script lang="ts">
    export let data;

    import Book from '@lucide/svelte/icons/book'; 
    import KeyRound from '@lucide/svelte/icons/key-round'; 
</script>

<!-- {#if data.assignments.length > 0}
<ul class="assignments">
	{#each data.assignments as {assignment_name, username, course_name, grade, course_id}}

        <li>
            Course: <strong>{course_name}</strong>
            Assignment: <strong>{assignment_name}</strong>
            Student: <strong>{username}</strong>
            Grade: <strong>{grade}</strong>
        </li>

        {/each}
        
</ul>
{:else}
	<p>No assignments available.</p>
{/if} -->

<div class="table-wrapper pt-8 pr-3">
    <h1 class="text-xl font-bold flex items-center gap-2">
        <Book size={24} /> Grades
    </h1>

    <table class="border-collapse border border-black w-full mt-4">
        <thead>
            <tr>
                <!-- <th class = "p-3 text-center border border-black"> Student Name </th> -->
                <th class = "p-3 text-center border border-black"> Assignment Name </th>
                <th class="p-3 text-center border border-black">Grade</th>
            </tr>
        </thead>
        <tbody>
            {#each data.assignments as {username, assignment_name, grade}}
                    <tr>
                        <!-- <td class="p-3 text-center border border-black">
                            {username}
                        </td> -->

                        <td class="p-3 text-center border border-black">

                            {assignment_name}
                        </td>
    
                        <td class="p-3 text-center border border-black">

                            {grade}
                        </td>
                    </tr>
            {/each}
        </tbody>
    </table>
</div>
