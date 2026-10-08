/**
 * @file render-notification-item.js
 * @description Утилита для рендеринга изолированного DOM-элемента уведомления.
 */

/**
 * Словарь иконок по типам уведомлений
 */
const ICON_MAP = {
  success: "fa-solid fa-circle-check",
  warning: "fa-solid fa-triangle-exclamation",
  error: "fa-solid fa-circle-xmark",
  info: "fa-solid fa-circle-info",
  create: "fa-solid fa-circle-plus",
};

/**
 * Рендерит карточку уведомления
 * @param {Object} data
 * @param {number} data.id - Уникальный идентификатор
 * @param {string} data.title - Заголовок
 * @param {string} data.message - Сообщение
 * @param {string} data.type - Тип уведомления
 * @returns {HTMLElement} Созданный DOM-элемент
 */
export const renderNotificationItem = ({ id, title, message, type }) => {
  const iconClass = ICON_MAP[type] || ICON_MAP.info;

  const card = document.createElement("div");
  card.className = `notification-item ${type}`;
  card.setAttribute("data-id", String(id));

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "notification-icon-wrapper";

  const icon = document.createElement("i");
  icon.className = `${iconClass} notification-icon`;
  iconWrapper.appendChild(icon);

  const content = document.createElement("div");
  content.className = "notification-content";

  const h4 = document.createElement("h4");
  h4.textContent = title;

  const p = document.createElement("p");
  p.textContent = message;

  content.append(h4, p);

  const closeBtn = document.createElement("button");
  closeBtn.className = "notification-close";
  closeBtn.innerHTML = "&times;";

  card.append(iconWrapper, content, closeBtn);

  return card;
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование `textContent` для заголовка и сообщения зачищает код от XSS при выводе пользовательского ввода.
// 2. Объект `ICON_MAP` обеспечивает легкое расширение новыми типами уведомлений без изменения логики рендеринга.
