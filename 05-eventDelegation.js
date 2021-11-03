//Event DELEGATION - delegamos los eventos desde el mísmo container
const container = document.querySelector('.container');
const span = document.getElementById('span');
let contador = 0;

container.addEventListener('click', (e) =>{
    //console.log(e.target);
    console.log(e.target.classList.contains('btn-info'));
    if(e.target.classList.contains('btn-info')){
        contador++;
        span.textContent = contador;
       
    }

    if(e.target.classList.contains('btn-danger')){
        contador--;
        span.textContent = contador;
      
    }

})

//stopPropagation
const btn = document.querySelector('.btn-dark');
const bgSuccess = document.querySelector('.bg-success');

btn.addEventListener('click', (e) =>{
    console.log('click botón');
    e.stopPropagation();
})

bgSuccess.addEventListener('click',() =>{
    console.log('click bgSuccess');
})

