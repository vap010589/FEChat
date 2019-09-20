export class RendererService {
    render(template, viewport) {
        viewport.innerHTML = template;
    }
}