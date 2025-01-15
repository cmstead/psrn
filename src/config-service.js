import { getStore } from "./store.js";
import { select } from '@inquirer/prompts';

export default function setRunner() {
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