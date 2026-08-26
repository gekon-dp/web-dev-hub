/**
 * @file render-array-to-list.js
 * @description Функция для генерации и вставки HTML-списка (<ul>) на основе любого массива элементов.
 */

/**
 * Преобразует массив в HTML-список и вставляет его в указанный контейнер
 * @param {Array<string|number>} items - Массив элементов для отображения
 * @param {HTMLElement} [container=document.body] - Контейнер для вставки (по умолчанию body)
 */
export const renderArrayToList = (items, container = document.body) => {
  if (!Array.isArray(items) || !container) return;

  const listElement = document.createElement("ul");

  items.forEach((item, index) => {
    const liElement = document.createElement("li");
    liElement.textContent = `${index + 1} - ${item}`;
    listElement.appendChild(liElement);
  });

  container.appendChild(listElement);
};

// --- Пример использования ---
// const names = ["max", "alice", "dima"];
// renderArrayToList(names); // Вставит в body по умолчанию

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Оборачивание в функцию делает код универсальным: можно передать любой массив и любой контейнер.
// 2. Использование textContent защищает от XSS-атак, безопаснее чем innerHTML.
// 3. Параметр по умолчанию (container = document.body) избавляет от необходимости обязательно передавать второй аргумент.
// 4. Проверка Array.isArray(items) предотвращает падение скрипта при передаче невалидных данных.
