<script>
    export let data;
    import { onMount } from 'svelte';
    import { haveHeader } from '$lib/stores/header';

    import { AppBar } from '@skeletonlabs/skeleton';
    import { ArrowLeft } from 'lucide-svelte';

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;

    $: problemActive = null;

    onMount(() => {
        // on load set that don't have header (needed if reload page)
        haveHeader.set(false);
        if(data.proofs.length > 0){
            problemActive = data.proofs[0]
        }
    });
</script>

<AppBar background="bg-surface-900" padding="p-0" slotLead="text-primary-100" slotDefault="p-3 pl-0">
    <svelte:fragment slot="lead">
        <a href="{urlBase}" class="p-3"> <!-- TODO: Depends on the type of role user has -->
            <ArrowLeft size={48}/>
        </a>
    </svelte:fragment>
    <h2 class="h2 text-primary-100">{(data?.assignment) ? data?.assignment?.assignment_name : ''}</h2>
</AppBar>

<main class="h-full grid grid-cols-[1fr_4fr]">
    <div id="problem-selection" class="h-full bg-surface-200">
        
    </div>

    <div class="h-full grid grid-cols-[3fr_1fr]">
        {#each data.problems as problem}
        <div class="h-full bg-surface-50">

        </div>
        <div class="h-full bg-surface-200">

        </div>
        {/each}
    </div>
</main>
