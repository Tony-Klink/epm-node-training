'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reverse = reverse;
exports.transform = transform;
exports.outputFile = outputFile;
exports.convertFromFile = convertFromFile;
exports.convertToFile = convertToFile;

var _papaparse = require('papaparse');

var csvParser = _interopRequireWildcard(_papaparse);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _util = require('util');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function reverse() {
    process.stdin.pipe((0, _through2.default)(function (chunk, enc, cb) {
        this.push(chunk.toString().split("").reverse().join(""));
        cb();
    })).pipe(process.stdout);
}

function transform() {
    process.stdin.pipe((0, _through2.default)(function (chunk, enc, cb) {
        this.push(chunk.toString().toUpperCase());
        cb();
    })).pipe(process.stdout);
}

function outputFile(filePath) {
    let file = fs.createReadStream(_path2.default.normalize(filePath)).on('error', err => console.log(err.toString()));
    file.pipe(process.stdout);
}

function convertFromFile(filePath) {
    let file = fs.createReadStream(_path2.default.normalize(filePath)).on('error', err => {
        console.log(err.toString());
        console.log('Invalid argument');
        _commander2.default.outputHelp();
    });
    csvParser.parse(file, {
        chunk: function (result, parser) {
            process.stdout.write(JSON.stringify(result.data));
        },
        complete: function () {
            file.close();
            process.kill();
        }
    });
}

function convertToFile(filePath) {
    let ctx = 0;
    let rs = fs.createReadStream(_path2.default.normalize(filePath)).on('error', err => {
        console.log(err.toString());
        console.log('Invalid argument');
        _commander2.default.outputHelp();
    });
    csvParser.parse(rs, {
        complete: function (result, file) {
            let ws = fs.createWriteStream(filePath.substring(0, filePath.length - 3) + 'json').on('error', err => console.log(err.toString()));
            ws.write(JSON.stringify(result.data));
            rs.close();
            ws.close();
        }
    });
}

function cssBundler(folderPath) {
    let fPath = _path2.default.normalize(folderPath);
    if (fPath.substr(fPath.length - 1) !== '\\') {
        fPath += '\\';
    };
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
    (0, _util.promisify)(fs.readdir)(fPath).then(filenames => {
        cssFiles = filenames.filter(file => {
            if (file.substr(file.length - 3) === 'css') {
                return true;
            } else {
                return false;
            }
        });
        return Promise.all(cssFiles.map(filename => {
            return (0, _util.promisify)(fs.readFile)(fPath + filename);
        }));
    }).then(buffArr => {
        let cssString = '';
        buffArr.forEach(el => {
            cssString += el.toString();
        });
        return cssString + cssAppendix;
    }).then(cssString => {
        (0, _util.promisify)(fs.writeFile)(fPath + 'bundle.css', cssString);
    }).catch(err => {
        console.log(err.toString());
        console.log('Invalid argument');
        _commander2.default.outputHelp();
    });
}

_commander2.default.version('0.0.1').option('-a, --Action [value]', 'Action').option('-f, --file [value]', 'Input file').option('-r, --read [value]', 'CSS READ directoty path').parse(process.argv);

switch (_commander2.default.Action) {
    case 'reverse':
        {
            reverse();
            break;
        }
    case 'transform':
        {
            transform();
            break;
        }
    case 'outputFile':
        {
            if (_commander2.default.file) {
                outputFile(_commander2.default.file);
                break;
            } else {
                console.log('Invalid argument');
                _commander2.default.outputHelp();
                break;
            }
        }
    case 'convertFromFile':
        {
            if (_commander2.default.file) {
                convertFromFile(_commander2.default.file);
                break;
            } else {
                console.log('Invalid argument');
                _commander2.default.outputHelp();
                break;
            }
        }
    case 'convertToFile':
        {
            if (_commander2.default.file) {
                convertToFile(_commander2.default.file);
                break;
            } else {
                _commander2.default.outputHelp();
                break;
            }
        }
    case 'cssBundle':
        {
            if (_commander2.default.read) {
                cssBundler(_commander2.default.read);
                break;
            } else {
                console.log('Invalid argument');
                _commander2.default.outputHelp();
                break;
            }
        }
    default:
        {
            console.log('Invalid argument');
            _commander2.default.outputHelp();
        }
}
