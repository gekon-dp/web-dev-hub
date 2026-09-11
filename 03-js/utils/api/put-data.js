/**
 * @file put-data.js
 * @description Универсальная функция для выполнения HTTP PUT-запросов (полное обновление ресурса) с проверкой статуса ответа.
 */

/**
 * Отправляет PUT-запрос для полного обновления сущности на сервере
 * @template T
 * @param {string} url - Полный URL ресурса (например, 'https://api.example.com/posts/32')
 * @param {Object} data - Обновленный объект данных для отправки
 * @param {HeadersInit} [customHeaders={}] - Дополнительные заголовки запроса
 * @returns {Promise<T>} Обновленные данные ответа сервера
 */
export const putData = async (url, data, customHeaders = {}) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided to putData");
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...customHeaders,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[PUT Error]: Failed to update data at ${url}`, error);
    throw error;
  }
};

// --- Пример использования ---
// const updatedPost = {
//   id: 32,
//   title: "foo",
//   body: "render",
//   userId: 1,
// };
//
// putData("https://jsonplaceholder.typicode.com/posts/32", updatedPost)
//   .then((data) => console.log("Successfully updated:", data))
//   .catch((err) => console.error("Update failed:", err));

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Метод PUT по спецификации REST API полностью заменяет существующий ресурс переданным объектом (в отличие от PATCH, который обновляет поля частично).
// 2. Явный контроль статуса `!response.ok` гарантирует, что ошибки сервера (404, 500) корректно перехватываются вызывающим кодом через .catch().
// 3. Заголовок "Content-Type": "application/json; charset=UTF-8" необходим для правильной интерпретации тела запроса сервером.
// 4. Использование async/await с пробросом `throw error` делает утилиту удобной для обработки в UI.
