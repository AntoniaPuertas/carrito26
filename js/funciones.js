const productos = [
    {id: 1, nombre: "Cuna", descripcion: "Cuna blanca moderna", imagen: "cuna.jpg", precio: 340.00},
    {id: 2, nombre: "Dormitorio", descripcion: "Dormitorio individual", imagen: "dormitorio.jpg", precio: 640.00},
    {id: 3, nombre: "Escritorio", descripcion: "Escritorio juvenil", imagen: "escritorio.jpg", precio: 220.00},
    {id: 4, nombre: "Mesa", descripcion: "Mesa baja aparador", imagen: "mesita.jpg", precio: 140.00},
    {id: 5, nombre: "Sofá", descripcion: "Sofá diseño exclusivo", imagen: "sofa.jpg", precio: 890.00},
    {id: 6, nombre: "Sofá", descripcion: "Sofá 3 plazas", imagen: "sofaGrande.jpg", precio: 1340.00}
]

//Elementos del DOM - Document Object Model
const productosContainer = document.getElementById('products') //contenedor donde se van a mostrar los productos
const itemsCarrito = document.getElementById('cart-items') //contenedor donde se van a mostrar las líneas del carrito
const mostrarCarrito = document.getElementById('toggle-cart') //icono para mostrar u ocultar el carrito
const carrito = document.getElementById('cart') //contenedor del carrito 
const totalCarrito = document.getElementById('cart-total') //total del carrito, inicialmente a 0
const contador = document.getElementById('contador') //para mostrar cuantos artículos hay en el carrito

//array para guardar los productos del carrito
let carritoProductos = []

//funcion para mostrar los productos
function mostrarProductos(){
    productosContainer.innerHTML = productos.map((producto) => 
        `
        <div class="product-card">
            <img src="../img/${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>${producto.precio} €</p>
            <button class="addProducto" data-id="${producto.id}">Añadir al carrito</button>
        </div>
        `
    ).join('')
    const btnAddCarrito = document.querySelectorAll('.addProducto')
    btnAddCarrito.forEach(btn => {
        btn.addEventListener('click', addCarrito)
    })
}

function addCarrito(e){
    const productoId = parseFloat(e.target.getAttribute('data-id')) 
    const productoComprado = productos.find(producto => producto.id === productoId)
    carritoProductos.push(productoComprado)
    actualizarCarrito()
}

function actualizarCarrito(){
    itemsCarrito.innerHTML = carritoProductos.map((item) =>
        `
            <div class="cart-item">
                <p>${item.nombre}</p>
                <p>${item.precio.toFixed(2)} €</p>
            </div>
        `
    ).join("")
}

mostrarProductos()