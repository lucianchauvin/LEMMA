<script lang="ts">
    let { data }: PageProps = $props();

    import { AppBar, Tabs } from '@skeletonlabs/skeleton-svelte';
    import ArrowLeft from '@lucide/svelte/icons/arrow-left';
    import Plus from '@lucide/svelte/icons/plus';
    import Circle from '@lucide/svelte/icons/circle';
    import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;

    const edit = data.studentAssignment.edit;

    let activeProblem = $state((data.problems.length > 0) ? 0 : null);
    const problemFile = $derived(data.problems[activeProblem].problem_filepath);
    const proofFile = $derived(data.problems[activeProblem].proof_filepath);
    const tactics = $derived(data.problems[activeProblem].statements.filter((s) => s.statement_type === 'tactic'));
    const definitions = $derived(data.problems[activeProblem].statements.filter((s) => s.statement_type === 'definition'));
    const theorems = $derived(data.problems[activeProblem].statements.filter((s) => s.statement_type === 'theorem'));
    const theoremCategories = $derived(new Set(theorems.map(theorem => theorem.statement_category)));

    let activeTheoremCategory = $state();

    let addCategory = $state(false);
    let addCategoryName = $state('');
    let tempNewCategory = $state([]);


    $effect(() => {
        activeTheoremCategory = (theorems.map(theorem => theorem.statement_category))[0];
        tempNewCategory = [];
    })
</script>

<div class="h-screen flex flex-col">

<AppBar regionRowMain="h-fit" background="bg-surface-900" padding="p-0">
    {#snippet lead()}
        <a href="{urlBase}" class="p-3 text-primary-50"> <!-- TODO: Depends on the type of role user has -->
            <ArrowLeft size={48}/>
        </a>
        <span class="p-3 pl-0">
        <h2 class="h2 font-normal text-primary-50">{(data?.assignment) ? data?.assignment?.assignment_name : ''}</h2>
        </span>
    {/snippet}
</AppBar>

<main class="h-full grid grid-cols-[1fr_4fr]">
    <div class="h-full bg-surface-100 flex flex-col">
    <div id="assignment-description" class="p-2">
        <p>{(data?.assignment) ? data?.assignment?.assignment_description : ''}</p>
    </div>

    <nav id="problem-selection" class="list-none">
        <ul class="flex flex-col p-1 gap-1">
            {#each data.problems as problem, i}
            <li>
                <button onclick={() => activeProblem = i} 
                class="w-full flex justify-between p-1 rounded-full
                {(i == activeProblem) ? '!preset-filled-surface-500' : ''}">
                <span class="flex-auto text-xl">
                    {problem.problem_name}
                </span>
                <span class="flex items-center pr-1">
                    {#if problem.complete}
                    <CircleCheckBig/>
                    {:else}
                    <Circle/>
                    {/if}
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
                <textarea class="textarea resize-none p-2 h-full" placeholder="Enter your proof of the problem">{(proofFile) ? proofFile : 'No proof saved yet'}</textarea>
            </div>
            <div id="goal" class="p-1">
                <h3 class="h3">Current Goal</h3>
                {problemFile}
            </div>
            <div id="editor-output">
                
            </div>
        </div>
        <div class="h-full p-2 bg-surface-100 grid grid-rows-[1fr_1fr_3fr]">
            <div>
            <h3 class="h3">Tactics</h3>
            <div class="flex flex-wrap gap-1">
            {#each tactics as tactic}
                <span class="chip preset-outlined">
                {tactic.statement_name}
                </span>
            {/each}
            </div>
            </div>
            <div>
            <h3 class="h3">Definitions</h3>
            <div class="flex flex-wrap gap-1">
            {#each definitions as definition}
                <span class="chip preset-outlined">
                {definition.statement_name}
                </span>
            {/each}
            </div>
            </div>
            <div>
            <h3 class="h3">Theorems</h3>
            <Tabs value={activeTheoremCategory} onValueChange={(e) => (activeTheoremCategory = e.value)}>
                {#snippet list()}
                {#each new Set([...tempNewCategory, ...theoremCategories]) as category}
                <Tabs.Control labelBase="btn hover:preset-tonal" name={category} value={category}>
                {category}
                </Tabs.Control>
                {/each}
                {#if edit}
                {#if addCategory}
                <form onsubmit={(e) => {
                    e.preventDefault();
                    if(addCategoryName)
                        tempNewCategory = [addCategoryName];
                
                    addCategory = false;
                    addCategoryName = '';
                }}
                    class="flex"
                >
                    <input size="5" class="input" type="text" bind:value={addCategoryName}/>
                    <button class="btn hover:preset-tonal" type="submit">Submit</button>
                </form>
                {:else}
                <button onclick={() => addCategory = true} class="btn hover:preset-tonal">
                    <Plus />
                </button>
                {/if}
                {/if}

                {/snippet}

                {#snippet content()}
                <Tabs.Panel classes="flex flex-wrap gap-1" value={activeTheoremCategory}>
                {#each theorems.filter((s) => s.statement_category === activeTheoremCategory) as theorem}
                    <span class="chip preset-outlined">
                    {theorem.statement_name}
                    </span>
                {/each}

                {#if edit && theorems}
                    <button class="btn px-1 preset-outlined">
                    <Plus />
                    </button>
                {/if}
                </Tabs.Panel>
                {/snippet}
            </Tabs>
            </div>
        </div>
    </div>
</main>
</div>
