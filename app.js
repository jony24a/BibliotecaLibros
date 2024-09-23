class Libro {
    constructor(titulo, autor, isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this.disponible = true;
    }

    prestar() {
        this.disponible = false;
    }

    devolver() {
        this.disponible = true;
    }

    obtenerInfo() {
        return `${this.titulo} por ${this.autor} - ISBN: ${this.isbn} - ${this.disponible ? 'Disponible' : 'Prestado'}`;
    }
}

class Usuario {
    constructor(nombre, id) {
        this.nombre = nombre;
        this.id = id;
        this.librosPrestados = [];
    }

    prestarLibro(libro) {
        if (libro.disponible) {
            libro.prestar();
            this.librosPrestados.push(libro);
        } else {
            alert(`El libro "${libro.titulo}" no está disponible.`);
        }
    }

    devolverLibro(libro) {
        libro.devolver();
        this.librosPrestados = this.librosPrestados.filter(l => l.isbn !== libro.isbn);
    }
}

class Biblioteca {
    constructor() {
        this.libros = [];
        this.usuarios = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    registrarUsuario(usuario) {
        this.usuarios.push(usuario);
    }

    buscarLibro(isbn) {
        return this.libros.find(libro => libro.isbn === isbn);
    }

    buscarUsuario(id) {
        return this.usuarios.find(usuario => usuario.id == id);
    }

    eliminarUsuario(id) {
        this.usuarios = this.usuarios.filter(usuario => usuario.id != id);
    }

    editarUsuario(id, nuevoNombre) {
        const usuario = this.buscarUsuario(id);
        if (usuario) {
            usuario.nombre = nuevoNombre;
        }
    }
}

// Inicialización de la biblioteca
const biblioteca = new Biblioteca();
let idUsuario = 1;


function actualizarListaLibros() {
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';
    biblioteca.libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = libro.obtenerInfo();
        listaLibros.appendChild(li);
    });
}

function actualizarListaUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';
    biblioteca.usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.innerHTML = `Usuario: ${usuario.nombre} - ID: ${usuario.id} 
            <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>`;
        listaUsuarios.appendChild(li);
    });
}


document.getElementById('agregarLibroBtn').addEventListener('click', () => {
    const titulo = document.getElementById('tituloLibro').value;
    const autor = document.getElementById('autorLibro').value;
    const isbn = document.getElementById('isbnLibro').value;

    if (titulo && autor && isbn) {
        const libro = new Libro(titulo, autor, isbn);
        biblioteca.agregarLibro(libro);
        actualizarListaLibros();
        document.getElementById('tituloLibro').value = '';
        document.getElementById('autorLibro').value = '';
        document.getElementById('isbnLibro').value = '';
    } else {
        alert('Por favor, complete todos los campos para agregar un libro.');
    }
});


document.getElementById('registrarUsuarioBtn').addEventListener('click', () => {
    const nombre = document.getElementById('nombreUsuario').value;

    if (nombre) {
        const usuario = new Usuario(nombre, idUsuario++);
        biblioteca.registrarUsuario(usuario);
        actualizarListaUsuarios();
        document.getElementById('nombreUsuario').value = '';
    } else {
        alert('Por favor, ingrese el nombre del usuario.');
    }
});

document.getElementById('prestarLibroBtn').addEventListener('click', () => {
    const idUsuario = document.getElementById('usuarioPrestar').value;
    const isbn = document.getElementById('isbnPrestar').value;

    const usuario = biblioteca.buscarUsuario(idUsuario);
    const libro = biblioteca.buscarLibro(isbn);

    if (usuario && libro) {
        usuario.prestarLibro(libro);
        actualizarListaLibros();
    } else {
        alert('Usuario o libro no encontrados.');
    }
});


document.getElementById('devolverLibroBtn').addEventListener('click', () => {
    const idUsuario = document.getElementById('usuarioDevolver').value;
    const isbn = document.getElementById('isbnDevolver').value;

    const usuario = biblioteca.buscarUsuario(idUsuario);
    const libro = biblioteca.buscarLibro(isbn);

    if (usuario && libro) {
        usuario.devolverLibro(libro);
        actualizarListaLibros();
    } else {
        alert('Usuario o libro no encontrados.');
    }
});

document.getElementById('editarUsuarioBtn').addEventListener('click', () => {
    const idUsuario = document.getElementById('idUsuarioEditar').value;
    const nuevoNombre = document.getElementById('nuevoNombreUsuario').value;

    if (idUsuario && nuevoNombre) {
        biblioteca.editarUsuario(idUsuario, nuevoNombre);
        actualizarListaUsuarios();
    } else {
        alert('Por favor, complete todos los campos para editar el usuario.');
    }
});

function eliminarUsuario(id) {
    biblioteca.eliminarUsuario(id);
    actualizarListaUsuarios();
}
