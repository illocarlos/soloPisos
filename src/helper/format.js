export function formatPhoneNumber(value) {
    // Elimina espacios en blanco existentes y caracteres no numéricos
    const cleanedNumber = value.replace(/[^\d]/g, '');

    // Inserta un espacio cada tres dígitos
    const formattedNumber = cleanedNumber.replace(/(\d{3})(?=\d)/g, '$1 ');

    return {
        formattedNumber,
    };
}

export const formatePrice = count => {
    return Number(count).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}