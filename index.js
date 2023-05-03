const  formCreate = document.querySelector('#form-create');
const createInput = document.querySelector('#create-input');
const  formLogin= document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');


formLogin.addEventListener('submit', async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users', {method: 'GET'}); 
    const users = await response.json( );
    const user = users.find(user => user.username === loginInput.value);
    // se deja lo del usuario para saber si existe o no para poder darle acceso 
    // los if serian para ver si el usuario existe o si no existe 
    if (!user) {

        alert('El usuario no se encuentra registrado');
            return;
    }else {
        // luego tiene que enviarlo a la pagina todos y como este archivo esta en otra carpeta se accede de esta manera los .. / es para salir del directorio luego selecciona la carpeta todos y luego selacciona el archivo
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../contacto/contacs.html';
        // uno lleva el usuario a la otra pagina con el local storage y que se guarde como un objet, para eso uno tiene que convertirlo a json y despues en la otra pagina de json a js y se coloca arriba del windows

    }

});

// 1era parte
// primero se seleccionan los id del html de input y form
//  debemos de crear un evento al form 
// luego en la carpeta db json como esta conectada al live server debemos de modificarlo para que no este reiniciando la carpeta a cada rato
// para ello vamos a configuracion y le damos click al icono superior derecho con forma de documento y copiamos lo siguiente 
formCreate.addEventListener('submit', async e => {
    e.preventDefault();
// saber cuales son las reglas que va a llevar la pagina, en este caso que no se cree vacio el usuario y que no se vuelva a crear el mismo usuario
// verificar el valor del input 
// y la manera de verificar todo es con if en este ejercicio

// se convierte el evento en async para poder usar el await 
// y asi nos va a dar los usuarios
const response = await fetch('http://localhost:3000/users', {method: 'GET'}); 
const users = await response.json( );
// y luego para encontrar el usuario se busca con find y se hace un argumento si es igual va a devolver un usuario sino no va a devolver nada 
const user = users.find(user => user.username === createInput.value);

// si esta vacio
    if (createInput.value === '') {

        alert('El usuario no debe estar vacio');
            return;
    } else if (user) {

        alert('El usuario ya se encuentra registrado');
            return;
    } else {
        // este es para crear el usuario y esto tambien se puede hacer la misma linea 
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            // cuando se hace metodos post mas que todo con fetch hay algunos que lo hacen automatico, pero hay que especificar que tipo de datos se van a enviar y como se van a enviar y eso se hace con el headers
            headers : {
                // si la base de datos es json se debe de enviar en json
                'Content-Type' : 'application/json'
            },
            // el body es donde uno envia ese contenido se usa stringify que es para enviar y conertirlo a json y parse es para recibir json y convertirlo en js y luego se hace un objeto
            body : JSON.stringify({username: createInput.value})
        });  
        alert(`El usuario ${createInput.value} ha sido creado`);
            return;
        createInput.value = '';
    }

});