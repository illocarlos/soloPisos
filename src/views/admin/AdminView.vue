<script setup>
import useProperties from '@/composables/useProperties';
import { formatePrice }from'@/helper/format'
const { propertiesCollection } = useProperties()

</script>

<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">ADMIN PANEL</h2>
    <v-btn
    color="grey"
    variant="flat"
    :to="{name:'admin-create'}"
    >
        add propertie
    </v-btn>
    <v-card class="mx-auto mt-10"
    flat>
<v-list>
    <v-list-item
    v-for="propertie in propertiesCollection"
    :key="propertie.id"
    >

    <template
    v-slot:prepend
    >
        <v-list-item-media :start="true">
<img width="200" :src="propertie.photo" alt="">
        </v-list-item-media>
    </template>
    <v-list-item-title>{{ propertie.title }}</v-list-item-title>
     <v-list-item-subtitle>{{ formatePrice(propertie.price) }}</v-list-item-subtitle>
  <template
  v-slot:append>  

<v-btn
class="mr-2"
color="grey"
:to="{name:'admin-edit',params:{id:propertie.id}}"
flat>
    edit
</v-btn>
    <v-btn
    color="red-darken-3"
    flat>
        deleted
    </v-btn>
  </template>
    </v-list-item>
</v-list>
    </v-card>
</template>