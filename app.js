import "babel-register";
import { DirWatcher } from './modules';

const a = new DirWatcher('./data', false);

// console.log(a);

a.start(500);

a.on('fileChanged', (fd, changes) => {
    console.log('File changed ' + fd);
});

a.on('fileAdded', (fd, changes) => {
    console.log('File added ' + fd.fullPath);
})