<script lang="ts">
    import {Text} from 'lucide-svelte';
    import {goto} from '$app/navigation';
    
    import {page} from '$app/stores';
    const usersData = $page.data.users ?? [];
    export let data;
    
    let username = "";
    let password = "";

    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reload
        
        const user = usersData.find(u => u.username === username && u.password === password)
        if (user) {
            goto("/home"); 
        } else {
            alert("Invalid login credentials");
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="w-96 p-6 rounded-lg shadow-md bg-white">
        <h2 class="text-2xl font-semibold text-center">Welcome to LEMMA</h2>
        <p class="text-center text-gray-600 mb-4">Enter your username and password to continue</p>

        <form on:submit|preventDefault={handleSubmit} class="space-y-3">
            <div>
                <label> Username: </label>
                <input type = "text" bind:value={username} placeholder="Enter your username" 
                class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div>
                <label> Password: </label>
                <input type = "password" bind:value={password} placeholder="Enter your password" 
                class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>

            <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-750 transition"> Log In </button>
        </form>
        
        <div class="text-center mt-2">
            <a href="#" class="text-blue-500 hover:underline text-sm flex items-center justify-center">
                <Text class="mr-1" /> Forgot Password?
            </a>
        </div>
    </div>
</div>
