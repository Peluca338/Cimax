    <template>
        <header>
            <div class="headerDiv">
            <div class="headerLogo">
                <img src="./img/cimaxLogoNegativo.png" alt="Cinemax Logotipo">
                <img src="./img/logo2.png" alt="Cinemax Isotipo">
            </div>
            </div>
        </header>
        <main class="mainPelisGuardadas"> 
            <h2 class="mt-2">Peliculas Guardadas</h2>
            <p class="text-secondary">Aun no hay favoritos</p>
            <div class="homeBtn">
                <a href="../index.html">
                    <button type="button" id="btnBuscar">Home</button>
                </a>
            </div>
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
    </template>
    
    <script setup>
        
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
    