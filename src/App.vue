<script setup>
import Alert from '@/components/Alert.vue';

import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth'
import { useStoreButtom } from '@/stores/traduction.js';
import Foother from '@/components/Foother.vue';
import { onMounted, ref } from 'vue';

import { AnalyticsProps } from '@vercel/analytics/*';

const storeButtom = useStoreButtom();
const isNavbarTransparent = ref(false);


// dijimos que no se podia destructurar el store, pero si lo podemos hacer para las partes reactivas(ref, reactive)
//con storeToRefs podemos hacerlo y asi llamamos unicamente esa reactividad concreta
const useAuth = useAuthStore()
const { isAuth } = storeToRefs(useAuth)

//personalmente no me gusta podemos destructurar funciones de esta manera
//const { login } = useAuth


// funcion que activas mediante un boton que te desplaza hacia la posicion indicada 
const scrollToTop = () => {
  // funcion para llevar en este caso a la parte superior de la web 
  //puedes llevarlo donde desees con esta logica solo hace falta colocar el top donde quieras
  //window es un objeto global de js que define la pantalla del usuario
  //  y scrollTo() es un metodo especifivo de js para desplazar a una posicion especifica
  //cuando colocas top:0 especificas que quieres llevarte la pantalla al pixel 0 de top es edecir a la parte mas superior
  //por ejemplo si colocas top 100 lo mandaras a la posicion 100 en pixeles 
  // behavior: 'smooth' este termino siginifica como quieres que se desplace en este caso quieres que se desplace de manera suave
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



const handleScroll = () => {
  // en esta funcion pasamos el valor reactivo de false a true cuando window.scrolly esta en la posicion de 50 px
  //window.scrolly  es al hacer scroll verticalmente en la pantalla llegamos al pixel 50
  isNavbarTransparent.value = window.scrollY > 50;
};

// cuando el componente es cargado/montado en este caso seria en toda la aplicacion ya que esta en app.vue 
//
onMounted(() => {
  // creamos un evento para el objeto window que es la pantalla
  // addEventListenerse usa como que esta escuchando siempre evento de dom (siempre esta escuchando y si tenemos mucho puede dar problemas)
  // por eso es buena practica limpiar estos eventos una vez acaban y se hace con removetolistener
  //en este caso necesitamos escuicharlo contantemente
  //y debemos usar srcoll como cadena por que esta palabra el navegador la usa para el scroll de la pantalla
  //!!es decir es un evento que escucha contantemente el scroll del navegador y activa constantemente la funcion handleScroll!!
  //una vez llega al pixel 50 pasa a true isNavbarTransparent
  window.addEventListener('scroll', handleScroll);
});


</script>

<template>
<!-- en este proyecto vamos a introducir vuetify como estilos es una libreria que usa etiquuetas personalizadas como bootstrap y
 tiene clase predeterminadas al estilo de taiwind  profundizando mas en el framework de vue
  LO DEBEMOS LLAMAR EN MAIN DE LA MANERA QUE  LO COLOCAMOS!! -->
  <!-- usamos este componente v-layout dentro v-app-bar como navbar y usamos v-btn como enlaces  todo esgto tiene un diseño predeterminado -->
  <v-layout class="layout">
    <!-- creamos una clase de color dinamica con script manipulando el dom y la tenemos arriba esta explicada arria
    elevation es el ancho de la barra que viene de vuetify -->
  <v-app-bar
  class="navbar layout"
            elevation="3"
             :color="isNavbarTransparent ? 'brown-darken-4' : 'transparent'">
      <!-- v-slot'prepend' coloca en el contenedor el boton a la izquierda u append a la derecha  -->
                 <template
              v-slot:prepend>
              <!-- el btn tiene una funcion y una ruta que si esta en otra pagina te manda al home y si estas en el home te manda  
              hacia la funcion te dice en este caso la posicion top 0 que es arriba del todo
            tambien usamos un icono de vuetify que es el logo de vue  -->
              <v-btn
              class="ml-3"
              @click="scrollToTop"
              :to="{name:'home'}"
              icon="$vuetify"
              >
              </v-btn>
              <v-btn class="ml-3"
              @click="storeButtom.buttonChange">{{ storeButtom.reactiveFavBotton }}</v-btn>
            </template>

      <template
      v-slot:append>
      <!-- generamos una condicion si esta logeado que aparezca unos botones y si no otro esto son rutas que te mandan a otro view -->
      <div
      class="mr-5 barAppend"
        v-if="isAuth">
  <v-btn
  :to="{ name: 'admin-properties' }">
  admin
</v-btn>
  <v-btn
  @click="useAuth.logOut">
  {{ storeButtom.buttonLeng ? 'Cerrar sesion' : 'log out' }}
</v-btn>

      </div>
      <div v-else>
        <!-- usando un icono de vuetify que es el  -->
        <v-btn class="mr-5"
        icon="mdi-account"
        :to="{ name: 'login' }">
      </v-btn>
    </div>
  </template>


</v-app-bar>
<!-- v-main se usa para cargar el contenido principal de la pagina  es de vuetify dentro tenemos las routerview
   que generamos el home de forma predeterminada al abrir la web y tenemos como parte superior las alert fotther y la barra de navegacion que esta por encima
 -->
<v-main>
   <Alert/>
   <RouterView />

   <Foother class="foother"/>
  </v-main>

  </v-layout>
  <AnalyticsProps/>
</template>
<style>
.barAppend{
  display: flex;
  flex-flow: row nowrap;
}
.navbar {
  width: 100vw !important;
  transition: background-color 0.3s ease-in-out;
}
.foother{
    width: 100vw;
}
</style>


