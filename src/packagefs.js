import { join as pathJoin } from 'path';
import { access, constants, readFile } from 'fs/promises'

const errorMessages = [
    {
        condition: (error) => error?.code === 'ENOENT',
        message: (filePath) => `package.json not found, searched in ${filePath}`
    },
    {
        condition: (error) => error instanceof SyntaxError,
        message: (filePath) => `Invalid JSON in ${filePath}`
    },
    {
        condition: () => true,
        message: (filePath) => `Unable to read or process file at ${filePath}`
    }
];

const getPackageFilePath = (dirname) => {
    const isValidDirname = typeof dirname === 'string' && dirname.trim() !== '';
    const safeDirName = isValidDirname ? dirname : process.cwd();

    return pathJoin(safeDirName, 'package.json')
};

const getErrorMessage = (error, filePath) => {
    const { message } = errorMessages
        .find(({ condition }) => condition(error));

    return message(filePath);
};

const verifyExistingPackageFile = (filePath) =>
    access(filePath, constants.R_OK)
        .then(() => filePath)
        .catch(() => {
            throw new Error(`Cannot read file at ${filePath}`)
        });

function safelyParseJson(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new SyntaxError('Invalid JSON');
    }
}

const readJsonFile = (filePath) => readFile(filePath, 'utf8');

/** @typedef {{ scripts: []? }} PackageObject */

/**
 * @param {string} dirname 
 * @returns {Promise<PackageObject>}
 * @throws {Error} If the file does not exist or is not readable
 */
const readPackageJson = (dirname) => {
    const filePath = getPackageFilePath(dirname);

    return verifyExistingPackageFile(filePath)
        .then(readJsonFile)
        .then(safelyParseJson)
        .catch((error) => {
            throw new Error(getErrorMessage(error, filePath));
        })
};

export default readPackageJson;