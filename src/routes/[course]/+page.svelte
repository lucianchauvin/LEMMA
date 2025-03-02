<script lang="ts">
    import {AppRail, AppRailAnchor} from '@skeletonlabs/skeleton';
    import {page} from '$app/stores';

    const assignmentsData = [
        { position: 1, name: 'HW 1', dueDate: '2025-02-28', status: 'Completed' },
        { position: 2, name: 'HW 2', dueDate: '2025-03-05', status: 'Incomplete' },
        { position: 3, name: 'HW 3', dueDate: '2025-03-12', status: 'Completed' },
    ];

</script>

<div class="table-wrapper">
    <table class="table border border-gray-200 shadow-lg rounded-lg w-full">
        <thead class="bg-gray-100">
            <tr>
                <th class="p-3 ">Assignment Name</th>
                <th class="p-3 ">Due Date</th>
                <th class="p-3 ">Status</th>
            </tr>
        </thead>
        <tbody>
            {#each assignmentsData as assignment}
                <tr class="border-t border-gray-300">
                    <td class="p-3">{assignment.name}</td>
                    <td class="p-3">{assignment.dueDate}</td>
                    <td class="p-3">{assignment.status}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<AppRail>
    <AppRailAnchor href="">
        <svelte:fragment slot="lead">
            <img src="Hamburger_Icon.png" alt="Hamburger Icon" width=60px height=60px>
        </svelte:fragment>
    </AppRailAnchor>

    <AppRailAnchor href="/" title="Home" class="home-link" selected={$page.url.pathname === "/"}>
        <svelte:fragment slot="lead">
            <img src="/House_Icon.png" alt="Home" width=60px height=60px>
        </svelte:fragment>
        <div>Home</div>
    </AppRailAnchor>

    <AppRailAnchor href="/grades" title="Grades" selected={$page.url.pathname === "/grades"}>
        <svelte:fragment slot="lead">
            <img src="/CheckMark.png" alt="Grades" width=60px height=60px>
        </svelte:fragment>
        <div>Grades</div>
    </AppRailAnchor>

    <AppRailAnchor href="/gradebook" title="GradeBook" selected={$page.url.pathname === "/gradebook"}>
        <svelte:fragment slot="lead">
            <img src="/GradeBook.png" alt="Grade Book" width=60px height=60px>
        </svelte:fragment>
        <div>Grade Book</div>
    </AppRailAnchor>

    <AppRailAnchor href="/students" title="Students" selected={$page.url.pathname === "/students"}>
        <svelte:fragment slot="lead">
            <img src="/Student.png" alt="Students" width=60px height=60px>
        </svelte:fragment>
        <div>Students</div>
    </AppRailAnchor>

    <AppRailAnchor href="/statements" title="Statements" selected={$page.url.pathname === "/statements"}>
        <svelte:fragment slot="lead">    
            <img src="/LightBulb.png" alt="Statements" width=60px height=60px>
        </svelte:fragment>
        <div>Statements</div>
    </AppRailAnchor>
</AppRail>


<style>
    .table-wrapper {
        position: absolute;  
        margin-top: 100px;   
        margin-left: 300px;  
        width: 800px;        
        height: 500px;       
        overflow: auto;
    }
</style>
