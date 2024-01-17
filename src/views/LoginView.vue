<script setup>
// llamamos este paquete de validacion
import {useForm,useField} from 'vee-validate'
// usamos un validator es como un helper y para usarlo como buena practica lo llamamos de la misma forma en la que debemos llamar
//en el useForm ya que se nombrade la misma forma
import { loginSchema as validationSchema } from '@/validation/loginSchema'
import { useStoreButtom } from '@/stores/traduction.js'

import{ useAuthStore }from'@/stores/auth'
const storeButtom = useStoreButtom()
//aqui lo mandamos del submit al validacion que creamos y esta directamente asociada al formulario con la misma palabra reservada 
//esto es lo mismo como useForm({validationSchema:loginSchema })
const { handleSubmit } = useForm({ validationSchema })
const useAuth = useAuthStore()

const email = useField('email')
const password = useField('password')

const submit = handleSubmit((value) => {
  useAuth.login(value)
 
})
</script>

<template>
  <!-- aqui usamos una v-card como padre y dentro intruducimos tanto elkementos de la card como card-title como un formulario 
  esta predeterminado ademas introducimos un paquete de validaciones de vue tambien vee-validate (tenemos vuelidate) usandolo para el formulario 
 -->
  <v-card
  max-width="600"
  flat
  class="mx-auto totalHeigth">
    <v-card-title
     class="text-h4 text-center font-weight-bold"
     tag="h4">
      {{ storeButtom.buttonLeng ? 'Iniciar sesion' : 'Log In' }}
    </v-card-title>
      <v-alert
      v-if="useAuth.hasError"
        type="error"
        :text="useAuth.errroMssg"
      ></v-alert>
    <v-form>
      <!-- si revisamor vuedeveltols vemos que debemos introducirnos en el objeto para el model en value.value y para 
      que se aplique el error que previamente creamos el validation/loginShema.js tenemos que llamarlo como errorMessage.value  -->
      
      <v-text-field
      class="mt-5"
      type="email"
      label="Email"
      v-model="email.value.value"
          :error-messages="email.errorMessage.value"

      bg-color="brown-lighten-4"/>
    <v-text-field
        class="mt-5"
        type="password"
        v-model="password.value.value"
        :label=" storeButtom.buttonLeng ? 'Contraseña' : 'Password'  "
        :error-messages="password.errorMessage.value"
        bg-color="brown-lighten-4"/>
     <v-btn
     class="font-weight-bold mt-5"
    block
    color="blue-grey-lighten-3"
    @click="submit"
     >
       {{ storeButtom.buttonLeng ? 'Inicio' : 'Log in'  }}
     </v-btn>
    </v-form>
  </v-card>
</template>
<style scoped>
.totalHeigth{
  margin-top:10rem ;
  height: 100vh;
}

</style>
