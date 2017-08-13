import * as path from 'path';

export function root(...paths: string[]) {
    return path.join(__dirname, '..', ...paths);
}

export function getEnv() {
    return process.env.NODE_ENV || '';
}

export function invariant(conditions: boolean, message: string) {
    if (!conditions) throw new Error(message);
}
