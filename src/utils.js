import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Executes a function with the provided value and returns the value.
 *
 * @param {Function} fn - A function to execute with the value.
 * @returns {Function} A function that takes a value, applies the function,
 * and returns the value.
 */
export const tap = (fn) => (value) => {
    fn(value);
    return value;
}

/**
 * Executes one of two asynchronous functions based on the result of a predicate.
 *
 * @param {Object} options - The options for the function.
 * @param {Function} options.predicate - An asynchronous function that returns
 * a boolean indicating which function to execute.
 * @param {Function} options.onPass - The function to execute if the predicate
 * resolves to true.
 * @param {Function} options.onFail - The function to execute if the predicate
 * resolves to false.
 * @returns {Promise<any>} A promise that resolves with the result of the
 * executed function.
 */
export function eitherAsync({ predicate, onPass, onFail }) {
    return predicate()
        .then((result) => result ? onPass() : onFail());
}

/**
 * Retrieves the directory name of the given module URL.
 *
 * @param {string} url - The module URL to extract the directory name from.
 * @returns {string} The directory name of the module.
 */
export function getDirname(url) {
    return dirname(fileURLToPath(url));
}