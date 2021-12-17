import postApi from './api/postApi';
import { initPagination, initSearch, renderPostList, renderPagination } from './utils';

async function handleFilterChange(filterName, filterValue) {
  try {
    // Update queryParams
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

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

// MAIN
;(async () => {
  try {
    const url = new URL(window.location);

    // Update search params if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

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

    const { data, pagination } = await postApi.getAll(queryParams);
    
    // Render post list based URL params
    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('Get all failed - ' + error);
  }
})();
