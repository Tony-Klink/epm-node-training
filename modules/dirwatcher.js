import * as fs from 'fs';
import * as path from 'path';
import * as events from 'events';
import * as util from 'util';

class FileDetailComparisonResuts {
    constructor() {
        this.different = false;
        this.differences = {};
    }
};

class FileDetail {
    constructor(directory, fullPath, fileName, size, extension, accessed, modified, created) {
        this.directory = directory;
        this.fullPath = fullPath;
        this.fileName = fileName;
        this.extension = extension;
        this.size = size;
        this.accessed = accessed;
        this.modified = modified;
        this.created = created;
    };

    compareTo(fd) {
        let base, compare, results = new FileDetailComparisonResuts();

        for (let key in this) {
            if (this[key] instanceof Date) {
                base = this[key].toISOString();
                compare = fd[key].toISOString();
            } else {
                base = this[key];
                compare = fd[key];
            }

            if (base != compare) {
                if (!results.differences[key]) {
                    results.differences[key] = {}
                }
                results.differences[key].baseValue = this[key];
                results.differences[key].comparedValue = fd[key];
                results.different = true;
            }
        }
        return results;
    }
}

export class DirWatcher {
    constructor(root, recursive) {
        this._root = root;
        this._recursive = recursive;
        this._directoryStructure = {};
        this._timer = null;
        events.EventEmitter.call(this);
        util.inherits(DirWatcher, events.EventEmitter);
    }

    selectParentNode(dir) {
        let hierarchy = dir.split(path.sep);
        let newPath = '';

        hierarchy.pop();
        newPath = hierarchy.join(path.sep);
        return (this.selectCurrentNode(newPath));
    }

    selectCurrentNode(dir) {
        let deepRoot = this._root.replace(path.basename(this._root), '');
        let hierarchy = dir.replace(this._root, path.basename(this._root)).split(path.sep);
        
        let currentNode = this._directoryStructure;
        let currentPath = deepRoot;
        
        for (let i = 0; i < hierarchy.length; i++) {
            currentPath += hierarchy[i] + path.sep;
            
            if (currentNode[hierarchy[i]] === undefined) {
                currentNode[hierarchy[i]] = {};
                this.emit('folderAdded', currentPath.substring(0, currentPath.length - 1));
            }
            currentNode = currentNode[hierarchy[i]];
        }
        return currentNode;
    }

    recordFile(p, cb) {
        fs.stat(p, (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
                let dir = path.dirname(p);
                let fd = new FileDetail(dir, p, path.basename(p), stats.size, path.extname(p), stats.atime, stats.mtime, stats.ctime);
                let currentNode = this.selectCurrentNode(dir);
                if (currentNode[fd.fileName]) {
                    let fileCompare = currentNode[fd.fileName].compareTo(fd);
                    if (fileCompare.different) {
                        currentNode[fd.fileName] = fd;
                        this.emit('fileChanged', fd, fileCompare.differences);
                    }
                } else {
                    currentNode[fd.fileName] = fd;
                    this.emit('fileAdded', fd);
                }
            } else if (stats.isDirectory()) {
                if (this._recursive) {
                    this.scanDirectory(p);
                }
            }
            cb();
        });
    }

    detectFolderDelete(dir, folderName) {
        fs.exists(dir, (exist) => {
            if (!exist) {
                this.emit('folderRemoved', dir);
                let currentNode = this.selectParentNode(dir);
                delete currentNode[folderName];
            }
        });
    }

    detectFileDelete(fd) {
        fs.exists(fd.fullPath, (exist) => {
            if (!exist) {
                this.emit('fileRemoved', fd.fullPath);
                let currentNode = this.selectCurrentNode(fd.directory);
                delete currentNode[fd.fileName];
            }
        });
    }

    detectDeletes(dir) {
        let currentNode = this.selectCurrentNode(dir);
        for (let key in currentNode) {
            if (currentNode[key] instanceof FileDetail) {
                this.detectFileDelete(currentNode[key]);
            } else {
                this.detectFolderDelete(dir + path.sep + key);
            }
        }
    }

    scanDirectory(dir) {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;
            let i = files.length;
            if (i === 0) {
                this.emit('scannedDirectory', dir);
            } else {
                for (let f in files) {
                    this.recordFile(path.join(dir, files[f]), () => {
                        i--;
                        if (i === 0) {
                            this.emit('scannedDirectory', dir);
                        }
                    });
                }
            }
            this.detectDeletes(dir);
        });
    }

    start(interval) {
        if (interval) {
            this._timer = setInterval(() => {this.scanDirectory(this._root)}, interval);
        } else {
            this.stop();
        }
        this.scanDirectory(this._root);
    }

    stop() {
        clearTimeout(this._timer);
    }
}