/**
 * @file validate-form-full.js
 * @description Валидация формы с демонстрацией обращения к элементам через event.target.elements (без querySelector).
 */

// 1. Проверка email: @ есть, но НЕ в самом начале и НЕ в самом конце
const isValidEmail = (email) => {
  const atIndex = email.indexOf("@");
  return atIndex > 0 && atIndex < email.length - 1;
};

// 2. Проверка пароля: длина >= 8, минимум 1 заглавная буква и 1 спецсимвол
const isValidPassword = (password) => {
  const isLongEnough = password.length >= 8;
  const hasUpperCase = /[A-ZА-ЯЁ]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  return isLongEnough && hasUpperCase && hasSpecialChar;
};

// 3. Основной код формы
const registerForm = document.querySelector(".registration");
const statusMessage = document.querySelector(".statusMessage");

if (registerForm && statusMessage) {
  registerForm.addEventListener("submit", (event) => {
    // Отменяем перезагрузку страницы при отправке
    event.preventDefault();

    // =========================================================================
    // АЛЬТЕРНАТИВНЫЙ СПОСОБ (Рекомендуемый для форм):
    // event.target — это сама форма, отправку которой мы перехватили.
    // event.target.elements — коллекция всех полей внутри этой формы.
    // Мы обращаемся к полю по его атрибуту name в HTML (например: <input name="userEmail">)
    // =========================================================================
    const emailInput = event.target.elements.userEmail;
    const emailValue = emailInput ? emailInput.value.trim() : "";

    // Обычные способы через querySelector (для сравнения):
    const nameValue = document.querySelector("#user-name")?.value || "";
    const passwordValue = document.querySelector("#user-password")?.value || "";
    const isTermsChecked = document.querySelector("#user-terms")?.checked || false;

    // --- ПРОВЕРКИ ---

    // Проверка имени
    if (nameValue.trim() === "") {
      statusMessage.textContent = "Заполните поле с именем!";
      return;
    }

    // Проверка email (значение взято из event.target.elements)
    if (!isValidEmail(emailValue)) {
      statusMessage.textContent = "Введите корректный email (символ @ не должен быть первым или последним)!";
      return;
    }

    // Проверка пароля
    if (!isValidPassword(passwordValue)) {
      statusMessage.textContent =
        "Пароль должен быть от 8 символов и содержать минимум 1 заглавную букву и 1 спецсимвол!";
      return;
    }

    // Проверка галочки согласия
    if (!isTermsChecked) {
      statusMessage.textContent = "Поставьте галочку согласия с правилами!";
      return;
    }

    // Успешная валидация
    statusMessage.textContent = "Форма успешно отправлена!";
    registerForm.reset();
  });
}

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. HTML для работы альтернативного способа должен содержать атрибут name:
//    <input type="email" name="userEmail" id="user-email">
// 2. event.target внутри обработчика события 'submit' ссылается на саму форма (<form>).
// 3. event.target.elements.userEmail ищет элемент с name="userEmail" строго ВНУТРИ этой формы, что быстрее search по всему документу через document.querySelector.
