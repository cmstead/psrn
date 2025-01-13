#!/usr/bin/env node
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getCommandLineArgs } from "./src/command-line-service.js";
import { readScriptLines } from "./src/script-utils.js";
import selectScript from "./src/select-script.js";
import { prepareAndExecScript } from "./src/exec-script-service.js";
import showHelp from './src/help.js';
import { readPackageJson } from './src/packagefs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inquirerForceQuitError = 'User force closed the prompt';

function isPrintableError(error) {
    const errorLine1 = error.toString().split('\n')[0];

    return (error.message
        && !errorLine1.includes(inquirerForceQuitError))
        || /yarn/.test(errorLine1);
}

function errorAndExit(error) {

    if (isPrintableError(error)) {
        console.error(error);
    }

    console.log('\nExiting.');

    process.exit(1);
}

function runMain(cliArgs) {
    console.log('Package script runner');

    return readScriptLines()
        .then((scriptLines) => selectScript(scriptLines, { long: cliArgs.long }))
        .then((scriptName) => prepareAndExecScript(scriptName, cliArgs))
        .then(() => process.exit(0))
        .catch(errorAndExit);

}

function showVersion() {
    return readPackageJson(__dirname)
        .then((packageJson) => console.log(packageJson.version))
        .catch(errorAndExit);
}

function main() {
    const cliArgs = getCommandLineArgs();

    if (cliArgs.help) {
        return showHelp();
    } else if (cliArgs.version) {
        return showVersion();
    } else {
        return runMain(cliArgs);
    }

}

process.on('unhandledRejection', errorAndExit)

main()