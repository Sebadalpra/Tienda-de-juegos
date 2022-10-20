const productos = [
	{
		id: 1,
		nombre: "ZELDA",
		precio: 6000,
		img: "img/zelda.jpg",
	},
	{
		id: 2,
		nombre: "GT7",
		precio: 5000,
		img: "img/gt.jpg",
	},
	{
		id: 3,
		nombre: "Spider-Man",
		precio: 4000,
		img: "img/spiderman.jpg",
	},
	{
		id: 4,
		nombre: "Assasins Creed",
		precio: 4500,
		img: "img/asscreed.jpg",
	},
	{
		id: 5,
		nombre: "FIFA22",
		precio: 6400,
		img: "img/fifa.jpeg",
	},
	{
		id: 6,
		nombre: "GTAV",
		precio: 7000,
		img: "img/gta.jpg",
	},
];

let carrito = [];

//localStorage Y JSON
document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("carrito")) {
		carrito = JSON.parse(localStorage.getItem("carrito"));
		renderCarrito(carrito);
		calcularTotal();
	}
});

//renderizar los productos

const stock = document.getElementById("stock");

let listaProductos = "";
productos.forEach((producto) => {
	listaProductos += `
    <section class="tarjetas__juegos">
            <div  class="tarjetas__div">
                <b>${producto.nombre}</b><br>
                <img class="tarjetas__img" src="${producto.img}">
                <p>Unitario: $ ${producto.precio}</p>
                <button class="btn btn-primary" id="${producto.id}" onclick="comprar(${producto.id})">Comprar</button>              
            </div>
    </section>
        `;
});

stock.innerHTML = listaProductos;

//enviar al carrito

function comprar(id) {
	let productoElegido = productos.find((el) => el.id == id);
	console.log(productoElegido);

	if (carrito.some((el) => el.id == id)) {
		let indice = carrito.findIndex((el) => el.id == id);

		carrito[indice].cantidad += 1;

		carrito[indice].precioTotal = carrito[indice].cantidad * carrito[indice].precio;
	} else {
		const nuevoObjetoACarrito = {
			id: productoElegido.id,
			nombre: productoElegido.nombre,
			precio: productoElegido.precio,
			cantidad: 1,
			precioTotal: parseInt(productoElegido.precio),
		};

		carrito.push(nuevoObjetoACarrito);
	}
	renderCarrito(carrito);
	//calcular total
	calcularTotal();
}

//renderizar carrito

function renderCarrito(cart) {
	const carro = document.getElementById("carro");

	let listaProductosCarrito = "";
	cart.forEach((producto) => {
		listaProductosCarrito += `
        <section class="container">
            <div  class="cards">
                <b class="cards__hijo">${producto.nombre}</b><br>
                <p class="cards__hijo">Unitario: $ ${producto.precio}</p>
                <div class="counter">
                <button onclick="restar(${producto.id})">➖</button>
                <p class="numero">${producto.cantidad}</p><br>
                <button onclick="sumar(${producto.id})">➕</button>
                </div>
                <p class="cards__hijo">Total ${producto.precioTotal}</p>
                <button id="btn${producto.id}" onclick="eliminar(${producto.id})">❌</button>              
            </div>
        </section>
        `;
	});

	carro.innerHTML = listaProductosCarrito;
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

//botones del carrito X

function eliminar(id) {
	console.log(id);

	let nuevoCarrito = carrito.filter((el) => el.id !== id);
	console.log(nuevoCarrito);

	carrito = [...nuevoCarrito];

	carro.innerHTML = "<p>Carrito Vacío</p>";

	renderCarrito(nuevoCarrito);
	console.log(carrito);

	calcularTotal();
}

//botones del carrito + y -

function sumar(id) {
	carrito[carrito.findIndex((el) => el.id == id)].cantidad += 1;
	//sumo precioTotal
	carrito[carrito.findIndex((el) => el.id == id)].precioTotal =
		carrito[carrito.findIndex((el) => el.id == id)].cantidad *
		carrito[carrito.findIndex((el) => el.id == id)].precio;

	renderCarrito(carrito);
	calcularTotal();
}

function restar(id) {
	if (carrito[carrito.findIndex((el) => el.id == id)].cantidad > 0) {
		carrito[carrito.findIndex((el) => el.id == id)].cantidad -= 1;

		carrito[carrito.findIndex((el) => el.id == id)].precioTotal =
			carrito[carrito.findIndex((el) => el.id == id)].cantidad *
			carrito[carrito.findIndex((el) => el.id == id)].precio;

		renderCarrito(carrito);
		calcularTotal();
	}
}

//botones de vaciar carrito y pagar

function vaciar() {
	console.log("vaciar");

	Swal.fire({
		title: "¿Esta seguro que desea vaciar su carrito?",
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: "Si",
		denyButtonText: "No",
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire("Carrito vacio", "", "success");

			carrito = [];
			renderCarrito(carrito);
			calcularTotal();
		} else if (result.isDenied) {
			Swal.fire("Continue con sus productos :)", "", "info");
		}
	});
}

function pagar() {
	console.log("pagar");
	carrito = [];
	renderCarrito(carrito);
	Swal.fire({
		title: "¡Muchas gracias por su compra!",
	});
	calcularTotal();
}

//cálculo total
function calcularTotal() {
	const totalCarrito = carrito
		.map((item) => item.precioTotal)
		.reduce((prev, curr) => prev + curr, 0);
	console.log(totalCarrito);
	let total = document.getElementById("total");
	total.innerText = `Total a pagar: $ ${totalCarrito}`;
}
calcularTotal();
