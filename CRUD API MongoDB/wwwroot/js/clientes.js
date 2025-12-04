const API_URL = 'https://paginas-web-cr.com/Api/apis/mongodb.php';

// Cargar las 3 Partial Views al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarPartialView('/Clientes/Listado', 'componenteListado');
    cargarPartialView('/Clientes/Insertar', 'componenteInsertar');
    cargarPartialView('/Clientes/ActualizarEliminar', 'componenteActualizarEliminar');
    
    obtenerClientes();
});

// Función para cargar Partial Views
function cargarPartialView(url, contenedorId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(contenedorId).innerHTML = html;
        });
}

// GET - Obtener clientes
function obtenerClientes(filtroNombre = '') {
    let url = `${API_URL}?coleccion=clientes`;
    if (filtroNombre) {
        url += `&nombre=${filtroNombre}`;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarClientes(data.documentos);
        });
}

// Mostrar clientes en la tabla
function mostrarClientes(clientes) {
    const tbody = document.getElementById('tablaClientes');
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        let idMostrado = cliente._id;
        if (typeof cliente._id === 'object' && cliente._id !== null) {
            if (cliente._id.$oid) {
                idMostrado = cliente._id.$oid;
            } else {
                idMostrado = cliente._id.toString(); 
            }
        }
        const fila = `
            <tr>
                <td>${cliente.nombre}</td>
                <td>${cliente.edad}</td>
                <td>${idMostrado}</td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

// POST - Insertar cliente
function insertarCliente() {
    const nombre = document.getElementById('nombreInsertar').value;
    const edad = document.getElementById('edadInsertar').value;
    
    const datos = {
        coleccion: "clientes",
        datos: {
            nombre: nombre,
            edad: parseInt(edad)
        }
    };
    
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(() => {
        obtenerClientes();
        document.getElementById('nombreInsertar').value = '';
        document.getElementById('edadInsertar').value = '';
    });
}

// PUT - Actualizar cliente
function actualizarCliente() {
    const filtroNombre = document.getElementById('filtroActualizar').value;
    const nuevaEdad = document.getElementById('nuevaEdad').value;
    const nuevaCiudad = document.getElementById('nuevaCiudad').value;
    
    const datos = {
        coleccion: "clientes",
        filtro: { nombre: filtroNombre },
        datos: {
            edad: parseInt(nuevaEdad),
            ciudad: nuevaCiudad
        }
    };
    
    fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(() => {
        obtenerClientes();
        document.getElementById('filtroActualizar').value = '';
        document.getElementById('nuevaEdad').value = '';
        document.getElementById('nuevaCiudad').value = '';
    });
}

// DELETE - Eliminar cliente por nombre
function eliminarClientePorNombre() {
    const nombre = document.getElementById('nombreEliminar').value;
    
    const datos = {
        coleccion: "clientes",
        filtro: { nombre: nombre }
    };
    
    fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(() => {
        obtenerClientes();
        document.getElementById('nombreEliminar').value = '';
    });
}

// DELETE - Eliminar cliente por ID
function eliminarClientePorId() {
    const id = document.getElementById('idEliminar').value;
    
    const datos = {
        coleccion: "clientes",
        filtro: { _id: id }
    };
    
    fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(() => {
        obtenerClientes();
        document.getElementById('idEliminar').value = '';
    });
}

// Filtrar clientes por nombre
function filtrarClientes() {
    const filtro = document.getElementById('filtroNombre').value;
    obtenerClientes(filtro);
}