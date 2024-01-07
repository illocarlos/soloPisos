<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth'

// dijimos que no se podia destructurar el store, pero si lo podemos hacer para las partes reactivas(ref, reactive)
//con storeToRefs podemos hacerlo y asi llamamos unicamente esa reactividad concreta 
const useAuth = useAuthStore()
const { isAuth } = storeToRefs(useAuth)

//personalmente no me gusta podemos destructurar funciones de esta manera 
//const { login } = useAuth
</script>

<template>
<!-- en este proyecto vamos a introducir vuetify como estilos es una libreria que usa etiquuetas personalizadas como bootstrap y 
 tiene clase predeterminadas al estilo de taiwind  profundizando mas en el framework de vue 
  LO DEBEMOS LLAMAR EN MAIN DE LA MANERA QUE  LO COLOCAMOS!! -->
  <!-- usamos este componente v-layout dentro v-app-bar como navbar y usamos v-btn como enlaces  todo esgto tiene un diseño predeterminado -->
    <v-layout >
      <v-app-bar
            elevation="3"
              class="mx-auto"
      color="brown-darken-4">
      <!-- v-slot'prepend' coloca en el contenedor el boton a la izquierda u append a la derecha  -->
                 <template
              v-slot:prepend>
              <v-btn
              size="x-large"
              :to="{name:'home'}">
                home
              </v-btn>
            </template>
      <template
      v-slot:append>
      <div
        v-if="isAuth">
    <v-btn
           :to="{ name: 'admin-properties' }">
                  admin
                  </v-btn>
                   <v-btn
                   @click="useAuth.logOut">
                    log out
                    </v-btn>
      </div>
      <div v-else>
        <v-btn
         :to="{ name: 'login' }">
                  login
                </v-btn>
      </div>
    </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

