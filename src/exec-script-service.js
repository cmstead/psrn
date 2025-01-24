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
        .then((lastArguments) => lastArguments ? { ...argumentsPrompt, default: lastArguments } : argumentsPrompt);
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

export function storeAndExecute(scriptName, cliArgs) {
    const store = getStore();

    return readPackageName()
        .then((packageName) => {
            return store.set(packageName, scriptName)
        })
        .then(() => prepareAndExecScript(scriptName, cliArgs));
}
