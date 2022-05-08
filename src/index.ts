import { element, parseSchemas } from './xsd.js';
import stringify from 'json-stringify-safe'
import { downloadXsd } from './download-schema.js';
import { waitAll } from './utils.js';
import { generateTypes } from './type-generator.js';
import path, { parse } from 'path';
import fetch from 'node-fetch';

import fs from 'fs'
import { Parser } from './parser.js';


import { Daten } from '../tmp.js';

async function main() {
    const uri = 'https://nota-game.github.io/schema/vNext/nota.xsd';
    const uri2 = 'https://nota-game.github.io/Content/vNext/data/nota.xml';
    console.log('downloadXSD')
    const schemas = await downloadXsd(uri);
    console.log('ParseSchemas')
    const parsing = parseSchemas(schemas);
    console.log('ParseSchemas2')
    const elements = await waitAll(parsing) as any as element[];
    console.log('generate Types')

    const types = await generateTypes(elements);



    console.log('finised')


    await fs.promises.writeFile('tmp.ts', Object.entries(types).map(x => ` export type ${x[0]} = ${x[1]}\n`))

    console.log('parser')
    const parser = new Parser<Daten>(elements.filter(x => x.name.local === 'Daten')[0]);
    console.log('fetch2')
    const response = await fetch(uri2);
    console.log('xml')
    const xml = await response.text();

    console.log('parse')
    const parsed = parser.parse(xml) as Daten;
    console.log('write')
    await fs.promises.writeFile('tmp.json', JSON.stringify(parsed, undefined, ' '))

    // console.log(parsed.Daten.Talente.Talent[0].Probe.Mut.length);
    
    // console.log( parsed.Daten.Ausstattung.Waffen.Fernkampfwaffe[0].Reichweiten.Reichweite[0].Distanz);


    // const x: Daten = {
    //     Daten: {
    //         Organismen: {
    //             Gattung: [
    //                 {
    //                     Beschreibung: {
    //                         Lokalisirung: [
    //                             "bla"
    //                         ]
    //                     },
    //                     Id: '',
    //                     Name: {
    //                         Lokalisirung: ['']
    //                     }

    //                 }
    //             ]
    //         }
    //     }
    // }


    // console.log(stringify(types, undefined, 2));
}






main();