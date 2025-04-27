<script>
    import Book from '@lucide/svelte/icons/book';
    import Keyround from '@lucide/svelte/icons/key-round';
    import Save from '@lucide/svelte/icons/save';
    import {enhance} from '$app/forms';

    export let data;
    const assignmentsData = data.assignments ?? [];
    $:studentAssignmentsData = data.student_assignments ?? [];
    
    function handleSubmit(event) {
        // Prevent default form submission if using custom handling
        event.preventDefault();

        // Submit the form via the enhance directive
        const form = event.target;
        // Disable the submit button to avoid multiple submissions
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;

        // Use fetch to submit the form asynchronously
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            if (response.ok || response.status === 204) {
                // Wait a bit to ensure the server has processed the form before reloading
                setTimeout(() => {
                    window.location.reload();
                }, 500); 
            } else {
                // If the response is not OK, show a message (but don't reload)
                console.error('Error saving grades:', response);
            }
        })
        .catch(error => {
            // Handle fetch network error (e.g., connection issue)
            console.error('Network error:', error);
        })
        .finally(() => {
            // Enable the submit button again
            if (submitButton) submitButton.disabled = false;
        });
    }

    function fetchGrade(studentID, assignmentID)    {
        const studentAssignment = studentAssignmentsData.find(sa => sa.student_id === studentID && sa.assignment_id === assignmentID);
    
        if (studentAssignment) {
            return studentAssignment.grade;
        } 
        return '-';
    }

    function determineLetterGrade(grades)   {
        if (grades.length === 0)    
            return 'N/A';
        
        //parameter a is accumulator while parameter b is the current element
        const avg = grades.reduce((a, b) => a + b, 0) / grades.length; 
        if (avg < 60)
            return 'F';
        else if (avg < 70)
            return 'D';
        else if (avg < 80)
            return 'C';
        else if (avg < 90)
            return 'B';
        return 'A';
    }
</script>

<div class="flex flex-col gap-4">
<h1 class="h1 text-3xl font-bold flex items-center gap-2">
    <Book size={30} /> 
    <p>Course Assignments</p>
</h1>
<hr>

<form method="POST" action="?/editGrades" use:enhance class="flex flex-col" on:submit={handleSubmit}>
    <table class="table table-hover mt-4">
        <thead>
            <tr>
                <th class = "p-3 text-center"> Student Name </th>
                {#each assignmentsData as assignments}
                    <th class = "p-3 text-center"> {assignments.assignment_name} </th>
                {/each}
                <th class="p-3 text-center">Letter Grade</th>
            </tr>
        </thead>
        <tbody>
            {#each data.students as student}
                <tr>
                    <td class="p-3 text-center">{student.first_name} {student.last_name}</td>
                    {#each assignmentsData as assignments}
                        <td class="p-3 text-center">
                            <div class="flex items-center gap-4 justify-center">
                                    <input type="hidden" name="student_id" value={student.user_id} />
                                    <input type="hidden" name="assignment_id" value={assignments.assignment_id} />
                                    <input type="" name="grade" value={fetchGrade(student.user_id, assignments.assignment_id)}
                                    class = "w-16 text-center border rounded px-2 py-1" />
                            </div>
                        </td>
                    {/each}
                    <td class="p-3 text-center">
                        {determineLetterGrade(
                            assignmentsData.map(assignment => fetchGrade(student.user_id, assignment.assignment_id))
                            .filter(grade => grade !== '-').map(Number)
                        )}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <div class="mt-4 flex justify-end">
        <button type="submit" class="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1">
            <Save size={20} /> Save All Grades
        </button>
    </div>
</form>
</div>
