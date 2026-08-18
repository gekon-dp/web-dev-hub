/**
 * @file create-image.js
 * @description Динамическое создание элемента изображения (img), установка атрибутов src/alt и вставка на страницу.
 */

/**
 * Создаёт HTML-элемент изображения, задаёт ему необходимые атрибуты и вставляет в родительский элемент.
 * @param {string} srcPath - Путь к изображению или URL
 * @param {string} altText - Альтернативный текст для описания картинки (для доступности и SEO)
 * @param {HTMLElement} [parentElement=document.body] - Элемент-контейнер, куда будет вставлена картинка
 * @returns {HTMLImageElement} Созданный элемент img
 */
const createImage = (srcPath, altText, parentElement = document.body) => {
  const img = document.createElement("img");

  // Установка атрибутов через setAttribute
  img.setAttribute("src", srcPath);
  img.setAttribute("alt", altText);

  // Вставка элемента на страницу
  parentElement.appendChild(img);

  return img;
};

// --- Пример использования ---
createImage("../assets/images/cat.png", "Изображение кота");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Атрибуты можно задавать двумя способами:
//    - img.setAttribute("src", "path.png") — универсальный DOM-метод.
//    - img.src = "path.png" — прямое обращение к свойству объекта HTMLImageElement.
// 2. Атрибут 'alt' критически важен:
//    - Читается скринридерами для людей с ограничением зрения.
//    - Отображается, если картинка не загрузилась.
//    - Индексируется поисковыми системами (SEO).
// 3. Вместо использования document.querySelector("body") можно сразу обращаться к document.body.
// 4. Относительные пути высчитываются относительно HTML-файла, к которому подключен скрипт.
