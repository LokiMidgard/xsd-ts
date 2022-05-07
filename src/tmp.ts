import { DeepPromise } from "./utils.js";




export type simpleType = simpleTypeFoo | simpleTypeBar;

export type simpleTypeFoo = {
    subType: 'foo'
}

export type simpleTypeBar = {
    subType: 'bar',
}


let x1: DeepPromise<simpleType>;
let x2: Promise<simpleTypeBar>
x1 = x2;

let x3: DeepPromise<{ x: simpleType }>;
let x4: simpleType
x3 = {
    x: x4
}
