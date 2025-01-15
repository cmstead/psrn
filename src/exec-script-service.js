import execScript from "./exec-script.js";

import { input } from '@inquirer/prompts';
import { getStore } from "./store.js";
import { readPackageName } from "./package-utils.js";

const argumentsPrompt = {
    message: 'Enter additional arguments (separated by space):'
};

function getAdditionalArguments({ arguments: cliArguments, _unknown }) {
    return cliArguments
        ? input(argumentsPrompt)
            .then((args) => ['--', args])
        : Promise.resolve(_unknown)
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
