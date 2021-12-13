import dayjs from 'dayjs';
import postApi from './api/postApi';
import { setTextContent } from './utils';

// id="goToEditPageLink"
// id="postHeroImage"
// id="postDetailTitle"
// id="postDetailAuthor"
// id="postDetailTimeSpan"
// id="postDetailDescription"

// author: "Charlene Herman"
// createdAt: 1633700485638
// description: "et veritatis dolores magni laborum id praesentium veniam quis nam repellendus sit aut nisi sit quod quas est sed dolores odit omnis commodi sapiente perspiciatis nam sequi libero consequuntur quas et velit qui beatae quibusdam aut nemo quisquam esse voluptates aspernatur magnam amet et nostrum sunt quo dicta neque et"
// id: "sktwi1cgkkuif36dj"
// imageUrl: "https://picsum.photos/id/371/1368/400"
// title: "Dicta molestiae aut"
// updatedAt: 1633700485638

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
      // console.log('Load image failed --> use default placeholder');
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
  // Get post id from URL
  // Fetch post detail API
  // Render post detail

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id')
    if (!postId) {
      console.log('Post not found');
      return;
    }

    const post = await postApi.getById(postId);
    renderPostDetail(post);
  } catch (error) {
    console.log('Faild to fetch post detail', error);
  }

  
})()