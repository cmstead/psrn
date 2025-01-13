import { exec } from 'child_process';

export default function execScript(scriptName) {
    return new Promise(function (resolve,reject) {
        const execProcess = exec(`npm run ${scriptName}`, function (error) {
            if (error) {
                reject(error.message);
            }

            resolve(true);
        });
        
        execProcess.stdout.pipe(process.stdout);
    })
}