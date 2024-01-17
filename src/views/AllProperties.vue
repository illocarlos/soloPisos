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



       <v-card flat class="heigthView py-10">
          <v-form class="formFixed">
          <v-row>
    <v-col class="heigth" cols="12" md="6">
       <v-checkbox :label="storeButtom.buttonLeng ? 'piscina' : 'pool' "  v-model=" pool "></v-checkbox>
    </v-col>
    <v-col cols="12" md="6">

       <v-checkbox :label="storeButtom.buttonLeng ? 'patio' : 'yard'" v-model="yard"></v-checkbox>
    </v-col>
    <v-col class="heigthbtn"   cols="12"
    md="12">
       <v-btn
      class="heigthbtn" 
       color="brown-darken-3"
       block
       @click="submit">
       search
      </v-btn>
   </v-col>
    </v-row>
          </v-form>

          <v-row >
             <Propertie v-for="prop in filterproperties" :key="prop.id" :prop="prop" />
          </v-row>
       </v-card>
    
</template>

<style>
.heigthbtn{
   height: 0.1rem;
}
.heigth{
   height: 2rem;
}

.formFixed{
   border-radius:0.5rem ;
   width: 8rem;
   background-color:rgba(255, 255, 255, 0.73) ;
position: fixed;
right: 5%;
z-index: 10;
}
@media (min-width: 900px) {

.formFixed{
   width: 13rem;
} 
}
</style>