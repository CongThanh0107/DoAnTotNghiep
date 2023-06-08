import fs from 'fs';
import {app} from '../config/vars';

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = Buffer.from(base64, 'base64').toString('binary');
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
}

function saveByteArray(fileName: string, byte: ArrayBuffer) {
    fs.appendFile(`${app.dirUpload}/${fileName}`, Buffer.from(byte), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function readHTMLFile (path: string){
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8'}, (error, html: string) => {
            if (error) {
                reject(error);
            } else {
                resolve(html);
            }
        });
    });
}

export const passParamsToHTML = async (html: string, params: any) => {
    let modifiedHtml: string | any = await readHTMLFile(html);
    Object.keys(params).forEach((key) => {
        const regex = new RegExp(`\\[${key}\\]`, 'g');
        modifiedHtml = modifiedHtml.replace(regex, params[key]);
    });
    return modifiedHtml;
}

export default function saveFile(fileName: string, base64: string) {
    const byte = base64ToArrayBuffer(base64);
    saveByteArray(fileName, byte);
}


