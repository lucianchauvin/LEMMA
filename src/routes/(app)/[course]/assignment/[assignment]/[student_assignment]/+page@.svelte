<script>
    export let data;
    import { onMount } from 'svelte';

    import { AppBar, Tab, TabGroup } from '@skeletonlabs/skeleton';
    import { ArrowLeft } from 'lucide-svelte';

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;

    $: activeProblem = (data.problems.length > 0) ? 0 : null;
</script>

<div class="h-screen">

<AppBar background="bg-surface-900" padding="p-0" slotLead="text-primary-100" slotDefault="p-3 pl-0">
    <svelte:fragment slot="lead">
        <a href="{urlBase}" class="p-3"> <!-- TODO: Depends on the type of role user has -->
            <ArrowLeft size={48}/>
        </a>
    </svelte:fragment>
    <h2 class="h2 text-primary-100">{(data?.assignment) ? data?.assignment?.assignment_name : ''}</h2>
</AppBar>

<main class="h-full grid grid-cols-[1fr_4fr]">
    <TabGroup class="bg-surface-200">
        {#each data.problems as problem, i}
            {console.log(problem)}
            <Tab bind:group={activeProblem} name="{problem.problem_name}" value={i}>
                <span>{problem.problem_name}</span>
            </Tab>
        {/each}
    </TabGroup>

    <!-- <nav id="problem-selection" class="h-full bg-surface-200 list-nav"> -->
    <!--     <ul> -->
    <!--         {#each data.problems as problem, i} -->
    <!--         <li> -->
    <!--             <a on:click={activeProblem = i} class="{(activeProblem == i) ? '!variant-filled-primary' : ''}"> -->
    <!--                 {problem.problem.problem_name} -->
    <!--             </a> -->
    <!--         </li> -->
    <!--         {/each} -->
    <!--     </ul>         -->
    <!-- </nav> -->
    <!--  -->
    <div class="h-full grid grid-cols-[3fr_1fr]">
        <div class="h-full bg-surface-50">

        </div>
        <div class="h-full bg-surface-200">

        </div>
    </div>
</main>
</div>
