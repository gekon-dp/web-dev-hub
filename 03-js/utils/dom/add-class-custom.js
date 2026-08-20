/**
 * @file add-class-custom.js
 * @description Кастомная реализация добавления CSS-класса к HTML-элементу (аналог classList.add).
 */

/**
 * Проверяет наличие CSS-класса у элемента и добавляет его, если он отсутствует.
 * @param {HTMLElement} element - Целевой HTML-элемент.
 * @param {string} className - Название добавляемого CSS-класса.
 * @returns {void}
 */
const addClassToHTMLElement = (element, className) => {
  if (!element) return;

  let hasClassName = false;

  // 1. Ручная проверка на наличие класса в classList
  for (let i = 0; i < element.classList.length; i++) {
    if (element.classList[i] === className) {
      hasClassName = true;
      break;
    }
  }

  // 2. Если класс уже существует, прерываем выполнение
  if (hasClassName) {
    console.log("Such class name already exists in this list");
    return;
  }

  // 3. Добавление нового класса в строку классов
  element.classList.value += ` ${className}`;
  console.log(element.classList);
};

// --- Пример использования ---
const block = document.querySelector("#textBlock");
addClassToHTMLElement(block, "hello");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. В реальной разработке всегда используется стандартный метод: element.classList.add("hello");
// 2. Стандартная проверка на наличие класса выполняется через: element.classList.contains("hello");
// 3. Свойство element.classList.value возвращает всю строку классов элемента (аналог element.className).
// 4. При ручном добавлении через .value обязательно нужно добавлять пробел перед новым классом (` ${className}`), иначе названия классов склеются (например: "btnactive" вместо "btn active").
