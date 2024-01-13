<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { doc } from 'firebase/firestore'
import { useDocument, useFirestore } from 'vuefire';

const route = useRoute()
const db = useFirestore()
const docRef = doc(db, 'properties', route.params.id)
const propertie = useDocument(docRef)

const selectedImage = ref(null);

const selectImage = (index) => {
    selectedImage.value = propertie.value.photo[index];
}
</script>

<template>
    <h1>Detalles</h1>
    <v-card flat>
        <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
            {{ propertie?.title }}
        </v-card-title>
     <!-- Imagen grande -->
          
                    <v-img cover width="950" height="700" :src="selectedImage" />
           
        <!-- Imágenes en miniatura -->
        <v-row class="mb-4 mt-5">
            <v-col v-for="(image, index) in propertie.photo" :key="index" cols="4">
                <v-img class="cursor-pointer" @click="selectImage(index)" cover height="200" :src="image" />
            </v-col>
        </v-row>

       
    </v-card>
</template>
