import { XMLParser } from "fast-xml-parser";
import { builtInXsdtypes } from "./xsd.js";



export function parseXml(xmlText: string) : Xml { 
    const parser = new XMLParser({
        allowBooleanAttributes: true,
        ignoreAttributes: false,
        attributeNamePrefix: '',
        // attributesGroupName: '@',
        ignoreDeclaration: true,
        removeNSPrefix: false,
        // isArray: ()=> true,
        preserveOrder: true
    });
    const data = parser.parse(xmlText);

    const xml = CalculateNS(data[0]);
    return xml;
}


function CalculateNS(obj: any, scope?: Scope) {
    if (!scope) {
        scope = {};
    }

    const filteredKrys = Object.keys(obj).filter(x => x !== ':@' && x !== '#text');
    if (filteredKrys.length == 0) {
        console.log(JSON.stringify(obj, undefined, 2));

    }
    const tagName = filteredKrys[0];
    const newScope = { ...scope };

    obj['children'] = obj[tagName];
    delete obj[tagName];

    if (obj['children'].length === 1 && obj['children'][0]['#text']) {
        // This is a text entry and not a child
        obj['text'] = obj['children'][0]['#text'];
        obj['children'] = [];
    }


    const text = obj['#text'];
    if (text) {
        obj['text'] = ['#text'];
        delete obj['#text'];
    }
    const attributes = obj[':@'];
    if (attributes) {
        if (attributes["xmlns"]) {
            // new default namespace
            newScope[''] = attributes["xmlns"];
        }
        const valuesForScope = Object.keys(attributes).filter(x => x.startsWith('xmlns:')).map(key => {
            const ns = attributes[key];
            const prefix = key.substring('xmlns:'.length);
            return { prefix, ns };
        });
        for (const { prefix, ns } of valuesForScope) {
            newScope[prefix] = ns;
        }
        obj['attributes'] = Object.fromEntries(Object.entries(attributes).filter(x => x[0] !== 'xmlns' && !x[0].startsWith('xmlns:')));
        delete obj[':@'];
    } else {
        obj['attributes'] = {}
    }


    obj['name'] = getTagname(tagName, newScope, false);
    obj['scope'] = newScope;
    for (const child of obj['children']) {
        CalculateNS(child, newScope);
    }

    return obj as Xml;
}


export function getTagname(name: string, scope: Scope, includeDefaultTypes: boolean = true): TagName {


    if (name.indexOf(':') != -1) {
        // we have a prefix
        const collonIndex = name.indexOf(':');
        const prefix = name.substring(0, collonIndex);
        const localName = name.substring(collonIndex + 1);
        if (!scope[prefix]) {
            throw Error(`Prefix ${prefix} unknown on element {tagName}`);
        }
        const ns = scope[prefix];
        return { local: localName, namespace: ns };
    } else if (includeDefaultTypes && Object.keys(builtInXsdtypes).includes(name as any)) {
        return { local: name, namespace: '' };
    } else {
        // we use default prefix
        return { local: name, namespace: scope[''] ?? '' };
    }

}

type Scope = {
    [prefix: string]: string;
}

export type Xml = {

    children: Xml[],
    attributes: {
        [name: string]: string
    },
    name: TagName,
    scope: Scope,
    text: undefined | string,
}
export type TagName = {
    local: string,
    namespace: string
}