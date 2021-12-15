function showModal(modalElement) {
  // Make sure bootstrap script is loaded
  if (!window.bootstrap) return;

  const modal = new window.bootstrap.Modal(modalElement);
  if(modal) modal.show();
}

  // Handle click for all imgs --> Event Delegation
  // Img click --> find all imgs with the same album/gallery
  // Determine index of selected img
  // Show modal with selected img
  // Handle prev/next click

export function resgisterLightbox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;

  // Check if this modal is registered or not
  if(Boolean(modalElement.dataset.registered)) return;

  // Selector
  const imageElement = modalElement.querySelector(imgSelector); 
  const prevButton = modalElement.querySelector(prevSelector); 
  const nextButton = modalElement.querySelector(nextSelector); 
  if (!imageElement || !prevButton || !nextButton) return;

  // Lightbox variables
  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  document.addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName !== 'IMG' || !target.dataset.album) return;

    // Get img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
    currentIndex = [...imgList].findIndex((x) => x === target);

    // Show image at index
    showImageAtIndex(currentIndex);
    console.log(currentIndex);

    // Show modal
    showModal(modalElement);

  });

  prevButton.addEventListener('click', () => {
    // Show prev image of current album
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    // Show next image of current album
    currentIndex = (currentIndex + 1) % imgList.length;
    showImageAtIndex(currentIndex);
  });

  // Make this modal is already registered
  modalElement.dataset.registered = 'true';

  // Count number of page
  const showPageNumber = document.getElementById('count-number-of-total');
  document.addEventListener('click', () => {
    showPageNumber.innerHTML = `Picture ${currentIndex + 1} / ${imgList.length}`;
  })
}
