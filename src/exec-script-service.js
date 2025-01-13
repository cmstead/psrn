import execScript from "./exec-script.js";

import { input } from '@inquirer/prompts';

const argumentsPrompt = {
    message: 'Enter additional arguments (separated by space):'
};

function getAdditionalArguments({ arguments: cliArguments, _unknown }) {
    return cliArguments
        ? input(argumentsPrompt)
            .then((args) => ['--', args])
        : Promise.resolve(_unknown)
}

export function prepareAndExecScript(scriptName, cliArgs) {
    return getAdditionalArguments(cliArgs)
        .then((args) => execScript(scriptName, { args }));
}