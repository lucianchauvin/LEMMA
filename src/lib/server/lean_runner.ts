import { exec } from "child_process";

// Unsure how Lean file will be passed into the function, assuming a string (file path) will be given
// Puts output to console.log for now
// Does not connect to database for now (unsure if this file will even handle that)
async function run(file)
{
    return new Promise(function (resolve, reject)
    {
        exec("lean --run " + file, (err, stdout, stderr) =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve({ stdout, stderr });
            }
        });
    });
}

async function main()
{
    let { stdout } = await run("../../test.lean");
    for (const line in stdout.split("\n"))
    {
        console.log(line);
    }
}

main();

