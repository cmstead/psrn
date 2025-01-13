import * as path from 'path';
import { access, constants, readFile } from 'fs'
import { promisify } from 'util';

import { tap } from './utils.js';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);

const getPackageFilePath = () => path.join(process.cwd(), 'package.json');

function verifyExistingPackageFile(filePath) {
    return new Promise(function (resolve, reject) {
        accessAsync(filePath, constants.R_OK)
            .then(() => resolve(filePath))
            .catch(() => {
                throw new Error(`Cannot read file at ${filePath}`);
            });
    });
}

export function readPackageJson() {
    return Promise.resolve(getPackageFilePath())
        .then(tap(verifyExistingPackageFile))
        .then((filePath) => readFileAsync(filePath, 'utf8'))
        .then(JSON.parse);
}