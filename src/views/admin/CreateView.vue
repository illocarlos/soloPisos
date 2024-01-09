<script setup>
import { useForm, useField } from 'vee-validate'
import{ imageSchema , validationSchema }from '@/validation/propertiesSchema'

const { handleSubmit } = useForm({
      validationSchema: {
        ...validationSchema,
        ...imageSchema
    }
})
const countRooms = [1, 2, 3, 4, 5, 6, 7, 8];

const submit = handleSubmit((values) => {
  
})

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
v-model="title.alue.value"
:error-message="title.errorMessage.value"/>

<v-file-input
accept="image/jpeg"
label="photo"
prepend-icon="mdi-camera"
class="mb-5"
/>
    <v-text-field
    class="mb-5"
    label="Price"/>


    <v-row>
<v-col
cols="12"
md="4"
>
    <v-select
    class="mb-5"
    label="available rooms"
    :items="countRooms"/>
</v-col>
<v-col
    cols="12"
    md="4"
    >
      <v-select
        class="mb-5"
        label="WC"
        :items="countRooms"/>
        </v-col>
        <v-col
        cols="12"
    md="4">

          <v-select
        class="mb-5"
        label="available rooms"
        :items="countRooms"/>
        </v-col>
          </v-row>
                <v-textarea
                class="mb-5"
                label="Description">
            </v-textarea>
             <v-row>
                <v-col
                cols="12"
                md="6">
                    <v-checkbox
                    class="mb-5"
                    label="pool"/>
                </v-col>
                <v-col
                cols="12"
                md="6">
                    <v-checkbox
                    class="mb-5"
                    label="yard"/>
                </v-col>
        </v-row>
        <v-btn
        block
        color="grey">
            add propertie
        </v-btn>
  </v-form>
    </v-card>
</template>