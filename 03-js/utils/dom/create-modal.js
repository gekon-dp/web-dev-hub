/**
 * @file create-modal.js
 * @description Универсальный менеджер модальных окон с поддержкой закрытия по Escape, оверлею и кнопкам закрытия.
 */

/**
 * Создает экземпляр управления модальным окном
 * @param {Object} config - Параметры модального окна
 * @param {HTMLElement} config.modalElement - Главный контейнер модального окна (оверлей)
 * @param {string} [config.hiddenClass="modal-hidden"] - CSS-класс для скрытия окна
 * @param {string} [config.closeSelector=".close-modal-btn"] - Селектор элементов закрытия внутри окна
 * @param {Function} [config.onOpen] - Коллбэк при открытии
 * @param {Function} [config.onClose] - Коллбэк при закрытии
 * @returns {{ open: () => void, close: () => void }} Методы управления
 */
export const createModal = ({
  modalElement,
  hiddenClass = "modal-hidden",
  closeSelector = ".close-modal-btn",
  onOpen,
  onClose,
}) => {
  if (!modalElement) return { open: () => {}, close: () => {} };

  const handleEscClose = (event) => {
    if (
      event.key === "Escape" &&
      !modalElement.classList.contains(hiddenClass)
    ) {
      close();
    }
  };

  const open = () => {
    modalElement.classList.remove(hiddenClass);
    document.addEventListener("keydown", handleEscClose);
    if (typeof onOpen === "function") onOpen();
  };

  const close = () => {
    modalElement.classList.add(hiddenClass);
    document.removeEventListener("keydown", handleEscClose);
    if (typeof onClose === "function") onClose();
  };

  // Делегирование кликов внутри модалки (оверлей и кнопки закрытия)
  modalElement.addEventListener("click", (event) => {
    const isOverlayClick = event.target === modalElement;
    const isCloseBtnClick = Boolean(event.target.closest(closeSelector));

    if (isOverlayClick || isCloseBtnClick) {
      close();
    }
  });

  return { open, close };
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Динамическое добавление/удаление обработчика keydown экономит ресурсы CPU и памяти, пока окно закрыто.
// 2. Проверка `event.target === modalElement` гарантирует закрытие ТОЛЬКО при клике на оверлей, исключая необходимость вызова `event.stopPropagation()` на контенте.
// 3. Селектор `.closest(closeSelector)` позволяет кликать по вложенным элементам (например, иконке внутри `<button>`).
