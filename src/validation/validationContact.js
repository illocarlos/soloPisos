export const ContactSchema = {

    // validaciones del formulario que si es false generan ese return que es un mensaje y si no pasa
    name(value) {
        // esta condicion valora si el valor es mayor o igual a 6 caracteres 
        value?.length >= 6 ? true : 'The property title is mandatory or very short'
    },

    phone(value) {
        // condicion que valida que sean solo numero si no lo son mandamos el mensaje 
        /^[0-9\s]+$/.test(value) ? true : 'Should only be numbers ';
    },
    description(value) {
        // aqui validamos que description que contenga valor 
        value ? true : 'Add a description'
    }
}
