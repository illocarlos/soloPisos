<script setup>
import PropertieVue from '@/components/Propertie.vue'
import useProperties from '@/composables/useProperties'

import Propertie from'@/components/Propertie.vue'
const { propertiesCollection } = useProperties()
</script>

<template>
   <h1 class="text-center text-h1">DESDE HOME</h1>
   <v-card flat
   class="py-10">
<v-row>

<Propertie
v-for="prop in propertiesCollection"
:key="prop.id"
:prop="prop"/>

</v-row>
   </v-card>
</template>