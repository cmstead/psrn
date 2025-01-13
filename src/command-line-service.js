import commandLineArgs from 'command-line-args';

import cliArgsOptions from "./cli-options.js";

export function getCommandLineArgs(args = process.argv.slice(2)) {
    return commandLineArgs(cliArgsOptions, { caseInsensitive: true, stopAtFirstUnknown: true, argv: args });
}
