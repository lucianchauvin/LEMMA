export function isUUID(str: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

export function isUniqueViolation(error: string) {
    const match = error.match(/duplicate key value violates unique constraint "(\w+)_([\w]+)_key"/);
    return match ? match[2] : null;
}
