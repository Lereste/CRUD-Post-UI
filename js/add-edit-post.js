import postApi from "./api/postApi";
import { initPostForm } from "./utils";

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
      onSubmit: (formValue) => console.log(formValue)
    });

  } catch (error) {
    console.log('Failed to fetch post details: ' + error)
  }
})()