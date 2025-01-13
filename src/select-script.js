import { select } from '@inquirer/prompts';

function readScriptName(selection) {
    return selection.split(':')[0].trim()
}

export default function selectScript (scriptLines, { long }) {
    return select({
        message: 'Select a script to run',
        choices: scriptLines.map(({ name, script }) => ({
            value: long ? `${name} : ${script}` : name
        }))
    })
    .then((selection) => readScriptName(selection));
}