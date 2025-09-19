<template>
  <div>
    <header>
      <div class="headerDiv">
        <div class="headerLogo">
          <a href="../index.html">
            <img src="./img/cimaxLogoNegativo.png" alt="Cinemax Logotipo">
            <img src="./img/logo2.png" alt="Cinemax Isotipo">
          </a>
        </div>
      </div>
    </header>
    <main>
      <section>
        <div class="busquedaEstilos">
          <form id="form" class="formClass">
            <input v-model="titulo" type="text" placeholder="¿Qué vamos a ver?">
            <select v-model="filtroAdulto">
              <option value="">Todas las películas</option>
              <option value="true">Solo para adultos</option>
              <option value="false">No para adultos</option>
            </select>
          </form>
          <div class="btnsClass">
            <div>
              <button type="button" id="btnBuscar" @click="realizarBusqueda">Buscar</button>
            </div>
            <div>
              <a href="../pelisGuardadas.html">
                <button type="button" id="btnFavoritas">Favoritas</button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="resultados" class="row w-75 mx-auto mt-4">
          <div v-for="movie in movies" :key="movie.id" class="col-12 col-md-6 col-lg-4 mb-4 d-flex">
            <MovieCard :movie="movie"/>
          </div>
      </section>
    </main>
    <footer>
      <div class="footerInfo">
        <div class="isoImg">
          <img src="./img/logo2.png" alt="">
        </div>
        <div class="copyTxt">
          <p>© 2024, Cimax.com, Inc. o sus filiales</p>
        </div>
        <div class="autoresTxt">
          <ul>
            <li>Alumnos:</li>
            <li>Victoria Taño</li>
            <li>Joaquín Preiti</li>
            <li>Alvaro Manuel Avendaño</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MovieCard from './components/peliCard.vue';

const titulo = ref('');
const filtroAdulto = ref('');
const movies = ref([]);

const agregarAFavoritos = async (pelicula) => {
  try {
    await agregarPelicula(pelicula); // Llamar a la función para agregar la película a IndexedDB
    alert(`Película "${pelicula.title}" agregada a favoritos.`);
  } catch (error) {
    console.error('Error al agregar película a favoritos:', error);
    alert('Error al agregar película a favoritos. Por favor, inténtalo de nuevo.');
  }
};

async function realizarBusqueda() {
  try {
    const apiKey = 'd9f8901bd28b4f1405c103168a6467e0'; // Tu API Key de TMDb
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo.value}`;
    const resp = await fetch(endPoint);
    const data = await resp.json();
    console.log('Respuesta de la API:', data);
    if (data.results && data.results.length > 0) {
      let resultados = data.results;
      if (filtroAdulto.value !== '') {
        const esAdulto = filtroAdulto.value === 'true';
        resultados = resultados.filter(movie => movie.adult === esAdulto);
      }
      movies.value = resultados;
      Swal.fire({
        title: "¡Pelicula encontrada!",
        text: `Se encontraron ${resultados.length} resultados.`,
        icon: "success"
      });
    } else {
      movies.value = [];
      Swal.fire({
        title: "Mmm, que extraño...",
        text: "No se han encontrado peliculas, intenta buscar nuevamente",
        icon: "question"
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "¡Ha ocurrido un error!",
      text: "Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.",
    });
  }
}

</script>

<style scoped>
/* Estilos específicos del componente */
.headerDiv {
  display: flex;
  justify-content: center;
  background-color: #2B2B2B;
  height: 15em;
}

.busquedaEstilos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footerInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #080A1B;
  color: white;
  padding: 5em;
  margin-top: 26em;
}
</style>
