/**
 * @file create-paginator.js
 * @description Универсальная утилита для управления навигацией по числовому ID (вперед/назад) с защитой границ.
 */

/**
 * Инициализирует переключение страниц/ID по кнопкам «Вперед» и «Назад»
 * @param {Object} config - Настройки пагинации
 * @param {HTMLElement} config.prevBtn - Кнопка "Назад"
 * @param {HTMLElement} config.nextBtn - Кнопка "Вперед"
 * @param {(currentId: number) => void} config.onChange - Коллбэк при изменении ID
 * @param {number} [config.initialId=1] - Начальный ID
 * @param {number} [config.minId=1] - Минимально допустимый ID
 * @param {number} [config.maxId=Infinity] - Максимально допустимый ID
 */
export const createPaginator = ({
  prevBtn,
  nextBtn,
  onChange,
  initialId = 1,
  minId = 1,
  maxId = Infinity,
}) => {
  if (typeof onChange !== "function") return;

  let currentId = initialId;

  const updateState = (newId) => {
    if (newId < minId || newId > maxId) return;
    currentId = newId;

    if (prevBtn) prevBtn.disabled = currentId <= minId;
    if (nextBtn) nextBtn.disabled = currentId >= maxId;

    onChange(currentId);
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => updateState(currentId - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => updateState(currentId + 1));
  }

  // Первоначальный запуск
  updateState(currentId);
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Защита границ (newId < minId) предотвращает отправку невалидных запросов (например, postNumber = 0 или -1).
// 2. Автоматическое управление атрибутом disabled у кнопок блокирует клики, когда достигнут предел (min/max).
// 3. Замыкание переменной currentId полностью изолирует состояние навигации от глобальной области видимости.
