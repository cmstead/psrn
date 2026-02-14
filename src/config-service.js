import { getStore } from "./store.js";
import { select } from '@inquirer/prompts';

/**
 * Prompts the user to select a runner (e.g., npm or yarn) and saves the selection in the store.
 *
 * @returns {Promise<void>} A promise that resolves when the runner is set in the store.
 */
export function setRunner() {
    const store = getStore();

    return store.get('runner')
        .then((runner) => select({
            message: 'Select a runner',
            default: runner,
            choices: [
                'npm',
                'yarn'
            ]
        }))
        .then((selection) => {
            store.set('runner', selection);
        });
}

/**
 * Prompts the user to set whether arguments should be requested for all script runs
 * and saves the selection in the store.
 *
 * @returns {Promise<void>} A promise that resolves when the arguments-prompt setting is updated in the store.
 */
export function setArguments() {
    const store = getStore();

    return store.get('arguments-prompt')
        .then((argumentsPrompt) => select({
            message: 'Request arguments for all script runs',
            default: argumentsPrompt,
            choices: [
                'true',
                'false'
            ]
        }))
        .then((selection) => {
            store.set('arguments-prompt', selection);
        });
}