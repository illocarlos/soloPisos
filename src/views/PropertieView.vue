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

const { zoom, center } = useLocationMap();
const storeButtom = useStoreButtom()
const spinner=ref(false)
const route = useRoute();
const db = useFirestore();
const docRef = doc(db, 'properties', route.params.id);
const propertie = useDocument(docRef);

const numPhoto = ref(false);
const selectedImage = ref(null);

const selectImage = (index) => {
    selectedImage.value = propertie.value.photo[index];
    numPhoto.value = true;
};

watch(propertie, (newPropertie) => {
    center.value = newPropertie.ubication;
});

const propertieChunks = computed(() => {
   
    if (!propertie.value || !propertie.value.photo || propertie.value.photo.length === 0) return [];
    
    const chunkSize = 3;
    const photoChunks = [];
    
    for (let i = 0; i < propertie.value.photo.length; i += chunkSize) {
        const chunk = propertie.value.photo.slice(i, i + chunkSize);        
        photoChunks.push(chunk);
    }
    
    return photoChunks;
});
onMounted(() => {
    spinner.value=true
    setTimeout(() => {
            
            spinner.value=false
        
    }, 5500)
})
</script>

<template>
    <v-card flat>
        <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
            {{ propertie?.title }}
        </v-card-title>
        <!-- Imagen grande -->
        <v-row class="my-10">
            
            <v-col cols="12" md="6" >
                <v-img class="responsiveimg" height="700"  v-if="numPhoto" cover :src="selectedImage" />
                <v-img class="responsiveimg" height="700"  v-else cover :src="propertie?.photo[0]" />
                   <!-- Imágenes en miniatura -->
                        <v-row >
         <v-col
         cols="12">
      <v-carousel 
   class="custom-carousel" 
      cycle 
      hide-delimiter-background
      show-arrows="hover"
      height="200"
      hide-delimiters
      >

       <template v-if="spinner">
                    <v-row justify="center" align="center" class="h-100">
                      <SpinnerVue class="spin" />
                    </v-row>
                  </template>
      <v-carousel-item    v-for="(group, groupIndex) in propertieChunks" :key="groupIndex">
        <v-row>
            <v-col v-for="(image, index) in group" :key="index" cols="4">
              <v-img class="imageCarousel " @click="selectImage(index + groupIndex * 3)" cover height="200" :src="image" />
            </v-col>
        </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
            </v-row>
            </v-col>
            
            <v-col cols="12" md="5">
   <v-row style="height:470px;" class="property-description scrollable-column">
     <v-col cols="12" class="text-center font-weight-bold text-h3 " >
           {{ formatePrice(propertie?.price)}}
              </v-col>
          <v-col cols="12">
            <article class="description-content ">
              {{ propertie?.description }}
                      {{ propertie?.description }}
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

</style>