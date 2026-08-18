/**
 * @file create-list.js
 * @description Динамическое создание HTML-списка (UL/LI) и добавление его на страницу.
 */

/**
 * Генерирует список ul с заданным количеством элементов li и вставляет его в body.
 * @param {number} totalElements - Количество элементов в списке.
 * @param {string} content - Текст-шаблон для каждого элемента.
 * @returns {void}
 */
const generateList = (totalElements, content) => {
  const body = document.querySelector("body");
  const list = document.createElement("ul");

  for (let i = 1; i <= totalElements; i++) {
    const listElement = document.createElement("li");
    listElement.textContent = `${i}. ${content}`;
    list.appendChild(listElement);
  }

  body.appendChild(list);
};

// --- Пример использования ---
// Создаст список из 9 пунктов вида: "1. Пункт", "2. Пункт" ...
generateList(9, "Пункт");

// Создаст второй список из 9 пунктов вида: "1. Hello", "2. Hello" ...
generateList(9, "Hello");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. document.createElement("tag") создает элемент в памяти браузера, но НЕ добавляет его на страницу сразу.
// 2. Чтобы элемент появился на странице, нужно вызвать appendChild() или append() у родительского элемента (в данном случае body.appendChild(list)).
// 3. Оптимизация порядка append: Сначала полностью формируем li (добавляем textContent), затем вставляем li в ul, и только в самом конце вставляем ul в body. Это уменьшает количество перерисовок страницы (Reflow/Repaint).
// 4. Альтернативный современный вариант через innerHTML (когда не нужна сложная логика на каждый элемент):
//    const createListShort = (items) => {
//      const ul = document.createElement("ul");
//      ul.innerHTML = items.map((text, i) => `<li>${i + 1}. ${text}</li>`).join("");
//      document.body.appendChild(ul);
//    };
