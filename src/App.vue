<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<!-- en este proyecto vamos a introducir vuetify como estilos es una libreria que usa etiquuetas personalizadas como bootstrap y 
 tiene clase predeterminadas al estilo de taiwind  profundizando mas en el framework de vue 
  LO DEBEMOS LLAMAR EN MAIN DE LA MANERA QUE  LO COLOCAMOS!! -->
  <!-- usamos este componente v-layout dentro v-app-bar como navbar y usamos v-btn como enlaces  todo esgto tiene un diseño predeterminado -->
    <v-layout >
      <v-app-bar
      color="brown-darken-4">
      <!-- v-slot'prepend' coloca en el contenedor el boton a la izquierda u append a la derecha  -->
                 <template
              v-slot:prepend>
              <v-btn
              :to="{name:'home'}">
                home
              </v-btn>
            </template>
      <template
      v-slot:append>
        <v-btn
         :to="{ name: 'login' }">
                  login
                </v-btn>
    </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

