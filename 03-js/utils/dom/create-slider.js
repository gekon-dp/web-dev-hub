/**
 * @file create-slider.js
 * @description Универсальный менеджер логики слайдера с поддержкой автопрокрутки, пагинации и интерактивной паузы.
 */

/**
 * Создает экземпляр управления слайдером
 * @param {Object} config - Параметры управления
 * @param {number} config.totalSlides - Общее количество слайдов
 * @param {(index: number) => void} config.onChange - Коллбэк при смене слайда
 * @param {number} [config.autoScrollDelay=5000] - Интервал автоскролла в мс (0 для отключения)
 * @param {boolean} [config.loop=true] - Циклический запуск (с последнего на первый и наоборот)
 * @returns {Object} Методы управления слайдером (next, prev, goTo, start, stop)
 */
export const createSlider = ({
  totalSlides,
  onChange,
  autoScrollDelay = 5000,
  loop = true,
}) => {
  if (!totalSlides || typeof onChange !== "function") {
    return {
      next: () => {},
      prev: () => {},
      goTo: () => {},
      start: () => {},
      stop: () => {},
    };
  }

  let currentIndex = 0;
  let intervalId = null;

  const goTo = (index) => {
    if (loop) {
      currentIndex = (index + totalSlides) % totalSlides;
    } else {
      currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    }
    onChange(currentIndex);
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const start = () => {
    if (!autoScrollDelay || intervalId) return;
    intervalId = setInterval(next, autoScrollDelay);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const resetTimer = () => {
    stop();
    start();
  };

  return { next, prev, goTo, start, stop, resetTimer };
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Формула `(index + totalSlides) % totalSlides` обеспечивает корректный циклический переход в обе стороны без сложных условных ветвлений if/else.
// 2. Изоляция setInterval внутри модуля с явными методами start() и stop() позволяет чисто управлять автопрокруткой при событии mouseenter/mouseleave.
// 3. Коллбэк onChange гарантирует полное отделение математики и состояния слайдера от отображения в DOM.
