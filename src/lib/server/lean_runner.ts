import { LEANBIN } from "$env/static/private"
import { exec } from "child_process";

/** 
 * @fileoverview
 * This module provides functionality to execute Lean files using a specified Lean binary.
 * It includes a function to run Lean scripts and capture the standard output and error output.
 * The function uses Node.js's `exec` method to invoke the Lean binary with the provided script.
 * 
 * This is part of a Learning Management System (LMS) for students to work on mathematical proofs
 * using Lean programming. The `run` function helps execute Lean files dynamically and retrieve
 * the results for further processing or display.
 *
 * Dependencies:
 * - Node.js child_process module (exec) for executing the Lean binary.
 * 
 * @module lean_runner
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

