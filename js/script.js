// === BANNER FADE ===
let slideIndex = 0;
const slides = document.getElementsByClassName("banner-slide");

function showSlides() {
    for (let i = 0; i < slides.length; i++) slides[i].style.opacity = 0;
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.opacity = 1;
    setTimeout(showSlides, 4000); // cambia cada 4 segundos
}
showSlides();

// MENÚ RESPONSIVE (HAMBURGER)
const menuToggle = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");
const header = document.querySelector("header");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    header.classList.toggle("menu-abierto"); // clase extra al abrir menú
});
