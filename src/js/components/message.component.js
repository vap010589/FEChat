export class MessageComponent {
    template(item) {
        return `<div class="message-list-item">
                    <h5>
                        <span>${item.userName}</span>
                        <small class="text-muted">${item.dateTime}</small>
                    </h5>
                    <div>${item.message}</div>
                </div>`;
    }
}