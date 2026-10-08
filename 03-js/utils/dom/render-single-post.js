/**
 * @file render-single-post.js
 * @description Утилита для безопасной отрисовки одиночного поста в DOM-контейнер.
 */

/**
 * Рендерит данные поста в указанный контейнер
 * @param {Object} post - Объект поста ({ id, title, body })
 * @param {HTMLElement} container - Целевой DOM-контейнер
 */
export const renderSinglePost = (post, container) => {
  if (!post || !container) return;

  container.innerHTML = "";

  const postWrapper = document.createElement("div");
  postWrapper.classList.add("post");

  const id = document.createElement("h3");
  id.textContent = `Post #${post.id}`;

  const title = document.createElement("p");
  title.classList.add("subheader");
  title.textContent = post.title;

  const body = document.createElement("p");
  body.textContent = post.body;

  postWrapper.append(id, title, body);
  container.append(postWrapper);
};

// --- Важные нюансы для себя (Шпаргалка) ---
// 1. Использование textContent исключает риски XSS при выводе данных с сервера.
// 2. Метод container.innerHTML = "" гарантирует полную очистку старого поста перед рендерингом нового.
// 3. Структура полностью оторвана от контроллера — функция отвечает только за формирование элементов DOM.
