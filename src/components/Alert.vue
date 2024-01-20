<script setup>
import { ref } from 'vue';
import { useStoreAlert } from '@/stores/alert';

const alert = useStoreAlert();
const show = ref(false);

setTimeout(() => {
  show.value = true;
}, 2000);
</script>

<template>
  <div v-if="alert.show" class="alert-container">

       <v-icon v-if="!alert.error" class="mr-4" color="success" icon="mdi-checkbox-marked-circle"/>
        <v-icon  v-else  class="mr-4" color="error" icon="mdi-cancel"/>
               <p
               class="font-weight-bold"
               :class="alert.error?'AlertError':'SuccessError'">{{ alert.text }}</p>
  </div>
</template>

<style scoped>

.alert-container {
  border-radius:2rem ;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  position: fixed;
  left: 40%;
  top: 10%;
 padding: 3rem;
  background-color:rgba(240, 240, 240, 0.679) ;
  z-index: 100;

}
.AlertError{
  text-transform: uppercase;
color: red;
}
.SuccessError{
    text-transform: uppercase;
color: green;
}

</style>
