// import axiosClient from './api/axiosClient';
import postApi from './api/postApi';

async function main() {
  //   const response = await axiosClient.get('/posts');
  try {
    const queryParams = {
      _page: 1,
      _limit: 5
    };

    const data = await postApi.getAll(queryParams);
    console.log('main.js data', data); // Object
  } catch (error) {
    console.log('Get all failed - ' + error);
  }

  await postApi.updateFormData({
    id: 'sktwi1cgkkuif36dj',
    title: 'Dicta molestiae aut'
  });
}

main();
