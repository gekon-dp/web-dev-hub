/** 

* @file transform-nested-arrays.js
* @description Преобразование массива сложных объектов со встроенной агрегацией вложенных данных.
* @task Task из учебного курса
*/

/** 

* Трансформирует структуру объектов, вычисляя метрики на основе вложенных массивов.
* @param {Object[]} array - Исходный массив сложных объектов
* @returns {Object[]} Новый плоский массив с измененной структурой и агрегированными данными
*/
const transformNestedArrays = (array) => {
  const transformedData = [];
  for (let key in array) {
    let internalSum = 0;
    const nestedArray = array[key].grades;
    // Шаг 1: Извлекаем и обрабатываем данные из внутреннего массива
    for (let i = 0; i < nestedArray.length; i++) {
      internalSum += nestedArray[i];
    }
    // Шаг 2: Рассчитываем новую метрику и приводим к красивому числовому виду
    const computedMetric = Number((internalSum / nestedArray.length).toFixed(1));
    // Шаг 3: Собираем объект с новой структурой свойств
    const result = {
      name: array[key].name,
      averageGrade: computedMetric,
    };
    // Шаг 4: Наполняем итоговый массив трансформированными данными
    transformedData.push(result);
  }
  return transformedData;
};
// --- Пример использования ---
const students = [
  { name: "Анна", grades: [85, 90, 92] },
  { name: "Иван", grades: [88, 75, 96] },
  { name: "Мария", grades: [78, 82, 94] },
];

const students = [
  { name: "Анна", averageGrade: 89 },
  { name: "Иван", averageGrade: 86.33333333333333 },
  { name: "Мария", averageGrade: 84.66666666666667 },
];
console.log(transformNestedArrays(students));

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. При работе с глубокой вложенностью всегда сохраняйте путь к внутреннему массиву в отдельную переменную (const nestedArray = ...). Это избавляет код от громоздких конструкций вида array[key].item[i].
// 2. Метод .toFixed(1) превращает результат вычислений в СТРОКУ. Чтобы свойство нового объекта оставалось ЧИСЛОМ, всегда оборачивайте итоговое выражение в конструкцию Number(...) или ставьте унарный плюс (+).
// 3. Этот паттерн незаменим в веб-разработке, когда нужно превратить сырой ответ из базы данных в удобный формат для отображения на фронтенде.
// 4. Современная альтернатива через map и reduce:
// const modernResult = array.map(item => ({ name: item.name, averageGrade: Number((item.grades.reduce((a, b) => a + b, 0) / item.grades.length).toFixed(1)) }));
