import parseSchemas2 from './xsd';
import { generateTypes as generateTypes2, TypeMapping } from './type-generator';
import { Parser as Parser2 } from './parser';


export const parseSchemas = parseSchemas2;
export const generateTypes = generateTypes2;
export const Parser = Parser2;

export function toTsTypes(types: TypeMapping) {
    return Object.entries(types)
        .sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
        .map(x => ` ${(!x[0].startsWith('ιδ') ? 'export' : '')} type ${x[0]} = ${x[1]}\n`);
}
