import { spawn } from 'child_process';

export default function execScript(scriptName, { args = [], cliArgs = {} }) {
    return new Promise(function (resolve, reject) {
        let finalArgs = args;
        const runner = cliArgs.yarn ? 'yarn' : 'npm run';

        if (args.length > 0 && args.includes('--') && cliArgs.yarn) {
            finalArgs = args.slice(args.indexOf('--') + 1);
        }

        const command = `${runner} ${scriptName} ${finalArgs.join(' ')}`;
        
        console.log(`Executing script: ${command}`);
        
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