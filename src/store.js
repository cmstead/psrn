import path from 'path';
import storage from 'node-persist';

let store = null;

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

export function getStore() {
    return store;
}

