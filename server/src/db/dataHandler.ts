import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

const DB_PATH = path.resolve(__dirname, 'data');
const DB_FILE_EXT = '.json';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//TODO: to do internal error handler
export default class DataHandler {
    path: string;

    constructor(private entity: string) {
        this.entity = entity;
        this.path = path.resolve(DB_PATH, `${this.entity}${DB_FILE_EXT}`);
    }

    async readFile() {
        try {
            const data = await readFileAsync(this.path, {encoding: 'utf8'});
            return JSON.parse(data);
        } catch (e) {
            console.log(`Problem occured while reading ${this.entity} DB file`);
        }
    }

    async writeFile(data) {
        try {
            await writeFileAsync(this.path, JSON.stringify(data));
            return true;
        } catch (e) {
            console.log(`Problem occured while writing ${this.entity} DB file`);
            return false;
        }
    }

    async findById(id) {
        try {
            const data = this.readFile();
            return data[id];
        } catch (err) {
            console.log(`Problem occured while writing ${this.entity} DB file`);
        }
    }

    async findEach(condition) {
        try {
            const data = this.readFile();
            return Object.keys(data).map(item => data[item]).filter(item => item[condition.key] === condition.value);
        } catch (err) {
            console.log(`Problem occured while writing ${this.entity} DB file`);
        }
    }
}
