/**
 * @file auth-form.js
 * @description Скрипт аутентификации пользователей (проверка логина и пароля по базе).
 */

// База пользователей для проверки
const users = [
  {
    name: "Kostiantyn",
    password: "12345",
  },
  {
    name: "Galina",
    password: "87654321",
  },
];

// Получение элементов DOM
const myForm = document.querySelector(".registration");
const myLoginInput = document.querySelector("#user-login");
const myPasswordInput = document.querySelector("#user-password");

if (myForm && myLoginInput && myPasswordInput) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const myLoginValue = myLoginInput.value.trim();
    const myPasswordValue = myPasswordInput.value;

    let foundUser = null;

    // Поиск пользователя в базе
    for (let i = 0; i < users.length; i++) {
      if (users[i].name === myLoginValue) {
        foundUser = users[i];
        break;
      }
    }

    // Сверка данных (Аутентификация)
    if (foundUser === null) {
      console.log("Неверный логин");
    } else if (foundUser.password !== myPasswordValue) {
      console.log("Неверный пароль");
    } else {
      console.log(`Добро пожаловать, ${foundUser.name}!`);
      myForm.reset();
    }
  });
}

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Валидация проверяет формат ввода, а аутентификация — наличие и совпадение данных в базе.
// 2. Оператор break сразу останавливает цикл, как только совпадение по имени найдено.
// 3. Метод trim() защищает от случайных пробелов при вводе логина.
