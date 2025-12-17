const track = document.querySelector('.carousel-track');

// 1. Берем все карточки, которые есть сейчас
const cards = Array.from(track.children);

// 2. Клонируем каждую карточку и добавляем в конец ленты
// Теперь у нас будет набор: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

