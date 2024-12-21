// Cargar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar el carrito en localStorage
function updateCart() {
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Calcular el total y la cantidad de productos en el carrito
    let total = 0;
    let itemCount = 0;
    cart.forEach(product => {
        total += product.price * product.quantity;
        itemCount += product.quantity;
    });

    // Actualizar el icono del carrito en el navbar (index.html)
    const totalPriceElem = document.getElementById('cart-total-price');
    if (totalPriceElem) {
        totalPriceElem.textContent = `Total: S/.${total.toFixed(2)}`;
    }

    // Actualizar el título del carrito en el navbar (index.html)
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.title = `Carrito de compras (${itemCount} productos)`;
    }
}

// Función para agregar un producto al carrito
function addToCart(name, price) {
    // Buscar si el producto ya está en el carrito
    const productIndex = cart.findIndex(product => product.name === name);

    if (productIndex === -1) {
        cart.push({ name, price, quantity: 1 });
    } else {
        cart[productIndex].quantity += 1;
    }

    // Actualizar el carrito y la interfaz
    updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(name) {
    cart = cart.filter(product => product.name !== name);
    updateCart();
    updateCartItems();
}

// Función para incrementar la cantidad de un producto en el carrito
function incrementQuantity(name) {
    const product = cart.find(product => product.name === name);
    if (product) {
        product.quantity += 1;
        updateCart();
        updateCartItems();
    }
}

// Función para decrementar la cantidad de un producto en el carrito
function decrementQuantity(name) {
    const product = cart.find(product => product.name === name);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCart();
        updateCartItems();
    }
}

// Función para actualizar los productos en el carrito (compras.html)
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ''; // Limpiar lista antes de llenarla

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li class="list-group-item">Tu carrito está vacío.</li>';
    } else {
        cart.forEach(product => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                ${product.name} - S/.${(product.price * product.quantity).toFixed(2)} (${product.quantity} unidades)
                <button class="btn btn-sm btn-info" onclick="incrementQuantity('${product.name}')">+</button>
                <button class="btn btn-sm btn-warning" onclick="decrementQuantity('${product.name}')">-</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${product.name}')">Eliminar</button>
            `;
            cartItemsContainer.appendChild(listItem);
        });
    }
}

// Función para inicializar la página de compras (compras.html)
document.addEventListener("DOMContentLoaded", function () {
    if (document.body.contains(document.getElementById('cart-items'))) {
        updateCartItems();
    }

    // Configurar los eventos de clic en los botones "Agregar al carrito" en index.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Obtener el nombre y el precio del producto desde los elementos de la tarjeta
            const card = button.closest('.card');
            const productName = card.querySelector('.card-title').textContent;
            const productPrice = parseFloat(card.querySelector('.card-price').textContent.replace('S/.', '').trim());

            addToCart(productName, productPrice);
        });
    });

    updateCart();
});

//Script del Formulario de Contactos:

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contactForm');
    const selectComunicacion = document.getElementById('comunicacion');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Previene el comportamiento predeterminado del formulario

        var genero = document.getElementById("genero").value; 
        var nombre_apellidos = document.getElementById("nombre_apellidos").value;
        var telefono = document.getElementById("telefono").value;
        var correo = document.getElementById("correo").value;

        const comunicacionValue = selectComunicacion.value;

        if (comunicacionValue === "mcorreo") {
            var HoM = (genero === "Masculino") ? "Sr." : "Sra."; 
            alert("Un saludo, " + HoM + " " + nombre_apellidos.split(" ")[0] + " , se le ha enviado un correo para poder contactarnos y recibir mas informacion.");
        } else if (comunicacionValue === "mtelefonico") {
            var HoM = (genero === "Masculino") ? "Sr." : "Sra."; 
            alert("Un saludo, " + HoM + " " + nombre_apellidos.split(" ")[0] + " , se le ha enviado un mensaje telefonico para poder contactarnos y recibir mas informacion.");
        } else {
            alert("Por favor, seleccione cómo desea comunicarse.");
        }
    });
});
