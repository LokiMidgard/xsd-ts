import parseSchemas2 from './xsd';
import { generateTypes as generateTypes2, TypeMapping } from './type-generator';
import { Parser as Parser2 } from './parser';


export const parseSchemas = parseSchemas2;
export const generateTypes = generateTypes2;
export const Parser = Parser2;

export function toTsTypes(types: TypeMapping) {
    return Object.entries(types)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(x => ` ${(!x[0].startsWith('ι') ? 'export' : '')} type ${x[0]} = ${x[1]}\n`).reduce((p, c) => p + '\n' + c, '/* eslint-disable @typescript-eslint/ban-types */\n\n');
}
