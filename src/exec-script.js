import { spawn } from 'child_process';
import { getStore } from './store.js';

const YARN = 'yarn';
const NPM = 'npm run';

function selectRunner(cliArgs, defaultRunner) {
    if (cliArgs.yarn || cliArgs.npm) {
        return cliArgs.yarn ? YARN : NPM;
    } else {
        return defaultRunner === YARN ? YARN : NPM;
    }

}

function getScriptArgs(args, runnerCommand) {
    const trimLeadingDashes = args.length > 0 && args.includes('--') && runnerCommand === YARN;

    return trimLeadingDashes ? args.slice(args.indexOf('--') + 1) : args;
}

function spawnScript(scriptName, { args = [], cliArgs = {}, runner }) {
    return new Promise(function (resolve, reject) {
        const runnerCommand = selectRunner(cliArgs, runner);

        const scriptArgs = getScriptArgs(args, runnerCommand);
        const command = `${runnerCommand} ${scriptName} ${scriptArgs.join(' ')}`;
        const [commandName, ...commandArgs] = command.trim().split(' ');

        const spawnProcess = spawn(commandName, commandArgs, { stdio: 'inherit' });

        spawnProcess.on('exit', function (code) {
            if (code === 0) {
                resolve(true);
            } else {
                reject(new Error(`Script exited with code ${code}`));
            }
        });
    })
}

export default function execScript(scriptName, { args = [], cliArgs = {} }) {
    const store = getStore();

    return store.get('runner')
        .then((runner) => spawnScript(scriptName, { args, cliArgs, runner }));
}