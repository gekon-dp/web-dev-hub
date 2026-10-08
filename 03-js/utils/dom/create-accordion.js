/**
 * @file create-accordion.js
 * @description Универсальная утилита для создания и управления аккордеонами с динамической структурой.
 */

/**
 * Инициализирует аккордеон из массива элементов
 * @param {Object} config - Настройки аккордеона
 * @param {NodeListOf<HTMLElement>|HTMLElement[]} config.items - Список элементов аккордеона
 * @param {Record<string, string[]>} config.data - Данные в формате { HeaderTitle: ["Subitem 1", "Subitem 2"] }
 * @param {boolean} [config.singleOpen=true] - Закрывать ли остальные пункты при открытии нового
 * @param {string} [config.activeClass="active"] - Класс открытого состояния
 */
export const createAccordion = ({
  items,
  data = {},
  singleOpen = true,
  activeClass = "active",
}) => {
  if (!items || !items.length) return;

  items.forEach((item) => {
    const itemText = item.textContent.trim();
    const hasData = Boolean(data[itemText]);

    item.innerHTML = "";

    const header = document.createElement("div");
    header.className = `accordion-header ${hasData ? "" : "no-content"}`.trim();
    header.textContent = itemText;
    item.appendChild(header);

    if (hasData) {
      data[itemText].forEach((subText) => {
        const contentDiv = document.createElement("div");
        contentDiv.className = "accordion-content";
        contentDiv.textContent = subText;
        item.appendChild(contentDiv);
      });

      header.addEventListener("click", () => {
        const isActive = item.classList.contains(activeClass);

        if (singleOpen) {
          items.forEach((el) => el.classList.remove(activeClass));
        }

        if (!isActive) {
          item.classList.add(activeClass);
        }
      });
    }
  });
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Очистка `item.innerHTML = ""` предотвращает дублирование контента при повторной инициализации.
// 2. Параметр `singleOpen` регулирует поведение: аккордеон (только один пункт) или аккордеон-список (несколько открытых пунктов одновременно).
