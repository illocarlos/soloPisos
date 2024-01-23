<script setup>
import { useStoreButtom } from '@/stores/traduction.js'
import { computed, onMounted, ref, watch } from 'vue';
import { formatePrice } from '@/helper/format';
import { useRoute } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useDocument, useFirestore } from 'vuefire';
import "leaflet/dist/leaflet.css";
import useLocationMap from '@/composables/useLocationMap';
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import SpinnerVue from '@/components/Spinner.vue';
// uso del mapa 
const { zoom, center } = useLocationMap();
// pasamos el traductor
const storeButtom = useStoreButtom()
// le mandamos dato reactivo para el spinner si es true o false
const spinner = ref(false)
// useRoute se utilizia para recoger la informacion de la ruta en la que se encuentra
//normalmente se usa para recoger la informacion de un objeto concreto 
const route = useRoute();

// usamos este codigo para llamar a un objeto en concreto de firebae usando route.params.id
// llamamos usefirestore por norma general siempre se llama como db 
const db = useFirestore();
// al igual que db docRef para introducirnos en firtebase
//doc es palabra reservada en ella llamamos a firebase y en su db buscamos la base de dato que se llame properties y le mandamos la id
const docRef = doc(db, 'properties', route.params.id);
// y creamos una constante pasandole el objeto concreto atraves de la id que recogimos en los params
const propertie = useDocument(docRef);

// valores reactivo que se usan para funciones de los array de imagenes
const numPhoto = ref(false);
const selectedImage = ref(null);


// esta funcion es la usada para plasmar en la img mas grande una de las fotos del carrusel 
// le pasamos el index que viene de el carrusel 
const selectImage = (index) => {
  selectedImage.value = propertie.value.photo[index];
  // le pasamos numphoto a true para que la condicion de las imagenes de abajo se cumpla 
  //y desaparezca la imagen [0] del array predefinida que teniamos para asi colocar la sleccionada que le damos el valor
    //en la linea de arriba
    numPhoto.value = true;
};

// observamos la ubicacion de propertie
watch(propertie, (newPropertie) => {
    center.value = newPropertie.ubication;
});

// usamos propertieChunks para encapsular la logica utilizando computed que es una funcion que si hay algun cambio en alguno de los datos 
//se vuelve a activar la funcion por lo tanto siempre esta como en un bucle 
const propertieChunks = computed(() => {
    // creamos un filtro con una condicion si alguna de ellas es true retorna array vacio para no generar un error y si es false sigue el codigo
    if (!propertie.value || !propertie.value.photo || propertie.value.photo.length === 0) return [];

    // chunkSizees lo usamos en el bucle for como limitador para parar el bucle
  const chunkSize = 3;
    // array en el que vamos a introducir las fotos
    const photoChunks = [];

  // es decir ponemos el tope de 3 por que son las imagenes que se van a mostrar y como es un computed si pasamos esas 3 imagenes 
  //generamos un cambio y tiene que volver a paras la funcion computed 
  for (let i = 0; i < propertie.value.photo.length; i += chunkSize) {
      //  Se utiliza el método slice para extraer un fragmento 
    //de fotos desde el índice i hasta i + chunkSize.Este fragmento se almacena en la variable chunk.
      //utilizamos la posicion de cada loop como posicion y cantidad 
    const chunk = propertie.value.photo.slice(i, i + chunkSize);  
              // y le pasamos a un array cada una de las imagenes 
        photoChunks.push(chunk);
    }
    // retornando esta
    return photoChunks;
});
// se monta el spinner direactemen al abrir la ruta
onMounted(() => {
    spinner.value=true
    setTimeout(() => {
            
            spinner.value=false
        
    }, 5500)
})
</script>

<template>

  <!-- imagen grande que usamos para ver mejor cada una de las fotos  -->
    <v-card class="cardDetailsPropertie" flat>
        <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
            {{ propertie?.title }}
        </v-card-title>
        <!-- Imagen grande -->
        <v-row class="my-10">
            
            <v-col cols="12" md="6" >
              <!-- aqui generamos una condicion si tenemos una imagen selecionada elegimos esa imagen 
                y si no elegimos la primera imagen del array  
                el src es dinamico mostrara la imagen en funcion a la arrow function que le dimos
                  explicamos en el script el significado de esta funcion-->
                <v-img class="responsiveimg"  v-if="numPhoto" cover :src="selectedImage" />
                <v-img class="responsiveimg"  v-else cover :src="propertie?.photo[0]" />
                   <!-- Imágenes en miniatura -->

                        <v-row >
         <v-col
         cols="12">
         <!-- carrusel de imagenes de vuetify que viene de serie en el hicimos un par de ajustes 
        al poner cycle es rotacion automatica 
        hide-delimiter-background Esta propiedad oculta el fondo del delimitador entre los elementos del ciclo.
        show-arrows="hover" se usa para ocultar las flecha del carrusel y cuando pasas el raton aparecen es una forma
      estetica de verlas
    hide-delimiters: Esta propiedad oculta los delimitadores entre los elementos del ciclo. -->
      <v-carousel 
   class="custom-carousel" 
   height="100"
      cycle 
      hide-delimiter-background
      show-arrows="hover"
      hide-delimiters
      >

      <!-- creamos un spinner ya que tarda en generar las imagenes y es una forma de ver que carga 
      hice prueba y las imagenes llegan rapido pero no encuentro el por que de que tarde tanto en que aparezca en el carrusel
    por lo tanto lo hice manualmente cree un spinner con temporizador y si las imagenes aparecen antes de que el spinner se vaya 
  no pasa nada ya que el spinner esta por debajo de las imagenes y no se vera  -->
       <template v-if="spinner">
                    <v-row justify="center" align="center" class="h-100">
                      <SpinnerVue class="spin" />
                    </v-row>
                  </template>
                  <!-- carrusel de imagenes en si en el recogemos las imagenes de cada propiedad ya que es un array de imagenes  -->
                  <!-- tenemos generado en un script para que podamos sacar 3 imagenes del carrusel -->
      <v-carousel-item    v-for="(group, groupIndex) in propertieChunks" :key="groupIndex">
        <v-row>
            <v-col v-for="(image, index) in group" :key="index" cols="4">
              <v-img class="imageCarousel " @click="selectImage(index + groupIndex * 3)" cover  :src="image" />
            </v-col>
        </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
            </v-row>
            </v-col>
            
            <!-- aqui llamamos la informacion restante no tiene mucha logica  -->
            <!-- lo unico que le ponemos un ternario a todo los datos para que aparezca cuando lo tenga  -->
            <v-col cols="12" md="5">
   <v-row style="height:470px;" class="property-description scrollable-column">
     <v-col cols="12" class="text-center font-weight-bold text-h3 " >
           {{ formatePrice(propertie?.price)}}
              </v-col>
          <v-col cols="12">
            <article class="description-content ">
              {{ propertie?.description }}
            </article>
        </v-col>
        <v-col cols="12" md="4" class="text-center" >
            <v-icon
            color="success"
      size="large"
      icon="mdi-message-text"
     ></v-icon>
       {{ propertie?.prefixed }}
         <spam class="result">  
             {{ propertie?.phone }}
        </spam> 
            
          </v-col>
          <v-col cols="6" md="4" >
            <spam class="font-weight-bold "> W.C.</spam> 
            <spam class="ml-2 result">
                {{ propertie?.wc }}
            </spam>
          </v-col>

          <v-col cols="6" md="4" >
        <spam class=" font-weight-bold ">    {{ storeButtom.buttonLeng ? 'Habitaciones' : 'Rooms' }} </spam> 
      <spam class="ml-2 result" >
          {{ propertie?.rooms  }}
      </spam>
        
          </v-col>
          
          <v-col>
            <spam class="font-weight-bold "> {{ storeButtom.buttonLeng ? 'Piscina' : 'Pool' }} </spam> 
            <v-icon end
            :color="propertie?.pool ? 'success' : 'warning'"
            :icon="propertie?.pool ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"/>
          </v-col>
            <v-col>
           <spam class="font-weight-bold "> {{ storeButtom.buttonLeng ? 'Parque' : 'Yard' }} </spam> 
                    <v-icon end
                      :color="propertie?.yard ? 'success' : 'warning'"
                    :icon="propertie?.yard ? 'mdi-checkbox-marked-circle' : 'mdi-cancel'"/>
              </v-col>
        </v-row>
        <!-- mapa de ubicacion  -->
       <div  style="height:450px;">
                    <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
                        <LMarker :lat-lng="center">
                            <LPopup>
                                {{ propertie?.title }}
                                {{ propertie?.prefixed }}-{{ propertie?.phone }}
                            </LPopup>
                        </LMarker>
                        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
                    </LMap>
                </div>
            </v-col>
        </v-row>
    <v-row>
    </v-row>
  
    </v-card>

</template>
<style scoped>
.imageCarousel{
  height: 7rem;
}
.responsiveimg{
height:30rem
}
.result{
font-size: 1.2rem;
}
.scrollable-column {
  overflow-y: auto;
  max-height: 100%;
}
.spin{
    position: absolute;
    z-index:-100 ;
}

.imageCarousel{
    z-index: 100;
    cursor: pointer;
}
.custom-carousel {
    background-color: rgba(0, 0, 0, 0.253);
}
@media (min-width: 900px) {
  .imageCarousel{
  height: 15rem;
}
.responsiveimg{
height:43rem
}
.custom-carousel {
height: 15rem !important;
}
.cardDetailsPropertie{
  margin-left: 10rem;
}

}
.service{
    color: white
}

</style>