const lista = document.querySelector('#lista');

const arrayLista =['item 1','item 2','item 3','item 4','item 5'];

const template = document.querySelector('#template-li').content;
const fragment = document.createDocumentFragment();

arrayLista.forEach(item =>{
    template.querySelector('.list span').textContent = item;
    //template.querySelector('.text-danger').textContent = item;
    //template.querySelector('span').textContent = item; Tenemos estas tres formas para acceder al item 
    const clone = template.cloneNode(true);
    fragment.append(clone);
})

lista.appendChild(fragment);