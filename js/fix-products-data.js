/**
 * Script temporal para arreglar productos-data.js
 * Agrega los campos faltantes a todos los productos
 */

// Función para normalizar un producto
function normalizeProduct(product) {
    return {
        ...product,
        bestseller: product.bestseller || false,
        theme: product.theme || null,
        promotion2x1: product.promotion2x1 || false,
        specialDiscount: product.specialDiscount || null,
        ingredients: product.ingredients || []
    };
}

// Función para ejecutar en la consola del navegador
function fixProductsData() {
    if (typeof window.productosData !== 'undefined') {
        console.log('🔧 Arreglando productos...');
        
        const originalCount = window.productosData.length;
        window.productosData = window.productosData.map(normalizeProduct);
        
        console.log(`✅ ${originalCount} productos normalizados`);
        console.log('📋 Estructura actualizada:', window.productosData[0]);
        
        // Recargar la página para aplicar cambios
        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        console.error('❌ productosData no encontrado');
    }
}

// Función para verificar IDs
function verifyProductIds(products) {
    const ids = products.map(p => p.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    
    if (duplicates.length > 0) {
        console.warn('⚠️ IDs duplicados encontrados:', duplicates);
    }
    
    const invalidIds = products.filter(p => !p.id || p.id === null || p.id === undefined);
    if (invalidIds.length > 0) {
        console.error('❌ Productos sin ID válido:', invalidIds);
    }
    
    console.log(`📊 Verificación de IDs: ${products.length} productos, ${duplicates.length} duplicados, ${invalidIds.length} inválidos`);
}

// Ejecutar automáticamente si estamos en el navegador
if (typeof window !== 'undefined' && window.productosData) {
    console.log('🔧 Normalizando productos automáticamente...');
    window.productosData = window.productosData.map(normalizeProduct);
    verifyProductIds(window.productosData);
    console.log('✅ Productos normalizados y verificados');
}