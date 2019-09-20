import { AuthService } from './js/services/auth.service';
import { ChatService } from './js/services/chat.service';

export class App {
    constructor() {
        this.authService = new AuthService();

        this.userName = this.authService.userName;

        if (this.userName) {
            this.chatService = new ChatService(this.userName);
            this.chatService.displayChat();
        }
    }

}

if (document.readyState === "complete" || document.addEventListener) {
    new App();
}