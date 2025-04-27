import { hash } from "@node-rs/argon2";

type errorRet = {error: string | null}
type dataRet = 
    | {data: string, error: null}
    | {data: null, error: string}

export function isUUID(str: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

export function isUniqueViolation(error: string) {
    const match = error.match(/duplicate key value violates unique constraint "(\w+)_([\w]+)_key"/);
    return match ? match[2] : null;
}

export async function handleUsername(username: string): Promise<errorRet> {
    if(username.length < 3 || username.length > 31) 
        return {error: "Invalid username: Username must be between 3 and 31 characters long"}
    
    if (!/^[a-z0-9_-]+$/.test(username))
        return {error: " and contain only lowercase letters, numbers, underscores, and dashes."}

    return {error: null};
}

export async function handlePassword(password: string): Promise<dataRet> {
    if (password.length < 6) 
        return {
            data: null,
            error: "Invalid Password: Password must be at least 6 characters long"};
    
    if (password.length > 255) 
        return {
            data: null,
            error: "Invalid Password: Password must not exceed 255 characters"
        }

    // Hash passwords
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    return {data: passwordHash, error: null};
}

export function capitalize(val: string): string {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
