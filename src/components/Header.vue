<script setup>
import { useStoreButtom } from '@/stores/traduction.js'
import { useRouter } from 'vue-router';
const storeButtom = useStoreButtom()
const router = useRouter();


const goHome = () => {
    router.push({ name: 'allProperties' });
}
const goContact = () => {
    router.push({ name: 'contact' })
    
}

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
        <div class="dropdown service  font-weight-bold" >
     <p class="text-center" >{{ storeButtom.buttonLeng ? 'disponemos de servicios para ayudarte a elegir' : 'we have services to help you choose' }} 
           <br>
           <v-Link class="font-weight-bold btnContect"  @click="scrollToTop(800, false) ">
                      {{ storeButtom.buttonLeng ? 'Click aqui ' : 'Click here ' }}</v-link>
        </p>
          <h3> {{ storeButtom.buttonLeng ? 'Servicios' : 'Services' }} </h3>
        </div>


        <div class="dropdown about-us font-weight-bold" >
            <p class="text-center"  color="black">{{ storeButtom.buttonLeng ? 'ofrecemos una amplio catalogo de viviendas ' : 'Our people and our objectives' }}
                <br>
            <v-link class="btnContactBlack font-weight-bold" @click="goHome">
             {{ storeButtom.buttonLeng ? 'Click aqui ' : 'Click here ' }}</v-link>
            </p>
          <h3>{{ storeButtom.buttonLeng ? 'Viviendas' : 'Homes' }}</h3>
        </div>
        <div class="dropdown contact font-weight-bold">
            <p class="text-center" >{{ storeButtom.buttonLeng ?'Puedes ponerte en contacto con nosotros ':'You can contact us'  }} 
                <br>
                <v-link class="font-weight-bold btnContect" @click="goContact"
                 :to="{name:'contact'}"> {{ storeButtom.buttonLeng ? 'Click aqui ' : 'Click here ' }}</v-link></p>
          <h3>{{ storeButtom.buttonLeng ? 'Contactanos' : 'Contact' }}</h3>
        </div>
      </div>
   </div>
</template>
<style scoped>

h1 {
   position: absolute;
   top: 8rem;
    font-size: 3rem;
    color: #563003;
}
.total {
  background-image: url('../assets/fondo.jpeg');
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
    bottom: 3rem;/*-----*/
    margin-bottom: 41px;/*-----*/
    font-family: 'CabinetGrotesk-Bold', sans-serif;
}

.element-bottom .dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 58px;/*-----*/
    width: 240px;/*-----*/
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
.element-bottom.dropdown h3:hover{
    height: 8rem !important;
}

.element-bottom .service {
      color: white;
    background: linear-gradient(90deg, #563003 24.6%, rgba(56, 54, 154, 0.00) 100%);
}

.element-bottom .service:hover {
   
    height: 8rem;/*-----*/
}

.element-bottom .service:hover p {
    opacity: 1;
    transition: opacity 0.6s;
}

.element-bottom .about-us {
    background: linear-gradient(90deg, #d38845 24.75%, rgba(87, 153, 247, 0.00) 100%);
}

.element-bottom .about-us:hover {
    height: 8rem;/*-----*/
}

.element-bottom .about-us:hover p {
    opacity: 1;
    transition: opacity 0.6s;
}


.element-bottom .contact {
    color: white;
    background: linear-gradient(90deg, #686868 24.38%, rgba(8, 255, 184, 0.00) 100%);
}

.element-bottom .contact:hover {
   height: 8rem;/*-----*/
}

.element-bottom .contact:hover p {
    opacity: 1;
    transition: opacity 0.6s;
}
.btnContect{
    color: white;
    text-transform:uppercase;
}
.btnContactBlack{
color: black;
    text-transform:uppercase;
}



@media (min-width: 900px) and (max-width: 1400px) {
    .btnContectBlack {
        font-size:1.2rem !important ;
    }

    .btnContect {
        font-size:1.2rem !important ;
    }

 h1 {
   
   position: absolute;
   left: 5rem;
   top: 10rem;
    font-size: 5rem;
    color: #563003;
}
.element-bottom {
 
    bottom: 4rem;/*-----*/
  
}
.element-bottom .dropdown {
    height: 78px;/*-----*/
    width: 478px;/*-----*/
}
.element-bottom .dropdown p {
      padding-left: 5rem;
       margin-left: 1rem;/*-----*/
    font-size: 1rem;/*-----*/
}
.element-bottom .dropdown h3 {
    padding-left: 50px;
    font-size: 2.5rem;/*-----*/
}

.element-bottom .service:hover {
    height: 10rem;/*-----*/
}

.element-bottom .about-us:hover {
    height: 10rem;/*-----*/
}

}


@media (min-width: 1400px) and (max-width: 1700px)  {

    .btnContectBlack {
        font-size:1.2rem !important ;
    }

    .btnContect {
        font-size:1.2rem !important ;
    }

 h1 {
   
   position: absolute;
   left: 5rem;
   top: 10rem;
    font-size: 5rem;
    color: #563003;
}
.element-bottom {
 
    bottom: 13rem;/*-----*/
    margin-bottom: 41px;/*-----*/
}
.element-bottom .dropdown {
    height: 78px;/*-----*/
    width: 478px;/*-----*/
}
.element-bottom .dropdown p {
      padding-left: 5rem;
       margin-left: 1rem;/*-----*/
    font-size: 1rem;/*-----*/
}
.element-bottom .dropdown h3 {
    padding-left: 50px;
    font-size: 2.5rem;/*-----*/
}

.element-bottom .service:hover {
    height: 10rem;/*-----*/
}

.element-bottom .about-us:hover {
    height: 10rem;/*-----*/
}

.element-bottom .contact:hover {
   height: 10rem;/*-----*/
}

}
.contact{
    color: white
}

</style>