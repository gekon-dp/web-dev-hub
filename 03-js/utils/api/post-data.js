/**
 * @file post-data.js
 * @description Универсальная функция для отправки данные на сервер через HTTP POST запрос (fetch API) с обработкой ошибок.
 */

/**
 * Отправляет POST-запрос с данными в формате JSON на указанный URL
 * @template T
 * @param {string} url - Эндпоинт API для отправки запроса
 * @param {Object} data - Объект данных для сериализации в JSON
 * @param {HeadersInit} [customHeaders={}] - Дополнительные заголовки запроса
 * @returns {Promise<T>} Ответ сервера в формате JSON
 */
export const postData = async (url, data, customHeaders = {}) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided to postData");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...customHeaders,
      },
      body: JSON.stringify(data),
    });

    // fetch НЕ считает ошибки 4xx/5xx отклонением Promise (reject), их нужно проверять через response.ok
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[POST Error]: Failed to send data to ${url}`, error);
    throw error;
  }
};

// --- Пример использования ---
// const newUser = {
//   name: "Alice Joe",
//   username: "render",
//   email: "alice@gmail.com",
// };
//
// postData("https://jsonplaceholder.typicode.com/users", newUser)
//   .then((responseData) => console.log("Created User:", responseData))
//   .catch((err) => console.error("Request failed:", err));

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Метод fetch() переходит в catch только при сетевых сбоях (Network Error). Для HTTP-ошибок (404, 500) нужно явно проверять !response.ok.
// 2. Использование JSON.stringify(data) превращает JavaScript-объект в JSON-строку для передачи в теле запроса (body).
// 3. Заголовок "Content-Type": "application/json" сообщяет бэкенду, что тело запроса содержит передаваемые данные в формате JSON.
// 4. Использование async/await с генерацией throw error позволяет вызывающему коду обрабатывать ошибки через .catch() или try/catch.
