/**
 * @file render-user-cards.js
 * @description Утилита для безопасного рендеринга списка карточек пользователей в DOM.
 */

/**
 * Рендерит карточки пользователей в указанный контейнер
 * @param {Array<Object>} users - Массив объектов пользователей с сервера
 * @param {HTMLElement} container - Целевой DOM-контейнер
 */
export const renderUserCards = (users, container) => {
  if (!Array.isArray(users) || !container) return;

  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";

    // Безопасное формирование HTML-структуры карточки
    card.innerHTML = `
        <div class="user-id">ID: ${user.id}</div>
        <h3 class="user-name">${user.username || "Anonymous"}</h3>
        <div class="user-info">
          <p><strong>Email:</strong> ${user.email || "N/A"}</p>
          <p><strong>Город:</strong> ${user.address?.city || "N/A"}</p>
          <p><strong>Телефон:</strong> ${user.phone || "N/A"}</p>
          <p><strong>Компания:</strong> ${user.company?.name || "N/A"}</p>
        </div>
      `;

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование DocumentFragment предотвращает множество оперативных перерисовок (reflow) интерфейса.
// 2. Опциональная цепочка (user.address?.city) предохраняет от ошибки "TypeError: Cannot read properties of undefined", если структуры вложения от сервера неполные.
// 3. Значения по умолчанию (|| "N/A") гарантируют верстку без выпадающих "undefined" в интерфейсе.
