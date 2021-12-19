import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const toast = {
  info(message) {
    Toastify({
      text: message,
      duration: 5000,
      // destination: "https://github.com/apvarun/toastify-js",
      // newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#4fc3f7",
      },
      offset: {
        x: 20, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 150 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      // onClick: function(){} // Callback after click
    }).showToast();    
  },

  success(message) {
    Toastify({
      text: message,
      duration: 5000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#66bb6a",
      },
      offset: {
        x: 20,
        y: 150
      },
    }).showToast(); 
  },

  error(message) {
    Toastify({
      text: message,
      duration: 5000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#e57373",
      },
      offset: {
        x: 20,
        y: 150
      },
    }).showToast(); 
  },
}