// This file contains type constants used across the project

const TYPES = {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
};

const check = {
    isString: (value) => typeof value === TYPES.STRING,
    isNumber: (value) => typeof value === TYPES.NUMBER,
    isBoolean: (value) => typeof value === TYPES.BOOLEAN,
    isObject: (value) => value !== null && typeof value === TYPES.OBJECT && !Array.isArray(value),
    isArray: (value) => Array.isArray(value),
}

export { TYPES, check };
