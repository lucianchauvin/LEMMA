<script>
    import forms from "@tailwindcss/forms"
</script>

<h2 class="h2 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Course Statements</h2>

<div class="table-wrapper pt-8 pr-3">
    <table class="table border border-gray-200 shadow-lg rounded-lg">
        <thead class="bg-gray-100">
            <tr>
                <th class="p-3 "><center> Statement ID </center></th>
                <th class="p-3 "><center> Statement Name </center></th>
                <th class="p-3 "><center> Statement Type </center></th>
                <th class="p-3 "><center> Statement Description </center></th>
                <th class="p-3 "><center> Statement Category </center></th>
            </tr>
        </thead>
        <tbody>
                <tr class="border-t border-gray-300">
                    <td class="p-3"> <center> 12345678 </center> </td>
                    <td class="p-3"> <center> succ_eq_add_one </center></td>
                    <td class="p-3"> <center> Theorem </center></td>
                    <td class="p-3"> <center> For all natural numbers a, we have succ(a) = a + 1</center></td>
                    <td class="p-3"> <center> Number Theory </center></td>
                </tr>
        </tbody>
    </table>
</div>

<h2 class="h2 pt-8 pb-3 ml-2 font-semibold border-b-2 border-surface-200">Add A Statement</h2>

<label class="label pt-4">
    <span>Statement Name</span>
    <input class="input" type="text" placeholder="  Statement Name" />
</label>


<label class="label pt-2">
	<span>Statement Type</span>
	<select class="select">
		<option value="1">Tactic</option>
		<option value="2">Definition</option>
		<option value="3">Theorem</option>
	</select>
</label>

<label class="label pt-2">
	<span>Statement Description</span>
	<textarea class="textarea" rows="4" placeholder="  Statement Description" />
</label>		

<label class="label pt-4">
    <span>Statement Category</span>
    <input class="input" type="text" placeholder="  Statement Category" />
</label>

<label class="label pt-4">
    <span>Upload Lean File for Statement</span>
    <input class="input" type="file" />
</label>

<button type="button" class="btn variant-filled-primary mt-8">Submit</button>
<button type="button" class="btn variant-filled-error mt-8">Clear All Fields</button>
