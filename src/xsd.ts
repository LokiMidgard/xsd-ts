
import stringify from "json-stringify-safe";
import { isPromise } from "util/types"

import Depot from "./Depot.js";
import { getTagname, TagName, Xml } from "./parse-xml.js";
import { makePromise } from "./utils.js";

const attributeDepot = new Depot<TagName, DeepPromise<attribute>>(name => name.local + '#' + name.namespace);
const attributeGroupDepot = new Depot<TagName, DeepPromise<attribute[]>>(name => name.local + '#' + name.namespace);
const simpleTypeDepot = new Depot<TagName, DeepPromise<simpleType>>(name => name.local + '#' + name.namespace);
const complexTypeDepot = new Depot<TagName, DeepPromise<complexType>>(name => name.local + '#' + name.namespace);
const complexOrSimpleTypeDepot = new Depot<TagName, DeepPromise<complexType | simpleType>>(name => name.local + '#' + name.namespace);
const elementDepot = new Depot<TagName, DeepPromise<element>>(name => name.local + '#' + name.namespace);

export const builtInXsdtypes = {
    'int': 'number',
    'integer': 'number',
    'long': 'number',
    'string': 'string',
    'token': 'string',
    'boolean': 'boolean',
    'float': 'number',
    'positiveInteger': 'number',
} as const;


function initDefaultTypes(name: string, mapedType: 'string' | 'boolean' | 'number') {
    simpleTypeDepot.setType(getTagname(name, undefined!), { base: mapedType, original: name, subType: 'native', type: "simpleType" } as nativeType)
    complexOrSimpleTypeDepot.setType(getTagname(name, undefined!), { base: mapedType, original: name, subType: 'native', type: "simpleType" } as nativeType)
}
Object.entries(builtInXsdtypes).map(entry => initDefaultTypes(...entry))



type Occurence = {
    minOccurance?: number,
    maxOccurance?: number,
}

type sequence = {
    type: 'sequence'
    occurence: Occurence,
    content: (container | element)[],
}

type all = {
    type: 'all'
    occurence: Occurence,
    content: (container | element)[],
}
type choise = {
    type: 'choise'
    occurence: Occurence,
    content: (container | element)[],
}
type simpleContent = {
    type: 'simpleContent',
    base: complexType | simpleType,
}
type container = sequence | all | choise;

type attribute = {
    name: TagName,
    optional: boolean,
    default: any
    simpleType: simpleType,
}

type complexType = {
    type: 'complexType',
    content: container | simpleContent | undefined,
    attributes: attribute[],
}

type simpleType = simpleTypeList | simpleTypeRestriction | simpleTypeUnion | nativeType;

type nativeType = {
    type: 'simpleType',
    subType: 'native'
    base: 'string' | 'number' | 'boolean'
    original: 'int' | 'integer' | 'long' | 'string' | 'token' | 'boolean' | 'float'
}

type simpleTypeList = {
    type: 'simpleType',
}
type simpleTypeRestriction = simpleTypeRestrictionEnumeration | simpleTypeRestrictionPattern | simpleTypeRestrictionNumber;

type simpleTypeRestrictionEnumeration = {
    type: 'simpleType',
    subType: 'restriction'
    subSubType: 'enumeration'
    baseType: simpleType,
    values: any[]
}

type simpleTypeRestrictionSimple = {
    type: 'simpleType',
    subType: 'restriction'
    subSubType: 'simple'
    baseType: simpleType,
}

type simpleTypeRestrictionPattern = {
    type: 'simpleType',
    subType: 'restriction'
    subSubType: 'pattern'
    pattern: RegExp
}
type simpleTypeRestrictionNumber = {
    type: 'simpleType',
    subType: 'restriction'
    subSubType: 'Number'
    minInclusive?: number,
    minExclusive?: number,
    maxExclusive?: number,
    maxInclusive?: number,
}
type simpleTypeUnion = {
    type: 'simpleType',
    subType: 'union',
    unions: simpleType[];
}

type element = {
    type: 'element',
    content: complexType | simpleType | undefined,
    name: TagName,
    occurence: Occurence,
}

export type DeepPromise<T> = T extends Promise<any>
    ? T
    : T extends object ? Promise<{
        [P in keyof T]: DeepPromise<T[P]>;
    }> | {
        [P in keyof T]: DeepPromise<T[P]>;
    } : Promise<T> | T;

export type WaitAlll<T> = T extends Promise<infer K>
    ? WaitAlll<K>
    : T extends Array<infer J>
    ? Array<WaitAlll<J>>
    : T extends object ? {
        [P in keyof T]: WaitAlll<T[P]>;
    } : T;


export function waitAll<T>(obj: T): Promise<WaitAlll<T>> {
    return waitAllInternal(obj, undefined);
}

async function waitAllInternal<T>(obj: T, depth?: number): Promise<WaitAlll<T>> {
    if (typeof depth === 'undefined') {
        const result = await waitAllInternal(obj, 0);

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

function delay(ms: number) {
    const wait = new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
    return wait;
}

export async function parseSchemas(schemas: Xml[]): Promise<element[]> {

    for (const root of schemas) {
        const targetNamespace = root.attributes['targetNamespace'];
        for (const xml of root.children) {
            getAttribute(xml, targetNamespace, true)
                ?? getAttributeGrupe(xml, targetNamespace, true)
                ?? getComplexType(xml, targetNamespace)
                ?? getElement(xml, targetNamespace, true)
                ?? getSimpleType(xml, targetNamespace);
        }
    }


    const result = waitAll(elementDepot.getAll());
    const elements = await result;
    return elements;


}

function getElement(xml: Xml, targetNamespace: string, isRoot: boolean): DeepPromise<element> | undefined {
    if (xml.name.local === 'element' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
        if (xml.attributes['ref']) {
            return elementDepot.getType(getTagname(xml.attributes['ref'], xml.scope)) as DeepPromise<element>;
        }
        const name = xml.attributes['name'];
        if (xml.attributes['type']) {
            const loadedType = complexOrSimpleTypeDepot.getType(getTagname(xml.attributes['type'], xml.scope));
            const r: DeepPromise<element> = makePromise<element>(async resolve => {
                const x: DeepPromise<element> = {
                    name: { local: name, namespace: targetNamespace },
                    content: await loadedType,
                    type: 'element',
                    occurence: parseOccurence(xml, targetNamespace)
                }
                resolve(x as any); // this is ok, since it will be asigned to a deep promise. 
            }, `getElement-${name}- ${xml.attributes['type']}`).catch(x => {
                console.error(`Faild Promise ${x}`);
                throw Error(`Faild Promise ${x}`);
            });
            if (isRoot) {
                elementDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
            }
            return r;
        }

        const withoutAnotations = xml.children.filter(x => x.name.local !== 'annotation' || x.name.namespace !== 'http://www.w3.org/2001/XMLSchema');
        const first = withoutAnotations[0];

        let content: DeepPromise<complexType | simpleType> | undefined;

        if (first) {

            const complexType = getComplexType(first, targetNamespace);
            const simpleType = getSimpleType(first, targetNamespace);
            content = complexType ?? simpleType;
        } else {
            content = undefined;
        }

        const r: DeepPromise<element> = {
            type: 'element',
            name: { local: name, namespace: targetNamespace },
            occurence: parseOccurence(xml, targetNamespace),
            content: content
        }
        if (isRoot) {

            elementDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
        }
        return r;
    }
    else {
        return undefined;
    }
}

function getComplexType(xml: Xml, targetNamespace: string): DeepPromise<complexType> | undefined {
    if (xml.name.local === 'complexType' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
        const first = xml.children.filter(x => x.name.local !== 'annotation' || x.name.namespace !== 'http://www.w3.org/2001/XMLSchema')[0];
        const attributes = xml.children.filter(x => x.name.local !== 'annotation' || x.name.namespace !== 'http://www.w3.org/2001/XMLSchema').slice(1);
        // the first is either seqence, choise, or all.

        function getContainerOrElement(xml: Xml): DeepPromise<container | element> | undefined {

            if (xml.name.local === 'element' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                const e = getElement(xml, targetNamespace, false);
                if (e) {
                    return e;
                }
                else {
                    throw Error('faild to get element..');
                }
            } else {
                return getContainer(xml);
            }

        }
        function getContainer(xml: Xml): DeepPromise<container> | undefined {

            if (xml.name.local === 'choice' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                const content = filterUndefined(xml.children.map(x => getContainerOrElement(x)));

                const r: DeepPromise<choise> = {
                    type: 'choise',
                    content: content,
                    occurence: parseOccurence(xml, targetNamespace)
                };

                return r;
            } else if (xml.name.local === 'sequence' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                const content = filterUndefined(xml.children.map(x => getContainerOrElement(x)));
                const r: DeepPromise<sequence> = {
                    type: 'sequence',
                    content: content,
                    occurence: {
                        maxOccurance: xml.attributes['maxOccurs'] === 'unbounded'
                            ? undefined
                            : typeof xml.attributes['maxOccurs'] === 'undefined'
                                ? 1
                                : parseInt(xml.attributes['maxOccurs']),

                        minOccurance: typeof xml.attributes['minOccurs'] === 'undefined'
                            ? 1
                            : parseInt(xml.attributes['minOccurs']),

                    }
                };

                return r;
            } else if (xml.name.local === 'all' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                const content = filterUndefined(xml.children.map(x => getContainerOrElement(x)));
                const r: DeepPromise<all> = {
                    type: 'all',
                    content: content,
                    occurence: {
                        maxOccurance: xml.attributes['maxOccurs'] === 'unbounded'
                            ? undefined
                            : typeof xml.attributes['maxOccurs'] === 'undefined'
                                ? 1
                                : parseInt(xml.attributes['maxOccurs']),

                        minOccurance: typeof xml.attributes['minOccurs'] === 'undefined'
                            ? 1
                            : parseInt(xml.attributes['minOccurs']),

                    }
                };

                return r;
            } else {
                return undefined;
                // throw Error(`Container expected (sequence, all or choise) was ${xml.name.local}`);
            }



        }

        function getSimpleContent(xml: Xml): DeepPromise<simpleContent> | undefined {
            if (xml.name.local === 'simpleContent' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                const withoutAnotations = xml.children.filter(x => x.name.local !== 'annotation' || x.name.namespace !== 'http://www.w3.org/2001/XMLSchema');

                if (withoutAnotations.length !== 1) {
                    throw Error('SimpleContent is only supported with ONE extension or ONE restriction');
                }

                if (withoutAnotations[0].name.local === 'extension' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                    const r: DeepPromise<simpleContent> = makePromise<simpleContent>(async resolve => {
                        const base = complexOrSimpleTypeDepot.getType(getTagname(withoutAnotations[0].attributes['base'], xml.scope));
                        const r: simpleContent = {
                            base: await waitAll(base),
                            type: "simpleContent"
                        }
                        resolve(r);
                    }, 'getSimpleContent').catch(x => {
                        console.error(`Faild Promise ${x}`);
                        throw Error(`Faild Promise ${x}`);
                    })

                    return r;

                } else if (withoutAnotations[0].name.local === 'restriction' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                    throw Error('simpleContent restriction not yet supported');

                }
            } else {
                return undefined;
            }
        }
        const simpleContent = getSimpleContent(first);
        if (simpleContent) {

            const r: DeepPromise<complexType> = {
                type: "complexType",
                content: simpleContent,
                attributes: getAttributes(xml.children, targetNamespace),
            }
            if (xml.attributes['name']) {
                complexTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
            }
            return r;
        } else {


            const r: DeepPromise<complexType> = {
                type: "complexType",
                content: getContainer(first),
                attributes: getAttributes(attributes, targetNamespace),
            }
            if (xml.attributes['name']) {
                complexTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
            }
            return r;
        }

    }
    else {
        return undefined;
    }
}

function parseOccurence(xml: Xml, targetNamespace: string): Occurence {
    return {
        maxOccurance: xml.attributes['maxOccurs'] === 'unbounded'
            ? undefined
            : typeof xml.attributes['maxOccurs'] === 'undefined'
                ? 1
                : parseInt(xml.attributes['maxOccurs']),

        minOccurance: typeof xml.attributes['minOccurs'] === 'undefined'
            ? 1
            : parseInt(xml.attributes['minOccurs']),
    };
}

function getSimpleType(xml: Xml, targetNamespace: string): DeepPromise<simpleType> | undefined {

    if (xml.name.local === 'simpleType' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
        const single = xml.children.filter(x => x.name.local !== 'annotation' || x.name.namespace !== 'http://www.w3.org/2001/XMLSchema')[0];
        if (single.name.local === 'list' && single.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
            // TODO: 
            throw Error('simpleType List is not yet implemented');
        } else if (single.name.local === 'restriction' && single.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
            // first get rid of annotations
            const withoutAnotations = single.children.filter(x => x.name.local !== 'annotation' || x.name.namespace !== 'http://www.w3.org/2001/XMLSchema');
            // we only support a very limit combination of restrictions
            if (withoutAnotations.length == 0) {
                // this one is pretty basic just a type
                const r: DeepPromise<simpleTypeRestrictionSimple> = makePromise<simpleTypeRestrictionSimple>(async resolve => {
                    const tmp: simpleTypeRestrictionSimple = {
                        subSubType: "simple",
                        subType: "restriction",
                        type: "simpleType",
                        baseType: await waitAll(simpleTypeDepot.getType(getTagname(single.attributes['base'], xml.scope)))
                    }
                    resolve(tmp);
                }, 'getSimpleType-restriction-simple').catch(x => {
                    console.error(`Faild Promise ${x}`);
                    throw Error(`Faild Promise ${x}`);
                });
                if (xml.attributes['name']) {
                    simpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                    complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                }
                return r;
            } else if (withoutAnotations[0].name.local === 'enumeration' && withoutAnotations[0].name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                // enumeration
                // 1. Check if every child is an enumeration. We do not suppor mixing those...
                if (!withoutAnotations.every(x => x.name.local === 'enumeration' && x.name.namespace === 'http://www.w3.org/2001/XMLSchema')) {
                    throw Error(`Mixing enumeration with other restrictions is not supported... ${JSON.stringify(withoutAnotations, undefined, ' ')}`);
                }


                const r: DeepPromise<simpleTypeRestrictionEnumeration> = makePromise<simpleTypeRestrictionEnumeration>(async resolve => {
                    const values = withoutAnotations.map(x => x.attributes['value'])

                    const tmp: simpleTypeRestrictionEnumeration = {
                        subSubType: "enumeration",
                        subType: "restriction",
                        type: "simpleType",
                        baseType: await waitAll(simpleTypeDepot.getType(getTagname(single.attributes['base'], xml.scope))),
                        values: values
                    }
                    resolve(tmp);
                }, 'getSimpleType-restriction-enumeration').catch(x => {
                    console.error(`Faild Promise ${x}`);
                    throw Error(`Faild Promise ${x}`);
                });
                if (xml.attributes['name']) {
                    simpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                    complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                }
                return r;


            } else if (withoutAnotations[0].name.local === 'pattern' && withoutAnotations[0].name.namespace === 'http://www.w3.org/2001/XMLSchema') {
                // only one pattern supported
                if (withoutAnotations.length > 1) {
                    throw Error('When Pettern is used in restriction only one pattern is allowed and nothing else');
                }

                const r: simpleTypeRestrictionPattern = {
                    subSubType: "pattern",
                    subType: "restriction",
                    type: "simpleType",
                    pattern: new RegExp(withoutAnotations[0].attributes['value'])
                }
                if (xml.attributes['name']) {
                    simpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                    complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                }
                return r;
            } else if ((withoutAnotations[0].name.local === 'maxExclusive' || withoutAnotations[0].name.local === 'maxInclusive' || withoutAnotations[0].name.local === 'minExclusive' || withoutAnotations[0].name.local === 'minInclusive') && withoutAnotations[0].name.namespace === 'http://www.w3.org/2001/XMLSchema') {

                const minExclusive = withoutAnotations.filter(x => x.name.local === 'minExclusive' && x.name.namespace === 'http://www.w3.org/2001/XMLSchema')[0]?.attributes['value']
                const maxExclusive = withoutAnotations.filter(x => x.name.local === 'maxExclusive' && x.name.namespace === 'http://www.w3.org/2001/XMLSchema')[0]?.attributes['value']
                const minInclusive = withoutAnotations.filter(x => x.name.local === 'minInclusive' && x.name.namespace === 'http://www.w3.org/2001/XMLSchema')[0]?.attributes['value']
                const maxInclusive = withoutAnotations.filter(x => x.name.local === 'maxInclusive' && x.name.namespace === 'http://www.w3.org/2001/XMLSchema')[0]?.attributes['value']
                let numberOfAllowedElements = 0;
                if (minExclusive) {
                    numberOfAllowedElements++;
                }
                if (maxExclusive) {
                    numberOfAllowedElements++;
                }
                if (minInclusive) {
                    numberOfAllowedElements++;
                }
                if (maxInclusive) {
                    numberOfAllowedElements++;
                }
                // we only support one off every element, if we have more of one or additionally others we fail.
                if (withoutAnotations.length != numberOfAllowedElements) {
                    throw Error('min max is not allowed with other elements.');
                }
                const r: simpleTypeRestrictionNumber = {
                    subSubType: "Number",
                    subType: "restriction",
                    type: "simpleType",
                    minExclusive: minExclusive ? parseInt(minExclusive) : undefined,
                    maxExclusive: maxExclusive ? parseInt(maxExclusive) : undefined,
                    minInclusive: minInclusive ? parseInt(minInclusive) : undefined,
                    maxInclusive: maxInclusive ? parseInt(maxInclusive) : undefined
                }
                if (xml.attributes['name']) {
                    simpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                    complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                }
                return r;
            } else {
                throw Error('Unknown simple Restriction');
            }
        } else if (single.name.local === 'union' && single.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
            const r: DeepPromise<simpleType> = {
                type: 'simpleType',
                subType: 'union',
                unions: filterUndefined(single.children.map(x => getSimpleType(x, targetNamespace)))
            }
            if (xml.attributes['name']) {
                simpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
                complexOrSimpleTypeDepot.setType({ local: xml.attributes['name'], namespace: targetNamespace }, r);
            }
            return r;
        }

    } else {
        return undefined;
    }
}
function getAttribute(xml: Xml, targetNamespace: string, isRoot: boolean): DeepPromise<attribute> | undefined {
    if (xml.name.local === 'attribute' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
        if (!xml.scope) {
            console.error(`scope is undefined ${JSON.stringify(xml, undefined, ' ')}`)
        }
        const tagName = { local: xml.attributes['name'], namespace: targetNamespace };
        if (xml.attributes['ref']) {
            // handle referenced attribute
            return attributeDepot.getType(getTagname(xml.attributes['ref'], xml.scope)) as DeepPromise<attribute>;
        } else {

            const use = xml.attributes['use'] as undefined | 'required' | 'optional' | 'prohibited' ?? 'optional';
            if (use === 'prohibited') {
                return undefined;
            }


            let type = makePromise<simpleType>(async (resolve) => {

                if (xml.attributes['type']) {
                    const fullName = getTagname(xml.attributes['type'], xml.scope);
                    const found = await waitAll(simpleTypeDepot.getType(fullName));
                    resolve(found);
                    return;
                }

                const possibleSimpleTypes = (await Promise.all(xml.children.map(async x => await getSimpleType(x, targetNamespace)))).filter(x => x);
                const actualType = possibleSimpleTypes[0]
                if (actualType) {
                    resolve(await waitAll(actualType));
                    return;
                }
                // console.error(`No Types ${JSON.stringify(xml, undefined, ' ')}`);
                // console.info('Fallback string');
                resolve(await waitAll(simpleTypeDepot.getType(getTagname('int', undefined!))))
                return;
            }, 'getAttribute').catch(x => {
                console.error(`Faild Promise ${x}`);
                throw Error(`Faild Promise ${x}`);
            });

            const r: DeepPromise<attribute> = {
                default: xml.attributes['default'],
                name: tagName,
                optional: use === 'optional',
                simpleType: type
            }
            if (isRoot) {
                attributeDepot.setType(tagName, r);
            }
            return r;
        }
    } else {
        return undefined;
    }


}
function getAttributes(xmls: Xml[], targetNamespace: string): DeepPromise<attribute[]> {
    const r: DeepPromise<attribute[]> = makePromise<attribute[]>(async resolve => {
        const attr = await waitAll(filterUndefined(xmls.map(x => getAttribute(x, targetNamespace, false))))
        const groups = (await waitAll(filterUndefined(xmls.map(x => getAttributeGrupe(x, targetNamespace, false))))).flatMap(x => x);
        resolve(attr.concat(groups));
    }, 'getAttributes').catch(x => {
        console.error(`Faild Promise ${x}`);
        throw Error(`Faild Promise ${x}`);
    })
    return r;


}

function getAttributeGrupe(xml: Xml, targetNamespace: string, isRoot: boolean): DeepPromise<attribute[]> | undefined {
    if (xml.name.local === 'attributeGroup' && xml.name.namespace === 'http://www.w3.org/2001/XMLSchema') {
        if (xml.attributes['ref']) {
            // handle referenced attribute
            return attributeGroupDepot.getType(getTagname(xml.attributes['ref'], xml.scope)) as DeepPromise<attribute[]>;
        } else {
            const tagName = { local: xml.attributes['name'], namespace: targetNamespace };
            const r: DeepPromise<attribute[]> = makePromise<attribute[]>(async resolve => {
                const attr = await waitAll(filterUndefined(xml.children.map(x => getAttribute(x, targetNamespace, false))))
                const groups = (await waitAll(filterUndefined(xml.children.map(x => getAttributeGrupe(x, targetNamespace, false))))).flatMap(x => x);
                resolve(attr.concat(groups));
            }, 'getAttributeGrupe').catch(x => {
                console.error(`Faild Promise ${x}`);
                throw Error(`Faild Promise ${x}`);
            })
            if (isRoot) {
                attributeGroupDepot.setType(tagName, r);
            }
            return r;
        }
    }
    else {
        return undefined;
    }
}


export function filterUndefined<T>(v: Array<T | undefined>): Array<T> {
    return v.filter(x => typeof x !== 'undefined') as any;
}

