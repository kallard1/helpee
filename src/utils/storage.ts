import storage from 'local-storage-fallback';

export default class storageUtils {
    static getJsonItem(name: any) {
        let value = storage.getItem(name);
        if(!value) {
            return null
        }

        return JSON.parse(value);
    }

    static setJsonItem(name: any, value: any) {
        storage.setItem(name, JSON.stringify(value));
        return value;
    }
}