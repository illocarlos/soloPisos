export function formatPhoneNumber(value) {
    // formateo para numero de telefono

    // Elimina espacios en blanco existentes y caracteres no numéricos
    const cleanedNumber = value.replace(/[^\d]/g, '');

    // Inserta un espacio cada tres dígitos
    const formattedNumber = cleanedNumber.replace(/(\d{3})(?=\d)/g, '$1 ');

    return {
        formattedNumber,
    };
}
// uso del simbolo del dolar para formatear un numero 
export const formatePrice = count => {
    return Number(count).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}