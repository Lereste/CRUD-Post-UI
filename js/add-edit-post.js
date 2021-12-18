import postApi from "./api/postApi";
import { initPostForm } from "./utils";

async function handlePostFormSubmit(formValues) {
  try {
    // Check add/edit mode
    // Show success message
    
    // Call API
      // let savedPost = null;
      // if (formValues.id) {
      //   savedPost = await postApi.update(formValues)
      // } else {
      //   savedPost = await postApi.add(formValues);
      // }

    const savedPost = formValues.id
      ? await postApi.update(formValues)
      : await postApi.add(formValues)

    // Redirect to detail page
    window.location.assign(`/post-detail.html?id=${savedPost.id}`);

  } catch (error) {
    console.log('Failed to save post', error);
  }
}

// MAIN
;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');

    // Check mode: edit or add
    const defaultValues = Boolean(postId)
      ? await postApi.getById(postId)
      : {
      title: '',
      description: '',
      author: '',
      imageUrl: '',
    }

    // if (postId) {
    //   defaultValues = await postApi.getById(postId);
    // }

    console.log('id: ' + postId);
    console.log('mode: ', postId ? 'edit' : 'add');
    console.log('default values:', defaultValues);

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: handlePostFormSubmit,
    });

  } catch (error) {
    console.log('Failed to fetch post details: ' + error)
  }
})()