//Variables

const cards = document.getElementById('cards'); //Accedemeos al Id en cuestion
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content; //Accedemeos al template. .content para acceder a los elementos
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};



//Accedemos al JSON

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  if(localStorage.getItem('carrito')){
      carrito = JSON.parse(localStorage.getItem('carrito'))
      pintarCarrito();
  }
})

//Vamos a detectar el botón! con eventDelegation
cards.addEventListener('click', e =>{
    addCarrito(e) //e -> Capturamos el elemento que queremos modificar
})

items.addEventListener('click', e =>{
    btnAccion(e);
})

const fetchData = async () => {
  try {
    const res = await fetch('api.json');
    const data = await res.json();
    //console.log(data);
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

//Pintamos la informacion
function pintarCards(data) {
    //console.log(data);
    data.forEach(producto => {
        //console.log(producto);
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('p').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl);
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);

    });
    cards.appendChild(fragment);
}

//Agregar al Carrito

const addCarrito = e =>{
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn-dark'));
    if(e.target.classList.contains('btn-dark')){
        //console.log(e.target.parentElement);
        setCarrito(e.target.parentElement);

    }
    e.stopPropagation(); //Detener otro evento que se pueda generar en items
}


//FUCKING IMPORTANT!!!
const setCarrito = objeto =>{ //funcion que manipula nuestro objeto carro
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title:objeto.querySelector('h5').textContent,
        precio:objeto.querySelector('p').textContent,
        cantidad:1
    }
    
    if(carrito.hasOwnProperty(producto.id)){ //Augmenta la cantidad + 1 Si el producto existe, augmentamos cantidad
       producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = {...producto} //spread operator - adquirimos la info y hacemos una copia
    pintarCarrito();
    //console.log(carrito);
}

//Pintamos carrito en DOM

const pintarCarrito = () =>{
    //console.log(carrito);
    items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);

    pintarFooter();

    localStorage.setItem('carrito',JSON.stringify(carrito));
}

const pintarFooter = () =>{
    footer.innerHTML = '';
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `

        return;
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc + cantidad,0);
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio})=> acc+cantidad*precio,0);
    //console.log(nCantidad);
    //console.log(nPrecio);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;
    
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);

    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () =>{
        carrito = {};
        pintarCarrito();
    })
}

const btnAccion = e =>{
    //console.log(e.target);
    //accion de augmentar
    if(e.target.classList.contains('btn-info')){
        console.log(Object);
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito();
    }
    //accion disminuir
    if(e.target.classList.contains('btn-danger')){
        console.log(Object);
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--;
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito();
        if(producto.cantidad===0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito();
    }
    e.stopPropagation();

    
}

