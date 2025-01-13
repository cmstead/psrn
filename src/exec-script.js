import { exec } from 'child_process';

export default function execScript(scriptName, { args = []}) {
    return new Promise(function (resolve,reject) {
        const command = `npm run ${scriptName} ${args.join(' ')}`;

        const execProcess = exec(command, function (error) {
            if (error) {
                reject(error.message);
            }

            resolve(true);
        });
        
        execProcess.stdout.pipe(process.stdout);
    })
}