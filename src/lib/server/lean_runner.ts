import { LEANBIN } from "$env/static/private"
import { exec } from "child_process";

/**
 * @fileoverview Lean Script Runner
 * 
 * This module provides functionality for dynamically executing Lean files using a specified Lean binary.
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

