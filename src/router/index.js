import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propertie/:id',
      name: 'propertie',
      component: () => import('../views/PropertieView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      // definir un metadato llamado requieresAuth y se le asigna el valor true en la ruta / admin y sus rutas hijas.
      // El propósito de este metadato(requieresAuth)
      // es indicar que estas rutas específicas requieren que el usuario esté autenticado para acceder a ellas
      // y asi protegerlas si no estas logeado
      // el meta se puede colocar en las rutas que desees pero si estan dentro de un padre aunque se pueda colocar en cada uno de los children
      // una vez se coloca en el padre se propaga
      meta: { requiresAuth: true },
      // Las siguientes son las vistas accesibles desde el panel de administración (AdminLayout).
      // Cada ruta representa una funcionalidad específica dentro del panel de administración.
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/create',
          name: 'admin-create',
          component: () => import('../views/admin/CreateView.vue'),
        },
        {
          path: '/admin/edit/:id',
          name: 'admin-edit',
          component: () => import('../views/admin/EditView.vue'),
        },
      ]
    }
  ]
})
// guard navegacion para proteger rutas
// beforeEach ejecuta lo que hay dentro cada vez que visites una url 
// to:te da la informacion de la pagina a la que quieres ir
// from: es la infromacion de la url en la que estas
// next: sabemos de ironhack qes el mismo valor que usamos siempre next se ejecutara si o si 
router.beforeEach(async (to, from, next) => {
  // el metodo some es js vanilla es si alguno de las condiciones se  cumple  en este caso laas url entra
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  // compureba si el usuario esa logeado/autenticado
  if (requiresAuth) {
    // si esta logeado lo mandamos a la funcion atenticateUser
    try {
      // mandamos a la funcion de atenticar usuario (abajo)
      await autenticateUser()
      // nota ! siempre debe haber un next con el await para seguir el proceso si no no avanzara 
      next()
      // si algun tipo de errror nos reflejara en consola el errror y nos mandara al login para volver a logearse
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    //  next es muy importante por que es para que muestre la informacion y se vaya al siguiente middleware
    next()
  }


});
function autenticateUser() {

  const auth = useFirebaseAuth()
  // resolve y reject es parecido a try y catch resolve se usar para realizar la accion y reject si hay un error
  return new Promise((resolve, reject) => {
    // este unSuscribe se usa para dejar de esuchar cambios que ocurran en  onAuthStateChanged ya que es codigo de firebase 
    //y tiene mas funcionalidades y puede causar problemas es una forma de que la web procese adecuadamente 
    const unSuscribe = onAuthStateChanged(auth, (user) => {
      unSuscribe()
      if (user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}
export default router
