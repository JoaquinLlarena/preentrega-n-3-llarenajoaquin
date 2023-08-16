const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

const productList = document.querySelector('.container-items');
let allProducts = [];

let valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

// Función para guardar productos en JSON
const saveProductsToJSON = () => {
    const productsJSON = JSON.stringify(allProducts);
    localStorage.setItem('cartProducts', productsJSON);
};

// Función para cargar productos desde JSON
const loadProductsFromJSON = () => {
    const productsJSON = localStorage.getItem('cartProducts');
    if (productsJSON) {
        allProducts = JSON.parse(productsJSON);
        eventoHtml();
    }
};

// Cargar productos guardados al cargar la página
window.addEventListener('DOMContentLoaded', loadProductsFromJSON);

productList.addEventListener('click', (x) => {
    if (x.target.classList.contains('agregar')) {
        const product = x.target.parentElement;
        const infoProduct = {
            cantidad: 1,
            titulo: product.querySelector('h2').textContent,
            precio: product.querySelector('p').textContent,
        };

        const existe = allProducts.some((product) => product.titulo === infoProduct.titulo);

        if (existe) {
            allProducts = allProducts.map((product) => {
                if (product.titulo === infoProduct.titulo) {
                    product.cantidad++;
                }
                return product;
            });
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        eventoHtml();
        saveProductsToJSON(); // Guardar productos en JSON
    }
});

const eventoHtml = () => {
    rowProduct.innerHTML = '';

    let total = 0;
    let totalProducts = 0;

    allProducts.forEach((product) => {
        const containerProducts = document.createElement('div');
        containerProducts.classList.add('cart-product');

        containerProducts.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.cantidad}</span>
                <p class="titulo-producto-carrito">${product.titulo}</p>
                <span class="precio-producto-carrito">${product.precio}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.append(containerProducts);

        total = total + parseInt(product.cantidad * product.precio.slice(1));
        totalProducts = totalProducts + product.cantidad;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalProducts;




};


