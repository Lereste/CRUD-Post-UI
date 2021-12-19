import postApi from "./api/postApi";
import { initPostForm, toast } from "./utils";

function removeUnusedFields(formValues) {
  const payLoad = {...formValues };

  // imageSource = 'picsum' --> remove
  // imageSource = 'upload' --> remove
  if (payLoad.imageSource === 'upload') {
    delete payLoad.imageUrl
  } else {
    delete payLoad.image
  }

  // Finally remove imageSource
  delete payLoad.imageSource;

  // Remove id if it's add mode
  if (!payLoad.id) delete payLoad.id

  return payLoad;
}

function jsonToFormData(jsonObject) {
  const formData = new FormData();

  for (const key in jsonObject) {
    formData.set(key, jsonObject[key]);
  }

  return formData
}

async function handlePostFormSubmit(formValues) {
  try {
    const payLoad = removeUnusedFields(formValues);
    const formData = jsonToFormData(payLoad);

    // Check add/edit mode
    // Call API
    const savedPost = formValues.id
      ? await postApi.updateFormData(formData)
      : await postApi.addFormData(formData)

    // Show success message
    toast.success('Save post successfully ^^ ')
    
    // Redirect to detail page
    setTimeout(() => {
      window.location.assign(`/post-detail.html?id=${savedPost.id}`);
    }, 2000)

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

    // console.log('id: ' + postId);
    // console.log('mode: ', postId ? 'edit' : 'add');
    // console.log('default values:', defaultValues);

    initPostForm({
      formId: 'postForm',
      defaultValues,
      onSubmit: handlePostFormSubmit,
    });

  } catch (error) {
    console.log('Failed to fetch post details: ' + error)
  }
})()