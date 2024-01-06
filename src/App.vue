<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-layout >

      <v-app-bar
      color="brown-darken-4">
      
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

