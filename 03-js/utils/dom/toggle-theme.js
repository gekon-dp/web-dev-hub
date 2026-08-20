/**
 * @file toggle-theme.js
 * @description Переключение тёмной/светлой темы оформления страницы с динамической сменой текста кнопки.
 */

/**
 * Инициализирует переключатель темы оформления на кнопке.
 * @param {string} buttonSelector - CSS-селектор кнопки переключения темы.
 * @param {string} [themeClass="dark"] - Имя CSS-класса для тёмной темы.
 * @returns {void}
 */
const initThemeToggle = (buttonSelector, themeClass = "dark") => {
  const switchThemeBtn = document.querySelector(buttonSelector);
  const body = document.body;

  if (!switchThemeBtn) return;

  switchThemeBtn.addEventListener("click", () => {
    // Переключаем класс на элементе body (добавляет, если нет; удаляет, если есть)
    body.classList.toggle(themeClass);

    // Проверяем актуальное состояние и меняем текст кнопки
    const isDark = body.classList.contains(themeClass);
    switchThemeBtn.textContent = isDark ? "light theme" : "dark theme";
  });
};

// --- Пример использования ---
initThemeToggle(".switchTheme");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. element.classList.toggle("class-name") — переключатель: добавляет класс, если его нет, и удаляет, если он уже присутствует.
// 2. element.classList.contains("class-name") — возвращает boolean (true/false) в зависимости от того, есть ли класс у элемента.
// 3. Тернарный оператор (условие ? значение1 : значение2) позволяет сократить блок if/else до одной понятной строки.
// 4. Для сохранения выбранной темы после перезагрузки страницы обычно используют localStorage:
//    localStorage.setItem("theme", isDark ? "dark" : "light");
