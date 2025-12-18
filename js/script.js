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

let productosGlobal = [];

// ---------------------------
// JSONP callback para productos
// ---------------------------
function procesarProductos(productos) {
    productosGlobal = productos; // guardar productos
    mostrarProductos(productos);
}

// ---------------------------
// Mostrar productos en pantalla
// ---------------------------
function mostrarProductos(productos) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (productos.length === 0) {
        productList.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productos.forEach(item => {
        if (!item.producto) return;

        const card = document.createElement("div");
        card.classList.add("product-card");

        const imgSrc = item.imagen?.startsWith('http') 
            ? item.imagen 
            : 'img/' + item.imagen;

        card.innerHTML = `
            <img src="${imgSrc}" alt="${item.producto}">
            <h3>${item.producto}</h3>
            <p class="descripcion">${item.descripcion || ""}</p>
            <p class="precio">C$ ${item.precio || ""}</p>
            <button class="btn-comprar">
                <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
            </button>
        `;

        card.querySelector(".btn-comprar").addEventListener("click", () => {
            agregarAlCarrito({
                producto: item.producto,
                precio: item.precio,
                imagen: imgSrc
            });
        });

        productList.appendChild(card);
    });
}

// ---------------------------
// BUSCADOR
// ---------------------------
document.addEventListener("input", (e) => {
    if (e.target.id === "buscador") {
        const texto = e.target.value.toLowerCase();

        const filtrados = productosGlobal.filter(item =>
            item.producto?.toLowerCase().includes(texto) ||
            item.descripcion?.toLowerCase().includes(texto)
        );

        mostrarProductos(filtrados);
    }
});

// ---------------------------
// Cargar productos (JSONP)
// ---------------------------
const script = document.createElement('script');
script.src = "https://script.google.com/macros/s/AKfycbxHgG51TDptJQJ_xrBYMarfArc6ogbSYMBuMC-OnQLJLZ2ka0sEEQ_F0Yg_pkkkgBPOQA/exec?callback=procesarProductos";
document.body.appendChild(script);

// ---------------------------
// Carrito
// ---------------------------
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.producto} fue añadido a tu carrito`);
}

// MENÚ RESPONSIVE (HAMBURGER)
const menuToggle = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");
const header = document.querySelector("header");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    header.classList.toggle("menu-abierto"); // clase extra al abrir menú
});
