/** 

* @file pick-properties.js
* @description Создание нового объекта на основе существующего путем копирования только указанных свойств.
* @task Task из учебного курса
*/

/** 

* Фильтрует свойства объекта по заданному массиву ключей (Операция Pick).
* @param {Object} object - Исходный объект
* @param {string[]} properties - Массив ключей, которые нужно скопировать
* @returns {Object} Новый объект только с выбранными свойствами
*/
const pickProperties = (object, properties) => {
  const result = {};

  for (let i = 0; i < properties.length; i++) {
    const currentProperty = properties[i];
    // Безопасная проверка: существует ли такое свойство в исходном объекте
    if (object.hasOwnProperty(currentProperty)) {
      // Динамически записываем ключ и его значение в новый объект
      result[currentProperty] = object[currentProperty];
    }
  }
  return result;
};
// --- Пример использования ---
const person = { name: "Alice", age: 30, city: "London" };
console.log(pickProperties(person, ["name", "age"]));
// Выведет: { name: 'Alice', age: 30 }

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Метод object.hasOwnProperty(key) или оператор key in object — это обязательная проверка. Они гарантируют, что если в массиве передан несуществующий ключ (например, "salary"), функция не запишет в новый объект свойство со значением undefined.
// 2. Эта функция является классической вспомогательной утилитой (Utility function). В популярных библиотеках вроде Lodash есть готовый аналог, который называется точно так же — _.pick().
// 3. Современная альтернатива через reduce: return properties.reduce((acc, key) => (key in object && (acc[key] = object[key]), acc), {});
