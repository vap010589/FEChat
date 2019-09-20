export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
]

export function toHHMM(date) {
    const hh = formatTwoDigits(date.getHours());
    const mm = formatTwoDigits(date.getMinutes());
    return `${hh}:${mm}`;
}

export function formatTwoDigits(n) {
    return n < 10 ? '0' + n : n;
}

export function toMMMMDD(date) {
    const m = months[date.getMonth()];
    const d = formatTwoDigits(date.getDate());
    return `${m} ${d}`;
}

export function toJSON(data) {
    return JSON.stringify(data);
}

export function fromJSON(data) {
    return JSON.parse(data);
}