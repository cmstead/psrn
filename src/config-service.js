import { getStore } from "./store.js";
import { select } from '@inquirer/prompts';

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