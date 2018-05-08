import "babel-register";
import { DirWatcher, Importer } from './modules';

const a = new DirWatcher('./data', false);
const b = new Importer(a);

a.start(1000); // time in ms