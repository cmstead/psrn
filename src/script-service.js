import { readScriptLines } from "./package-utils.js";
import selectScript from "./select-script.js";
import { eitherAsync } from './utils.js';
import { storeAndExecute } from './exec-script-service.js';
import { errorAndExit } from './error.js';
import { getCommandLineArgs } from './command-line-service.js';

function isPromptedScriptRun(cliArgs) {
    const isUnprompted = Object.keys(cliArgs).length === 1 && !!cliArgs._unknown && cliArgs._unknown[0] !== '--';

    return Promise.resolve(!isUnprompted);
}

function runPrompted(cliArgs) {
    console.log('Package script runner');

    return readScriptLines()
        .then((scriptLines) => selectScript(scriptLines, { long: cliArgs.long }))
        .then((scriptName) => storeAndExecute(scriptName, cliArgs))
        .then(() => process.exit(0))
        .catch(errorAndExit);
}

function runUnprompted(cliArgs) {
    const scriptName = cliArgs._unknown.shift();
    const newCliArgs = getCommandLineArgs(cliArgs._unknown);

    storeAndExecute(scriptName, newCliArgs)
        .then(() => process.exit(0))
        .catch(errorAndExit);
}

/**
 * Executes a script based on the provided command-line arguments.
 *
 * Depending on whether the script requires user input, it will either
 * run in prompted mode or unprompted mode.
 *
 * @param {Object} cliArgs - The command-line arguments for the script.
 * @returns {Promise<void>} A promise that resolves when the script execution
 * is complete.
 */
export function runScript(cliArgs) {
    return eitherAsync({
        predicate: () => isPromptedScriptRun(cliArgs),
        onPass: () => runPrompted(cliArgs),
        onFail: () => runUnprompted(cliArgs)
    });
}
