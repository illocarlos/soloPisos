<script setup>
import { formatePrice } from '@/helper/format';
defineProps({
    prop: {
        type: Object
    }
});
</script>

<template>
    <v-col cols="12" md="4">
        <h2>propertie</h2>

        <v-card>
            <v-carousel cycle hide-delimiter-background>
                <v-carousel-item v-for="(image, index) in prop.photo" :key="index">
                    <v-img cover height="350" :src="image" />
                </v-carousel-item>
            </v-carousel>
            <v-card-title class="font-weight-bold">
                {{ prop.title }}
            </v-card-title>
            <v-card-text class="text-truncate">
                {{ prop.description }}
            </v-card-text>
            <v-card-text class="text-h5 font-weight-bold">
                {{ formatePrice(prop.price) }}
            </v-card-text>

            <v-btn
            :to="{name:'propertie',params:{ id: prop.id }}"
            block color="brown-darken-4" variant="outlined">
                look info
            </v-btn>
        </v-card>
    </v-col>
</template>
