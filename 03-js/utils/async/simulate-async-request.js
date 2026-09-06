/**
 * @file simulate-async-request.js
 * @description Утилита для создания искусственной задержки и имитации работы асинхронного API (Promise + setTimeout).
 */

/**
 * Имитирует асинхронный запрос к серверу с задержкой
 * @template T
 * @param {T} data - Данные, которые должен вернуть сервер
 * @param {number} [delay=1000] - Задержка ответа в миллисекундах
 * @param {boolean} [shouldFail=false] - Флаг для принудительного вызова ошибки (reject)
 * @returns {Promise<T>} Промис с данными или ошибкой
 */
export const simulateAsyncRequest = (
  data,
  delay = 1000,
  shouldFail = false,
) => {
  return new Promise((resolve, reject) => {
    console.log("Request started...");

    setTimeout(() => {
      if (!shouldFail && data !== null && data !== undefined) {
        resolve(data);
      } else {
        reject(new Error("404 Not Found"));
      }
    }, delay);
  });
};

// --- Пример использования ---
// simulateAsyncRequest({ id: 1, name: "Alice" }, 2500)
//   .then((data) => console.log("Success:", data))
//   .catch((err) => console.error("Error:", err.message));

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Конструктор new Promise((resolve, reject) => ...) запускается СИНХРОННО в момент создания.
// 2. Асинхронный код находится внутри setTimeout, который помещает коллбэк в Macrotask Queue.
// 3. Флаг shouldFail позволяет легко тестировать сценарии ошибок (catch) в пользовательском интерфейсе.
// 4. Возврат Promise позволяет использовать функцию как с .then()/.catch(), так и с async/await.
