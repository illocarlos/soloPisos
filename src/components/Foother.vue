<script>
import { ref } from 'vue';
import { useStoreButtom } from '@/stores/traduction.js'
export default {
  setup() {
    const storeButtom = useStoreButtom()
    const icons = ref([
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ]);

    const openSocialMediaLink = (icon) => {
      // Replace the following URLs with your actual social media links
      const socialMediaLinks = {
        'mdi-facebook': 'https://www.facebook.com/your-page',
        'mdi-twitter': 'https://twitter.com/your-handle',
        'mdi-linkedin': 'https://www.linkedin.com/in/your-profile',
        'mdi-instagram': 'https://www.instagram.com/your-account',
      };

      // Open the respective social media link in a new tab
      window.open(socialMediaLinks[icon], '_blank');
    };

    return { icons, openSocialMediaLink, storeButtom };
  },
};
</script>

<template>
 <v-footer class=" footerP">
   


<div class="fotherPosition" >

  <div class=" d-flex w-100 ">
    
    
    <v-btn  color="white" v-for="icon in icons" :key="icon"  :icon="icon" variant="plain" size="x-large"
    @click="openSocialMediaLink(icon)"></v-btn>
  </div>
  
  <div  class="text-center w-100">
    {{ new Date().getFullYear() }} — <strong ><span><v-icon icon="$vuetify"></v-icon></span>ueImnova</strong>
  </div>
</div>
  

</v-footer>
</template>

<style scoped>
*{
  color: white;
}
.footerP{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.footerP{

  position: absolute;
  bottom: 100;
margin-top:6rem ;
 background-color:rgba(0, 0, 0, 0.788) ;
}
</style>
