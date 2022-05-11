import { stringify } from "querystring";
import { visitor } from "./utils";
import { element, attribute, complexType, simpleType, container, simpleContent } from "./xsd";

export type TypeMapping = {
    [name: string]: string
}

export async function generateTypes(elements: element[]): Promise<TypeMapping> {

    // first make everyone an uniqe id
    let id = 1;
    await visitor(elements, (property, obj) => {
        if (property == 'name' && obj.local && obj.namespace) {
            obj.id = `id${id++}`;
        }
    })



    const types: Record<string, string> = {};
    for (const element of elements) {
        generateType(element, true, types);
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


function writeType(obj: WithId<element | attribute | complexType | simpleType>, types: Record<string, string>) {

    const id = getId(obj);
    if (types[id]) {
        return;
    }
    types[id] = 'X';

    if (obj !== undefined) {
        const type = generateType(obj, false, types);
        types[obj.name.local] = id;
        types[id] = type;
    }
}

function generateType(obj: element | attribute | complexType | simpleType | container | simpleContent | undefined, useId: boolean, types: Record<string, string>): string {

    if (typeof obj === 'undefined') {
        return 'Record<string, never>'
    }
    const withId = obj as WithId<element | attribute | complexType | simpleType>;
    if (withId.name && useId) {

        if (!types[withId.name.id]) {
            writeType(withId, types)
        }
        return getId(withId); // already created
    }


    if (obj.type === 'attribute') {
        const internalType = '(' + generateType(obj.simpleType, true, types) + ')' + (obj.optional ? ' | undefined' : '');
        return `{${obj.name.local}: ${internalType}}`
    } else if (obj.type === 'element') {
        const internalType = '(' + generateType(obj.content, true, types) + ')' + (obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1 ? '[]'
            : (obj.occurence.minOccurance) === 0
                ? ' | undefined'
                : '');
        return `{${obj.name.local}: ${internalType}}`
    } else if (obj.type === 'simpleType') {
        if (obj.subType === 'native') {
            return obj.base;
        } else if (obj.subType === 'union') {
            return obj.unions.map(x => generateType(x, true, types)).reduce((p, c) => p === '' ? c : `${p} | ${c} `, '');
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
                return generateType(obj.baseType, true, types);
            }
        }
    } else if (obj.type === 'complexType') {
        // withId;
        const contentType = generateType(obj.content, true, types);
        const attributeType = obj.attributes.map(x => generateType(x, true, types)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '');
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
        return obj.content.map(x => generateType(x, true, types)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '')
    } else if (obj.type === 'choise') {
        if (obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1) {
            return '(' + obj.content.map(x => generateType(x, true, types)).reduce((p, c) => p === '' ? `SubArray<${c}>` : `${p} & SubArray<${c}>`, '') + ')'
        }
        return obj.content.map(x => generateType(x, true, types)).reduce((p, c) => p === '' ? c : `${p} | ${c}`, '')
    } else if (obj.type === 'sequence') {
        if ((obj.occurence.maxOccurance === 'unbounded' || obj.occurence.maxOccurance > 1) && obj.content.length > 1) {
            throw Error(`Currently can't handle more then one content in an sequence with occurance higher then 1 ${JSON.stringify([obj.content.length, obj.occurence])}`)
        }
        return obj.content.map(x => generateType(x, true, types)).reduce((p, c) => p === '' ? c : `${p} & ${c}`, '')
    } else if (obj.type === 'simpleContent') {
        return generateType(obj.base, true, types);
    }

    throw Error('Not supported type' + JSON.stringify(obj));
}

function getId(withId: WithId<element | attribute | complexType | simpleType>): string {
 
    return withId.name.id;
}
