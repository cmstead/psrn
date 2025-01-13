import { exec } from 'child_process';

export default function execScript(scriptName, { args = [], cliArgs = {} }) {
    return new Promise(function (resolve, reject) {
        let finalArgs = args;
        const runner = cliArgs.yarn ? 'yarn' : 'npm run';

        if (args.length > 0 && args.includes('--') && cliArgs.yarn) {
            finalArgs = args.slice(args.indexOf('--') + 1);
        }

        const command = `${runner} ${scriptName} ${finalArgs.join(' ')}`;

        const execProcess = exec(command, function (error) {
            if (error) {
                reject(error.message);
            }

            resolve(true);
        });

        execProcess.stdout.pipe(process.stdout);
        execProcess.stderr.pipe(process.stderr);
    })
}