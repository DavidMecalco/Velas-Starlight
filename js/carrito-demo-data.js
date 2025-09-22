/* ========================================
   DATOS DE DEMOSTRACIÓN PARA EL CARRITO
   ======================================== */

// Productos de ejemplo para demostrar el carrito
const demoProducts = [
    {
        id: 'vela-001',
        name: 'Vela Aromática Lavanda',
        price: 299.00,
        image: 'https://images.unsplash.com/photo-1602874801006-e26d3d17d0a5?w=300&h=300&fit=crop',
        color: 'Morado',
        size: 'Mediana (8cm)',
        burnTime: '25-30 horas',
        description: 'Vela artesanal con aroma relajante de lavanda'
    },
    {
        id: 'vela-002',
        name: 'Vela Vainilla Canela',
        price: 349.00,
        image: 'https://images.unsplash.com/photo-1602874801006-e26d3d17d0a5?w=300&h=300&fit=crop',
        color: 'Beige',
        size: 'Grande (12cm)',
        burnTime: '40-45 horas',
        description: 'Mezcla perfecta de vainilla y canela'
    },
    {
        id: 'vela-003',
        name: 'Vela Cítricos Frescos',
        price: 279.00,
        image: 'https://images.unsplash.com/photo-1602874801006-e26d3d17d0a5?w=300&h=300&fit=crop',
        color: 'Amarillo',
        size: 'Pequeña (6cm)',
        burnTime: '15-20 horas',
        description: 'Energizante aroma de cítricos naturales'
    }
];

// Función para agregar productos de demostración al carrito
function addDemoProductsToCart() {
    if (window.modernCart) {
        // Agregar algunos productos de ejemplo
        window.modernCart.addToCart({
            ...demoProducts[0],
            quantity: 2
        });
        
        window.modernCart.addToCart({
            ...demoProducts[1],
            quantity: 1
        });
        
        console.log('Productos de demostración agregados al carrito');
    }
}

// Función para limpiar datos de demostración
function clearDemoData() {
    if (window.modernCart) {
        window.modernCart.clearCart();
        console.log('Datos de demostración eliminados');
    }
}

// Funciones de demostración eliminadas - ahora se conecta con el sistema real

// Exportar funciones para uso global
window.addDemoProductsToCart = addDemoProductsToCart;
window.clearDemoData = clearDemoData;