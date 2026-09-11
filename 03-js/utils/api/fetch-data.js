/**
 * @file fetch-data.js
 * @description Универсальная функция для выполнения HTTP GET-запросов через fetch API с проверкой статуса ответа.
 */

/**
 * Выполняет GET-запрос по указанному URL и возвращает распарсенные данные
 * @template T
 * @param {string} url - Эндпоинт API
 * @param {HeadersInit} [customHeaders={}] - Дополнительные заголовки запроса
 * @returns {Promise<T>} Данные ответа сервера
 */
export const fetchData = async (url, customHeaders = {}) => {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided to fetchData");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...customHeaders,
      },
    });

    // fetch не уходит в catch при ошибках 4xx/5xx, поэтому проверяем response.ok
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[GET Error]: Failed to fetch data from ${url}`, error);
    throw error;
  }
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. По умолчанию fetch выполняет именно GET-запрос, но явно указанный method: "GET" делает код более читаемым.
// 2. Всегда проверяем `!response.ok`, чтобы отлавливать 404, 500 и другие статусы ошибок сервера.
// 3. Заголовок "Accept": "application/json" информирует сервер о том, что клиент ожидает ответ в формате JSON.
