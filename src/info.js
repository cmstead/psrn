import commandLineUsage from 'command-line-usage';

import helpData from './cli-help-data.js';
import readPackageJson from './packagefs.js';
import { errorAndExit } from './error.js';

/**
 * Provides utility functions for displaying help and version information.
 *
 * @param {string} __dirname - The directory name of the current module.
 * @returns {Object} An object containing `showHelp` and `showVersion` functions.
 */
export default function getInfoFunctions(__dirname) {
    function showHelp() {
        const helpOutput = commandLineUsage(helpData);
    
        console.log(helpOutput);
    }
    
    function showVersion() {
        return readPackageJson(__dirname)
            .then((packageJson) => console.log(packageJson.version))
            .catch(errorAndExit);
    }

    return {
        showHelp,
        showVersion
    };
}
