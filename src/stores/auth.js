import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()

    function login() {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('dentrooooooooo')
                // ...
            })
            .catch((error) => {
                console.log(error.code)

            });
    }


    return {
        login,
    }
})