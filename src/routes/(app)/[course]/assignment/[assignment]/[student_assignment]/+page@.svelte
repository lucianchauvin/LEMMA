<script>
    export let data;
    import { onMount } from 'svelte';

    import { AppBar } from '@skeletonlabs/skeleton';
    import ArrowLeft from '@lucide/svelte/icons/arrow-left';

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;

    $: activeProblem = (data.problems.length > 0) ? 0 : null;
    $: problemFile = data.problems[activeProblem].proof_filepath
    $: statements = data.problems[activeProblem].statements
</script>

<div class="h-screen flex flex-col">

<AppBar regionRowMain="h-fit" background="bg-surface-900" padding="p-0" slotLead="text-primary-100" slotDefault="p-3 pl-0">
    <svelte:fragment slot="lead">
        <a href="{urlBase}" class="p-3"> <!-- TODO: Depends on the type of role user has -->
            <ArrowLeft size={48}/>
        </a>
    </svelte:fragment>
    <h2 class="h2 text-primary-100">{(data?.assignment) ? data?.assignment?.assignment_name : ''}</h2>
</AppBar>

<main class="h-full grid grid-cols-[1fr_4fr]">
    <div class="h-full bg-surface-200 flex flex-col">
    <div id="assignment-description" class="p-2">
        <p>{(data?.assignment) ? data?.assignment?.assignment_description : ''}</p>
    </div>

    <nav id="problem-selection" class="list-nav">
        <ul class="flex flex-col gap-2 p-2">
            {#each data.problems as problem, i}
            <li>
                <button on:click={activeProblem = i} 
                class="w-full
                {(i == activeProblem) ? '!variant-filled-primary' : ''}">
                <span class="flex-auto">
                    {problem.problem_name}
                </span>
                </button>
            </li>
            {/each}
        </ul>        
    </nav>
    </div>
    
    <div class="h-full grid grid-cols-[3fr_1fr]">
        <div class="h-full bg-surface-50 grid grid-rows-3">
            <div id="editor">
                <textarea class="textarea resize-none p-2 h-full" placeholder="Enter some long form content."></textarea>
            </div>
            <div id="goal">
                <h3 class="h3">Current Goal</h3>
                <p>{problemFile}</p>
            </div>
            <div id="editor-output">
                
            </div>
        </div>
        <div class="h-full bg-surface-200">
            {statements}
        </div>
    </div>
</main>
</div>
