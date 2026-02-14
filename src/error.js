const inquirerForceQuitError = 'User force closed the prompt';

function isPrintableError(error) {
    const errorLine1 = error.toString().split('\n')[0];

    return (error.message
        && !errorLine1.includes(inquirerForceQuitError))
        || /yarn/.test(errorLine1);
}

/**
 * Logs an error message to the console (if printable) and exits the process.
 *
 * @param {Error|string} error - The error to log and handle. If the error is
 * printable, it will be logged to the console. Otherwise, only an exit message
 * will be displayed.
 */
export function errorAndExit(error) {

    if (isPrintableError(error)) {
        console.error(error);
    }

    console.log('\nExiting.');

    process.exit(1);
}

