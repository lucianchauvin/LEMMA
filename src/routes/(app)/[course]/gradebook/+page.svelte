<script>
    import {Book, KeyRound} from '@lucide/svelte';

    import { page } from '$app/stores';
    const usersRoleData = $page.data.user_roles ?? [];
    const usersData = $page.data.users ?? [];
    const assignmentsData = $page.data.assignments ?? [];
    const studentAssignmentsData = $page.data.student_assignments ?? [];
    export let data;
    
    //filter users who are students
    const students = usersData.filter(user => {
        return usersRoleData.some(role => role.user_id === user.user_id && role.role_name === 'student')
    });

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


<div class="table-container">
    <h1 class="text-xl font-bold flex items-center gap-2">
        <Book size={24} /> Gradebook
    </h1>

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
            {#each students as student}
                <tr>
                    <td class="p-3 text-center">{student.first_name} {student.last_name}</td>
                    {#each assignmentsData as assignments}
                        <td class="p-3 text-center">
                            {fetchGrade(student.user_id, assignments.assignment_id)}
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
</div>
