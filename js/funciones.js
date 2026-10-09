
//array de productos, cada producto es un objeto con id, nombre, descripción, imagen y precio
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
//si hay productos en el localStorage los cargamos, si no hay creamos un array vacío
let carritoProductos = JSON.parse(localStorage.getItem('carrito')) || []

//Guarda el número de productos que hay en el carrito
let numeroProductos = parseFloat(localStorage.getItem('numeroProductos')) || 0

// if(parseFloat(localStorage.getItem('numeroProductos'))){
//     numeroProductos = parseFloat(localStorage.getItem('numeroProductos'))
// }else{
//     numeroProductos = 0
// }

actualizarCarrito() //llamada a la función para mostrar el carrito en pantalla

//funcion para mostrar los productos en pantalla
function mostrarProductos(){
    //recorre el array de productos y crea el html para mostrarlos en pantalla
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
    //crea una constante para todos los botones
    const btnAddCarrito = document.querySelectorAll('.addProducto')
    //añade eventos para los botones de añadir producto al carrito
    btnAddCarrito.forEach(btn => {
        btn.addEventListener('click', addCarrito)
    })
}

function actualizarLocalStorage(){
    //guardar en localStorage el carrito de la compra
    localStorage.setItem('carrito', JSON.stringify(carritoProductos))
    //guardar en localStorage el número de productos que hay en el carrito
    localStorage.setItem('numeroProductos', numeroProductos)
}

//funcion para añadir un producto al carrito
function addCarrito(e){
    const productoId = parseFloat(e.target.getAttribute('data-id')) 
    const productoComprado = productos.find(producto => producto.id === productoId)

    //comprobar si ya hay un producto igual en el carrito
    const lineaCarrito = carritoProductos.find(producto => producto.id === productoComprado.id)

    //si ya tenemos un producto igual en el carrito, le añadimos 1 a la cantidad
    if(lineaCarrito){
        // console.log("El producto ya está en el carrito")
        lineaCarrito.cantidad = lineaCarrito.cantidad + 1
    }else{
        const productoCarrito = productoComprado
        productoCarrito.cantidad = 1 //si no existe le añadimos una línea al carrito
        carritoProductos.push(productoCarrito)
    }
    
    numeroProductos++
    actualizarLocalStorage()
    actualizarCarrito()
}

//funcion para actualizar el carrito en pantalla
function actualizarCarrito(){
    itemsCarrito.innerHTML = carritoProductos.map((item) =>
        `
            <div class="cart-item">
                <button class="restarProducto" data-id="${item.id}">-</button>
                <p>${item.cantidad}</p>
                <button class="sumarProducto" data-id="${item.id}">+</button>
                <p>${item.nombre}</p>
                <p>${item.precio.toFixed(2)} €</p>
                <p>${(item.precio * item.cantidad).toFixed(2)} €</p>
            </div>
        `
    ).join("")

        //eventos para los botones de sumar producto
        const botonesSumar = document.querySelectorAll('.sumarProducto')
        botonesSumar.forEach(btn => {
            btn.addEventListener('click', sumarProducto)   
        })

        //eventos para los botones de restar producto
        const botonesRestar = document.querySelectorAll('.restarProducto')
        botonesRestar.forEach(btn => {
            btn.addEventListener('click', restarProducto)   
        })        


    //calcular el total y mostrar en pantalla
    //reduce devuelve la suma de todos los valores de la propiedad precio por la cantidad, con un valor inicial 0
    const total = carritoProductos.reduce((suma, item) => suma + (item.precio * item.cantidad), 0)
    totalCarrito.textContent = "Total: " + total.toFixed(2) + " €"

    //mostrar el número de artículos que hay en el carrito
    //si no hay productos no se muestra el 0
    if(numeroProductos === 0){
        contador.textContent = ''
    }else{
        contador.textContent = numeroProductos
    }
    
}

//funcion para sumar un producto del carrito
function sumarProducto(e){
    const productoId = parseFloat(e.target.getAttribute('data-id')) 
    //busco la línea del carrito correspondiente
    const lineaCarrito = carritoProductos.find(producto => producto.id === productoId)

    lineaCarrito.cantidad = lineaCarrito.cantidad + 1
    numeroProductos++
    actualizarLocalStorage()
    actualizarCarrito()
}

//funcion para restar un producto del carrito
function restarProducto(e){
    const productoId = parseFloat(e.target.getAttribute('data-id')) 
    //busco la línea del carrito correspondiente
    const lineaCarrito = carritoProductos.find(producto => producto.id === productoId)
    //si la cantidad = 1 eliminamos la línea
    if(lineaCarrito.cantidad === 1){
        //filter devuelve otro array con todos los elementos que cumplan una condición
        carritoProductos = carritoProductos.filter(producto => producto.id !== productoId)
    }else{
        lineaCarrito.cantidad = lineaCarrito.cantidad - 1
    }
    numeroProductos--
    actualizarLocalStorage()
    actualizarCarrito()
}

mostrarCarrito.addEventListener('click', () => {
    carrito.classList.toggle('open')
})

//llamada a la función para mostrar los productos en pantalla
mostrarProductos()