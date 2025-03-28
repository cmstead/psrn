import readPackageJson from './packagefs.js';

function handleNoScriptsError() {
    throw new Error('No scripts found in package.json');
}

function validateScripts(scripts) {
    if (!scripts || typeof scripts !== 'object') {
        handleNoScriptsError();
    }
    return scripts;
}

function readPackageScripts() {
    return readPackageJson()
        .then((packageJson) => validateScripts(packageJson.scripts));
}

export function readScriptNames() {
    return readPackageScripts()
        .then((scripts) => Object.keys(scripts))
        .catch(handleNoScriptsError);
}

const buildScriptOptions = (scripts) => Object.keys(scripts)
    .map((scriptName) => ({
        name: scriptName,
        script: scripts[scriptName]
    }));

export function readScriptLines() {
    return readPackageScripts()
        .then(buildScriptOptions)
        .catch(handleNoScriptsError);
}

export function readPackageName() {
    return readPackageJson()
        .then((packageJson) => packageJson.name);
}