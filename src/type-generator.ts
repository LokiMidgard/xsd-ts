import { stringify } from "querystring";
import { TagName } from "xml-ns-parser";
import { visitor } from "./utils";
import { element, attribute, complexType, simpleType, container, simpleContent, complexContent } from "./xsd";

export type TypeMapping = {
    [name: string]: string
}

export async function generateTypes(elements: element[], typeRenderer?: (name: TagName) => string): Promise<TypeMapping> {

    // first make everyone an uniqe id
    let id = 1;
    await visitor(elements, (property, obj) => {
        if (property == 'name' && obj.local && obj.namespace) {
            obj.id = `ιδ${id++}ε`;
        }
    })



    const types: Record<string, string> = {};
    for (const element of elements) {
        generateType(element, true, types, typeRenderer ?? ((name: TagName) => `${name.local}_ℕ${name.namespace.replaceAll(':', '_α_').replaceAll('/', '_ι_').replaceAll('.', '_σ_').replaceAll('-', '_τ_')}`));
    }
    types['SubArray<T>'] = `
    {
        [Property in keyof T]-?: T[Property] extends Array<infer K>
        ? T[Property] | undefined
        : Array<T[Property]> | undefined;
    }
`
    return types;

}

type WithId<T> = T extends { name?: { local: string, namespace: string } }
    ? T & { name: { id: string } }
    : T;


function writeType(obj: WithId<element | attribute | complexType | simpleType>, types: Record<string, string>, typeRenderer: (name: TagName) => string) {

    const id = getId(obj);
    if (types[id]) {
        return;
    }
    types[id] = 'X';

    if (obj !== undefined) {
        const type = generateType(obj, false, types, typeRenderer);
        let newLocal = `_${obj.name.local}`;
        let i = 0
        while (types[newLocal]) {
            newLocal = `_${obj.name.local}` + (++i);
        }
        types[newLocal] = id;
        if (obj.name.root)
            types[typeRenderer(obj.name)] = id;
        types[id] = type;
    }
}

function generateType(obj: element | attribute | complexType | simpleType | container | simpleContent| complexContent | undefined, useId: boolean, types: Record<string, string>, typeRenderer: (name: TagName) => string, setName?: boolean): string {


    if (typeof obj === 'undefined') {
        return '{}'
    }
    const withId = obj as WithId<element | attribute | complexType | simpleType>;
    if (withId.name && useId) {

        if (!types[withId.name.id]) {
            writeType(withId, types, typeRenderer)
        }

        return '(' + getId(withId) +
            (setName && obj.type === 'element'
                ? `& {"#": "${obj.name.local}"}`
                : '') + ')'; // already created
    }


    if (obj.type === 'attribute') {
        const internalType = '(' + generateType(obj.simpleType, true, types, typeRenderer) + ')' + (obj.optional && obj.default == undefined ? ' | undefined' : '');
        return `{${obj.name.local}: ${internalType}}`
    } else if (obj.type === 'element') {


        const array = obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1 ? '[]'
            : (obj.occurence.minOccurance) === 0
                ? ' | undefined'
                : '';
        const internal = '(' + generateType(obj.content, true, types, typeRenderer) + ')';
        const internalConstructedType = internal + array;

        let newLocal = `_${obj.name.local}`;
        let i = 0
        while (types[newLocal]) {
            newLocal = `_${obj.name.local}` + (++i);
        }
        types[newLocal] = internal;
        return `({ ${obj.name.local}: ${newLocal + array}}` +
            (setName
                ? `& {"#": "${obj.name.local}"}`
                : '') + ')';


    } else if (obj.type === 'simpleType') {
        if (obj.subType === 'native') {
            return obj.base;
        } else if (obj.subType === 'union') {
            return obj.unions.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? c : `${p} | ${c} `, '');
        } else if (obj.subType === 'list') {
            throw Error('List is not yet supported');
        } else if (obj.subType === 'restriction') {
            if (obj.subSubType === 'enumeration') {

                return obj.values.map(x => typeof x === 'string' ? `'${x}'` : x).reduce((p, c) => p === '' ? c : `${p} | ${c} `, '');
            } else if (obj.subSubType === 'Number') {
                return 'number';
            } else if (obj.subSubType === 'pattern') {
                return 'string';
            } else if (obj.subSubType === 'simple') {
                return generateType(obj.baseType, true, types, typeRenderer);
            }
        }
    } else if (obj.type === 'complexType') {
        // withId;
        const contentType = generateType(obj.content, true, types, typeRenderer);
        const attributeType = obj.attributes.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '');
        if (attributeType === '') {
            return contentType;
        }
        else if (contentType === '') {
            return attributeType;
        }
        return `${contentType} & ${attributeType}`;

    } else if (obj.type === 'all') {
        if ((obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1) && obj.content.length > 1) {
            throw Error('Currently can`t handle more then one content in an all with occurance higher then 1')
        }
        return obj.content.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '')
    } else if (obj.type === 'choise') {
        if (obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1) {
            return '(' + obj.content.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? `SubArray<${c}>` : `${p} & SubArray<${c}>`, '') + ')'
        }
        return obj.content.map(x => generateType(x, true, types, typeRenderer, true)).reduce((p, c) => p === '' ? c : `${p} | ${c}`, '')
    } else if (obj.type === 'sequence') {
        if ((obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1) && obj.content.length > 1) {
            throw Error(`Currently can't handle more then one content in an sequence with occurance higher then 1 ${JSON.stringify([obj.content.length, obj.occurence])}`)
        }
        return obj.content.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '')
    } else if (obj.type === 'simpleContent') {
        if (obj.attributes.length == 0) {
            return generateType(obj.base, true, types, typeRenderer);
        } else {
            const attributeType = obj.attributes.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '');
            return `{meta:${attributeType}, value :${generateType(obj.base, true, types, typeRenderer)}}`;
        }
    } else if (obj.type === 'complexContent') {
        if (obj.attributes.length == 0) {
            return generateType(obj.base, true, types, typeRenderer);
        } else {
            const attributeType = obj.attributes.map(x => generateType(x, true, types, typeRenderer)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '');
            return `{meta:${attributeType}, value :${generateType(obj.base, true, types, typeRenderer)}}`;
        }

    }

    throw Error('Not supported type' + JSON.stringify(obj));
}

function getId(withId: WithId<element | attribute | complexType | simpleType>): string {

    return withId.name.id;
}
