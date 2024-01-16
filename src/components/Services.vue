<script setup>
import { useStoreButtom } from '@/stores/traduction.js'
const storeButtom = useStoreButtom()
</script>

<template>
  <h1 class="text-center my-10">  {{ storeButtom.buttonLeng ? 'Servicios' : 'Services' }}<span><v-icon color="brown-darken-4" icon="$vuetify"></v-icon></span>ueImnova
  </h1>
  <v-row>

    <v-col cols="12" md="4">
      <v-card hover class="article" >
  <img width="350" height="356" src="../assets/pisos.jpg" alt="" />
  <v-card-title class="text-center font-weight-bold titleText"> {{ storeButtom.buttonLeng ? ' Nuestras casas ' : 'Ourhouses ' }} </v-card-title>
  <v-card-text class="text-center sizeText">
     {{ storeButtom.buttonLeng ? '  Descubre el hogar de tus sueños: donde cada espacio cuenta una historia única. ¡Haz de esta casa tu próximo capítulo! '
      : 'Discover the home of your dreams: where each space tells a unique story. Make this home your next chapter! ' }} 
  </v-card-text>
  <v-btn :to="{ name: 'allProperties' }"  class="font-weight-bold" block >{{ storeButtom.buttonLeng ? ' Saber mas ' : 'know more ' }} </v-btn>
      </v-card>
    </v-col>
   <v-col cols="12" md="4">
      <v-card hover class="article">
        <img width="350" height="356" src="../assets/aticos-tecnocasa.jpg" alt="" />
        <v-card-title class="text-center font-weight-bold titleText">{{ storeButtom.buttonLeng ? ' Hipotecate! ' : 'mortgage yourself! ' }} </v-card-title>
        <v-card-text class="text-center sizeText">
          {{ storeButtom.buttonLeng ? 
          'Realiza tu sueño de hogar propio: Con nuestras opciones de hipoteca, obtén la llave de tu nuevo hogar. Compra con confianza y comodidad. ¡Hazlo realidad hoy!'     
          : ' Make your dream of your own home come true: With our mortgage options, get the key to your new home. Buy with confidence and comfort. Make it happen today!' }}
        </v-card-text>
      <v-btn href="https://www.kiron.es/" target="_blank" class="font-weight-bold" block>
        {{ storeButtom.buttonLeng ? ' Saber mas ' : 'know more ' }} </v-btn>

      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card hover class="article">
      <img width="350" height="356" src="../assets/robert.jpg" alt="" />
        <v-card-title class="text-center font-weight-bold titleText">{{ storeButtom.buttonLeng ? 'Trabaja con nosotros! ' : 'Work with us! ' }}  </v-card-title>
        <v-card-text class="text-center sizeText">
   {{ storeButtom.buttonLeng ? ' Únete a nuestro equipo: Transforma tu carrera con oportunidades emocionantes y un ambiente de trabajo excepcional. ¡Juntos alcanzaremos el éxito! ' 
   : 'Join our team: Transform your career with exciting opportunities and a work environment exceptional. Together we will achieve success!' }} 
        </v-card-text>
        <v-btn :to="{ name: 'contact' }"   class="font-weight-bold"  block>
          {{ storeButtom.buttonLeng ? ' Saber mas ' : 'know more ' }} </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.block-Service {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.article {
  font-size: 3rem;
  height: 500px !important;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
img {
  vertical-align: middle;
  object-fit: cover;
  border-radius: 35rem;
}
@media (min-width: 900px) {
  .sizeText{
  color: grey;
  font-size: 1.2rem;
}

  .titleText{
   font-size: 1.4rem;
}
}
</style>
