<script lang="ts">
    export let data;
    export let form;

    import { page } from '$app/stores';
    import { enhance } from "$app/forms";
    import { onDestroy, onMount } from 'svelte';

    import { AppBar, Tab, TabGroup } from '@skeletonlabs/skeleton';
    import ArrowLeft from '@lucide/svelte/icons/arrow-left';
    import Plus from '@lucide/svelte/icons/plus';
    import Circle from '@lucide/svelte/icons/circle';
    import Save from '@lucide/svelte/icons/save';
    import Trash from '@lucide/svelte/icons/trash';
    import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';

    const urlBase = `/${data.course.course_id}` + ((data.permissions.view_course_student_assignments.access) ? `/assignment/${data.assignment.assignment_id}`: '');

    const edit = data.studentAssignment.edit;

    $: activeProblem = (data.problems.length > 0) ? 0 : null;

    $: tactics = data.problems[activeProblem]?.statements?.filter((s) => s.statement_type === 'tactic') ?? [];
    $: definitions = data.problems[activeProblem]?.statements?.filter((s) => s.statement_type === 'definition') ?? [];
    $: theorems = data.problems[activeProblem]?.statements?.filter((s) => s.statement_type === 'theorem') ?? [];
    $: theoremCategories = new Set(theorems.map(theorem => theorem.statement_category)) ?? new Set();

    let activeTheoremCategory;

    let addingCategory = false;
    let addCategoryName = '';
    let tempNewCategory = [];

    let addingProblem = false;

    let editorRef;
    let infoviewRef;

    let leanMonaco;
    let leanMonacoEditor;
    let saveInterval;
    let interval = 5000;
    let isProcessing = false;

    let messageQueue: any[] = [];
    let isHandlingQueue = false;

    let goalCheckActive = false;
    let currentGoalId: number | null = null;
    let goalCheckTimeout: ReturnType<typeof setTimeout> | null = null;

    let pendingGoalCheck = false;
    let lastDiagnosticHadError = false;
    
    const project = "mathlib-demo";

    $: () => {
        activeTheoremCategory = (theorems.map(theorem => theorem.statement_category))[0];
        tempNewCategory = [];
    }

    async function load() {
        if(!data.problems || data.problems.length == 0)
            return '';

        while (isProcessing) await new Promise(resolve => setTimeout(resolve, 50));
        isProcessing = true;

        try {
            const response = await fetch('/apiv2/loadProof', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseId: data.course.course_id, 
                    proofId: data.problems[activeProblem].proof_id, 
                    problemId: data.problems[activeProblem].problem_id,
                    studentAssignmentId: $page.params.student_assignment
                })
            });
            let value = await response.json();
            isProcessing = false;
            return value['content'];
        } catch (e) {
            console.error("Failed to load file:", (e as Error).message);
            isProcessing = false;
            return '';
        }
    }

    async function save() {
        if(data.problems.length == 0)
            return;

        while (isProcessing) await new Promise(resolve => setTimeout(resolve, 50));
        isProcessing = true;

        console.log(`[Lean4web] Saving proof...`);
        try {
            const response = await fetch('/apiv2/saveProof', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseId: data.course.course_id, 
                    proofId: data.problems[activeProblem].proof_id, 
                    problemId: data.problems[activeProblem].problem_id, 
                    content: leanMonacoEditor.editor.getValue()
                })
            });
        } catch (e) {
            console.error("Failed to save file:", (e as Error).message);
        }
        isProcessing = false;
    }

    async function complete(){
        // don't go to database if already seen as complete client side
        if(data.problems[activeProblem].complete)
            return;

        const response = await fetch('/apiv2/completeProof', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                proofId: data.problems[activeProblem].proof_id
            })
        });

        data.problems[activeProblem].complete = true;
    }

    function enqueueMessage(msg) {
        messageQueue.push(msg);
        if (!isHandlingQueue) {
            handleQueue();
        }
    }

    async function handleQueue() {
        isHandlingQueue = true;
        while (messageQueue.length > 0) {
            const msg = messageQueue.shift();
            await processMessage(msg);
        }
        isHandlingQueue = false;
    }

    function hasUnsolvedGoals(diagnostics: any[]): boolean {
        return diagnostics.some((d) => d.message?.includes('unsolved goals'));
    }

    async function processMessage(msg: any) {
        const id = msg.id ?? -1;
        const diagnostics = msg?.params?.diagnostics;
        const goals = msg?.result?.goals;

        if (Array.isArray(goals) && goals.length === 0) {
            console.log(`[Lean4web] Empty goals at id ${id}, waiting for clean diagnostics...`);
            pendingGoalCheck = true;
            currentGoalId = id;
            lastDiagnosticHadError = false;
            goalCheckActive = true;

            if (goalCheckTimeout) clearTimeout(goalCheckTimeout);
            goalCheckTimeout = setTimeout(async () => {
                if (!lastDiagnosticHadError) {
                    console.log(`[Lean4web] Goal passed! No errors after empty goals.`);
                    await complete();
                } else {
                    console.log(`[Lean4web] Goal check failed: Diagnostics had errors`);
                }
                // Reset everything
                goalCheckActive = false;
                pendingGoalCheck = false;
                currentGoalId = null;
                lastDiagnosticHadError = false;
            }, 1000); // Adjust delay as needed
        }

        if (diagnostics) {
            const hadErrors = diagnostics.some((d) => d.severity >= 1 || hasUnsolvedGoals([d]));

            if (goalCheckActive) {
                if (hadErrors) {
                    lastDiagnosticHadError = true;
                    console.log(`[Lean4web] Received diagnostic with error during goal check`);
                } else {
                    console.log(`[Lean4web] Clean diagnostics received during goal check`);
                    lastDiagnosticHadError = false;
                }
            }
        }
    }
    
    onMount(async () => {
        activeTheoremCategory = (theorems.map(theorem => theorem.statement_category))[0];


        const socketUrl = ((window.location.protocol === "https:") ? "wss://" : "ws://") +
        window.location.host + "/websocket/" + project;

        console.log(`[Lean4web] Socket url is ${socketUrl}`);

        import("lean4monaco").then(async ({ LeanMonaco, LeanMonacoEditor }) => {
            const options = {
                websocket: { url: socketUrl },
                htmlElement: editorRef,
                vscode: { "editor.wordWrap": true }
            };

            leanMonaco = new LeanMonaco();
            leanMonacoEditor = new LeanMonacoEditor();

            leanMonaco.setInfoviewElement(infoviewRef);
            const proofCont = await load();
            leanMonaco.start(options, enqueueMessage).then(() => {
                leanMonacoEditor.start(editorRef, `/project/scratch.lean`, proofCont);
            });
        });

        saveInterval = setInterval(save, interval);
    });

    onDestroy(() => {
        clearInterval(saveInterval);
    })
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
    <div class="h-full bg-surface-100 relative">
    <div class="flex flex-col">
    <div id="assignment-description" class="p-2">
        {#if edit}
        <form method="post" action="?/description" enctype="multipart/form-data" use:enhance class="flex flex-col">
        <textarea id="description-textarea" name="description" rows="10">{data?.assignment?.assignment_description ?? ''}</textarea>
        <button type="submit" class="btn variant-filled">Save</button>
        </form>
        {:else}
        <p>{data?.assignment?.assignment_description ?? ''}</p>
        {/if}
    </div>

    <nav id="problem-selection" class="list-nav">
        <ul class="flex flex-col gap-1 p-1">
            {#each data.problems as problem, i}
            <li class="flex items-center">
                <button onclick={async () => {
                        await save();
                        activeProblem = i; 
                        leanMonacoEditor.editor.setValue(await load());
                    } 
                }
                class="flex-1 flex justify-between
                {(i == activeProblem) ? '!variant-filled-surface' : ''}">
                <span class="flex-auto text-xl">
                    {problem.problem_name}
                </span>
                <span>
                    {#if !edit}
                        {#if problem.complete}
                        <CircleCheckBig/>
                        {:else}
                        <Circle/>
                        {/if}
                    {/if}
                </span>
                </button>
                {#if edit}
                    <form method="post" action="?/deleteProblem" enctype="multipart/form-data">
                        <input type="hidden" name="problemId" value={problem.problem_id} />
                        <button type="submit" class="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 p-2">
                            <Trash size={16} />
                        </button>
                    </form>
                {/if}
            </li>
            {/each}
            {#if edit & addingProblem}
            <li class="w-full">
                <form 
                method="post" 
                action="?/problemName" 
                enctype="multipart/form-data"
                class="flex justify-center gap-2" 
                use:enhance={() => {
                return async ({ update }) => {
                    await update();
                    addingProblem = false;
                }}}
                >
                <input id="problem-field" name="problemName" class="w-2/3"/>
                <button type="submit" class="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1">
                    <Save size={20} />
                </button>
                </form>
            </li>
            {/if}
        </ul>
    </nav>
    </div>
    {#if edit}
    <div class="w-full absolute bottom-0 p-2">
    <div class="flex flex-row-reverse">
        <button onclick={() => addingProblem = !addingProblem}>
            <Plus size={36}/>
        </button>
    </div>
    </div>
    {/if}
    </div>
    
    <div class="h-full grid grid-cols-[3fr_1fr]">
        <div class="h-full bg-surface-50 relative">
            <div class="h-full flex flex-col">
                <div id="editor" bind:this={editorRef} class="flex-1"></div>
                <div id="editor-output" bind:this={infoviewRef} class="flex-1"></div>
            </div>
            <div class="w-full absolute bottom-0 p-2">
                <div class="flex justify-between">
                <p>{form?.message ?? ''}</p>
                {#if form?.error}
                  <p>{form.error}</p>
                {/if}
                <div class="flex">
                {#if edit && activeProblem !== null}
                <form 
                method="post" 
                action="?/saveProblem" 
                enc="multipart/form-data" 
                use:enhance={({formData}) => {
                    formData.set('content', leanMonacoEditor.editor.getValue());
                }}>
                <input type="hidden" name="problemId" value={data.problems[activeProblem]?.problem_id ?? ''} />
                <button class="btn variant-filled" type="submit">Save as Problem</button>
                </form>
                {/if}
                {#if activeProblem !== null}
                <button 
                class="btn variant-filled"
                onclick={async () => {
                    data.problems[activeProblem].proof_id = null;
                    leanMonacoEditor.editor.setValue(await load());
                    await save();
                }}>Reset</button>
                {/if}
                </div>
                </div>
            </div>
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
                {#if addingCategory}
                <form onsubmit={(e) => {
                    e.preventDefault();
                    if(addCategoryName)
                        tempNewCategory = [addCategoryName];
                
                    addingCategory = false;
                    addCategoryName = '';
                }}
                    class="flex"
                >
                    <input size="5" class="input" type="text" bind:value={addCategoryName}/>
                    <button class="btn" type="submit">Submit</button>
                </form>
                {:else}
                <button onclick={() => addingCategory = true} class="btn">
                    <Plus />
                </button>
                {/if}
                {/if}

                <div class="flex flex-wrap gap-1" slot="panel">
                {#each theorems?.filter((s) => s.statement_category === activeTheoremCategory) as theorem}
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
