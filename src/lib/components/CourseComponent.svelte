<script>
    import { fade, slide } from "svelte/transition"
    let { course_id, course_number, course_name, color, permissions, student } = $props();

    import BookMarked from '@lucide/svelte/icons/book-marked'; 
    import BookCheck from '@lucide/svelte/icons/book-check'; 
    import SquareFunction from '@lucide/svelte/icons/square-function'; 
</script>

<div class="card variant-filled card-hover overflow-hidden inline-block relative flex-none shadow-lg shadow-surface-500 shadow-lg shadow-surface-700 shadow-lg shadow-surface-900" in:slide|global={{ delay: 300, duration: 300 }}>
  <a href="/{course_id}">
      <header style="background-color:{color};" class="px-20 py-2 inline-block flex align-center justify-center">
          <h3>{course_number}</h3>
      </header>
  </a>
  <a href="/{course_id}">
      <div class="bg-white py-10 inline-block flex align-center justify-center items-center">
          <h3 class="text-black text-center font-semibold">{course_name}</h3>
      </div>
  </a>
  <footer>
      <div class="inline-block flex flex-wrap gap-5 align-center justify-center">
          <button type="button" class="btn-icon">
              <a href="/{course_id}" class="assignments">
                  <BookMarked />
              </a>
          </button>
          {#if student}
          <button type="button" class="btn-icon">
              <a href="/{course_id}/grades" class="grades">
                  <BookCheck />
              </a>
          </button>
          {/if}
          {#if permissions?.view_course_grades?.access}
          <button type="button" class="btn-icon">
              <a href="/{course_id}/gradebook" class="">
                  <BookCheck />
              </a>
          </button>
          {/if}

          {#if permissions?.view_course_statements?.access}
          <button type="button" class="btn-icon">
              <a href="/{course_id}/statements" class="statements">
                  <SquareFunction />
              </a>
          </button>
          {/if}
      </div>
  </footer>
</div>
