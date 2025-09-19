    <template>
        <div class="movie-card">
        <img class="img-fluid rounded" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="movie.title + ' Poster'" />
        <h2 class="text-secondary mt-3">{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
        <div class="d-flex">
            <button class="btn btn-outline-secondary" @click="showDetails(movie)">Details</button>
            <button class="btn btn-outline-primary ms-3" @click="agregarAFavoritos(movie)">Agregar a Favoritos</button>
        </div>
        </div>
    
        <!-- Modal -->
        <div class="modal fade" :class="{ show: isModalVisible }" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true" style="display: block;" v-if="isModalVisible">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="movieModalLabel">Detalles de la Película</h5>
                <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalContent">
                <div class="d-flex">
                    <img class="card-img-top rounded" :src="'https://image.tmdb.org/t/p/w500/' + selectedMovie.poster_path" :alt="selectedMovie.title">
                </div>
                <h3 class="card-title text-dark fw-bold mt-3">{{ selectedMovie.title }}</h3>
                <p class="card-text text-dark border-2 fs-4">{{ selectedMovie.overview }}</p>
                <p class="card-text fs-6 border-top"><span class="fw-bold">Aprobacion:</span> {{ selectedMovie.vote_average }}</p>
                <p class="card-text fs-6"><span class="fw-bold">Fecha de lanzamiento:</span>{{ selectedMovie.release_date }}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline-primary" @click="agregarAFavoritos(pelicula)">Agregar a Favoritos</button>
            </div>
            </div>
        </div>
        </div>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    
    import { defineProps } from 'vue';

    const agregarAFavoritos = async (pelicula) => {
        await agregarAFavoritosHandler(pelicula);
    };
    

    
    const props = defineProps({
        movie: Object,
    });
    
    const isModalVisible = ref(false);
    const selectedMovie = ref({});
    
    function showDetails(movie) {
        selectedMovie.value = movie;
        isModalVisible.value = true;
    }
    
    function hideModal() {
        isModalVisible.value = false;
    }

    </script>
    
    <style scoped>
    .movie-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 20px;
        margin: 32px;
        height: 100%;
    }
    
    .movie-card img {
        max-width: 100%;
        height: auto;
    }
    
    .movie-card h2,
    .movie-card p {
        margin: 10px 0;
        text-align: center;
    }
    
    .movie-card p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        height: 4.5em;
    }
    
    .movie-card {
        flex: 1 1 auto;
    }
    
    .modal {
        display: none;
    }
    
    .modal.show {
        display: block;
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .modal .modal-dialog {
        max-width: 500px;
        margin: 1.75rem auto;
    }
    </style>
    