/**
 * @file create-drawer.js
 * @description Универсальный менеджер выдвижного меню (Off-canvas Drawer) с поддержкой оверлея.
 */

/**
 * Создает экземпляр управления выдвижным меню
 * @param {Object} config - Параметры меню
 * @param {HTMLElement} config.menuElement - Элемент выдвижного меню
 * @param {HTMLElement} [config.overlayElement] - Затеняющий оверлей
 * @param {string} [config.openClass="nav-menu-open"] - CSS-класс открытого состояния меню
 * @param {string} [config.overlayHiddenClass="overlay-hidden"] - CSS-класс скрытого оверлея
 * @returns {Object} Методы управления (open, close, toggle)
 */
export const createDrawer = ({
  menuElement,
  overlayElement,
  openClass = "nav-menu-open",
  overlayHiddenClass = "overlay-hidden",
}) => {
  if (!menuElement) {
    return { open: () => {}, close: () => {}, toggle: () => {} };
  }

  const open = () => {
    menuElement.classList.add(openClass);
    if (overlayElement) overlayElement.classList.remove(overlayHiddenClass);
  };

  const close = () => {
    menuElement.classList.remove(openClass);
    if (overlayElement) overlayElement.classList.add(overlayHiddenClass);
  };

  const toggle = () => {
    const isOpen = menuElement.classList.contains(openClass);
    isOpen ? close() : open();
  };

  if (overlayElement) {
    overlayElement.addEventListener("click", close);
  }

  return { open, close, toggle };
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Изоляция взаимодействия меню и оверлея исключает необходимость использования e.stopPropagation().
// 2. Метод toggle подстраивается под текущий класс DOM, исключая рассинхронизацию состояний.
