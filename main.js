const hamburgerMenu = document.querySelector('.nav__menu');
const nav = document.querySelector('.nav__link');

hamburgerMenu.addEventListener("click", () => {
    nav.style.left = "15em"
});

nav.addEventListener("click", () => {
    nav.style.left = "100em";
})