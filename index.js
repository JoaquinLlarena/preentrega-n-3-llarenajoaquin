





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


//carrito 

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

        rowProduct.appendChild(containerProducts);

        total = total + parseInt(product.cantidad * product.precio.slice(1));
        totalProducts = totalProducts + product.cantidad;

        const deleteIcon = containerProducts.querySelector('.icon-close');

        // ...

        deleteIcon.addEventListener('click', () => {
            const index = allProducts.indexOf(product);
            if (index !== -1) {
                const deletedProduct = allProducts.splice(index, 1)[0]; // Obtén el producto eliminado
                eventoHtml();
                saveProductsToJSON();

                // Muestra una alerta para informar al usuario que el producto se eliminó
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Se ha eliminado "${deletedProduct.titulo}" del carrito.`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        });

        // ...

    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalProducts;
};





//darkmode 


const darkMode = document.querySelector(".btnn");
const body = document.body
const carrito = document.querySelector(".cart-product")
const carritoItems = document.querySelector(".cart-total")

darkMode.addEventListener("click", modoOscuro)

function modoOscuro() {

    body.classList.toggle("dark-mode");
    carrito.classList.toggle("dark-mode-cart");


    darkMode.innerText = ("tocame para modo claro");


    if (body.classList.contains("dark-mode")) [

        darkMode.innerText = ("modo claro")

    ]
    else (darkMode.innerText = ("modo oscuro"))


}

const accessKey = 'y-t_v2jAD71auz7_kRELkqJP1Z9y4Oq6iqdwpRx5tb0'; // Reemplaza con tu clave de acceso
const query = 'gorras'; // Tu consulta de búsqueda
const imageContainer = document.querySelector('.container-de-imagenes'); // Reemplaza con el selector de tu contenedor de imágenes

fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`)
  .then(response => response.json())
  .then(data => {
    // Procesa los datos y muestra las imágenes en tu sitio web
    const images = data.results; // Obtiene la lista de imágenes de los resultados

    images.forEach(imageData => {
      const imageElement = document.createElement('img'); // Crea un elemento de imagen
      imageElement.src = imageData.urls.regular; // Establece la URL de la imagen
      imageElement.alt = imageData.alt_description; // Establece un texto alternativo para la imagen

      // Agrega la imagen al contenedor de imágenes en tu página
      imageContainer.appendChild(imageElement);
    });
  })
  .catch(error => {
    console.error('Error al cargar imágenes de Unsplash:', error);
  });




