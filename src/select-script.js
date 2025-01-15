import { select } from '@inquirer/prompts';
import { readPackageName } from './package-utils.js';
import { getStore } from './store.js';


function readScriptName(selection) {
    return selection.split(' : ')[0].trim()
}

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