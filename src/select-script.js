import { select } from '@inquirer/prompts';
import { readPackageName } from './package-utils.js';
import { getStore } from './store.js';


function readScriptName(selection) {
    return selection.split(' : ')[0].trim()
}

/**
 * Prompts the user to select a script from a list of available scripts.
 *
 * @param {Array<Object>} scriptLines - An array of script objects, each
 * containing `name` and `script` properties.
 * @param {Object} options - Options for the script selection.
 * @param {boolean} options.long - If true, displays the full script details
 * along with the name.
 * @returns {Promise<string>} A promise that resolves to the selected script name.
 */
export default function selectScript(scriptLines, { long }) {
    const store = getStore();

    return readPackageName()
        .then((packageName) => store.get(packageName))
        .then((scriptName) => select({
            message: 'Select a script to run',
            default: scriptName,
            choices: scriptLines.map(({ name, script }) => ({
                value: long ? `${name} : ${script}` : name
            }))
        }))
        .then((selection) => readScriptName(selection));
}