import commandLineArgs from 'command-line-args';

import cliArgsOptions from "./cli-options.js";

export function getCommandLineArgs() {
    const args = process.argv.slice(2);

    return commandLineArgs(cliArgsOptions, { caseInsensitive: true, stopAtFirstUnknown: true, argv: args });
}
