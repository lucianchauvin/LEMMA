import { LEANBIN } from "$env/static/private"
import { exec } from "child_process";

// Unsure how Lean file will be passed into the function, assuming a string (file path) will be given
// Puts output to console.log for now
// Does not connect to database for now (unsure if this file will even handle that)
async function run(file: string)
{
    return new Promise(function (resolve, reject)
    {
        const path = LEANBIN.replaceAll("\\", "/") + "/lean --run ";
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


async function main()
{
    let { stdout } = await run("../../test.lean");
}

main();

