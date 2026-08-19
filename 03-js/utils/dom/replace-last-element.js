/**
 * @file replace-last-element.js
 * @description Проверка количества элементов списка при загрузке DOM и замена последнего элемента на новый при выполнении условия.
 */

/**
 * Заменяет последний элемент списка новым, если общее количество элементов превышает порог.
 * @param {string} listSelector - CSS-селектор целевого списка (например, '.my-list').
 * @param {number} threshold - Пороговое значение количества элементов.
 * @param {string} newText - Текст для нового элемента списка.
 * @returns {void}
 */
const replaceLastItemIfExceeds = (listSelector, threshold, newText) => {
  const list = document.querySelector(listSelector);
  if (!list) return;

  // Проверка количества дочерних элементов
  if (list.childElementCount > threshold) {
    const newElement = document.createElement("li");
    newElement.textContent = newText;

    const lastElement = list.lastElementChild;
    if (lastElement) {
      list.replaceChild(newElement, lastElement);
    }
  }
};

// --- Пример использования ---
// Выполняется строго после полной загрузки структуры DOM
document.addEventListener("DOMContentLoaded", () => {
  replaceLastItemIfExceeds(".my-list", 5, "Новый элемент");
});

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. DOMContentLoaded срабатывает, когда браузер полностью загрузил и разобрал HTML-дерево (не дожидаясь загрузки картинок и стилей).
// 2. childElementCount возвращает точное количество дочерних HTML-элементов (в отличие от childNodes.length, который также считает текстовые узлы и пробелы).
// 3. lastElementChild возвращает именно последний HTML-тег внутри контейнера.
// 4. Метод parentElement.replaceChild(newChild, oldChild) принимает аргументы строго в порядке: (НОВЫЙ элемент, СТАРЫЙ элемент).
// 5. Современная альтернатива replaceChild:
//    lastElement.replaceWith(newElement); // Более короткий синтаксис напрямую на элементе
