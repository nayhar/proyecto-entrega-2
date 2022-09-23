class Producto {
    constructor(id, nombre, precio, foto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const productos = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();

function cargarProductos() {
    productos.push(new Producto(1, 'Fifa 2023',12000, './img2/fifa.webp'));
    productos.push(new Producto(2, 'Among Us', 5000, './img2/among.jpg'));
    productos.push(new Producto(3, 'NBA 2k 2023', 8999, './img2/nba.jpgeg'));
    productos.push(new Producto(4, 'Super Mario Maker', 6999, './img2/mario.jpg'));
    productos.push(new Producto(5, 'Mario Oddisey', 7999, './img2/mario2.jpg'));
    productos.push(new Producto(6, 'Luigis Mansion', 8000, './img2/luigis.jpg'));
    productos.push(new Producto(7, 'GTA V', 5000, './img2/gta.jpg'));
    productos.push(new Producto(8, 'Roket League', 1500, './img2/roket.jpg'));
    productos.push(new Producto(9,'Hogwarts Legacy', 10000, './img2/hog.jpg'))
    productos.push(new Producto(10,'Pubg', 2000, './img2/pubg.jpg'))

}

function cargarCarrito() {}

function dibujarCarrito() {
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td>$ ${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
                
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            //Agregar evento a input en carrito
            let inputCantidadProducto = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            inputCantidadProducto.addEventListener('change', (ev) => {
                let nuevaCantidad = ev.target.value;
                elemento.cantidad = nuevaCantidad;

                dibujarCarrito();
            });


            // evento a eliminar producto
            let botonEliminarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);
            botonEliminarProducto.addEventListener('click', () => {
                //alert("Hicimos click" + elementosCarrito.indexOf(elemento));

                let indiceEliminar =  elementosCarrito.indexOf(elemento);
                elementosCarrito.splice(indiceEliminar,1);
                
                dibujarCarrito();
            });


        }
    );

    const valorInicial = 0;
    const totalCompora = elementosCarrito.reduce(
        (previousValue, currentValue) => previousValue + currentValue.producto.precio*currentValue.cantidad,
        valorInicial
    );

    if(elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>`;
    } else {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Total de la compra: ${totalCompora}</th>`;
    }

}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}

function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio} </p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

   

    // eventos
    botonAgregar.onclick = () => {
        //a Hiciste click en el botón 

        let elementoExistente = 
            elementosCarrito.find((elem) => elem.producto.id == producto.id);
        
        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        swal({
            title: 'Producto agregado!',
            text: `${producto.nombre} agregado al carrito`,
            icon: 'success',
            buttons: {
                cerrar: {
                    text: "cerrar",
                    value: false
                },
                carrito: {
                    text: "ir a carrito",
                    value: true
                }
            }
        }).then((decision) => {
            if(decision) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);
            } else {
                swal("No ir al carrito");
            }
        });


    }
   

    return carta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}









