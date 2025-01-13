import * as path from 'path';
import { access, constants, readFile } from 'fs'
import { promisify } from 'util';

import { tap } from './utils.js';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);

const getPackageFilePath = (dirname) => {
    return path.join(dirname, 'package.json')
};

function verifyExistingPackageFile(filePath) {
    return new Promise(function (resolve, reject) {
        accessAsync(filePath, constants.R_OK)
            .then(() => resolve(filePath))
            .catch(() => {
                throw new Error(`Cannot read file at ${filePath}`);
            });
    });
}

export function readPackageJson(dirname = process.cwd()) {
    return Promise.resolve(getPackageFilePath(dirname))
        .then(tap(verifyExistingPackageFile))
        .then((filePath) => readFileAsync(filePath, 'utf8'))
        .then(JSON.parse);
}