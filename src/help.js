import commandLineUsage from 'command-line-usage';

import helpData from './cli-help-data.js';

export default function showHelp() {
    const helpOutput = commandLineUsage(helpData);

    console.log(helpOutput);
}