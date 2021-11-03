/*
El DOM conecta las páginas web a scripts o lenguajes de programación.
Incluye elementos como <body> y <table>), entre muchos otros, y proporciona funcionalidad que es global al documento, como obtener la URL de la página y crear nuevos elementos en el documento.


document.getElementById - Devuelve una referencia al elemento por su ID.
SINTAXIS:
elemento = document.getElementById(id);
Si no existe un elemento con la id solicitada, esta función devuelve null.

Document.querySelector() - Devuelve el primer elemento del documento (utilizando un recorrido primero en profundidad pre ordenado de los nodos del documento) que coincida con el grupo especificado de selectores.

SINTAXIS:
elemento = document.querySelector(selectores);

EJEMPLO:
var el = document.querySelector(".miClase");

Document.querySelectorAll() - El método querySelectorAll() de un Element devuelve una NodeList estática (no viva) que representa una lista de elementos del documento que coinciden con el grupo de selectores indicados.

SINTAXIS:
elementList = parentNode.querySelectorAll(selectors);

*/

const lista = document.getElementById("lista");
console.log("🚀 ~ file: app.js ~ line 28 ~ lista", lista);

const elementos = [
  "primer elemento",
  "segundo elemento",
  "tercer elemento",
  "cuarto elemento",
  "quinto elemento",
];

/*
elementos.forEach((item) => {
  console.log(item);
  const li = document.createElement("li");
  li.textContent = item;

  lista.appendChild(li);
});
*/

/*
elementos.forEach(item =>{
    lista.innerHTML += `<li>${item}</li>`
})
*/

//Ambos metodos pueden dar problemas con el reflow(Recarga de la web al añadir cambios), por eso, haremos uso de FRAGMENT

//FRAGMENT - Version ligera del documento que almacena un segmento de una estructura de docuemtno compuesta de nodos como un documento estándar. En un Fragment, vamos a guardar todo un template que luego pintaremos en nuestro DOM, evitando el ReFlow.

const fragment = document.createDocumentFragment();
//const fragment = new DocumentFragment();
elementos.forEach(item =>{
    const li = document.createElement('li')
    li.textContent = item
    fragment.appendChild(li);
    
});

lista.appendChild(fragment);




