<script setup>
import { formatePrice } from '@/helper/format';
import { useStoreButtom } from '@/stores/traduction.js'

const storeButtom = useStoreButtom()
defineProps({
    prop: {
        type: Object
    }
});
</script>

<template>
    <v-col cols="12" md="4">
        <v-card>
            <v-carousel 
              show-arrows="hover"
            cycle 
             hide-delimiters>
                <v-carousel-item
                v-for="(image, index) in prop.photo" :key="index">
                    <v-img cover height="550" :src="image" />
                </v-carousel-item>
            </v-carousel>
            <v-card-title class="text-center font-weight-bold">
                {{ prop.title }}
            </v-card-title>
            <v-card-text class="text-truncate">
                {{ prop.description }}
            </v-card-text>
            <v-card-text class="text-center text-h5 font-weight-bold">
                {{ formatePrice(prop.price) }}
            </v-card-text>

            <v-btn
            class="font-weight-bold"
            :to="{name:'propertie',params:{ id: prop.id }}"
            block color="brown-darken-4" variant="flat">
                {{ storeButtom.buttonLeng ? 'Saber mas' : 'Look info' }} 
            </v-btn>
        </v-card>
    </v-col>
 
      
     
</template>
