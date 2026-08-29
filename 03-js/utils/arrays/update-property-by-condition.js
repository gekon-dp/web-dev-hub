/**
 * @file update-property-by-condition.js
 * @description Универсальная функция для иммутабельного изменения свойства объектов в массиве на основе пользовательского условия.
 */

/**
 * Изменяет указанное свойство объектов в массиве, если они удовлетворяют условию-предикату.
 * @template T
 * @param {Array<T>} array - Исходный массив объектов
 * @param {string} propKey - Ключ свойства, которое нужно изменить
 * @param {(item: T) => boolean} conditionFn - Функция-условие (возвращает true/false)
 * @param {(currentValue: any) => any} updateFn - Функция, вычисляющая новое значение свойства
 * @returns {Array<T>} Новый массив с обновленными объектами (без мутации исходного)
 */
export const updatePropertyByCondition = (array, propKey, conditionFn, updateFn) => {
  if (!Array.isArray(array) || typeof conditionFn !== "function" || typeof updateFn !== "function") {
    return [];
  }

  return array.map((item) => {
    if (conditionFn(item)) {
      return {
        ...item,
        [propKey]: updateFn(item[propKey]),
      };
    }
    return { ...item };
  });
};

// --- Примеры использования ---

// 1. Увеличить age на 1 для всех, кто младше 30 (ваш кейс):
// const people = [{ name: "Alice", age: 25 }, { name: "Bob", age: 32 }];
// const updatedPeople = updatePropertyByCondition(
//   people,
//   "age",
//   (person) => person.age < 30,
//   (currentAge) => currentAge + 1
// );

// 2. Увеличить цену на 10% у товаров категории "tech":
// const products = [{ title: "Phone", price: 500, category: "tech" }];
// const updatedProducts = updatePropertyByCondition(
//   products,
//   "price",
//   (item) => item.category === "tech",
//   (price) => price * 1.1
// );

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование updateFn(item[propKey]) дает полную свободу: можно прибавлять, умножать, конкатенировать строки и т.д.
// 2. Паттерн `{ ...item, [propKey]: newValue }` сохраняет иммутабельность — исходные объекты массива не мутируют.
// 3. Возвращается всегда новый массив той же длины, что важно для реактивных фреймворков (React/Vue).
