<script setup>
import Header from '@/components/Header.vue';
import useProperties from '@/composables/useProperties'
import Propertie from'@/components/Propertie.vue'
const { pool, propertieFiltered,yarn } = useProperties()
</script>

<template>
   <Header/>
   
   <v-card flat
   class="py-10">
   <v-card-title>
      search
      <v-checkbox label="pool" v-model="pool"></v-checkbox>
       <v-checkbox label="yarn" v-model="yarn"></v-checkbox>
   </v-card-title>
<v-row>
<Propertie
v-for="prop in propertieFiltered"
:key="prop.id"
:prop="prop"/>

</v-row>
   </v-card>
</template>