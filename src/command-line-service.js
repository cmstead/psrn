import commandLineArgs from 'command-line-args';

import cliArgsOptions from "./cli-options.js";


/**
 * Parses command line arguments using the specified options.
 *
 * @param {string[]} [args=process.argv.slice(2)] - The command line arguments to parse.
 * @returns {Object} The parsed command line arguments as an object.
 */
export function getCommandLineArgs(args = process.argv.slice(2)) {
    return commandLineArgs(cliArgsOptions, { caseInsensitive: true, stopAtFirstUnknown: true, argv: args });
}
