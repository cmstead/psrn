import path from 'path';
import storage from 'node-persist';

export default function initStore(dirname) {
    storage.initSync({
        dir: path.join(dirname, '.node-persist', 'storage')
    });

    function set(key, value) {
        console.log('setting', key, value);
        return storage.setItem(key, value);
    }

    function get(key) {
        return storage.getItem(key);
    }

    return {
        get,
        set
    };
}

