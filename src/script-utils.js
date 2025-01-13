import { readPackageJson } from './packagefs.js';

function readPackageScripts() {
    return readPackageJson()
        .then((packageJson) => packageJson.scripts)
}

export function readScriptNames() {
    return readPackageScripts()
        .then((scripts) => Object.keys(scripts));
}

export function readScriptLines() {
    return readPackageScripts()
        .then((scripts) => Object.keys(scripts).map((scriptName) => ({ name: scriptName, script: scripts[scriptName] })));
}