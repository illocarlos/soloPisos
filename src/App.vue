<script setup>
import Alert from '@/components/Alert.vue';

import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth'
import { useStoreButtom } from '@/stores/traduction.js';
import Foother from '@/components/Foother.vue';




import { onMounted, ref } from 'vue';

const storeButtom = useStoreButtom();

// dijimos que no se podia destructurar el store, pero si lo podemos hacer para las partes reactivas(ref, reactive)
//con storeToRefs podemos hacerlo y asi llamamos unicamente esa reactividad concreta 
const useAuth = useAuthStore()
const { isAuth } = storeToRefs(useAuth)

//personalmente no me gusta podemos destructurar funciones de esta manera 
//const { login } = useAuth

const isNavbarHidden = ref(true);

const scrollToTop = () => {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const isNavbarTransparent = ref(false);

const handleScroll = () => {
  isNavbarTransparent.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});


</script>

<template>
<!-- en este proyecto vamos a introducir vuetify como estilos es una libreria que usa etiquuetas personalizadas como bootstrap y 
 tiene clase predeterminadas al estilo de taiwind  profundizando mas en el framework de vue 
  LO DEBEMOS LLAMAR EN MAIN DE LA MANERA QUE  LO COLOCAMOS!! -->
  <!-- usamos este componente v-layout dentro v-app-bar como navbar y usamos v-btn como enlaces  todo esgto tiene un diseño predeterminado -->
  <v-layout class="layout">
  <v-app-bar
  class="navbar layout"
            elevation="3"
             :color="isNavbarTransparent ? 'brown-darken-4' : 'transparent'">
      <!-- v-slot'prepend' coloca en el contenedor el boton a la izquierda u append a la derecha  -->
                 <template
              v-slot:prepend>
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
        <v-btn class="mr-5"
        icon="mdi-account"
        :to="{ name: 'login' }">
      </v-btn>
    </div>
  </template>
  
  <v-container>
  </v-container>
</v-app-bar>
<v-main>
   <Alert/>

   <RouterView />
   <Foother class="foother"/>
  </v-main>
  </v-layout>
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


