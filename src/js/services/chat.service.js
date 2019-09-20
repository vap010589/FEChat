import { ChatComponent } from '../components/chat.component';
import { RendererService } from './renderer.service';

export class ChatService {
    constructor(userName) {
        this.renderer = new RendererService();
        this.chatComponent = new ChatComponent(userName);

        this.container = document.querySelector('.container');
    }

    displayChat() {
        this.renderer.render(this.chatComponent.template(), this.container);
        this.chatComponent.registerHandlers();
    }
}