import * as csvParser from 'papaparse';
import through2 from 'through2';
import * as fs from 'fs';
import { promisify } from 'util';

export function reverse() {
    process.stdin.pipe(through2(function (chunk, enc, cb) {
        this.push(chunk.toString().split("").reverse().join(""));
        cb();
    })).pipe(process.stdout);
}

export function transform() {
    process.stdin.pipe(through2(function (chunk, enc, cb) {
        this.push(chunk.toString().toUpperCase());
        cb();
    })).pipe(process.stdout);
}

export function outputFile(filePath) {
    let file = fs.createReadStream(filePath).on('error', (err) => console.log(err.toString()));
    file.pipe(process.stdout);
}

export function convertFromFile(filePath) {
    let file = fs.createReadStream(filePath).on('error', (err) => console.log(err.toString()));
    csvParser.parse(file, {
        chunk: function (result, parser) {
            process.stdout.write(JSON.stringify(result.data));
        }
    });
}

export function convertToFile(filePath) {
    let ctx = 0;
    let rs = fs.createReadStream(filePath).on('error', (err) => {
        console.log(err.toString());
    });
    csvParser.parse(rs, {
        complete: function (result, file) {
            let ws = fs.createWriteStream(filePath.substring(0, filePath.length - 3) + 'json').on('error', (err) => console.log(err.toString()));
            ws.write(JSON.stringify(result.data));
        }
    });
}

export function cssBundler(folderPath) {
    const cssAppendix = `.ngmp18 {
        background-color: #fff;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
      }
      
      .ngmp18__hw3 {
        color: #333;
      }
      
      .ngmp18__hw3--t7 {
        font-weight: bold;
      }\n`;
    let cssFiles;
    promisify(fs.readdir)(folderPath).then((filenames) => {
        cssFiles = filenames.filter((file) => {
            if (file.substr(file.length - 3) === 'css') {
                return true
            } else {
                return false
            }
        });
        return Promise.all(cssFiles.map((filename) => {
            return promisify(fs.readFile)(folderPath + filename);
        }));
    }).then((buffArr) => {
        let cssString = '';
        buffArr.forEach(el => {
            cssString += el.toString();
        })
        return cssString + cssAppendix;
    }).then((cssString) => {
        promisify(fs.writeFile)(folderPath + 'bundle.css', cssString);
    }).catch((err) => {
        console.log(err.toString());
    })
}