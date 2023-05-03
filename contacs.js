// seleccionar las variables con queryselector
const nameInput = document.querySelector('#name-input')
const numberInput = document.querySelector('#number-input');
const list = document.querySelector('#container-list');
const submit = document.querySelector('#btn-agg');
const deleteButton= document.querySelector('.delete-button');
const checkButton= document.querySelector('.check-button');
const form = document.querySelector('#formulario');
// // para el boton de cerrar sesion
const closeBtn = document.querySelector('#btn-close');
// para obtener el usuario para ver la lista
const user = JSON.parse(localStorage.getItem('user'));

// Regex validacion 
// numero de tlfn
const NUMBER_REGEX = /^(\+58)?(0)?(4)(12|14|16|24|26)\d{7,10}$/;
const NAME_REGEX = /^[a-zA-Z]{3,10}$/

// funcion de colores en el input y el helper text
const validation = (validation, input) => {
    if (validation) {
        input.classList.remove('wrong');
        input.classList.add('correct');
        input.parentElement.children[2].classList.remove('display-text');
    }else{
        input.classList.add('wrong');
        input.classList.remove('correct');
        input.parentElement.children[2].classList.add('display-text');
    } 
};

// evento del nombre
nameInput.addEventListener ('input', e =>{
    const nameValidation = NAME_REGEX.test(e.target.value);
    validation(nameValidation, nameInput);
});

// evento del numero de tlfn 
numberInput.addEventListener('input', e => {
    const numberValidation = NUMBER_REGEX.test(e.target.value);
    validation(numberValidation, numberInput);
});

form.addEventListener('submit', async e  => {
    e.preventDefault();
   
if (NUMBER_REGEX.test(numberInput.value)&&NAME_REGEX.test(nameInput.value)) {
    const responseJSON = await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({text : nameInput.value, number: numberInput.value, user : user.username}),
    });

    const response = await responseJSON.json( );
    console.log(response);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div class='add' id='${response.id}'>
    <button class='delete-button'>
    <svg class='delete-btn-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path class='delete-btn-icon' stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    </button>
    <input class='name-add' type='text' value=${response.text} readonly >
    <input class='number-add' type='text' value=${response.number} readonly>
    <button class='check-button'>
    <svg class='check-btn-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path class='check-btn-icon' stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    </button>
    </div>
    `;
    list.append(listItem);
    nameInput.value = '';
    numberInput.value ='';
    }
});

// para que cargue la informacion de la base de datos se hace una funcion asincrona para que cargue apenas cargue la pagina 
const getContacts = async ( ) => {
    const response = await fetch('http://localhost:3000/contacts', {method: 'GET'});
    // se usa el metodo get
    const contacts = await response.json( );
    // para que cargue solo los todos del usuario se utiliza el metodo filter porque estan en un array 
    const userContacts = contacts.filter(contacto => contacto.user === user.username);
    // si quiero que todos los todos del usuario se guarden en una lista se agregan listitems y se hace un for each porque eso tambien es un array y como cada todo tiene text se pondria eso en la lista
    userContacts.forEach(contacto => {
        const listItem = document.createElement('li');
        listItem.innerHTML =`
        <div class='add' id=${contacto.id}>
        <button class='delete-button'>
        <svg class='delete-btn-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path class='delete-btn-icon' stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </button>
        <input class='name-add' type='text' value=${contacto.text} readonly >
        <input class='number-add' type='text' value=${contacto.number} readonly>
        <button class='check-button'>
        <svg class='check-btn-icon' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path class='check-btn-icon' stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        </button>
        </div>
        `;
     
        list.append(listItem);
    });


};
getContacts( );

// eventos para los botones de borrar y editar
list.addEventListener('click', async e => {
    e.preventDefault( );

if (e.target.classList.contains('delete-button')) {
    // Verificar que el usuario haya iniciado sesión antes de permitir la eliminación
    if (!localStorage.getItem('user')) {
        alert('Debes iniciar sesión para eliminar contactos');
        return;
    }
    const id = e.target.parentElement.id
    await fetch(`http://localhost:3000/contacts/${id}`, {method: 'DELETE',});
    e.target.parentElement.parentElement.remove( );
    };

if (e.target.classList.contains('check-button')) {
        // Verificar que el usuario haya iniciado sesión antes de permitir la edición
        if (!localStorage.getItem('user')) {
            alert('Debes iniciar sesión para editar contactos');
            return;
        }
    
        const id = e.target.parentElement.id;
        const nameInput = e.target.parentElement.children[1];
        const numberInput = e.target.parentElement.children[2];
    
        // Verificar que el valor del input de número de teléfono cumpla con el regex
        if (!NUMBER_REGEX.test(numberInput.value)) {
            alert('Número de teléfono inválido');
            return;
        }
    
        // Verificar que el valor del input de nombre cumpla con el regex
        if (!NAME_REGEX.test(nameInput.value)) {
            alert('Nombre inválido');
            return;
        }
        
        const responseJSON = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: 'PATCH',
            headers : {
            'Content-Type' : 'application/json'
            },
            body : JSON.stringify({text : nameInput.value, number: numberInput.value}),
        });
    
        if (nameInput.hasAttribute('readonly')) {
            nameInput.removeAttribute('readonly');
            numberInput.removeAttribute('readonly');
        } else {
            nameInput.setAttribute('value', nameInput.value);
            numberInput.setAttribute('value', numberInput.value);
            nameInput.setAttribute('readonly', true);
            numberInput.setAttribute('readonly', true);
        }
    }

});

// para el boton de cerrar sesion 
closeBtn.addEventListener('click', async e => {
    // primero se debe de quitar del local storage 
    localStorage.removeItem('user');
    // ahora se debe de llevar a la pagina anterior se debe de salir de esa carpeta y llevarlo a usuarios
    window.location.href = '../usuarios/index.html';
    // se puede acceder por el link de google pero da error para ello se debe verificar el usuario y luego hacer una funcion que se llame a si sola que va correr apenas cargue la pagina o se hace un if de las dos formas funcionan
});