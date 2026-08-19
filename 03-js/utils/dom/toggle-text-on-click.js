/**
 * @file toggle-text-on-click.js
 * @description Переключение текста элемента при клике с возможностью восстановления исходного состояния.
 */

/**
 * Навешивает обработчик клика на элемент для цикличности смены его текста.
 * @param {string} selector - CSS-селектор целевого элемента.
 * @param {string} updatedText - Новый текст, на который будет меняться исходный.
 * @returns {void}
 */
const setupTextToggle = (selector, updatedText) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const originalText = element.textContent;
  let isChanged = false;

  element.addEventListener("click", () => {
    if (!isChanged) {
      element.textContent = updatedText;
    } else {
      element.textContent = originalText;
    }

    isChanged = !isChanged;
  });
};

// --- Пример использования ---
setupTextToggle(".originalParagraph", "Новый измененный текст");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Флаг isChanged удерживает текущее состояние toggle (включено/выключено).
// 2. Инверсия флага через 'isChanged = !isChanged' коротко меняет true на false и наоборот при каждом клике.
// 3. Сохранение originalText происходит один раз в момент вызова функции, благодаря чему исходный текст не теряется после перезаписи.
// 4. Лаконичная альтернатива ветвлению if/else через тернарный оператор:
//    element.textContent = isChanged ? originalText : updatedText;
//    isChanged = !isChanged;
