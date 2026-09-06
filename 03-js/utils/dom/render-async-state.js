/**
 * @file render-async-state.js
 * @description Утилита для обработки Promise и отрисовки успешного результата или ошибки в DOM.
 */

/**
 * Обрабатывает асинхронный Promise и выводит результат или ошибку в указанный контейнер
 * @template T
 * @param {Promise<T>} requestPromise - Обещание с данными
 * @param {HTMLElement} container - Целевой DOM-элемент для вывода
 * @param {(data: T) => HTMLElement|string} renderSuccess - Функция генерации контента при успехе
 * @param {(error: Error) => HTMLElement|string} [renderError] - Функция генерации контента при ошибке
 */
export const renderAsyncState = async (
  requestPromise,
  container,
  renderSuccess,
  renderError = (err) => `Error: ${err.message || "Failed to load data"}`,
) => {
  if (!(requestPromise instanceof Promise) || !container) return;

  try {
    const data = await requestPromise;
    const content = renderSuccess(data);

    if (typeof content === "string") {
      container.textContent = content;
    } else if (content instanceof HTMLElement) {
      container.replaceChildren(content);
    }
  } catch (error) {
    const errorContent = renderError(error);

    if (typeof errorContent === "string") {
      container.textContent = errorContent;
    } else if (errorContent instanceof HTMLElement) {
      container.replaceChildren(errorContent);
    }
  }
};

// --- Пример использования ---
// const mockPromise = simulateAsyncRequest({ id: 1, name: "Alice" }, 2500);
// renderAsyncState(
//   mockPromise,
//   document.body,
//   (data) => {
//     const card = document.createElement("div");
//     card.textContent = `ID: ${data.id}, User Name: ${data.name}`;
//     return card;
//   },
//   (err) => `Error: ${err.message}`
// );

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование container.replaceChildren(element) полностью очищает старое содержимое перед вставкой нового.
// 2. Использование textContent вместо innerHTML предотвращает уязвимости типа XSS при выводе текста ошибок.
// 3. Конструкция try/catch внутри async-функции перехватывает любые вызовы reject() в переданном Promise.
// 4. Разделение логики: функция занимается только внедрением в DOM, а внешняя функция renderSuccess определяет верстку.
