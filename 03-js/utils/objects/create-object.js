/** 

* @file create-object.js
* @description Сборка объекта из двух отдельных массивов ключей и значений одинаковой длины.
*/

/** 

* Принимает два массива и объединяет их в один готовый объект.
* @param {string[]} keys - Массив с именами свойств (ключей)
* @param {any[]} values - Массив с данными (значениями)
* @returns {Object} Сформированный объект
*/
const createObject = (keys, values) => {
  const person = {};

  // Один цикл объединяет ключ и значение по общему индексу [i]
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    const currentValue = values[i];
    // Используем квадратные скобки для динамической записи в объект
    person[currentKey] = currentValue;
  }
  return person;
};
// --- Пример использования ---
const keys = ["name", "age", "city"];
const values = ["John", 25, "New York"];
const person = createObject(keys, values);
console.log(person); // Выведет: { name: 'John', age: 25, city: 'New York' }

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Нам нужен всего один цикл for, так как мы берем элементы из обоих массивов одновременно по общему индексу i.
// 2. Для записи свойства по переменной используются квадратные скобки (person[keys[i]]). Если написать через точку (person.keys[i]), то JavaScript создаст свойство, которое буквально будет называться буквами «keys».
// 3. Один знак = используется для записи данных (присваивания). Три знака === используются только для сравнения, внутри цикла их писать нельзя.
// 4. Современная альтернатива: Object.fromEntries(keys.map((key, i) => [key, values[i]]));
