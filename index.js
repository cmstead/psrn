#!/usr/bin/env node

import { getCommandLineArgs } from "./src/command-line-service.js";
import { readScriptLines } from "./src/script-utils.js";
import selectScript from "./src/select-script.js";
import { prepareAndExecScript } from "./src/exec-script-service.js";

const inquirerForceQuitError = 'User force closed the prompt';

function errorAndExit(error) {
    if (error.message && !error.message.includes(inquirerForceQuitError)) {
        console.error(error);
    }

    console.log('\nExiting.');

    process.exit(1);
}

function main() {
    const cliArgs = getCommandLineArgs();

    console.log('Package script runner');

    readScriptLines()
        .then((scriptLines) => selectScript(scriptLines, { long: cliArgs.long }))
        .then((scriptName) => prepareAndExecScript(scriptName, cliArgs))
        .then(() => process.exit(0))
        .catch(errorAndExit);
}

process.on('unhandledRejection', errorAndExit)

main()