import postApi from "./api/postApi";
import { initPostForm, toast } from "./utils";

async function handlePostFormSubmit(formValues) {
  try {
    // Check add/edit mode
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

    // Show success message
    toast.success('Save post successfully ^^ ')
    
    // Redirect to detail page
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savedPost.id}`);
    }, 200)

  } catch (error) {
    console.log('Failed to save post', error);
    toast.error(`Error: ${error.message} `);
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