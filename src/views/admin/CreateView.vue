<script setup>
// importamos validaciones para los formularios 
import { useForm, useField } from 'vee-validate';
// importamos las validaciones que tenemos en un help llamado validation
import { imageSchema, validationSchema } from '@/validation/propertiesSchema';
// mandamos la funcion tipo post de firebase a un stores
import { usePropertiesStore } from '@/stores/properties'
import useImage from '@/composables/useImage'
// mandamos a un composable informacion y funciones que usaremos en varios view y asi no hardcodeamos 
import useLocationMap from '@/composables/useLocationMap'
// llamaos al paquete de npm geolocalizador es gratuito y podemos hacer toda las llamadas que queramos a diferencia de googlemap
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { useCountriesStore } from '@/stores/prefixedCountrie'
import { formatPhoneNumber } from '../../helper/format';
import { ref, watch } from 'vue';

const useCountries = useCountriesStore()
// para mandar el objeto creado del formulario a este store
const useProperties = usePropertiesStore()
const preffixed = ref([])
const pruebaimagen = ref([])
const { zoom, center, pin } = useLocationMap()
// creamos la imagen y su url la mandamos a un composable 
const { uploadImage, images, imageUrls, $reset } = useImage()
// para usar en los select del formulario 
const countRooms = [1, 2, 3, 4, 5, 6, 7, 8];

 preffixed.value= useCountries.prefixed

const { handleSubmit } = useForm({
    validationSchema: {
        ...validationSchema,
        ...imageSchema
    }
});
pruebaimagen.value = imageUrls
// tenemos que crear en el useField cada uno de los modelos del formulario para que los registre y los valide el paquete veevalidate
//es una forma sencilla de crear formularios con vue 
const title = useField('title');
const photo = useField('photo');
const phone = useField('phone');
const prefixed = useField('prefixed');
const wc = useField('wc');
const price = useField('price');
const rooms = useField('rooms');
const description = useField('description');
const pool = useField('pool', null, {
    initialValue:false
});
const yard = useField('yard', null, {
    initialValue:false
});
watch(() => phone.value.value, (newValue) => {
    // Utiliza la función de ayuda para formatear el número
    phone.value.value = formatPhoneNumber(newValue);
});

 function resetFileInput() {
     $reset()
    }

const submit = handleSubmit((values) => {
   
    useProperties.createProperties(values, imageUrls, center)
});
</script>

<template>
    <v-card
    max-width="800"
    flat
    class="mx-auto">
<v-card-title class="text-center text-h4 font-weight-bold "
tag="h2">
    create a propertie
</v-card-title>
  <v-form class="mt-10">
<v-text-field
class="mb-5"
label="Title of propertie"
v-model="title.value.value"
:error-messages="title.errorMessage.value"/>

    <v-file-input
          accept="image/jpeg"
          label="photo"
          prepend-icon="mdi-camera"
          class="mb-5"
          v-model="photo.value.value"
          :error-messages="photo.errorMessage.value"
          @change="uploadImage"
           @click:clear="resetFileInput"
          multiple
        />

        <!-- Display uploaded images -->
    
                    
     <div class="my-5" v-if="pruebaimagen"> 
        <v-row>

            <v-col cols="12" md="4"  v-for="(image, index) in pruebaimagen.value" :key="index">
                <v-card flat class="w-88 h-40" >
                    <img class="w-100 h-70" :src="image" alt="image" />
                </v-card>
            </v-col>
        </v-row>
        </div>
        
  
    <v-text-field
    class="mb-5"
    label="Price"
     v-model="price.value.value"
        :error-messages="price.errorMessage.value"
    />
    <v-row>
<v-col
cols="6"
md="3"
>
    <v-select
    class="mb-5"
    label="available rooms"
    :items="countRooms"
     v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value"/>
</v-col>
<v-col
    cols="6"
    md="3"
    >
      <v-select
        class="mb-5"
        label="WC"
        :items="countRooms"
         v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"/>
        </v-col>
   <v-col
    cols="12"
      md="6" >
        <v-row>
            <v-col
             cols="5"
        md="5">
   <v-select
                class="selectPrefixed"
                :items="preffixed"
                label=" prefix"
                v-model="prefixed.value.value"
                :error-messages="prefixed.errorMessage.value"  >
              <v-option>{{ preffixed.prefixed }}
            </v-option> </v-select>
</v-col>
    <v-col
           cols="7"
            md="6">
        <v-text-field
        class="mb-5"
        label="phone"
         v-model="phone.value.value"
            :error-messages="phone.errorMessage.value"
             maxlength="11"
             :rules="[value => /^[0-9\s]*$/.test(value)]"
        />
         </v-col>
          </v-row>
            </v-col>
          </v-row>
                <v-textarea
                class="mb-5"
                label="Description"
                v-model="description.value.value"
                :error-messages="description.errorMessage.value">
            </v-textarea>
             <v-row>
                <v-col
                cols="12"
                md="6">
                    <v-checkbox
                    class="mb-5"
                    label="pool"
                     v-model="pool.value.value"
                      :error-messages="pool.errorMessage.value"/>
                </v-col>
                <v-col
                cols="12"
                md="6">
                    <v-checkbox
                    class="mb-5"
                    label="yard"
                     v-model="yard.value.value"
                      :error-messages="yard.errorMessage.value"/>
                </v-col>
        </v-row>

             <h2 class="font-weight-bold text-center my-5">property location</h2>
                <div class="pb-10">
                    <div style="height:400px">
                        <LMap 
                            v-model:zoom="zoom" 
                            :center="center" 
                            :use-global-leaflet="false" 
                        >
                            <LMarker
                                :lat-lng="center"
                                draggable
                                @moveend="pin"
                            />
                            <LTileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            ></LTileLayer>
                        </LMap>
                    </div>
                </div>
        <v-btn
        block
        color="grey"
        @click="submit">
            add propertie
        </v-btn>
  </v-form>
    </v-card>
</template>