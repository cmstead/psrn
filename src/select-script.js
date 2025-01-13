import { select } from '@inquirer/prompts';

export default function selectScript (scriptNames) {
    return select({
        message: 'Select a script to run',
        choices: scriptNames.map((scriptName) => ({
            value: scriptName,
            message: scriptName
        }))
    });
}