import readPackageJson from './packagefs.js';

function handleNoScriptsError() {
    throw new Error('No scripts found in package.json or scripts object is empty.');
}

const isValidScriptObject = (scripts) => typeof scripts === 'object'
    && Object.keys(scripts).length > 0
    && Object.values(scripts).every((script) => typeof script === 'string');

function validateScripts(scripts) {
    if (!scripts || !isValidScriptObject(scripts)) {
        handleNoScriptsError();
    }
    return scripts;
}

function readPackageScripts() {
    return readPackageJson()
        .then((packageJson) => validateScripts(packageJson.scripts));
}

/**
 * Reads the names of all scripts defined in the package.json file.
 * @returns {Promise<string[]>} A promise that resolves to an array of script names.
 * @throws Will throw an error if the scripts object is invalid or missing.
 */
export function readScriptNames() {
    return readPackageScripts()
        .then((scripts) => Object.keys(scripts));
}

const buildScriptOptions = (scripts) => Object.keys(scripts)
    .map((scriptName) => ({
        name: scriptName,
        script: scripts[scriptName]
    }));

/**
* Reads the scripts from package.json and converts them into an array of script options.
* @returns {Promise<{name: string, script: string}[]>} A promise that resolves to an array of script options.
* @throws Will throw an error if the scripts object is invalid or missing.
*/
export function readScriptLines() {
    return readPackageScripts()
        .then(buildScriptOptions);
}

/**
 * Reads the package name from the package.json file.
 * @returns {Promise<string>} A promise that resolves to the package name.
 * @throws Will throw an error if the package name is missing or the file cannot be read.
 */
export function readPackageName() {
    return readPackageJson()
        .then((packageJson) => packageJson.name);
}