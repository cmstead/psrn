import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const tap = (fn) => (value) => {
    fn(value);
    return value;
}

export function eitherAsync({ predicate, onPass, onFail }) {
    return predicate()
        .then((result) => result ? onPass() : onFail());
}

export function getDirname(url) {
    return dirname(fileURLToPath(url));
}