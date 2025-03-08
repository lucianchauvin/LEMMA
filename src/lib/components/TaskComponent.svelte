<script>
    import { fade, slide } from "svelte/transition"
    let { course_id, course_number, assignment_id, assignment_name, assignment_due_date, color, date_color } = $props();
  </script>
  
<div class="card bg-white card-hover border-t-2 border-b-4 border-r-4 border-black active:border-b-2 active:border-r-2 transition-all duration-100 overflow-hidden shadow-md shadow-surface-500 shadow-md shadow-surface-700 shadow-md shadow-surface-900" in:slide|global={{ delay: 300, duration: 300 }}>
    <a href="/home">
        <header style="box-shadow: inset 0.5em 0 {color};" class="py-1 flex flex-nowrap gap-20 max-w-80">
            <h3 class="assignment-name ml-4 basis-[50%] truncate">{assignment_name}</h3>
            <h3 style="color:{date_color};" class="min-w-20 mr-3 text-right">{assignment_due_date}</h3>
        </header>
    </a>
    <a href="/home">
        <div style="box-shadow: inset 0.5em 0 {color};" class="bg-white py-1 inline-block flex">
            <h4 class=" ml-4 text-gray-500">{course_number}</h4>
        </div>
    </a>
</div>
