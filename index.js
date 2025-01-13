import selectScript from "./src/select-script.js";
import execScript from "./src/exec-script.js";
import { readScriptNames } from "./src/script-utils.js";

const args = process.argv.slice(2);

function errorAndExit(error) {
    if(error.message) {
        console.error(error);
    }
    process.exit(1);
}

function main() {
    readScriptNames()
        .then((scriptNames) => selectScript(scriptNames))
        .then((scriptName) => execScript(scriptName))
        .then(() => process.exit(0))
        .catch(errorAndExit);
}

process.on('unhandledRejection', errorAndExit)

main()