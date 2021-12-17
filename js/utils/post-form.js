import { setFieldValue, setBackgroundImage, setTextContent } from "./common";
import * as yup from 'yup';

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
    .test('at-least-two-words', 'Please enter at least two words of 3 characters :( ', 
    (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2),
    description: yup.string(),
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
    ['title', 'author'].forEach(name => setFieldError(form, name, ''))

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

export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;

  setFormValue(form, defaultValues);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const formValues = getFormValues(form);
      console.log(formValues);

    // Validation
    // If valid trigger submit callback
    // Orderwise, show validation errors
    if (!validatePostForm(form, formValues)) return;
  })
}
