import commandLineUsage from 'command-line-usage';

import helpData from './cli-help-data.js';
import readPackageJson from './packagefs.js';
import { errorAndExit } from './error.js';

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
