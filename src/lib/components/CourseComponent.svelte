<script>
    import { fade, slide } from "svelte/transition"
    let { course_id, course_number, course_name, color } = $props();

    import BookMarked from '@lucide/svelte/icons/book-marked'; 
    import BookCheck from '@lucide/svelte/icons/book-check'; 
    import SquareFunction from '@lucide/svelte/icons/square-function'; 
</script>

<div class="card preset-filled card-hover overflow-hidden inline-block relative flex-none shadow-lg shadow-surface-500 shadow-lg shadow-surface-700 shadow-lg shadow-surface-900" in:slide|global={{ delay: 300, duration: 300 }}>
  <a href="/{course_id}" class="flex flex-col">
      <header style="background-color:{color};" class="px-20 py-2 inline-block flex align-center justify-center">
          <h3>{course_number}</h3>
      </header>
      <div class="bg-white py-10 flex align-center justify-center items-center">
          <h3 class="text-black font-semibold">{course_name}</h3>
      </div>
  </a>
  <footer class="w-full flex justify-around">
      <button type="button" class="btn-icon">
          <a href="/{course_id}">
              <BookMarked />
          </a>
      </button>
      <button type="button" class="btn-icon">
          <a href="/{course_id}/grades">
              <BookCheck />
          </a>
      </button>
      <button type="button" class="btn-icon">
          <a href="/{course_id}/statements">
              <SquareFunction />
          </a>
      </button>
  </footer>
</div>
