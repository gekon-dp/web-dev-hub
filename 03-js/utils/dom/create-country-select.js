/**
 * @file create-country-select.js
 * @description Динамическое создание выпадающего списка стран (select) с меткой (label) и вставка их в форму.
 */

/**
 * Создаёт label и выпадающий список select с опциями стран и вставляет их после указанного элемента.
 * @param {string[]} countriesList - Массив с названиями стран.
 * @param {string} targetSelector - CSS-селектор элемента, после которого нужно вставить селект.
 * @param {string} [placeholderText="Откуда вы?"] - Текст подсказки первой неактивной опции.
 * @returns {void}
 */
const createCountrySelect = (countriesList, targetSelector, placeholderText = "Откуда вы?") => {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  // 1. Создание элементов
  const label = document.createElement("label");
  const select = document.createElement("select");

  // 2. Настройка метки (label)
  label.textContent = "Выберите страну";
  label.className = "country-list-label";

  // 3. Создание стартовой опции-подсказки (placeholder)
  const placeholderOption = document.createElement("option");
  placeholderOption.textContent = placeholderText;
  placeholderOption.value = "";
  select.append(placeholderOption);

  // 4. Генерация опций из массива стран
  for (const country of countriesList) {
    const option = document.createElement("option");
    option.value = country.toLowerCase();
    option.textContent = country;
    select.append(option);
  }

  // 5. Вставка элементов в DOM
  targetElement.insertAdjacentElement("afterend", label);
  label.insertAdjacentElement("afterend", select);
};

// --- Пример использования ---
const countries = ["США", "Япония", "Китай"];
createCountrySelect(countries, ".user-email");

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. insertAdjacentElement(position, element) позволяет точечно вставлять элементы:
//    - 'beforebegin': перед самим элементам
//    - 'afterbegin': внутри элемента, перед первым ребенком
//    - 'beforeend': внутри элемента, после последнего ребенка
//    - 'afterend': сразу после самого элемента (снаружи)
// 2. Для плейсхолдера в <select> обязательно оставляем value="" (пустая строка), чтобы легко валидировать форму на выбор значения.
// 3. Перебор массива через for...of более читаем и лаконичен, чем классический for с индексами (i++), когда индекс не нужен.
// 4. Свойство className — более быстрый и короткий способ задать класс элементу, чем setAttribute("class", "...").
