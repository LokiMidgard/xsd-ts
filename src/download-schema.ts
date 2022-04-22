import { parseXml, Xml } from "./parse-xml.js";
import { filterUndefined } from "./xsd.js";
import fetch from 'node-fetch';


export async function downloadXsd(uri: string): Promise<Xml[]> {
    const map: Record<string, Promise<Xml> | undefined> = {};
    await GetSchemaXml(uri, map);

    const schemas = filterUndefined(await Promise.all(Object.values(map)))
    return schemas;
}

async function GetSchemaXml(uri: string, map: Record<string, Promise<Xml> | undefined>) {
    console.info(`Download ${uri}`);
    const response = await fetch(uri);

    const xml = parseXml(await response.text())

    if (xml.name.local !== 'schema' || xml.name.namespace !== 'http://www.w3.org/2001/XMLSchema') {
        console.log(xml)
        throw Error('No Schema');
    }
    if (!map[xml.attributes['targetNamespace']]) {
        map[xml.attributes['targetNamespace']] = Promise.resolve(xml);
    }

    for (const imports of xml.children.filter(x => x.name.local == 'import' && x.name.namespace == 'http://www.w3.org/2001/XMLSchema')) {
        if (map[imports.attributes['namespace']]) {
            // already imported...
            continue;
        }
        const newNamespace = imports.attributes['namespace'];
        if (imports.attributes['schemaLocation']) {
            const lastSlash = uri.lastIndexOf('/');
            const subUri = uri.substring(0, lastSlash + 1) + imports.attributes['schemaLocation'];
            map[newNamespace] = GetSchemaXml(subUri, map);
        } else {
            map[newNamespace] = GetSchemaXml(newNamespace, map);
        }
    }


    return xml;
}


