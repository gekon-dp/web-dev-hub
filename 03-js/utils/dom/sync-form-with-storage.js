/**
 * @file sync-form-with-storage.js
 * @description Универсальная утилита для синхронизации данных формы с localStorage (сохранение, отображение и очистка).
 */

/**
 * Синхронизирует форму и текстовые элементы отображения с localStorage
 * @param {Object} config - Настройки синхронизации
 * @param {HTMLFormElement} config.form - Элемент формы
 * @param {string} config.storageKey - Ключ в localStorage для хранения данных
 * @param {Object<string, HTMLElement>} [config.displayElements={}] - Объект соответствия ключей формы и DOM-элементов для вывода
 */
export const syncFormWithStorage = ({ form, storageKey, displayElements = {} }) => {
  if (!form || !storageKey) return;

  // 1. Чтение данных из localStorage
  const getStoredData = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  };

  // 2. Отображение сохраненных данных на странице
  const renderSavedData = () => {
    const data = getStoredData();

    Object.entries(displayElements).forEach(([fieldKey, displayEl]) => {
      if (displayEl) {
        displayEl.textContent = data[fieldKey] || `No saved ${fieldKey}`;
      }
    });
  };

  // Инициализация вывода при загрузке
  renderSavedData();

  // 3. Обработка отправки формы (сохранение)
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const dataToSave = Object.fromEntries(formData.entries());

    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    renderSavedData();
  });

  // 4. Обработка сброса формы (очистка)
  form.addEventListener("reset", () => {
    localStorage.removeItem(storageKey);
    renderSavedData();
  });
};

// --- Пример использования ---
// syncFormWithStorage({
//   form: document.querySelector("form"),
//   storageKey: "userData",
//   displayElements: {
//     name: document.querySelector(".savedUserName"),
//     secondName: document.querySelector(".savedUserSecondName"),
//     email: document.querySelector(".savedUserEmail"),
//   },
// });

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование JSON.stringify() и JSON.parse() позволяет хранить всю форму в одном ключе storageKey, а не засорять localStorage кучей отдельных ключей.
// 2. new FormData(form) и Object.fromEntries() автоматически собирают данные всех полей формы по их атрибуту name.
// 3. Конструкция try/catch при JSON.parse предотвращает падение скрипта, если в localStorage окажется поврежденная строка.
// 4. Динамический рендеринг через Object.entries(displayElements) позволяет привязать любое количество полей без дублирования кода.
