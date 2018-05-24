import program from 'commander';
import { reverse, transform, outputFile, convertFromFile, convertToFile, cssBundler } from './utils/streams';

program.version('0.0.1')
    .option('-a, --Action [value]', 'Action')
    .option('-f, --file [value]', 'Input file')
    .option('-r, --read [value]', 'CSS READ directoty path')
    .parse(process.argv);

switch (program.Action) {
    case 'reverse': {
        reverse();
        break;
    }
    case 'transform': {
        transform();
        break;
    }
    case 'outputFile': {
        if (program.file) {
            outputFile(program.file);
            break;
        } else {
            program.outputHelp();
            break;
        }
    }
    case 'convertFromFile': {
        if (program.file) {
            convertFromFile(program.file);
            break;
        } else {
            program.outputHelp();
            break;
        }
    }
    case 'convertToFile': {
        if (program.file) {
            convertToFile(program.file);
            break;
        } else {
            program.outputHelp();
            break;
        }
    }
    case 'cssBundle': {
        if (program.read) {
            cssBundler(program.read);
            break;
        } else {
            program.outputHelp();
            break;
        }
    }
    default: {
        program.outputHelp();
    }
}