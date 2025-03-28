#!/usr/bin/env node

import { getDirname } from "./src/utils.js";
import { getCommandLineArgs } from "./src/command-line-service.js";
import getInfoFunctions from './src/info.js';
import { initStore } from './src/store.js';
import { errorAndExit } from './src/error.js';
import { runScript } from './src/script-service.js';
import { setArguments, setRunner } from "./src/config-service.js";

const __dirname = getDirname(import.meta.url);
const { showHelp, showVersion } = getInfoFunctions(__dirname);

initStore(__dirname);

const commands = {
    help: showHelp,
    version: showVersion,
    "set-runner": setRunner,
    "set-arguments-prompt": setArguments,
};

const findCommandName = (cliArgs) =>
    Object.keys(commands)
        .find(key => cliArgs?.[key]);

function main() {
    try {
        const cliArgs = getCommandLineArgs();
        const commandName = findCommandName(cliArgs);

        return commandName ? commands[commandName]() : runScript(cliArgs);
    } catch (error) {
        errorAndExit(error);
        process.exit(1);
    }
}

process.on('unhandledRejection', errorAndExit);
process.on('uncaughtException', errorAndExit);

main();