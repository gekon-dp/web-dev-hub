/**
 * @file render-slider-ui.js
 * @description Утилита для безопасного создания разметки и элементов управления слайдера в DOM.
 */

/**
 * Создает и монтирует интерфейс слайдера
 * @param {Object} config - Параметры разметки
 * @param {HTMLElement} config.container - Целевой контейнер для монтирования слайдера
 * @param {string[]} config.images - Массив URL-адресов изображений
 * @param {number} [config.slideWidth=500] - Ширина одного слайда в пикселях
 * @returns {Object} Ссылки на созданные DOM-элементы (frame, cards, dotsContainer, leftBtn, rightBtn)
 */
export const renderSliderUI = ({ container, images, slideWidth = 500 }) => {
  if (!container || !Array.isArray(images)) return null;

  container.innerHTML = "";

  const frame = document.createElement("div");
  frame.className = "slider-frame";

  const cards = document.createElement("div");
  cards.className = "slider-cards";

  const triggers = document.createElement("div");
  triggers.className = "slider-triggers";

  const leftBtn = document.createElement("button");
  leftBtn.className = "slider-btn slider-btn-prev";
  leftBtn.textContent = "<";

  const rightBtn = document.createElement("button");
  rightBtn.className = "slider-btn slider-btn-next";
  rightBtn.textContent = ">";

  triggers.append(leftBtn, rightBtn);

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";

  images.forEach((imageSrc, index) => {
    const card = document.createElement("div");
    card.className = "slider-card";
    card.style.backgroundImage = `url("${imageSrc}")`;
    cards.append(card);

    const dot = document.createElement("button");
    dot.className = `slider-dot ${index === 0 ? "active" : ""}`;
    dotsContainer.append(dot);
  });

  frame.append(cards, triggers, dotsContainer);
  container.append(frame);

  const updateUI = (index) => {
    cards.style.transform = `translateX(${-slideWidth * index}px)`;

    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  return { frame, cards, dotsContainer, leftBtn, rightBtn, updateUI };
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование `transform: translateX(...)` вместо `left` задействует аппаратное ускорение видеокарты (GPU) для более плавной анимации.
// 2. Метод `dot.classList.toggle("active", i === index)` эффективнее ручной проверки через if/else.
// 3. Возврат созданных элементов позволяет легко привязывать события через внешние утилиты.
