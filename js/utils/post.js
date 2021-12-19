import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextContent, truncateText } from './common';


// To use fromNow function
dayjs.extend(relativeTime);

export function createPostElement(post) {
  if (!post) return;

  // Find and clone template
  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  // Update title, description, author and thumbnail
  setTextContent(liElement, '[data-id="title"]', post.title);
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 120));
  setTextContent(liElement, '[data-id="author"]', post.author);

  // Calculate timespan
  // setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`);
  setTextContent(
    liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).format('DD/MM/YY - h:mm A')}`
  );

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      console.log('Load image failed --> use default placeholder');
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail';
    });
  }

  // Attach events
  // Go to post detail when click on div.post-item
  const divElement = liElement.firstElementChild;
  if (divElement) {
    divElement.addEventListener('click', (event) => {

      // S2: If event is triggered from menu --> ignore
      const menu = liElement.querySelector('[data-id="menu"]');
      if (menu && menu.contains(event.target)) return;

      window.location.assign(`/post-detail.html?id=${post.id}`);
    });
  }

  // Add click event for edit button
  const editButton = liElement.querySelector('[data-id="edit"]');
  if (editButton) {
    editButton.addEventListener('click', () => {
      // S1: Prevent event bubbling to parent (but can't tracking user clicks)
      // event.stopPropagation();

      window.location.assign(`/add-edit-post.html?id=${post.id}`);
    })
  }

  // Add click event for remove button
  const removeButton = liElement.querySelector('[data-id="remove"]');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      const customEvent = new CustomEvent('post-delete', {
        bubbles: true,
        detail: post,
      });

      removeButton.dispatchEvent(customEvent);
    })
  }

  return liElement;
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  // Clear current list before render new list
  ulElement.textContent = '';

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}