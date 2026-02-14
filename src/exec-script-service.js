import execScript from "./exec-script.js";

import { input } from '@inquirer/prompts';
import { getStore } from "./store.js";
import { readPackageName } from "./package-utils.js";
import { tap } from "./utils.js";

function getArgumentsPrompt() {
    const store = getStore();
    const argumentsPrompt = {
        message: 'Enter additional arguments (space clears default arguments):'
    };

    return store.get("last-arguments")
        .then((lastArguments) => {
            if (!lastArguments) {
                return argumentsPrompt;
            }
            return { ...argumentsPrompt, default: lastArguments };
        })
        .catch((err) => {
            console.error("Error retrieving last arguments:", err);
            return argumentsPrompt;
        });
}

function getAdditionalArguments({ arguments: cliArguments, _unknown }) {
    const store = getStore();

    return store.get("arguments-prompt")
        .then((promptForArguments) => {
            return cliArguments || promptForArguments === 'true'
                ? getArgumentsPrompt()
                    .then((argumentsPrompt) => input(argumentsPrompt))
                    .then(tap((args) => store.set("last-arguments", args.trim())))
                    .then((args) => ['--', args.trim()])
                : Promise.resolve(_unknown);
        })
        .catch(() => Promise.resolve(_unknown));
}

function prepareAndExecScript(scriptName, cliArgs) {
    return getAdditionalArguments(cliArgs)
        .then((args) => execScript(scriptName, { args, cliArgs }));
}

/**
 * Stores the script name in the store and executes the script with the provided CLI arguments.
 *
 * @param {string} scriptName - The name of the script to store and execute.
 * @param {Object} cliArgs - The command-line arguments to pass to the script.
 * @returns {Promise<void>} A promise that resolves when the script is stored and executed.
 */
export function storeAndExecute(scriptName, cliArgs) {
    const store = getStore();

    return readPackageName()
        .then((packageName) => store.set(packageName, scriptName))
        .catch((err) => {
            console.error("Error storing script name:", err);
        })
        .then(() => prepareAndExecScript(scriptName, cliArgs));
}
