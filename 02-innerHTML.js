/*
Añadir li de forma dinámica:

<li class="list">
    <b>Nombre:</b><span class="text-danger">descripcion...</span>
</li>
*/

const lista = document.querySelector('#lista');

const arrayLista =['item 1','item 2','item 3','item 4','item 5'];

/*
const fragment = document.createDocumentFragment(); //Para evitar el reflow, usaremos la const fragment
arrayLista.forEach(item =>{
    const li = document.createElement('li');
    li.classList.add('list');
    const b = document.createElement('b');
    b.textContent = 'Nombre: '; 
    const span = document.createElement('span');
    span.classList.add('text-danger');
    span.textContent = item;
    li.appendChild(b);
    li.appendChild(span);
    fragment.appendChild(li);
})

lista.appendChild(fragment);

*/

//Para no generar tanto código, podemos hacer uso del innerHTML, el problema que no podremos usar el fragment para eliminar el reflow.

let fragment = ''; //Como innerHtml no permite los fragment, creamos una variable fragment vacia, y al let, le incorporamos por cada vuelta el template html.
arrayLista.forEach(item =>{
    fragment +=`
    <li class="list">
    <b>Nombre: </b><span class="text-danger">${item}</span>
</li>
    `
})
lista.innerHTML = fragment;

