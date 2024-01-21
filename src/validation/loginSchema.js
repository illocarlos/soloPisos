
// es la logica para mandar mensajes de error a v-validate retornamos el string que queremos mandar y automaticamente procesa 
//el mimso paquete de formulaerio (podemos usar toda las condiciones que queramos)
export const loginSchema = {
    email(value) {
        // aqui hacemos una condicion si el valor no existe mandamos el mensaje no poonemos ternario por que no tenemos un false 
        //ya que si es false seguimos el codigo de abajo que es el validador
        if (!value) {
            return 'required field';
        }
        // si es un email válido esta formula es para validar 
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        // y aqui la condicion si pasa esa formula y si no el mensaje de error
        if (!regex.test(value)) {
            return 'Email invalid';
        }
        return true;
    },
    // y aqui el password ya que cada uno pone el suyo y no hay uno estipulado 
    //pero podriamos poner en la condicion mayusculas numero etc... en este caso simplemente que salga
    password(value) {
        if (value) return true
        return 'Password is required'

    }
}