import * as csvParser from 'papaparse';
import * as fs from 'fs';
import * as util from 'util';

export class Importer {
    constructor(dirWatcher) {
        this.dirWatcher = dirWatcher;
        this.listener = (fd, changes) => {
            this.import(fd.fullPath).then(data => {
                console.log(csvParser.parse(data.toString()).data)
            });
        };
        this.dirWatcher.on('fileChanged', this.listener);
        this.dirWatcher.on('fileAdded', this.listener);
    }

    import(path) {
        const fileStream = util.promisify(fs.readFile);
        return fileStream(path);
    }

    importSync(path) {
        console.log(csvParser.parse(fs.readFileSync(path).toString()).data);
    }
}