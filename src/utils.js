export const tap = (fn) => (value) => {
    fn(value);
    return value;
}

export function promiseEither(fn) {
    return new Promise(function (resolve, reject){
        fn()
        .then(function (result) {
            if(result instanceof Error){
                reject(result.message);
            } else {
                resolve(result);
            }
        });
    });
}