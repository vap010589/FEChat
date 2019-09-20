import { ErrorService } from './error.service';
import { CacheService } from './cache.service';

export class AuthService {
    constructor() {
        this.errorService = new ErrorService();
        this.cacheService = new CacheService();

        this.chachedUserName = this.cacheService.getSessionStorageItem('userName');
        this._userName;

        if (this.chachedUserName) {
            this.userName = this.chachedUserName;
            this.setDocumentTitle(this.userName);
        } else {
            this.getUserName();
            this.validateUserName();
        }
    }

    get userName() {
        return this._userName;
    }

    set userName(username) {
        this._userName = username;
    }

    getUserName() {
        this.userName = prompt('Введите ваше имя', '');
    }

    setDocumentTitle(userName) {
        document.title = `FEChat: ${userName}`;
    }

    isInvalid() {
        return this.userName === null || this.userName.trim() === '';
    }

    validateUserName() {
        if (this.isInvalid()) {
            this.errorService.displayError();
            this.userName = null;
        } else {
            this.cacheService.setSessionStorageItem('userName', this.userName);
            this.setDocumentTitle(this.userName);
        }
    }
}