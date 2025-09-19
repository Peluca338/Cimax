let db; // Variable global que almacena la instancia de la base de datos

const CACHE_NAME = 'my-cache-name'; // Nombre del cache

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FavoritasDB', 1);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            const store = db.createObjectStore('peliculas', { keyPath: 'Title' });
            store.createIndex('Year', 'Year', { unique: false });
            store.createIndex('Director', 'Director', { unique: false });
            console.log('onupgradeneeded: Base de datos creada o actualizada');
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log('onsuccess: Base de datos abierta con éxito');
            resolve(db);
        };

        request.onerror = (event) => {
            console.error('Error al abrir IndexedDB:', event.target.errorCode);
            reject('Error al abrir IndexedDB');
        };
    });
};

const agregarPelicula = (pelicula) => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject('La base de datos no está inicializada');
            return;
        }
        const transaction = db.transaction(['peliculas'], 'readwrite');
        const store = transaction.objectStore('peliculas');
        const request = store.add(pelicula);

        request.onsuccess = () => {
            console.log('Película agregada a IndexedDB:', pelicula);
            resolve();
        };

        request.onerror = (event) => {
            console.error('Error al agregar la película a IndexedDB:', event.target.errorCode);
            reject('Error al agregar la película');
        };
    });
};

// Función para manejar el clic en el botón de añadir a favoritos
const agregarAFavoritosHandler = async (pelicula) => {
    try {
        await openDatabase(); // Abrir la base de datos
        await agregarPelicula(pelicula); // Agregar la película a IndexedDB
        Swal.fire({
            title: '¡Agregado a Favoritos!',
            text: `La película "${pelicula.Title}" ha sido agregada a tus favoritos.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } catch (error) {
        console.error('Error al agregar película a favoritos:', error);
        Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al agregar la película a favoritos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
};

// Exportar las funciones necesarias para ser utilizadas en otros archivos
export {
    openDatabase,
    agregarPelicula,
    agregarAFavoritosHandler // Exportar la función de manejo de clic en favoritos
};