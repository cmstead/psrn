const inquirerForceQuitError = 'User force closed the prompt';

function isPrintableError(error) {
    const errorLine1 = error.toString().split('\n')[0];

    return (error.message
        && !errorLine1.includes(inquirerForceQuitError))
        || /yarn/.test(errorLine1);
}

export function errorAndExit(error) {

    if (isPrintableError(error)) {
        console.error(error);
    }

    console.log('\nExiting.');

    process.exit(1);
}

