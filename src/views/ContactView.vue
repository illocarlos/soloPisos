<script setup>
import { useField, useForm } from 'vee-validate'
import {  ContactSchema } from '@/validation/validationContact';
import { useContactStore } from '@/stores/Contact'
import { useStoreButtom } from '@/stores/traduction.js'
import { useStoreAlert } from '../stores/alert'
const storeButtom = useStoreButtom()
const alert = useStoreAlert()
const useContact = useContactStore()

// usamos este handlesubmit como cortafuego antes de enviar el formulario debemos llevarnos el objeto a los validadores
const { handleSubmit } = useForm({
  ContactSchema: {
    ...ContactSchema,
  }
});


const name = useField('name')
const description = useField('description')
const email = useField('email')
const phone = useField('phone')

const submit = handleSubmit((values) => {
  if (Object.values(values).includes(undefined)) {
    storeButtom.buttonLeng ? alert.text = 'rellena todo los campos' : alert.text = 'fill in all the fields'
    alert.show = true
    alert.error = true
    return
  }
  useContact.createContact(values)
});

</script>

<template>
  <section class="cardForm section-background">
  <v-card
  class="cardFormCard"
   max-width="700"
  
        flat
        >
    <v-form 
    @submit.prevent="submit">
    <v-text-field
    class="mb-5"
   :label="storeButtom.buttonLeng ? 'Nombre' : 'Name'" 
    v-model="name.value.value"
   :error-messages="name.errorMessage.value"/>
     <v-text-field
          class="mt-5"
          type="email"
          label="Email"
          v-model="email.value.value"
              :error-messages="email.errorMessage.value"/>
      <v-text-field
            class="mb-5"
        :label="storeButtom.buttonLeng ? 'Telefono' : 'Phone'" 
             v-model="phone.value.value"
                :error-messages="phone.errorMessage.value"
                 maxlength="11"
                 :rules="[value => /^[0-9\s]*$/.test(value)]"
            />
               <v-textarea
                    class="mb-5"
                 :label="storeButtom.buttonLeng ? 'Descripcion' : 'Description'" 
                    v-model="description.value.value"
                    :error-messages="description.errorMessage.value">
                </v-textarea>
           
                <v-btn 
                 variant="elevated"
          color="brown-darken-4" 
                    type="submit"
                block>
                {{  storeButtom.buttonLeng ? 'Enviar' : 'Send'}}
                </v-btn>
    </v-form>
  </v-card>
    </section>
</template>
<style scoped>
.section-background {
  background-image: url('../assets/fondo.png');
  background-size: cover;
  background-position: center;
  z-index: -10;
  height: 100vh; /* Cambiado de 100dvh a 100vh */
  width: 100vw; /* Agregado para extender el fondo en el eje x */
  overflow: hidden; /* Para ocultar el desbordamiento del fondo */
}

.cardForm{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
 
}
.cardFormCard {
    background: rgba(192, 192, 192, 0.7);
margin-left:2rem ;
  width: 80%; /* Ajustado para que el ancho sea 100% */
}
@media (min-width: 900px) {

 .cardFormCard {
  margin-left: 20rem;
  width: 100%; /* Ajustado para que el ancho sea 100% */
}

}
</style>