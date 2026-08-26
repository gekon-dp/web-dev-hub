/**
 * @file init-click-counter.js
 * @description Функция инициализации счетчика кликов с настраиваемыми интервалами смены цвета и вывода уведомлений.
 */

// Вспомогательная функция для генерации случайного HEX-цвета
const getRandomHexColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

/**
 * Инициализирует интерактивный счетчик кликов
 * @param {Object} config - Объект с элементами и настройками
 * @param {HTMLElement} config.button - Кнопка клика
 * @param {HTMLElement} config.counterDisplay - Элемент для вывода числа кликов
 * @param {HTMLElement} [config.colorBlock] - Блок, меняющий цвет фона
 * @param {HTMLElement} [config.milestoneDisplay] - Элемент для текста достижений
 * @param {number} [config.colorInterval=5] - Интервал кликов для смены цвета
 * @param {number} [config.milestoneInterval=10] - Интервал кликов для уведомления
 */
export const initClickCounter = ({
  button,
  counterDisplay,
  colorBlock,
  milestoneDisplay,
  colorInterval = 5,
  milestoneInterval = 10,
}) => {
  if (!button || !counterDisplay) return;

  let count = 0;

  button.addEventListener("click", () => {
    count++;
    counterDisplay.textContent = count;

    // Смена цвета фона по интервалу
    if (colorBlock && count % colorInterval === 0) {
      colorBlock.style.backgroundColor = getRandomHexColor();
    }

    // Вывод текста достижения по интервалу
    if (milestoneDisplay && count % milestoneInterval === 0) {
      milestoneDisplay.textContent = `Вы достигли ${count} кликов`;
    }
  });
};

// --- Пример использования ---
// initClickCounter({
//   button: document.querySelector('.click-btn'),
//   counterDisplay: document.querySelector('.count-text'),
//   colorBlock: document.querySelector('.click-count'),
//   milestoneDisplay: document.querySelector('.congratulation-text'),
// });

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Деструктуризация объекта аргументов ({ button, counterDisplay ... }) позволяет передавать параметры в любом порядке.
// 2. Дефолтные значения (colorInterval = 5) делают опциональные параметры необязательными при вызове.
// 3. Проверка `if (!button || !counterDisplay) return` гарантирует, что модуль не упадёт с ошибкой, если ключевые DOM-узлы не найдены.
// 4. Логика полностью отвязана от конкретных классов, функцию можно применить к любым кнопкам на странице.
