import { randomUUID } from "crypto";
import { isPromise } from "util/types";


export function makePromise<T>(f: (f: (resolve: T) => void) => void, tag: string): Promise<T> {
    // const uuid = randomUUID();
    // console.warn(`RESERVE\t${uuid}\t${tag}`);
    return new Promise<T>(resolve => f(resolve)).catch(x => {
        console.error('There was an error with the promise');
        throw Error('There was an error with the promise');
    }).then(x => {
        // console.warn(`HANDLEE\t${uuid}\t${tag}`);
        return x;
    })

}




export type DeepPromise<T> = T extends Promise<infer K>
    ? Promise<DeepPromise<K>>
    : T extends Array<infer J>
    ? Array<DeepPromise<J>> | Array<Promise<DeepPromise<J>>> | Promise<Array<DeepPromise<J>>> | Promise<Array<Promise<DeepPromise<J>>>>
    : T extends object ? Promise<{
        [P in keyof T]: DeepPromise<T[P]>;
    }> | {
        [P in keyof T]: DeepPromise<T[P]>;
    } : Promise<T> | T;

export type WaitAlll<T> = T extends Promise<infer K>
    ? WaitAlll<K>
    : T extends Array<infer J>
    ? Array<WaitAlll<J>>
    : T extends object
    ? { [P in keyof T]: WaitAlll<T[P]>; }
    : T;


export function waitAll<T>(obj: T): Promise<WaitAlll<T>> {
    return waitAllInternal(obj, undefined);
}
function removeVisited(obj: any) {
    if (Array.isArray(obj)) {
        obj.forEach(x => removeVisited(x));
    } else if (typeof obj === 'object') {
        if (obj['#visited']) {
            delete obj['#visited'];
            for (const key of Object.keys(obj)) {
                removeVisited(obj[key]);
            }
        }
    }
}
async function waitAllInternal<T>(obj: T, depth?: number): Promise<WaitAlll<T>> {
    if (typeof depth === 'undefined') {
        const result = await waitAllInternal(obj, 0);


        removeVisited(result); // this does not change result?

        return result;
    }


    if (isPromise(obj)) {
        const promise = await waitAllInternal(await obj, depth + 1) as WaitAlll<T>;
        return promise;
    }

    if (Array.isArray(obj)) {
        const array = await Promise.all(obj.map(x => waitAllInternal(x, depth + 1))) as WaitAlll<T>;
        return array;
    }
    else if (typeof obj === 'object') {
        if ((obj as any)['#visited']) {
            // already visted
            return obj as any;
        }
        (obj as any)['#visited'] = true;
        for (const key of Object.keys(obj) as Array<keyof T>) {
            const value: any = (obj as any)[key];
            (obj as any)[key] = await waitAllInternal(value as any, depth + 1);
        }
        return obj as any;
    } else {

        return obj as WaitAlll<T>;
    }


}

export function delay(ms: number) {
    const wait = new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
    return wait;
}


export function filterUndefined<T>(v: Array<T | undefined>): Array<T> {
    return v.filter(x => typeof x !== 'undefined') as any;
}


export async function visitor(obj: any, f: (property: string, obj: any) => PromiseLike<void> | void) {
    await visitorInternal('#root', obj, f);
    removeVisited(obj);
    async function visitorInternal(property: string, obj: any, f: (property: string, obj: any) => PromiseLike<void> | void) {
        if (Array.isArray(obj)) {
            await f(property, obj);
            await Promise.all(obj.map((x, i) => visitorInternal(`${property}[${i}]`, x, f)));
        } else if (typeof obj === 'object') {
            if (obj['#visited']) {
                return;
            }
            await f(property, obj);
            obj['#visited'] = true;
            await Promise.all(Object.keys(obj).map(async key => {
                const v = obj[key];
                await visitorInternal(key, v, f);
            }));
        } else {
            await f(property, obj);
        }
    }

}
