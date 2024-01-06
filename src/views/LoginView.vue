<script setup>
</script>

<template>
  <v-card
  max-width="600"
  class="mx-auto mt-10">
    <v-card-title
     class="text-h2 text-center font-weight-bold"
     tag="h2">
  iniciar sesion
    </v-card-title>
    <v-form>
      <v-text-field
      class="mt-5"
      type="email"
      label="Email"
      bg-color="brown-lighten-4"/>
    <v-text-field
        class="mt-5"
        type="password"
        label="Contraseña"
        bg-color="brown-lighten-4"/>
     <v-btn
     class="font-weight-bold"
    block
    color="blue-grey-lighten-3"
     >
      inicio
     </v-btn>
    </v-form>
  </v-card>
</template>
