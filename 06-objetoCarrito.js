

const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templatedCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = 0;

//Accedemos a api.json con el fetch, y los capturamos

document.addEventListener('DOMContentLoaded',()=>{
    fetchData();
});
cards.addEventListener('click', e=>{
    addCarrito(e); //Capturamos el elemento que queramos modificar
})


const fetchData = async()=>{
    try{
        const res = await fetch('api.json');
        const data=await res.json()
        //console.log(data);
        pintarCards(data);
    }catch(error){
        //console.log(error);
    }
}

//Cuando hacemos un recorrido de elementos, usaremos el fragment para evitar el reflow.

//PINTAR CARDS

const pintarCards = data =>{
    //Aquí crearemos toda la logica

    //Pintamos los productos
    data.forEach(producto =>{
       // console.log(producto);
            templatedCard.querySelector('h5').textContent = producto.title;
            templatedCard.querySelector('p').textContent = producto.precio;
            templatedCard.querySelector('img').setAttribute('src', producto.thumbnailUrl);
            templatedCard.querySelector('.btn-dark').dataset.id=producto.id;

            const clone = templatedCard.cloneNode(true);
            fragment.appendChild(clone);
    })
    cards.appendChild(fragment);

}

const addCarrito = e =>{
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn-dark')); //Si el elemento que clicamos, tiene la clase que le indicamos pinta VERDADERO o FALSO
    if(e.target.classList.contains('btn-dark')){
       //console.log(e.target.parentElement);  //accedemos a todo el elemento en conjunto
        setCarrito(e.target.parentElement); 
    }
   e.stopPropagation(); //Nos sirve para detener cualquier otro evento que se pueda generar en cards.
}


//NO FUNCIONA
const setCarrito = objeto =>{
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = {...producto}
    pintarCarrito();
    //console.log(carrito);
   
}

const pintarCarrito = () =>{
  // console.log(carrito);
  items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.cantidad;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
}



/*
const setCarrito = objeto =>{ //Capturamos los elementos
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    
    //Accedemos a los objetos para augmentar la cantidad en caso de clickar de nuevo
    //NO FUNCIONA! 
    if(carrito.hasOwnProperty(producto.id)){ //El método hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada.
        producto.cantidad = carrito[producto.id].cantidad + 1;

        
    }

    carrito[producto.id] = {...producto} //spread operator, solo adquirimos la información y hacemos una copia de producto
    pintarCarrito();
    //console.log(producto);
    //console.log(carrito);
   
}

const pintarCarrito = () =>{
    //console.log(carrito); 
    items.innerHTML = '';
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id=producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id=producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
       
    })
    items.appendChild(fragment);
}

*/