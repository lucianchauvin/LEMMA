<script>
    import {Text} from 'lucide-svelte';
    let username = "";
    let password = "";
</script>

<div class="flex justify-center items-center">
    <div class="w-96 p-6 rounded-lg shadow-md bg-white">
            <h2 class="text-2xl font-semibold text-center">Login</h2>

            <div class="mb-3">
                <label> Username: </label>
                <input type = "text" bind:value={username} placeholder="Enter your username" 
                class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>

            <div class="mb-3">
                <label> Password: </label>
                <input type = "text" bind:value={password} placeholder="Enter your password" 
                class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>

            <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-750 transition"> Log In </button>

            <div class="text-center mt-2">
                <a href="#" class="text-blue-500 hover:underline text-sm flex items-center justify-center">
                    <Text class="mr-1" /> Forgot Password?
                </a>
            </div>
    </div>
</div>
