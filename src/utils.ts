import { randomUUID } from "crypto";


export function makePromise<T>(f: (f: (resolve: T) => void) => void, tag: string): Promise<T> {
    const uuid = randomUUID();
        // console.warn(`RESERVE\t${uuid}\t${tag}`);
        return new Promise<T>(resolve => f(resolve)).catch(x => {
        console.error('There was an error with the promise');
        throw Error('There was an error with the promise');
    }).then(x => {
        // console.warn(`HANDLEE\t${uuid}\t${tag}`);
        return x;
    })

}