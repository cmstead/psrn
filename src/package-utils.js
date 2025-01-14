import { readPackageJson } from './packagefs.js';

function readPackageScripts() {
    return readPackageJson()
        .then((packageJson) => packageJson.scripts)
}

export function readScriptNames() {
    return readPackageScripts()
        .then((scripts) => Object.keys(scripts))
        .catch(() => { throw new Error('No scripts found in package.json') });
}

export function readScriptLines() {
    return readPackageScripts()
        .then((scripts) => Object.keys(scripts).map((scriptName) => ({ name: scriptName, script: scripts[scriptName] })))
        .catch(() => { throw new Error('No scripts found in package.json') });
}

export function readPackageName() {
    return readPackageJson()
        .then((packageJson) => packageJson.name)
}