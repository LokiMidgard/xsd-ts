import { filterUndefined, makePromise } from "./utils.js";


export default class Depot<TKey, TValue> {
    private r: Record<string, Promise<TValue> | undefined> = {}
    private setter: Record<string, (t: TValue) => void> = {}
    private resolved: Record<string, true | undefined> = {}
    private keyTranslator: (key: TKey) => string;
    constructor(keyTranslaotr: (key: TKey) => string) {
        this.keyTranslator = keyTranslaotr;
    }

    public getAll(): Promise<TValue>[] {
        return filterUndefined(Object.values(this.r))
    }
    public getAllMissing() {
        return filterUndefined(Object.keys(this.r).filter(x => !Object.keys(this.resolved).includes(x)));
    }
    public getType(name: TKey): Promise<TValue> {
        const key = this.getKey(name);
        // console.log(`Getting resolved: ${this.resolved[key] ?? false}\t${key}`)
        const promise = this.r[key];
        if (promise) {
            return promise;
        } else {
            // console.log(`new Setter ${key}`)
            let f: ((t: TValue) => void) | undefined = undefined;
            const p = makePromise<TValue>(resolve => {
                f = resolve;
            }, `get-depot ${key}`).catch(x => {
                console.error(`Faild Promise ${x}`);
                throw Error(`Faild Promise ${x}`);
            });
            if (!f) {
                throw Error('This should not happen f must always be set');
            }
            this.setter[key] = f!;
            this.r[key] = p;
            return p;
        }
    }
    public setType(name: TKey, type: TValue): void {
        const key = this.getKey(name);
        if (this.resolved[key]) {
            console.error(`Key ${key} already set...`);
            throw Error(`Key ${key} already set...`);
        }
        this.resolved[key] = true;
        // console.log(`Setting ${key}`)
        let setter = this.setter[key];
        if (!setter) {
            // console.log(`new Setter ${key}`)
            const p = makePromise<TValue>(resolve => {
                setter = resolve;
            }, `set-depot ${key}`).catch(x => {
                console.error(`Faild Promise ${x}`);
                throw Error(`Faild Promise ${x}`);
            });
            this.setter[key] = setter!;
            this.r[key] = p;
        }
        setter(type);
    }

    private getKey(n: TKey): string {
        return this.keyTranslator(n);
    }

}