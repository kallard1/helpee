import storage from "local-storage-fallback";

export default class StorageUtils {
  static getJsonItem(name: any) {
    const value = storage.getItem(name);
    if (!value) {
      return;
    }

    return JSON.parse(value);
  }

  static setJsonItem(name: any, value: any) {
    storage.setItem(name, JSON.stringify(value));
    return value;
  }
}
