import path from 'path';
import storage from 'node-persist';

let store = null;

/**
 * Initializes the persistent storage for the application.
 *
 * @param {string} dirname - The directory path where the storage will be
 * initialized. Typically, this is the base directory of the application.
 * @returns {Object} The initialized store object with `get` and `set` methods
 * for interacting with the storage.
 */
export function initStore(dirname) {
    storage.initSync({
        dir: path.join(dirname, '.node-persist', 'storage')
    });

    function set(key, value) {
        return storage.setItem(key, value);
    }

    function get(key) {
        return storage.getItem(key);
    }

    store = {
        get,
        set
    };

    return store;
}

/**
 * Retrieves the initialized store object.
 *
 * @returns {Object|null} The store object with `get` and `set` methods, or
 * null if the store has not been initialized.
 */
export function getStore() {
    return store;
}

