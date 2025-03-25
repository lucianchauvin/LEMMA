<script lang="ts">
    let { data, form }: PageProps = $props();

    import { enhance } from "$app/forms";
    import { onMount } from 'svelte';

    import { AppBar, Tab, TabGroup } from '@skeletonlabs/skeleton';
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

    let editorRef;
    let infoviewRef;

    $effect(() => {
        activeTheoremCategory = (theorems.map(theorem => theorem.statement_category))[0];
        tempNewCategory = [];
    })
   
    const project = "mathlib-demo";
    
    onMount(() => {
        activeTheoremCategory = (theorems.map(theorem => theorem.statement_category))[0];

        const socketUrl = ((window.location.protocol === "https:") ? "wss://" : "ws://") +
        window.location.host + "/websocket/" + project;

        console.log(`[Lean4web] Socket url is ${socketUrl}`);

        import("lean4monaco").then(({ LeanMonaco, LeanMonacoEditor }) => {
            const options = {
                websocket: { url: socketUrl },
                htmlElement: editorRef,
                vscode: { "editor.wordWrap": true }
            };

            const leanMonaco = new LeanMonaco();
            const leanMonacoEditor = new LeanMonacoEditor();

            leanMonaco.setInfoviewElement(infoviewRef);

            leanMonaco.start(options).then(() => {
                leanMonacoEditor.start(editorRef, `/project/0.lean`, "");
            });
        });
    });
</script>

<div class="h-screen flex flex-col">

<AppBar regionRowMain="h-fit" background="bg-surface-900" padding="p-0" slotLead="text-primary-50" slotDefault="p-3 pl-0">
    <svelte:fragment slot="lead">
        <a href="{urlBase}" class="p-3"> <!-- TODO: Depends on the type of role user has -->
            <ArrowLeft size={48}/>
        </a>
        <span class="p-3 pl-0">
        <h2 class="h2 font-normal">{(data?.assignment) ? data?.assignment?.assignment_name : ''}</h2>
        </span>
    </svelte:fragment>
</AppBar>

<main class="h-full grid grid-cols-[1fr_4fr]">
    <div class="h-full bg-surface-100 flex flex-col">
    <div id="assignment-description" class="p-2">
        <p>{(data?.assignment) ? data?.assignment?.assignment_description : ''}</p>
    </div>

    <nav id="problem-selection" class="list-nav">
        <ul class="flex flex-col gap-1 p-1">
            {#each data.problems as problem, i}
            <li>
                <button onclick={() => activeProblem = i} 
                class="w-full flex justify-between p-1 rounded-full
                {(i == activeProblem) ? '!variant-filled-surface' : ''}">
                <span class="flex-auto text-xl">
                    {problem.problem_name}
                </span>
                <span>
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
            <div id="editor" bind:this={editorRef} class="h-full"></div>
            <div id="goal">
                <h3 class="h3">Current Goal</h3>
                {#if edit}
                <form 
                    action="?/problem" 
                    enctype="multipart/form-data" 
                    method="post" 
                    use:enhance={async ({formData, cancel}) => {
                        formData.set("problem_id", data.problems[activeProblem].problem_id);
                    }}
                >
                    <input type="file" name="file" accept=".lean" class="btn variant-filled" />
                    <button type="submit" class="btn variant-filled">Upload</button>
                </form>
                {#if form?.message}
                  <p>{form.message}</p>
                {/if}
                {#if form?.error}
                  <p>{form.error}</p>
                {/if}
                {/if}
                {problemFile}
            </div>
            <div id="editor-output" bind:this={infoviewRef} class="h-full"></div>
        </div>
        <div class="h-full p-2 bg-surface-100 grid grid-rows-[1fr_1fr_3fr]">
            <div>
            <h3 class="h3">Tactics</h3>
            <div class="flex flex-wrap gap-1">
            {#each tactics as tactic}
                <span class="chip variant-ringed">
                {tactic.statement_name}
                </span>
            {/each}
            </div>
            </div>
            <div>
            <h3 class="h3">Definitions</h3>
            <div class="flex flex-wrap gap-1">
            {#each definitions as definition}
                <span class="chip variant-ringed">
                {definition.statement_name}
                </span>
            {/each}
            </div>
            </div>
            <div>
            <h3 class="h3">Theorems</h3>
            <TabGroup>
                {#each new Set([...tempNewCategory, ...theoremCategories]) as category}
                <Tab bind:group={activeTheoremCategory} name={category} value={category}>
                {category}
                </Tab>
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
                    <button class="btn" type="submit">Submit</button>
                </form>
                {:else}
                <button onclick={() => addCategory = true} class="btn">
                    <Plus />
                </button>
                {/if}
                {/if}

                <div class="flex flex-wrap gap-1" slot="panel">
                {#each theorems.filter((s) => s.statement_category === activeTheoremCategory) as theorem}
                    <span class="chip variant-ringed">
                    {theorem.statement_name}
                    </span>
                {/each}
                {#if edit && theorems}
                    <button class="chip variant-ringed">
                    <Plus />
                    </button>
                {/if}
                </div>
            </TabGroup>
            </div>
        </div>
    </div>
</main>
</div>
