/**
 * @file add-property-by-condition.js
 * @description Универсальная утилита для добавления вычисляемого свойства в массив объектов на основе пользовательского условия.
 */

/**
 * Добавляет или обновляет свойство у каждого объекта в массиве на основе логического условия
 * @template T
 * @param {Array<T>} array - Исходный массив объектов
 * @param {string} key - Название нового свойства
 * @param {(item: T) => boolean} conditionFn - Функция-предикат (возвращает true/false)
 * @param {*} valueIfTrue - Значение, если условие выполнено
 * @param {*} valueIfFalse - Значение, если условие не выполнено
 * @returns {Array<T>} Новый массив объектов с добавленным свойством
 */
export const addPropertyByCondition = (array, key, conditionFn, valueIfTrue, valueIfFalse) => {
  if (!Array.isArray(array) || typeof conditionFn !== "function") return [];

  return array.map((item) => ({
    ...item,
    [key]: conditionFn(item) ? valueIfTrue : valueIfFalse,
  }));
};

// --- Примеры использования ---

// 1. Проверка возраста (ваш пример):
// const people = [{ name: "Alice", age: 1 }, { name: "Bob", age: 30 }];
// const result = addPropertyByCondition(people, "status", (person) => person.age >= 18, "взрослый", "ребенок");

// 2. Расчет скидки по цене:
// const products = [{ title: "Phone", price: 1000 }, { title: "Case", price: 15 }];
// const discounted = addPropertyByCondition(products, "hasDiscount", (prod) => prod.price > 100, true, false);

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование квадратных скобок `[key]` позволяет динамически передавать имя создаваемого ключа объекта из переменной.
// 2. Функция-предикат `conditionFn` делает утилиту бесконечно гибкой — условие может быть любой сложности.
// 3. Подход не мутирует исходный массив, сохраняя иммутабельность (чистая функция).
// 4. Проверка `typeof conditionFn !== "function"` предохраняет от ошибок вызова, если предикат передан некорректно.
