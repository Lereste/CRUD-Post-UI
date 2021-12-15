import dayjs from 'dayjs';
import postApi from './api/postApi';
import { resgisterLightbox, setTextContent } from './utils';

function renderPostDetail(post) {
  if (!post) return;
  
  // Render: title, description, author, updatedAt
  setTextContent(document, '#postDetailTitle', post.title);
  setTextContent(document, '#postDetailDescription', post.description);
  setTextContent(document, '#postDetailAuthor', post.author);
  setTextContent(
    document, '#postDetailTimeSpan', ` at ${dayjs(post.updatedAt).format('DD/MM/YY - h:mm A')}`
  );

  // Render hero image (imageUrl)
  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;

    heroImage.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail';
    });
  }

  // Render edit page link
  const editPageLink = document.getElementById('goToEditPageLink');
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`;
    editPageLink.innerHTML = '<i class="far fa-edit"></i> Edit post'
  }
}

;(async () => {
  resgisterLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  });

  // Get post id from URL
  // Fetch post detail API

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id')
    if (!postId) {
      console.log('Post not found');
      return;
    }

    const post = await postApi.getById(postId);

  // Render post detail
    renderPostDetail(post);
  } catch (error) {
    console.log('Faild to fetch post detail', error);
  }
})()