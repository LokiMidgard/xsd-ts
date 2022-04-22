import { XMLParser } from 'fast-xml-parser';
import Depot from './Depot';
import { builtInXsdtypes, filterUndefined, parseSchemas, waitAll } from './xsd.js';
import stringify from 'json-stringify-safe'
import { parseXml, Xml } from './parse-xml';
import { downloadXsd } from './download-schema.js';




async function main() {
    const uri = 'https://nota-game.github.io/schema/vNext/nota.xsd';
    const schemas = await downloadXsd(uri);
    const parsing = parseSchemas(schemas);
    const elements = await waitAll(parsing);

    console.log('finised')

    console.log(stringify(elements, undefined, 2));
}






main();