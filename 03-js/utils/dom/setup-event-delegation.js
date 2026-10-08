/**
 * @file setup-event-delegation.js
 * @description Универсальная утилита для делегирования событий на родителе с проверкой целевых элементов по CSS-селектору.
 */

/**
 * Навешивает единый обработчик событий на контейнер для обработки кликов по определенным селекторам
 * @param {HTMLElement} container - Родительский элемент
 * @param {string} eventType - Тип события (например, 'click')
 * @param {string} selector - CSS-селектор дочерних элементов
 * @param {(event: Event, target: HTMLElement) => void} handler - Коллбэк-обработчик
 */
export const setupEventDelegation = (
  container,
  eventType,
  selector,
  handler,
) => {
  if (!container || typeof handler !== "function") return;

  container.addEventListener(eventType, (event) => {
    const target = event.target.closest(selector);

    if (target && container.contains(target)) {
      handler(event, target);
    }
  });
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Делегирование снижает количество обработчиков событий в DOM, что критично для производительности интерфейса.
// 2. Проверка `container.contains(target)` защищает от случаев, когда найденный `.closest()` находится за пределами текущего контейнера.
