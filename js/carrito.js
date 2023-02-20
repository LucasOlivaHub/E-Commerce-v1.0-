let productosEnMiCarrito = localStorage.getItem("productos-en-carrito");
productosEnMiCarrito = JSON.parse(productosEnMiCarrito);
//Elementos DOM
const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const btnVaciarCarrito = document.querySelector("#btnVaciarCarrito");
const btnTotalCarrito = document.querySelector("#carritoTotal");
const btnComprarAhora = document.querySelector("#btnComprar");
const contenedorPopUpCarrComprado = document.querySelector("#popup-carrito-comprado");
const carritoTitulo = document.querySelector("#carrito-titulo");
//

//Funcion mostrar productos o carrito vacio
function cargarProductosCarrito() {
    if (productosEnMiCarrito && productosEnMiCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorProductos.innerHTML = "";

        productosEnMiCarrito.forEach(producto => {
        const article = document.createElement("article");
        article.classList.add("carrito-producto");
        article.innerHTML = `
            <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-nombre">
                <small>Nombre</small>
                <h3>${producto.titulo}</h3>
            </div>
    
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
    
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
    
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>  
    
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i>
            `;
            contenedorProductos.append(article); 
        });
    } else {
        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarTotal();
    actualizarBtnEliminarProd(); 
}

//Cargar productos cada vez que inicie la pagina
cargarProductosCarrito();
//


//Actualizar botones eliminar producto
function actualizarBtnEliminarProd() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}
//

//Eliminar producto del carrito
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id; 
    const index = productosEnMiCarrito.findIndex(producto => producto.id === idBoton);
    productosEnMiCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnMiCarrito));
}
//


//Boton vaciar carrito
btnVaciarCarrito.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
        productosEnMiCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnMiCarrito));
        cargarProductosCarrito();
}
//


//Actualizar total
function actualizarTotal() {
    let total = 0;
    productosEnMiCarrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });

    btnTotalCarrito.textContent = "$" + total;
}
//

//Comprar productos
btnComprarAhora.addEventListener("click", comprarAhora);
function comprarAhora() {
    productosEnMiCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnMiCarrito));
    carritoVacio.classList.add("disabled");
    contenedorProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    carritoTitulo.classList.add("disabled");

    contenedorCarritoComprado.classList.remove("disabled");
}
//
