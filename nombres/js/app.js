
document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Llamado a Ajax e imprimir resultados
function cargarNombres(e) {
    e.preventDefault();

    // Leer las variables

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://randomuser.me/api/?';

    // Si hay origen agregarlo a la url
    if(origenSeleccionado !== ''){
        url += `nat=${origenSeleccionado}&`;
    }

    // Si hay genero agregarlo a la url
    if(generoSeleccionado !== ''){
        url += `gender=${generoSeleccionado}&`;
    }

    // Si hay cantidad agregarlo a la url
    if(cantidad !== ''){
        url += `results=${cantidad}&`;
    }

    // Conectar con ajax
    // Iniciar XMLHTTP request
    const xhr = new XMLHttpRequest();
    // Abrimos la conexion
    xhr.open('GET',url,true);
    // Datos e impresion del template 
    xhr.onload = function(){
        if(this.status === 200){
            const usuarios = JSON.parse(this.responseText)?.results;
            const nombres = usuarios.map(user=>user.name.first);
            console.log(nombres);
            

            // Generar html
            let htmlNombres = '<h2>Nombres Generados</h2>';

            htmlNombres += '<ul class="lista">';
            // Imprimir cada nombre
            
            nombres.forEach(function(nombre) {
                htmlNombres += `
                    <li>${nombre}</li>
                `;
            });
            htmlNombres += '</ul>';

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    // Enviar el request
    xhr.send();


}