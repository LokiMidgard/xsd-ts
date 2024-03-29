import { Xml, parseXml } from "xml-ns-parser";
import { all, choise, complexContent, complexType, element, sequence, simpleContent, simpleType } from "./xsd";


export class Parser<T> {
    private element: element;
    constructor(element: element) {
        this.element = element;
    }

    /**
     * parse
     */
    public parse(xml: string, entityLookup?: (path: string) => Promise<string>): Promise<T | undefined>;
    public parse(xml: Xml): Promise<T | undefined>;
    public async parse(xml: string | Xml, entityLookup?: (path: string) => Promise<string>): Promise<T | undefined> {
        if (typeof xml === 'string') {
            return this.parse(await parseXml(xml, entityLookup ));
        }


        return this.parseElement(xml, this.element) as T | undefined;
    }

    private parseUnknown(xml: Xml, element: element | complexType | simpleType | all) {
        if (element.type === 'element') {
            return this.parseElement(xml, element);
        } else if (element.type === 'simpleType') {
            return this.parseSimpleType(xml, element);
        } else if (element.type === 'complexType') {
            return this.parseComplexType(xml, element);
        }

    }
    private parseElement(xml: Xml | undefined, element: element) {
        if (typeof xml === 'undefined') {
            return null;
        }
        if (xml.name.local !== element.name.local || xml.name.namespace !== element.name.namespace) {
            //  console.log(`Faild parse ${JSON.stringify(xml.name)} should be ${JSON.stringify(element.name)}`)
            return null;
        }
        const x: any = {};
        x[element.name.local] = element.content ? this.parseUnknown(xml, element.content) : {};
        return x;
    }

    private parseChoiceType(xml: Xml, element: choise, index: { index: number }): any {

        const parseChoiceInternal = (xml: Xml, choise: choise, index: { index: number }): any => {
            let result: any = null;
            let currentIndex = index.index;
            for (let i = 0; i < choise.content.length; i++) {
                const x = choise.content[i];
                if (x.type === 'element') {
                    if (x.occurence.maxOccurance === 'unbounded' || x.occurence.maxOccurance > 1) {
                        let i = 0;
                        let tmpResult: any = null;
                        while (true) {

                            const e = this.parseElement(xml.children[currentIndex], x);

                            if (e === null || i > x.occurence.maxOccurance) {
                                break;
                            } else if (tmpResult == null) {
                                const key = Object.keys(e)[0];
                                tmpResult = {};
                                tmpResult[key] = [];
                            }

                            const key = Object.keys(e)[0];
                            currentIndex++;
                            i++;
                            tmpResult[key] = [...(tmpResult[key]), e[key]];
                        }

                        if (tmpResult == null) {
                            continue;
                        }
                        const key = Object.keys(tmpResult)[0];
                        if (tmpResult[key].length < x.occurence.minOccurance) {
                            continue;
                        } else {
                            result = { ...result, ...tmpResult };
                            break;
                        }
                    } else {
                        const e = this.parseElement(xml.children[currentIndex], x);
                        if (e === null) {
                            // console.log(`choice  did NOT mathch minocurence was >0 ${JSON.stringify(x.name)} ${JSON.stringify(xml.children[currentIndex]?.name)}`)
                            continue;
                        }
                        currentIndex++;
                        const keys = Object.keys(e);
                        if (keys.length == 1) {
                            const key = keys[0];
                            e['#'] = key;
                        }

                        result = e;
                        break;
                    }
                } else if (x.type === 'all') {
                    const currentIndexWrapper = { index: currentIndex };
                    const tmp = this.parseAllType(xml, x, currentIndexWrapper);
                    if (tmp === null) {
                        continue;
                    }
                    currentIndex = currentIndexWrapper.index;
                    result = tmp;
                    break;
                } else if (x.type === 'choise') {
                    const currentIndexWrapper = { index: currentIndex };
                    const tmp = this.parseChoiceType(xml, x, currentIndexWrapper);
                    if (tmp === null) {
                        continue;
                    }
                    currentIndex = currentIndexWrapper.index;
                    result = tmp;
                    break;
                } else if (x.type === 'sequence') {
                    const currentIndexWrapper = { index: currentIndex };
                    const tmp = this.parseSequenceType(xml, x, currentIndexWrapper);
                    if (tmp === null) {
                        continue;
                    }
                    currentIndex = currentIndexWrapper.index;
                    result = tmp;
                    break;
                }

            }
            if (result != null) {
                index.index = currentIndex;
            }
            if (result === null) {
                // console.log(`Did NOT find in CHoice `)
            }

            return result;
        }

        if (element.occurence.maxOccurance === 'unbounded' || element.occurence.maxOccurance > 1) {
            const result: any = {};



            while (true) {

                const partialResult = parseChoiceInternal(xml, element, index);
                if (partialResult !== null) {

                    for (const key of Object.keys(partialResult)) {
                        if (typeof result[key] === 'undefined') {
                            result[key] = [];
                        }
                        (result[key] as any[]).push(partialResult[key] as any);
                    }
                }
                const numberofElements = Object.values(result).map(x => (x as any[]).length).reduce((p, c) => p + c, 0);
                if (partialResult === null || numberofElements === element.occurence.maxOccurance) {
                    break;
                }
            }

            const numberofElements = Object.entries(result).filter(([key]) => key !== '#').map(x => (x[1] as any[]).length).reduce((p, c) => p + c, 0);
            if (numberofElements < element.occurence.minOccurance || numberofElements > element.occurence.maxOccurance) {
                return null;
            }
            else {
                return result;
            }

        } else if (element.occurence.minOccurance === 0) {
            const result = parseChoiceInternal(xml, element, index);
            if (result === null) {
                return {}; // the result may be undefine???
            } else {
                return result;
            }

        } else {
            return parseChoiceInternal(xml, element, index);
        }

    }
    private parseSequenceType(xml: Xml, sequence: sequence, index: { index: number }) {
        let result: any = {};
        let currentIndex = index.index;
        for (let i = 0; i < sequence.content.length; i++) {
            const x = sequence.content[i];
            if (x.type === 'element') {
                if (x.occurence.maxOccurance === 'unbounded' || x.occurence.maxOccurance > 1) {
                    let i = 0;
                    let tmpResult: any = null;
                    while (true) {
                        const e = this.parseElement(xml.children[currentIndex], x);

                        if (e === null || i > x.occurence.maxOccurance) {
                            break;
                        } else if (tmpResult == null) {
                            const key = Object.keys(e)[0];
                            tmpResult = {};
                            tmpResult[key] = [];
                        }

                        const key = Object.keys(e)[0];
                        currentIndex++;
                        i++;
                        tmpResult[key] = [...(tmpResult[key]), e[key]];
                    }

                    if (tmpResult == null) {
                        const ttt = {} as any;
                        ttt[x.name.local] = []
                        result = { ...result, ...ttt };
                        // console.log(`sequence array did NOT mathch ${JSON.stringify(x.name)}`)
                        continue;
                    }

                    const key = Object.keys(tmpResult)[0];
                    if (tmpResult[key].length < x.occurence.minOccurance) {
                        // console.log(`sequence array did NOT mathch TO many elements ${JSON.stringify(x.name)}`)
                        continue;
                    } else {
                        result = { ...result, ...tmpResult };
                        // console.log(`sequence array did mathch ${JSON.stringify(x.name)}`)
                        continue;
                    }
                } else {
                    const e = this.parseElement(xml.children[currentIndex], x);
                    if (e === null) {
                        // console.log(x.occurence)
                        if (x.occurence.minOccurance == 0) {
                            // console.log(`sequence  did mathch minocurence was 0 ${JSON.stringify(x.name)}`)
                            continue;
                        } else {
                            // console.log(`sequence  did NOT mathch minocurence was >0 ${JSON.stringify(x.name)} ${JSON.stringify(sequence.type)} ${JSON.stringify(xml.children[currentIndex]?.name)}`)
                            return null;
                        }
                    }
                    currentIndex++;
                    // console.log(`sequence single did mathch ${JSON.stringify(x.name)}`)
                    result = { ...result, ...e };
                }
            } else if (x.type === 'all') {
                const currentIndexWrapper = { index: currentIndex };
                const tmp = this.parseAllType(xml, x, currentIndexWrapper);
                if (tmp === null) {
                    return null;
                }
                currentIndex = currentIndexWrapper.index;
                result = { ...result, ...tmp };
            } else if (x.type === 'choise') {
                const currentIndexWrapper = { index: currentIndex };
                const tmp = this.parseChoiceType(xml, x, currentIndexWrapper);
                if (tmp === null) {
                    return null;
                }
                currentIndex = currentIndexWrapper.index;
                result = { ...result, ...tmp };
            } else if (x.type === 'sequence') {
                const currentIndexWrapper = { index: currentIndex };
                const tmp = this.parseSequenceType(xml, x, currentIndexWrapper);
                if (tmp === null) {
                    return null;
                }
                currentIndex = currentIndexWrapper.index;
                result = { ...result, ...tmp };

            }

        }
        index.index = currentIndex;
        return result;
    }
    private parseAllType(xml: Xml, element: all, index: { index: number }) {
        let result: any = {};
        let currentIndex = index.index;
        for (let i = 0; i < element.content.length; i++) {
            const x = element.content[i];
            if (x.type === 'element') {
                if (x.occurence.maxOccurance === 'unbounded' || x.occurence.maxOccurance > 1) {
                    let i = 0;
                    let tmpResult: any = null;
                    while (true) {

                        const e = this.parseElement(xml.children[currentIndex], x);

                        if (e === null || i > x.occurence.maxOccurance) {
                            break;
                        } else if (tmpResult == null) {
                            const key = Object.keys(e)[0];
                            tmpResult = {};
                            tmpResult[key] = [];
                        }

                        const key = Object.keys(e)[0];
                        currentIndex++;
                        i++;
                        tmpResult[key] = [...(tmpResult[key]), e[key]];
                    }

                    if (tmpResult == null) {
                        continue;
                    }

                    const key = Object.keys(tmpResult)[0];
                    if (tmpResult[key].length < x.occurence.minOccurance) {
                        continue;
                    } else {
                        result = { ...result, ...tmpResult };
                        continue;
                    }
                } else {
                    const e = this.parseElement(xml.children[currentIndex], x);
                    if (e === null) {
                        return null;
                    }
                    currentIndex++;
                    result = { ...result, ...e };
                }
            } else if (x.type === 'all') {
                const currentIndexWrapper = { index: currentIndex };
                const tmp = this.parseAllType(xml, x, currentIndexWrapper);
                if (tmp === null) {
                    return null;
                }
                currentIndex = currentIndexWrapper.index;
                result = { ...result, ...tmp };
            } else if (x.type === 'choise') {
                const currentIndexWrapper = { index: currentIndex };
                const tmp = this.parseChoiceType(xml, x, currentIndexWrapper);
                if (tmp === null) {
                    return null;
                }
                currentIndex = currentIndexWrapper.index;
                result = { ...result, ...tmp };
            } else if (x.type === 'sequence') {
                const currentIndexWrapper = { index: currentIndex };
                const tmp = this.parseSequenceType(xml, x, currentIndexWrapper);
                if (tmp === null) {
                    return null;
                }
                currentIndex = currentIndexWrapper.index;
                result = { ...result, ...tmp };

            }

        }
        index.index = currentIndex;
        return result;
    }
    private parseComplexType(xml: Xml, element: complexType): any {
        let result: any = {};
        if (typeof element.content === 'undefined') {
            // nothing todo
        } else if (element.content.type === 'simpleContent') {
            return this.parseSimpleContent(xml, element.content);
        } else if (element.content.type === 'complexContent') {
            return this.parseComplexContent(xml, element.content);
        } else if (element.content.type === 'all') {
            const allObject = this.parseAllType(xml, element.content, { index: 0 })
            if (allObject === null) {
                return null;
            }
            result = { ...allObject, ...result };


        } else if (element.content.type === 'choise') {
            const allObject = this.parseChoiceType(xml, element.content, { index: 0 })
            if (allObject === null) {
                return null;
            }
            result = { ...allObject, ...result };


        } else if (element.content.type === 'sequence') {
            const allObject = this.parseSequenceType(xml, element.content, { index: 0 })
            if (allObject === null) {
                return null;
            }
            result = { ...allObject, ...result };
        }

        for (const att of element.attributes) {

            const originalValue = xml.attributes[att.name.local];
            // if (att.name.local == 'Distanz') {
            //     console.log(`${JSON.stringify(att)}\n${originalValue}`)
            // }
            let parsed = typeof att.simpleType === 'undefined' ? originalValue : this.parseSimpleType(originalValue, att.simpleType);
            if (parsed === null) {
                if (att.default !== undefined) {
                    parsed = this.parseSimpleType(att.default, att.simpleType);
                } else if (!att.optional) {
                    console.log(`Missing required attribute ${JSON.stringify(att)}\n\t${JSON.stringify(xml.attributes)}`)
                    return null;
                }

            }
            // if (att.name.local == 'IgnoriereHöhere') {
            //     console.log(`${JSON.stringify(att)}\n${originalValue}\n${typeof parsed}: ${parsed}`)
            // }
            if (parsed !== null) {
                result[att.name.local] = parsed;
            }
        }

        return result;
    }
    private parseSimpleContent(xml: Xml, element: simpleContent) {
        const t =
            (element.base.type === 'simpleType') ?
                this.parseSimpleType(xml, element.base)
                :
                this.parseComplexType(xml, element.base);

        if (element.attributes.length == 0) {
            return t;
        } else {
            const attributeType: Record<string, string> = {};
            for (const att of element.attributes) {

                const originalValue = xml.attributes[att.name.local];
                // if (att.name.local == 'Distanz') {
                //     console.log(`${JSON.stringify(att)}\n${originalValue}`)
                // }
                let parsed = typeof att.simpleType === 'undefined' ? originalValue : this.parseSimpleType(originalValue, att.simpleType);
                if (parsed === null) {
                    if (att.default !== undefined) {
                        parsed = this.parseSimpleType(att.default, att.simpleType);
                    } else if (!att.optional) {
                        console.log(`Missing required attribute ${JSON.stringify(att)}\n\t${JSON.stringify(xml.attributes)}`)
                        return null;
                    }

                }
                if (parsed !== null) {
                    attributeType[att.name.local] = parsed;
                }
            }

            return { meta: attributeType, value: t };

        }
    }
    private parseComplexContent(xml: Xml, element: complexContent) {
        const t =
            (element.base.type === 'simpleType') ?
                this.parseSimpleType(xml, element.base)
                :
                this.parseComplexType(xml, element.base);






        let contentType: Record<string, string> = {};

        if (element.content) {
            if (element.content.type === 'all') {
                const allObject = this.parseAllType(xml, element.content, { index: 0 })
                if (allObject === null) {
                    return null;
                }
                contentType = { ...allObject, ...contentType };


            } else if (element.content.type === 'choise') {
                const allObject = this.parseChoiceType(xml, element.content, { index: 0 })
                if (allObject === null) {
                    return null;
                }
                contentType = { ...allObject, ...contentType };


            } else if (element.content.type === 'sequence') {
                const allObject = this.parseSequenceType(xml, element.content, { index: 0 })
                if (allObject === null) {
                    return null;
                }
                contentType = { ...allObject, ...contentType };
            }
        }






        const attributeType: Record<string, string> = {};

        for (const att of element.attributes) {

            const originalValue = xml.attributes[att.name.local];
            // if (att.name.local == 'Distanz') {
            //     console.log(`${JSON.stringify(att)}\n${originalValue}`)
            // }
            let parsed = typeof att.simpleType === 'undefined' ? originalValue : this.parseSimpleType(originalValue, att.simpleType);
            if (parsed === null) {
                if (att.default !== undefined) {
                    parsed = this.parseSimpleType(att.default, att.simpleType);
                } else if (!att.optional) {
                    console.log(`Missing required attribute ${JSON.stringify(att)}\n\t${JSON.stringify(xml.attributes)}`)
                    return null;
                }

            }
            if (parsed !== null) {
                attributeType[att.name.local] = parsed;
            }
        }

        return { ...contentType, ...attributeType, ...t };


    }
    private parseSimpleType(xml: Xml | string, element: simpleType): any {
        if (typeof xml === 'undefined') {
            return null;
        }
        const str = typeof xml === 'string' ? xml : xml.text;

        if (typeof str === 'undefined') {
            throw Error('should not hapen?' + JSON.stringify(xml));
        }

        if (element.subType === 'list') {
            throw Error('List is not implemented')
        } else if (element.subType === 'native') {
            if (element.base)
                if (element.base === 'boolean') {
                    const b = parseBoolean(str);
                    if (typeof b === 'undefined') {
                        return null;
                    }
                    return b;
                } else if (element.base === 'number' && isNumeric(str)) {
                    return parseFloat(str);
                } else if (element.base === 'string') {
                    return str;
                } else {
                    return null;
                }
        } else if (element.subType === 'restriction') {
            if (element.subSubType === 'Number') {
                if (!isNumeric(str)) {
                    return null;
                }
                const n = parseFloat(str);
                if ((typeof element.maxInclusive !== 'undefined' && n > element.maxInclusive)
                    || (typeof element.maxExclusive !== 'undefined' && n >= element.maxExclusive)
                    || (typeof element.minExclusive !== 'undefined' && n <= element.minExclusive)
                    || (typeof element.minInclusive !== 'undefined' && n < element.minInclusive)) {
                    return null;
                }
                return n;
            } else if (element.subSubType === 'enumeration') {
                const t = this.getTypeOfSimpleType(element.baseType);
                if (t === 'boolean') {
                    const b = parseBoolean(str);
                    if (typeof b === 'undefined' || !element.values.includes(b)) {
                        return null;
                    }
                    return b;
                } else if (t === 'number') {
                    if (!isNumeric(str)) {
                        return null;
                    }
                    const f = parseFloat(str);
                    if (!element.values.includes(f) && !element.values.includes(str)) {
                        return null;
                    }
                    return f;
                } else if (t === 'string') {
                    if (!element.values.includes(str)) {
                        return null;
                    }
                    return str
                }
            } else if (element.subSubType === 'pattern') {
                if (element.pattern.test(str)) {
                    return str;
                }
                return null;
            } else if (element.subSubType === 'simple') {
                return this.parseSimpleType(xml, element.baseType);
            }
        } else if (element.subType === 'union') {
            for (let i = 0; i < element.unions.length; i++) {
                const u = element.unions[i];
                const parsed = this.parseSimpleType(xml, u);
                if (parsed !== null) {
                    return parsed;
                }
            }
            return null;
        }

        throw Error('unsupported?');
    }

    private getTypeOfSimpleType(t: simpleType): 'string' | 'number' | 'boolean' {
        if (t.subType === 'list') {
            throw Error('List is not implemented')
        } else if (t.subType === 'native') {
            return t.base;
        } else if (t.subType === 'restriction') {
            if (t.subSubType === 'Number') {
                return 'number';
            } else if (t.subSubType === 'enumeration') {
                return this.getTypeOfSimpleType(t.baseType);
            } else if (t.subSubType === 'pattern') {
                return "string";
            } else if (t.subSubType === 'simple') {
                return this.getTypeOfSimpleType(t.baseType);
            }
        } else if (t.subType === 'union') {
            for (let i = 0; i < t.unions.length; i++) {
                const allTypes = [...new Set(t.unions.map(x => this.getTypeOfSimpleType(x)))];
                if (allTypes.length !== 1) {
                    throw Error('Not support union with diferent types. yet...');
                }
                return allTypes[0];
            }
            throw Error('Not support union with no types. yet...');
        }

        throw Error('unsupported?');

    }

}

function parseBoolean(str: string): boolean | undefined {
    if (str?.toLocaleLowerCase() === 'true' || str?.toLocaleLowerCase() === 'false') {
        return str.toLocaleLowerCase() === 'true'
    }
    return undefined;
}

function isNumeric(str: any) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}