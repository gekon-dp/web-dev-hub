/**
 * @file fetch-and-render.js
 * @description Универсальная утилита для выполнения асинхронного запроса и безопасного вывода данных или ошибки в DOM.
 */

/**
 * Выполняет асинхронный запрос и отрисовывает результат или ошибку в указанный контейнер
 * @template T
 * @param {Object} config - Параметры выполнения и отрисовки
 * @param {() => Promise<T>} config.fetchFn - Асинхронная функция, возвращающая данные (Promise)
 * @param {HTMLElement} [config.container=document.body] - Целевой контейнер в DOM
 * @param {(data: T) => HTMLElement|string} config.renderFn - Функция генерации контента при успехе
 * @param {(error: Error|string) => HTMLElement|string} [config.errorRenderFn] - Функция генерации контента при ошибке
 */
export const fetchAndRender = async ({
  fetchFn,
  container = document.body,
  renderFn,
  errorRenderFn = (err) => `Error: ${err?.message || "404 Not Found"}`,
}) => {
  if (typeof fetchFn !== "function" || !container) return;

  try {
    const data = await fetchFn();
    const content = renderFn(data);

    if (typeof content === "string") {
      container.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      container.replaceChildren(content);
    }
  } catch (error) {
    const errorContent = errorRenderFn(error);

    if (typeof errorContent === "string") {
      container.append(errorContent);
    } else if (errorContent instanceof HTMLElement) {
      container.replaceChildren(errorContent);
    }
  }
};

// --- Пример использования ---

// 1. Имитация асинхронного API-запроса с задержкой
// const mockFetchUser = () =>
//   new Promise((resolve, reject) => {
//     console.log("Request started...");
//     setTimeout(() => {
//       const data = { id: 1, name: "Alice" }; // Поменяйте на null для проверки catch
//       if (data) resolve(data);
//       else reject(new Error("Data not found"));
//     }, 2500);
//   });

// 2. Вызов утилиты
// fetchAndRender({
//   fetchFn: mockFetchUser,
//   container: document.body,
//   renderFn: (data) => {
//     const card = document.createElement("div");
//     card.textContent = `ID: ${data.id}, User Name: ${data.name}`;
//     return card;
//   },
//   errorRenderFn: () => "Error: 404 Not Found",
// });

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование async/await и try/catch делает работу с Промисами более читаемой по сравнению с .then().catch().
// 2. Исполнитель Промиса (executor `new Promise((resolve, reject) => ...)` ) выполняется СИНХРОННО и сразу. Асинхронным является только код внутри setTimeout/fetch.
// 3. Метод container.replaceChildren(element) очищает старое содержимое контейнера и вставляет новый элемент без использования innerHTML.
// 4. Передача функции fetchFn позволяет использовать утилиту как с fetch(), так и с Axios или кастомными mock-запросами.
