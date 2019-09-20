export class ErrorComponent {
    template() {
        return `<h2>Что-то пошло не так.</h2>
                <p>Имя не должно быть пустым</p>
                <button type="button" class="btn btn-info">Попробовать еще раз</button>`;
    }

    registerHandlers() {
        document.querySelector('.btn-info')
            .addEventListener('click', () => {
                location.reload();
            });
    }
}