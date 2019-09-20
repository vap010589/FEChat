export class CacheService {
    getSessionStorageItem(itemName) {
        return sessionStorage.getItem(itemName);
    }

    setSessionStorageItem(itemName, itemValue) {
        sessionStorage.setItem(itemName, itemValue);
    }

    getLocalStorageItem(itemName) {
        return localStorage.getItem(itemName);
    }

    setLocalStorageItem(itemName, itemValue) {
        localStorage.setItem(itemName, itemValue);
    }
}