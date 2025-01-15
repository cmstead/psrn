#!/usr/bin/env node

import { getDirname } from "./src/utils.js";
import { getCommandLineArgs } from "./src/command-line-service.js";
import getInfoFunctions from './src/info.js';
import { initStore } from './src/store.js';
import { errorAndExit } from './src/error.js';
import { runScript } from './src/script-service.js';

const __dirname = getDirname(import.meta.url);
const { showHelp, showVersion } = getInfoFunctions(__dirname);

initStore(__dirname);

function main() {
    const cliArgs = getCommandLineArgs();

    if (cliArgs.help) {
        return showHelp();
    } else if (cliArgs.version) {
        return showVersion();
    } else {
        return runScript(cliArgs);
    }

}

process.on('unhandledRejection', errorAndExit)

main()