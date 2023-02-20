const productos = [
    {
        id: "Abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./imgs/abrigo.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
    },
    precio: 1000
    },

    {
        id: "Abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./imgs/abrigo.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
    },
    precio: 1000
    },

    {
        id: "Abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./imgs/abrigo.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos",
    },
    precio: 1000
    },

    {
        id: "Abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./imgs/abrigo.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
    },
    precio: 1000
    },

    {
        id: "Abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./imgs/abrigo.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
    },
    precio: 1000
    },

    {
        id: "Abrigo-06",
        titulo: "Abrigo 06",
        imagen: "./imgs/abrigo.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
    },
    precio: 1000
    },

    {
        id: "Pantalon-01",
        titulo: "Pantalon 01",
        imagen: "./imgs/pantalon.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
    },
    precio: 1000
    },

    
    {
        id: "Pantalon-02",
        titulo: "Pantalon 02",
        imagen: "./imgs/pantalon.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
    },
    precio: 1000
    },

    
    {
        id: "Pantalon-03",
        titulo: "Pantalon 03",
        imagen: "./imgs/pantalon.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
    },
    precio: 1000
    },

    
    {
        id: "Camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./imgs/camiseta.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
    },
    precio: 1000
    },

    
    {
        id: "Camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./imgs/camiseta.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
    },
    precio: 1000
    },

    
    {
        id: "Camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./imgs/camiseta.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
    },
    precio: 1000
    },

];


// Elementos DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const tituloProductos = document.querySelector("#titulo-productos");
let btnAgregarProductos = document.querySelectorAll(".producto-agregar");
let numeroCarrito = document.querySelector("#numeroCarrito");
//


// ----  Funciones -----

//Cargar los productos elegidos: <---
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const article = document.createElement("article");
        article.classList.add("producto");
        article.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="producto">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${producto.precio}</p>
                     <button class="producto-agregar" id="${producto.id}">Agregar a mi carrito</button>
                </div>
            </img>
        `

        contenedorProductos.append(article);
    })

    actualizarBtnAgregar();
    console.log(btnAgregarProductos);
}
// --->


cargarProductos(productos); //cargar pagina con todos los productos

//Filtro por categorias: <---
botonesCategorias.forEach(botonCategoria => {
    botonCategoria.addEventListener("click", (e) =>{
        botonesCategorias.forEach(botonCat => botonCat.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "ulTodosProductos") {

        //cambiar titulo
        const tituloCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloProductos.innerText = tituloCategoria.categoria.nombre;
        //


        //filtro productos 
        const productosFilter = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosFilter);
        } else {
            tituloProductos.innerText = "Todos los productos"
            cargarProductos(productos);
        }
        //
    })
})
// --->



//Agregar productos al carrito <---
function actualizarBtnAgregar() {
    btnAgregarProductos = document.querySelectorAll(".producto-agregar");

    //Evento click agregar producto
    btnAgregarProductos.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

//Reiniciar o Establecer productos carrito en LocalStorage
let productosCarrito;
const productosEnMiCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnMiCarritoLS) {
    productosCarrito = JSON.parse(productosEnMiCarritoLS);
    actualizarNumCarrito(productosCarrito);
} else {
    productosCarrito = [];
}


//let productosCarrito = [];



function agregarAlCarrito (e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)) {
        const indexCarrito = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[indexCarrito].cantidad++;
    } else {
        productoAgregado.cantidad = 1; //agregar propiedad cantidad al producto agregado
        productosCarrito.push(productoAgregado);
    }

    actualizarNumCarrito(productosCarrito)
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumCarrito(productosCarrito) {
    let nuevoNumerito = productosCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumerito; 
}

// --->



