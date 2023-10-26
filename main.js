const hamburgerMenu = document.querySelector('.nav__menu');
const closeMenu = document.querySelector('.nav__link');
const userName = document.querySelector('#Name');
const userEmail = document.querySelector('#Email');
const submitBtn = document.querySelector('#submit');
const nameErrorMessage = document.querySelector('#error-name');
const enailErrorMessage = document.querySelector('#error-email');

hamburgerMenu.addEventListener("click", () => {
    closeMenu.style.left = "10em"
});

closeMenu.addEventListener("click", () => {
    closeMenu.style.left = "70em";
});

// function isValidName() {
//     if (userName.value.trim() === "") {
//         nameErrorMessage.textContent = `Name field can't be empty`;
//     } else {
//         nameErrorMessage.textContent = "";
//     }
// }

// function validEmail(userEmail) {
//     return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(userEmail);
// }

// function isValidEmail() {
//     if (userEmail.value.trim() === "") {
//         enailErrorMessage.textContent = `Email field can't be empty`;
//     } else if (validEmail(userEmail.value.trim())) {
//         enailErrorMessage.textContent = "";
//     } else {
//         enailErrorMessage.textContent   = `Not a valid Email`;
//     }
// }

// submitBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     isValidName();
//     isValidEmail();
// })


// submitBtn.addEventListener("submit", (e) => {
//     e.preventDefault()

//     fetch("https://formsubmit.co/el/lehuta", {
//         method: post,
//         body: new FormData(this),
//     })
//     .then(response => {
//         console.log(response);
//         if(response.ok) {
//             window.location.href = "thanks.html";
//         } else {
//             console.error("Fail to submit form");
//         }
//     })
//     .catch(error => {
//         console.error(`"Error:" error`);
//     })
// })