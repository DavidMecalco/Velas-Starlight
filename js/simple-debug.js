/**
 * Debug simple para productos
 */

console.log('🔍 DIAGNÓSTICO SIMPLE DE PRODUCTOS');

// Verificar datos básicos
setTimeout(() => {
    console.log('=== VERIFICACIÓN DE DATOS ===');
    console.log('productosData existe:', typeof window.productosData !== 'undefined');
    console.log('productosData es array:', Array.isArray(window.productosData));
    console.log('productosData longitud:', window.productosData ? window.productosData.length : 'N/A');
    
    if (window.productosData && window.productosData.length > 0) {
        console.log('Primer producto:', {
            id: window.productosData[0].id,
            title: window.productosData[0].title,
            category: window.productosData[0].category
        });
    }
    
    console.log('=== VERIFICACIÓN DE GENERADOR ===');
    console.log('EnhancedProductGenerator existe:', typeof window.EnhancedProductGenerator !== 'undefined');
    
    console.log('=== VERIFICACIÓN DE CONTENEDOR ===');
    const container = document.getElementById('product-grid');
    console.log('Contenedor existe:', !!container);
    if (container) {
        console.log('Contenedor hijos:', container.children.length);
        console.log('Contenedor HTML:', container.innerHTML.length > 0 ? 'Tiene contenido' : 'Vacío');
    }
    
    // Intentar generar una tarjeta manualmente
    if (window.EnhancedProductGenerator && window.productosData && window.productosData.length > 0) {
        console.log('=== PRUEBA DE GENERACIÓN ===');
        try {
            const generator = new window.EnhancedProductGenerator();
            const testProduct = window.productosData[0];
            const card = generator.generateProductCard(testProduct, 0);
            console.log('Tarjeta generada:', card ? 'SÍ' : 'NO');
            console.log('Longitud de tarjeta:', card ? card.length : 0);
        } catch (error) {
            console.error('Error generando tarjeta:', error);
        }
    }
    
}, 1000);