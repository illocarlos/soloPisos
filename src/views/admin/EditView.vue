<script setup>
import { useRoute, useRouter  } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import { useField, useForm } from 'vee-validate'
import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap'
import { validationSchema } from '@/validation/propertiesSchema'
import { useCountriesStore } from '@/stores/prefixedCountrie'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { doc, updateDoc  } from 'firebase/firestore';
import { watch, ref } from 'vue';

const { uploadImage, images, imageUrls, $reset } = useImage()
const { zoom, center, pin } = useLocationMap()
const useCountries = useCountriesStore()

// recoge la informacion necesaria en este caso para editar
const route = useRoute();
// redirecciona al usuaurio
const router = useRouter()

// Obtener la Propiedad al editar
const db = useFirestore(); 
const docRef = doc(db, 'properties', route.params.id)
const preffixed = ref([])
const pruebaimagen = ref([])


// para usarlo como item en los formularios uno es prefijos otro simple
const items = [1, 2, 3, 4, 5]
preffixed.value = useCountries.prefixed

const { handleSubmit } = useForm({ validationSchema });

const title = useField('title');
const photo = useField('photo');
const phone = useField('phone');
const prefixed = useField('prefixed');
const wc = useField('wc');
const price = useField('price');
const rooms = useField('rooms');
const description = useField('description');
const pool = useField('pool', null, {
  initialValue: false
});
const yard = useField('yard', null, {
  initialValue: false
});
pruebaimagen.value = imageUrls
const propertieId = useDocument(docRef)
watch(propertieId, (propertieId) => {
  title.value.value = propertieId.title
  photo.value.value = propertieId.photo
  phone.value.value = propertieId.phone
  prefixed.value.value = propertieId.prefixed
  wc.value.value = propertieId.wc
  price.value.value = propertieId.price
  rooms.value.value = propertieId.rooms
  description.value.value = propertieId.description
  pool.value.value = propertieId.pool
  yard.value.value = propertieId.yard
    center.value = propertieId.ubication
})

const submit = handleSubmit(async values => {
  const { ...propertieId } = values

  console.log(center.value)
   
  const data = {
    ...propertieId,
    ubication: center.value
  }
    await updateDoc(docRef, data)
  
  router.push({ name: 'home' })

})

</script>
<template>
  <v-card max-width="800" flat class="mx-auto">
    <v-card-title class="text-center text-h4 font-weight-bold " tag="h2">
      create a propertie
    </v-card-title>
    <v-form class="mt-10">
      <v-text-field class="mb-5" label="Title of propertie" v-model="title.value.value"
        :error-messages="title.errorMessage.value" />

      <v-text-field class="mb-5" label="Price" v-model="price.value.value" :error-messages="price.errorMessage.value" />
      <v-row>
        <v-col cols="6" md="3">
          <v-select class="mb-5" label="available rooms" :items="countRooms" v-model="rooms.value.value"
            :error-messages="rooms.errorMessage.value" />
        </v-col>
        <v-col cols="6" md="3">
          <v-select class="mb-5" label="WC" :items="countRooms" v-model="wc.value.value"
            :error-messages="wc.errorMessage.value" />
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="5" md="5">
              <v-select class="selectPrefixed" :items="preffixed" label=" prefix" v-model="prefixed.value.value"
                :error-messages="prefixed.errorMessage.value">
                <v-option>{{ preffixed.prefixed }}
                </v-option> </v-select>
            </v-col>
            <v-col cols="7" md="6">
              <v-text-field class="mb-5" label="phone" v-model="phone.value.value"
                :error-messages="phone.errorMessage.value" maxlength="11" :rules="[value => /^[0-9\s]*$/.test(value)]" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-textarea class="mb-5" label="Description" v-model="description.value.value"
        :error-messages="description.errorMessage.value">
      </v-textarea>
      <v-row>
        <v-col cols="12" md="6">
          <v-checkbox class="mb-5" label="pool" v-model="pool.value.value" :error-messages="pool.errorMessage.value" />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox class="mb-5" label="yard" v-model="yard.value.value" :error-messages="yard.errorMessage.value" />
        </v-col>
      </v-row>

      <h2 class="font-weight-bold text-center my-5">property location</h2>
      <div class="pb-10">
        <div style="height:400px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </div>
      <v-btn block color="grey" @click="submit">
        add propertie
      </v-btn>
    </v-form>
  </v-card>
</template>