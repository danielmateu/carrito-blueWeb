//Evento CLICK


const btnAumentar = document.querySelector('.btn-info');
const btnDisminuir = document.querySelector('.btn-danger');
const span = document.getElementById('span');
let contador = 0;



btnAumentar.addEventListener('click', ()=>{
    console.log('Augmentar!');
    contador++;
    span.textContent = contador;
});

btnDisminuir.addEventListener('click', ()=>{
    console.log('Disminuir!');
    contador--;
    span.textContent = contador;
});


