/**
 * @file change-random-color.js
 * @description Генерация случайного цвета (HEX) и изменение фона элемента при клике на кнопку.
 */

/**
 * Генерирует случайный цвет в HEX-формате (#RRGGBB).
 * @returns {string} Строка с HEX-кодом цвета.
 */
const getRandomHexColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

/**
 * Инициализирует смену фона элемента при клике на кнопку.
 * @param {string} blockSelector - CSS-селектор целевого блока.
 * @param {string} buttonSelector - CSS-селектор кнопки.
 * @returns {void}
 */
const initRandomColorChanger = (blockSelector, buttonSelector) => {
  const block = document.querySelector(blockSelector);
  const button = document.querySelector(buttonSelector);

  if (!block || !button) return;

  button.addEventListener("click", () => {
    block.style.backgroundColor = getRandomHexColor();
  });
};

// --- Пример использования ---
initRandomColorChanger("#color-block", "#colorButton");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Число 16777215 — это максимальное значение цвета в десятичной системе (FFFFFF в HEX, т.е. 256 * 256 * 256 - 1).
// 2. Метод .toString(16) переводит число из десятичной системы счисления в шестнадцатеричную (HEX).
// 3. Метод .padStart(6, "0") гарантирует, что строка всегда будет состоять из 6 символов, добавляя нули в начало (например, "a3f" станет "000a3f").
// 4. Альтернативный вариант генерации через RGB-компоненты (как в условии задачи):
//    const getRandomRgb = () => {
//      const r = Math.floor(Math.random() * 256);
//      const g = Math.floor(Math.random() * 256);
//      const b = Math.floor(Math.random() * 256);
//      return `rgb(${r}, ${g}, ${b})`;
//    };
