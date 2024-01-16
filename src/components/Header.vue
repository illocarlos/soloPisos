<script setup>
import { useStoreButtom } from '@/stores/traduction.js'
const storeButtom = useStoreButtom()



const scrollToTop = (scrollPosition, scrollUp = true) => {
    // Calcular la posición final del desplazamiento
    const finalScrollPosition = scrollUp ? -scrollPosition : scrollPosition;

    // Hacer scroll hasta la posición final en la página
    window.scrollTo({ top: finalScrollPosition, behavior: 'smooth' });
};
</script>

<template>

<div class="total">
    <div>
        <h1 ><span><v-icon color="brown-darken-4" icon="$vuetify"></v-icon></span>ueImnova</h1>
    </div>
      <div class="element-bottom ">
        <div class="dropdown projects font-weight-bold" >
     <p class="text-center" >{{ storeButtom.buttonLeng ? 'disponemos de servicios para ayudarte a elegir' : 'we have services to help you choose' }} 
           <br>
      <v-btn  class="font-weight-bold" flat color="transparent"
                 @click="scrollToTop(800, false) ">
                 {{ storeButtom.buttonLeng ? 'Click aqui ' : 'Click here ' }}</v-btn>
                </p>
          <h3> {{ storeButtom.buttonLeng ? 'Servicios' : 'Services' }} </h3>
        </div>


        <div class="dropdown about-us font-weight-bold" >
            <p class="text-center"  color="black">{{ storeButtom.buttonLeng ? 'ofrecemos una amplio catalogo de viviendas ' : 'Our people and our objectives' }}
                <br>
            <v-btn  class="font-weight-bold" flat color="transparent"
            :to="{ name: 'allProperties' }">
             {{ storeButtom.buttonLeng ? 'Click aqui ' : 'Click here ' }}</v-btn>
            </p>
          <h3>{{ storeButtom.buttonLeng ? 'Viviendas' : 'Homes' }}</h3>
        </div>
        <div class="dropdown services font-weight-bold">
            <p class="text-center" >{{ storeButtom.buttonLeng ?'Puedes ponerte en contacto con nosotros ':'You can contact us'  }} 
                <br>
                <v-btn
            class="font-weight-bold"
                flat
                color="transparent"
                 :to="{name:'contact'}"> {{ storeButtom.buttonLeng ? 'Click aqui ' : 'Click here ' }}</v-btn></p>
          <h3>{{ storeButtom.buttonLeng ? 'Contactanos' : 'Contact' }}</h3>
        </div>
      </div>
   </div>
</template>
<style scoped>

h1 {
   position: absolute;
   top: 8rem;
    font-size: 4rem;
    color: #563003;
}
.total {
  background-image: url('../assets/fond.jpeg');
  background-size: cover;
  background-position: center;
  z-index: -10;
  height: 80vh; /* Cambiado de 80vh a 100vh para ocupar toda la pantalla */
  margin: 0; /* Asegura que no haya márgenes que afecten el tamaño total */
  display: flex;
  flex-direction: column;
}
.element-bottom {
    position: absolute;
    right: 0;
    bottom: 4rem;/*-----*/
    margin-bottom: 41px;/*-----*/
    font-family: 'CabinetGrotesk-Bold', sans-serif;
}

.element-bottom .dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 78px;/*-----*/
    width: 400px;/*-----*/
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: height 0.6s;
    overflow: hidden;
}

.element-bottom .dropdown a {
    text-decoration: none;
    color: #F8F7F3;
}

.element-bottom .dropdown .link-services {
    color: rgba(45, 44, 42, 1);
}

.element-bottom .dropdown h3 {
    margin-right:2rem ;
    padding-top: 40px;
margin-bottom:2rem ;
    font-size: 1.3rem;/*-----*/
}

.element-bottom .dropdown p {
    text-align: center;
    font-size: 0.6rem;
    margin-left: 1rem;/*-----*/
    margin-top: 10px;
    transition: opacity 0.6s;
    opacity: 0;
 
}


.element-bottom .projects {
      color: white;
    background: linear-gradient(-90deg, #563003 27.6%, rgba(56, 54, 154, 0.00) 100%);
}

.element-bottom .projects:hover {
    height: 8rem;/*-----*/
}

.element-bottom .projects:hover p {
    opacity: 1;
    transition: opacity 0.6s;
}

.element-bottom .projects:active {
    mix-blend-mode: plus-lighter;
}

.element-bottom .about-us {
    background: linear-gradient(-90deg, #d38845 18.75%, rgba(87, 153, 247, 0.00) 100%);
}

.element-bottom .about-us:hover {
    height: 8rem;/*-----*/
}

.element-bottom .about-us:hover p {
    opacity: 1;
    transition: opacity 0.6s;
}

.element-bottom .about-us:active {
    mix-blend-mode: plus-lighter;
}

.element-bottom .services {
    color: white;
    background: linear-gradient(-90deg, #686868 34.38%, rgba(8, 255, 184, 0.00) 100%);
}

.element-bottom .services:hover {
   height: 8rem;/*-----*/
}

.element-bottom .services:hover p {
    opacity: 1;
    transition: opacity 0.6s;
}

.element-bottom .services:active {
    mix-blend-mode: plus-lighter;
}



@media (min-width: 900px) {

 h1 {
   
   position: absolute;
   left: 16rem;
   top: 20rem;
    font-size: 8rem;
    color: #563003;
}



.element-bottom {
 
    bottom: 11rem;/*-----*/
    margin-bottom: 41px;/*-----*/
}
.element-bottom .dropdown {
    height: 148px;/*-----*/
    width: 778px;/*-----*/
}
.element-bottom .dropdown p {
      padding-left: 5rem;
       margin-left: 1rem;/*-----*/
    font-size: 1.5rem;/*-----*/
}
.element-bottom .dropdown h3 {
    padding-left: 50px;
    font-size: 2.5rem;/*-----*/
}

.element-bottom .projects:hover {
    height: 10rem;/*-----*/
}

.element-bottom .about-us:hover {
    height: 10rem;/*-----*/
}

.element-bottom .services:hover {
   height: 10rem;/*-----*/
}

}
.service{
    color: white
}

</style>