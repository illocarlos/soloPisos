<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import useProperties from '@/composables/useProperties';
import Services from '@/components/Services.vue'
import Propertie from '@/components/Propertie.vue';
import { useStoreButtom } from '@/stores/traduction.js'
const storeButtom = useStoreButtom()

const { filterclick, propertiesCollection, filterPropertie, filterproperties } = useProperties();
const pool = ref(false);
const yard = ref(false);

const submit = () => {
    const filters = {
        pool: pool.value,
        yard: yard.value
    };

    // Call your filter function with the filters
    filterclick(filters);
}
</script>

<template>

       <v-card flat class="py-10">
          <v-form>
          <v-row>
    <v-col cols="6" md="1">
       <v-checkbox :label="storeButtom.buttonLeng ? 'piscina' : 'pool' "  v-model=" pool "></v-checkbox>
    </v-col>
    <v-col cols="6" md="1">

       <v-checkbox :label="storeButtom.buttonLeng ? 'patio' : 'yard'" v-model="yard"></v-checkbox>
    </v-col>
    </v-row>
    <v-btn
     @click="submit">
       search
    </v-btn>
          </v-form>

          <v-row>
             <Propertie v-for="prop in filterproperties" :key="prop.id" :prop="prop" />
          </v-row>
       </v-card>
</template>