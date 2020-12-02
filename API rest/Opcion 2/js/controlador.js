var usuarios= [];
var usuarioSeleccionado;
const url ='usuarios.php';
function obtenerUsuarios(){
    axios({
        method:'GET',
        url:url,
        responseType:'json'
    }).then(res=>{
        console.log(res);
        this.usuarios =res.data;
        llenarTabla();
        
    }).catch(error=>{
        console.error(error);
    });
}

obtenerUsuarios();

function llenarTabla(){
    document.querySelector('#tabla-usuarios tbody').innerHTML = '';
    for (let i=0;i<usuarios.length;i++){
        document.querySelector('#tabla-usuarios tbody').innerHTML +=
            `<tr>
                <td>${usuarios[i].nombre}</td>
                <td>${usuarios[i].apellido}</td>
                <td>${usuarios[i].fechaNacimiento}</td>
                <td>${usuarios[i].pais}</td>
                <td><button type="button" onclick="eliminar(${i})">X</button></td>
                <td><button type="button" onclick="seleccionar(${i})">Editar</button></td>
            </tr>`;
    }

}

function eliminar(indice){
    console.log('Eliminar elemento con el indice ' + indice)
    axios({
        method:'DELETE',
        url:url + `?id=${indice}`,
        responseType:'json'
    }).then(res=>{
        console.log(res.data);
        obtenerUsuarios();   
    }).catch(error=>{
        console.error(error);
    });
}

function guardar(){
    let usuario={
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value

    };
    console.log('Usuario a guardar', usuario);
    axios({
        method:'POST',
        url:url,
        responseType:'json',
        data:usuario
    }).then(res=>{
        console.log(res);
        limpiar();
        obtenerUsuarios();    
    }).catch(error=>{
        console.error(error);
    });

}

function limpiar(){
    document.getElementById('nombre').value=null;
    document.getElementById('apellido').value=null;
    document.getElementById('fechaNacimiento').value=null;
    document.getElementById('pais').value=null;
    document.getElementById('btn-guardar').style.display = 'inline';
    document.getElementById('btn-actualizar').style.display = 'none';

}

function actualizar(){
    let usuario={
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        pais: document.getElementById('pais').value

    };
    console.log('Usuario a actualizar', usuario);
    axios({
        method:'PUT',
        url:url + `?id=${usuarioSeleccionado}`,
        responseType:'json',
        data:usuario
    }).then(res=>{
        console.log(res);
        limpiar();
        obtenerUsuarios();    
    }).catch(error=>{
        console.error(error);
    });

}


function seleccionar(indice){
    usuarioSeleccionado = indice;
    console.log('Se selecciono el elemento ' + indice);
    axios({
        method:'GET',
        url:url + `?id=${indice}`,
        responseType:'json'
    }).then(res=>{
        console.log(res); 
        document.getElementById('nombre').value=res.data.nombre;
        document.getElementById('apellido').value=res.data.apellido;
        document.getElementById('fechaNacimiento').value=res.data.fechaNacimiento;
        document.getElementById('pais').value=res.data.pais; 
        document.getElementById('btn-guardar').style.display = 'none';
        document.getElementById('btn-actualizar').style.display = 'inline';
    }).catch(error=>{
        console.error(error);
    });

}