/**
 * @file handle-form-submit.js
 * @description Обработка событий ввода данных и отправки (submit) HTML-формы с предотвращением перезагрузки страницы.
 */

/**
 * Инициализирует слушатели событий для поля ввода и формы регистрации.
 * @param {string} formSelector - CSS-селектор формы.
 * @param {string} usernameSelector - CSS-селектор поля имени пользователя.
 * @param {string} emailSelector - CSS-селектор поля email.
 * @returns {void}
 */
const initRegisterForm = (formSelector, usernameSelector, emailSelector) => {
  const registerForm = document.querySelector(formSelector);
  const usernameInput = document.querySelector(usernameSelector);
  const emailInput = document.querySelector(emailSelector);

  if (!registerForm || !usernameInput || !emailInput) return;

  // 1. Отслеживание ввода текста в реальном времени (симуляция)
  usernameInput.addEventListener("input", (event) => {
    console.log("Динамический ввод:", event.target.value);
  });

  // 2. Обработка отправки формы
  registerForm.addEventListener("submit", (event) => {
    // Отменяем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();

    const userData = {
      username: usernameInput.value,
      email: emailInput.value,
    };

    console.log("Симуляция отправки на сервер:", userData);

    // Очистка всех полей формы
    registerForm.reset();
  });
};

// --- Пример использования ---
initRegisterForm("#registerForm", ".username", ".email");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. event.preventDefault() — обязателен для AJAX/Fetch запросов, так как предотвращает отправку GET/POST запроса браузером по умолчанию и перезагрузку страницы.
// 2. Событие 'input' срабатывает мгновенно при каждом изменении значения (ввод буквы, удаление, вставка из буфера), в отличие от события 'change', которое срабатывает только при потере фокуса.
// 3. event.target.value получает текущее значение элемента, на котором произошло событие.
// 4. Метод form.reset() сбрасывает значения всех полей внутри формы к их начальным состояниям.
// 5. Альтернативный современный способ сбора данных из всей формы за один раз:
//    const formData = new FormData(registerForm);
//    const userData = Object.fromEntries(formData); // Создаст объект из всех инпутов с атрибутом name
