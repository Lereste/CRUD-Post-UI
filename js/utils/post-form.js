import { setFieldValue, setBackgroundImage, setTextContent, randomNumber } from "./common";
import * as yup from 'yup';

const ImageSource = {
  PICSUM: 'picsum',
  UPLOAD: 'upload',
}

function setFormValue(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title);
  setFieldValue(form, '[name="author"]', formValues?.author);
  setFieldValue(form, '[name="description"]', formValues?.description);

  setFieldValue(form, '[name="imageUrl"]', formValues?.imageUrl); // hidden field
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl);
}

function getFormValues(form) {
  const  formValues = {};

  // S1: query each input and add to values object
    // ['title', 'author', 'description', 'imageUrl'].forEach((name) => {
    //   const field = form.querySelector(`[name="${name}"]`);
    //   if (field) formValues[name] = field.value
    // });

  // S2: using form data
  const data = new FormData(form);
  for (const [key, value] of data) {
    formValues[key] = value;
  }

  return formValues;
}

/* S1: use HTML validate

function getTitleError(form) {
  const titleElement = form.querySelector('[name="title"]');
  if (!titleElement) return;

  // Required
  if (titleElement.validity.valueMissing) return 'Please enter title :('

  // At least two words
  if (titleElement.value.split(' ').filter((x) => !!x && x.length >= 3).length < 2) {
    return 'Please enter at least two words of 3 characters :('
  }

  return '';
}

function getAuthorError(form) {
  const authorElement = form.querySelector('[name="author"]');
  if (!authorElement) return;

  if (authorElement.validity.valueMissing) return 'Please enter author :('

  return '';
}

*/

// Validation form with Yup
function getPostSchema() {
  return yup.object().shape({
    title: yup.string().required('Please enter title :('),
    author: yup
    .string()
    .required('Please enter author :( ')
    .test(
      'at-least-two-words', 
      'Please enter at least two words of 3 characters :( ', 
      (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2
    ),
    description: yup.string(),
    
    imageSource: yup
    .string()
    .required('Please selected an image source')
    .oneOf([ImageSource.PICSUM, ImageSource.UPLOAD], 'Invalid image source'),
    
    imageUrl: yup.string()
    .when('imageSource', {
      is: ImageSource.PICSUM,
      then: yup
      .string()
      .required('Please random a background image')
      .url('Please enter a valid URL'),
    }),

    image: yup.mixed().when('imageSource', {
      is: ImageSource.UPLOAD,
      then: yup
      .mixed()
      .test('required', 'Please select an image to upload', (file) => Boolean(file?.name))
      .test('max-3mb', 'The image is to large (max 3mb)', (file) => {
        const fileSize = file?.size || 0;
        const MAX_SIZE = 3 * 1024 * 1024; // 3 MB
        return fileSize <= MAX_SIZE;
      })
    }),
  });
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(element.parentElement, '.invalid-feedback', error);
  }
}

async function validatePostForm(form, formValues) {
  /* S1: use HTML validate
  
  // Get errors
  const errors = {
    title: getTitleError(form),
    author: getAuthorError(form),
  };

  // Set errors
  for (const key in errors) {
    const element = form.querySelector(`[name="${key}"]`);
    if (element) {
      element.setCustomValidity(errors[key]);
      setTextContent(element.parentElement, '.invalid-feedback', errors[key]);
    }
  }

  */

  try {
    // Reset previous errors
    ['title', 'author', 'imageUrl', 'image'].forEach(name => setFieldError(form, name, ''))

    // Start validating
    const schema = getPostSchema();
    await schema.validate(formValues, {abortEarly: false}); // get all mess when errors

  } catch (error) {
    // console.log(error.name);
    // console.log(error.inner);
    const errorLog = {};

    if (error.name === 'ValidationError' && Array.isArray(error.inner)) {
      for (const validationError of error.inner) {
        const name = validationError.path;

        // ignore if the field is already logged
        if (errorLog[name]) continue;

        // Set field error and mark as logged
        setFieldError(form, name, validationError.message);
        errorLog[name] = true;
      }
    }
  }

  // Add was-validated class to form element 
  const isValid = form.checkValidity();
  if (!isValid) form.classList.add('was-validated');
  return isValid;
}

async function validateFormField(form, formValues, name) {
  try {
    // Clear previous error
    setFieldError(form, name, '');

    const schema = getPostSchema();
    await schema.validateAt(name, formValues);
  } catch (error) {
    setFieldError(form, name, error.message);
  }

  // Show validation error (if any)
  const field = form.querySelector(`[name="${name}"]`);
  if (field && !field.checkValidity()) {
    field.parentElement.classList.add('was-validated');
  }
}

function showLoading(form) {
  const button = form.querySelector('[name="submit"]');
  if (button) {
    button.disabled = true;
    button.textContent = 'Saving...';
  }
}

function hideLoading(form) {
  const button = form.querySelector('[name="submit"]');
  if (button) {
    button.disabled = false;
    button.textContent = 'Save';
  }
}

function initRandomImage(form) {
  const randomButton = document.getElementById('postChangeImage');
  if (!randomButton) return;

  randomButton.addEventListener('click', () => {
    // Random ID and Build URL
    const imageUrl = `https://picsum.photos/id/${randomNumber(1000)}/1368/400`;

    // Set imageUrl input + background
    setFieldValue(form, '[name="imageUrl"]', imageUrl); // hidden field
    setBackgroundImage(document, '#postHeroImage', imageUrl);
  });
}

function renderImageSourceControl(form, selectedValue) {
  const controlList = form.querySelectorAll('[data-id="imageSource"]');
  controlList.forEach((control) => {
    control.hidden = control.dataset.imageSource !== selectedValue;
  });
}

function initRadioImageSource(form) {
  const radioList = document.querySelectorAll('[name="imageSource"]');
  radioList.forEach((radio) => {
    radio.addEventListener('change', (event) => renderImageSourceControl(form, event.target.value));
  });
}

function initUploadImage(form) {
  const uploadImage = form.querySelector('[name="image"]');
  if (!uploadImage) return;

  uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setBackgroundImage(document, '#postHeroImage', imgUrl);

      validateFormField(form, { imageSource: ImageSource.UPLOAD, image: file }, 'image');
    }
  });
}

function initValidationOnChange(form) {
  ['title', 'author'].forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (field) {
      field.addEventListener('input', (event) => {
        const newValue = event.target.value;
        validateFormField(form, { [name]: newValue }, name);
      });
    }
  });
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;

  let submitting = false;
  setFormValue(form, defaultValues);

  // Init events
  initRandomImage(form);
  initRadioImageSource(form);
  initUploadImage(form);
  initValidationOnChange(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Prevent other submission
    if (submitting) return;

    showLoading(form);
    submitting = true;

    // Get form values
    const formValues = getFormValues(form);
    formValues.id = defaultValues.id;

    // Validation
    // If valid trigger submit callback
    // Orderwise, show validation errors
    const isValid = await validatePostForm(form, formValues);
    if (isValid) await onSubmit?.(formValues)

    // Always hide loading no matter form is valid or not 
    hideLoading(form);
    submitting = false;
  })
}
