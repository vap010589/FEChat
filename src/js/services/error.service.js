import { RendererService } from './renderer.service';
import { ErrorComponent } from '../components/error.component';

export class ErrorService {
    constructor() {
        this.renderer = new RendererService();
        this.errorComponent = new ErrorComponent();

        this.container = document.querySelector('.container')
    }

    displayError() {
        this.renderer.render(this.errorComponent.template(), this.container);
        this.errorComponent.registerHandlers();
    }
}