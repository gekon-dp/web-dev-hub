/**
 * @file notification-manager.js
 * @description Менеджер всплывающих уведомлений (Toast Manager) с поддержкой таймеров и удаления.
 */

import { renderNotificationItem } from "./render-notification-item.js";

/**
 * Класс управления системой уведомлений
 */
export class NotificationManager {
  /** @type {Array<{id: number, element: HTMLElement, timerId?: number}>} */
  static notifications = [];

  /**
   * Показывает новое уведомление
   * @param {Object} config - Параметры уведомления
   * @param {HTMLElement} config.container - Контейнер для рендеринга
   * @param {string} config.title - Заголовок
   * @param {string} config.message - Текст сообщения
   * @param {"success" | "warning" | "error" | "info" | "create"} [config.type="info"] - Тип
   * @param {number} [config.duration=5000] - Время отображения в мс (0 для отключения автоскрытия)
   * @returns {number} Уникальный ID созданного уведомления
   */
  static show({ container, title, message, type = "info", duration = 5000 }) {
    if (!container) return null;

    const id = Date.now() + Math.random();
    const element = renderNotificationItem({ id, title, message, type });

    container.prepend(element);
    container.scrollTop = 0;

    let timerId = null;
    if (duration > 0) {
      timerId = setTimeout(() => {
        NotificationManager.remove(id, container);
      }, duration);
    }

    NotificationManager.notifications.push({ id, element, timerId });
    return id;
  }

  /**
   * Удаляет уведомление с анимацией
   * @param {number} id - Идентификатор уведомления
   * @param {HTMLElement} container - Контейнер уведомлений
   */
  static remove(id, container) {
    const itemIndex = NotificationManager.notifications.findIndex(
      (n) => n.id === id,
    );
    if (itemIndex === -1) return;

    const { element, timerId } = NotificationManager.notifications[itemIndex];
    if (timerId) clearTimeout(timerId);

    const targetElement =
      element || container.querySelector(`[data-id="${id}"]`);

    if (targetElement) {
      targetElement.classList.add("hide");
      targetElement.addEventListener(
        "animationend",
        () => {
          targetElement.remove();
          NotificationManager.notifications =
            NotificationManager.notifications.filter((n) => n.id !== id);
        },
        { once: true },
      );
    }
  }
}

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование `Date.now() + Math.random()` для id гарантирует уникальность даже при частых вызовах.
// 2. Очистка `clearTimeout(timerId)` при ручном закрытии закрывает утечки памяти и не дает таймеру вызваться повторно.
// 3. Флаг `{ once: true }` в `animationend` гарантирует корректную отписку от события сразу после удаления элемента из DOM.
