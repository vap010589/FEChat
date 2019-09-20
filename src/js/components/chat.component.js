import { toHHMM, toJSON, fromJSON, toMMMMDD } from '../shared/utils';
import { MessageComponent } from './message.component';
import { GroupByComponent } from './group-by.component';
import { RendererService } from '../services/renderer.service';
import { CacheService } from '../services/cache.service';

export class ChatComponent {
    constructor(userName) {
        this.renderer = new RendererService();
        this.cacheService = new CacheService();

        this.userName = userName;
        this.message = '';
        this.hasChachedMessageList = this.cacheService.getLocalStorageItem('messageList') !== null;
        this.messageList = new Map();

        if (this.hasChachedMessageList) {
            this.updateMessageListFromStorage(this.cacheService.getLocalStorageItem('messageList'))

            setTimeout(() => {
                this.render();
            }, 0);
        }
    }

    template() {
        return `<div class="row">
                    <div class="col col-8">
                        <div class="message-list"></div>
                    </div>
                    <div class="col col-4">
                        <div class="sticky">
                            <div class="form-group">
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary btn-block">Отправить</button>
                        </div>
                    </div>
                </div>`;
    }

    updateMessage(message) {
        this.message = message.trim();
    }

    clearFormControl() {
        document.querySelector('.form-control').value = '';
        this.message = '';
    }

    validate() {
        if (this.isValid()) {
            this.send();
            this.clearFormControl();
        }
    }

    isValid() {
        return this.message !== '';
    }

    send() {
        const message = {
            userName: this.userName,
            dateTime: toHHMM(new Date()),
            message: this.message
        };

        this.updateMessageList(toMMMMDD(new Date()), message);

        this.cacheService.setLocalStorageItem('messageList', toJSON(Array.from(this.messageList.entries())));
        this.render();
    }

    render() {
        const elements = [];

        this.messageList.forEach((v, k, map) => {

            elements.push(new GroupByComponent().template(k));

            v.forEach(item => {
                elements.push(new MessageComponent().template(item));
            });

        });

        this.renderer.render(elements.join(' '), document.querySelector('.message-list'));
    }

    updateMessageList(key, value) {
        if (this.messageList.has(key)) {

            this.messageList.forEach((v, k, map) => {
                if (k === key) {
                    v.push(value);
                }
            });

        } else {
            this.messageList.set(key, [value]);
        }
    }

    updateMessageListFromStorage(value) {
        if (value) {
            this.messageList = new Map(fromJSON(value));
        } else {
            this.messageList = new Map();
        }
    }

    registerHandlers() {
        document.querySelector('.btn-primary')
            .addEventListener('click', () => {
                this.validate();
            });

        document.querySelector('.form-control')
            .addEventListener('change', (event) => {
                this.updateMessage(event.target.value);
            });

        window.addEventListener('storage', (event) => {
            this.updateMessageListFromStorage(event.newValue)
            this.render();
        });
    }
}