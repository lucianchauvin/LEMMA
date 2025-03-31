import { LEANBIN } from "$env/static/private"
import { exec } from "child_process";


/**
 * Executes a Lean file using the specified Lean binary.
 * 
 * This function runs a Lean file and returns the standard output and error output.
 * The execution is performed using the `exec` function from Node.js.
 * 
 * @param {string} file - The file path of the Lean script to be executed.
 * @returns {Promise<{ stdout: string, stderr: string }>} - A promise resolving with the standard output and error output.
 * 
 * @example
 * run("example.lean")
 *   .then(result => console.log(result.stdout))
 *   .catch(error => console.error(error));
 */
export default async function run(file: string)
{
    return new Promise(function (resolve, reject)
    {
        const path = LEANBIN + " --run ";
        exec(path + file, (err, stdout, stderr) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                console.log(stdout);
                //console.log(stderr);
                resolve({ stdout, stderr });
            }
        });
    });
}

