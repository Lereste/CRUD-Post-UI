import postApi from './api/postApi';
import { initPagination, initSearch, renderPostList, renderPagination, toast } from './utils';

export async function handleFilterChange(filterName, filterValue) {
  try {
    // Update queryParams
    const url = new URL(window.location);
    if (filterName) url.searchParams.set(filterName, filterValue)

    // Reset page to default when filterName = title_like
    if (filterName === 'title_like') url.searchParams.set('_page', 1);

    history.pushState({}, '', url);

    // Fetch API and re-render post list
    const { data, pagination } = await postApi.getAll(url.searchParams);

    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('Failed to fetch post list', error);
  }
}

// S1: Lazy work :D
// function registerPostDeleteEvent() {
//   document.addEventListener('post-delete', async (event) => {
//     try {
//       const post = event.detail;
//       const message = `Are you sure to remove post "${post.title}"?`;
//       if (window.confirm(message)) {
//         await postApi.remove(post.id)
//         await handleFilterChange()

//         toast.success('Remove post successfully');
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//     console.log('click', event.detail)
//   });
// }

// S2: Hard work
function handleDeletePostModal() {
  const modalElement = document.getElementById('deletePostModal');
  if (!modalElement) return;
  if(Boolean(modalElement.dataset.registered)) return;

  document.addEventListener('post-delete', (event) => {
    try {
      const post = event.detail;
      const deleteMessage = document.querySelector('.delete-message');
      deleteMessage.innerHTML = `
        Are you sure to remove post "<h6 style="color: red; margin: 0;">${post.title}</h6>" ?
      `;

      const modal = new window.bootstrap.Modal(modalElement);
      
      const btnDelete = modalElement.querySelector('button[data-id="btnDelete"]'); 
      btnDelete.addEventListener('click', async () => {
        await postApi.remove(post.id);
        await handleFilterChange();
        toast.success('Remove post successfully');

        await modal.hide();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

      const cancleButton = document.querySelector('button[data-id="btnClose"]');
      cancleButton.addEventListener('click', () => {
        modal.hide();
      });

      if (!btnDelete || !cancleButton) return;

      modal.show();
    } catch (error) {
      toast.error(error.message);
    }
  });
}


// MAIN
;(async () => {
  try {
    const url = new URL(window.location);

    // Update search params if needed
    if (!url.searchParams.get('_sort')) url.searchParams.set('_sort', 'createdAt');
    if (!url.searchParams.get('_order')) url.searchParams.set('_order', 'desc');
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 9);
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);

    history.pushState({}, '', url);
    const queryParams = url.searchParams;

    // Attach click event for links
    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    });

    // Search with title_like
    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    // registerPostDeleteEvent();

    handleDeletePostModal();

    handleFilterChange();
  } catch (error) {
    console.log('Get all failed - ' + error);
  }
})();
