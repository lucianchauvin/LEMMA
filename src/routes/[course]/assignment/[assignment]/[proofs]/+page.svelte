<script>
    export let data;
    import { haveHeader } from '$lib/stores/header';
    $haveHeader = false;

    import { AppBar } from '@skeletonlabs/skeleton';
    import { ArrowLeft } from 'lucide-svelte';

    const urlBase = `/${data.course.course_id}/assignment/${data.assignment.assignment_id}`;
</script>

<AppBar background="bg-surface-900" padding="p-0" slotLead="text-primary-100" slotDefault="p-3 pl-0">
    <svelte:fragment slot="lead">
        <a href="{urlBase}" class="p-3"> <!-- TODO: Depends on the type of role user has -->
            <ArrowLeft size={48}/>
        </a>
    </svelte:fragment>
    <h2 class="h2 text-primary-100">{(data?.assignment) ? data?.assignment?.assignment_name : ''}</h2>
</AppBar>

<main class="h-full grid grid-cols-[1fr_3fr_1fr]">
    <div class="h-full bg-primary-500"></div>
    <div class="h-full bg-secondary-500"></div>
    <div class="h-full bg-tetriary-500"></div>
</main>
