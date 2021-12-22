import { toast } from ".";
import postApi from "../api/postApi";
import { handleFilterChange } from "../home";

// function showModal(modalElement) {
//   // Make sure bootstrap script is loaded
//   if (!window.bootstrap) return;

//   const modal = new window.bootstrap.Modal(modalElement);
//   if(modal) modal.show()
// }

// function hideModal() {
//   const modal = new window.bootstrap.Modal(modalElement);
// }

export function handleDeletePostModal({ modalId, deleteSelector, closeSelector }) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;
  if(Boolean(modalElement.dataset.registered)) return;

  if (!deleteSelector || !closeSelector) return;

  document.addEventListener('post-delete', (event) => {
    try {
      const post = event.detail;
      const deleteMessage = document.querySelector('.delete-message');
      deleteMessage.innerHTML = `
        Are you sure to remove post "<h6 style="color: red; margin: 0;">${post.title}</h6>" ?
      `;

      const modal = new window.bootstrap.Modal(modalElement);
      
      const btnDelete = modalElement.querySelector(deleteSelector); 
      btnDelete.addEventListener('click', async () => {
        await postApi.remove(post.id);
        await handleFilterChange();
        toast.success('Remove post successfully');

        window.location.reload();
      });

      const cancleButton = document.querySelector(closeSelector);
      cancleButton.addEventListener('click', () => {
        modal.hide();
      });

      modal.show();
    } catch (error) {
      toast.error(error.message);
    }
  });
}