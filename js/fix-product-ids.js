/**
 * Script para corregir IDs faltantes en productos
 */

function fixProductIds() {
    if (typeof window.productosData === 'undefined') {
        console.error('❌ productosData no disponible');
        return;
    }

    console.log('🔧 Verificando y corrigiendo IDs de productos...');
    
    let fixed = 0;
    
    // Primero, asignar IDs a productos que no los tengan
    window.productosData.forEach((product, index) => {
        if (!product.id || product.id === null || product.id === undefined) {
            product.id = index + 1;
            fixed++;
            console.log(`✅ ID ${product.id} asignado a: ${product.title || 'Sin título'}`);
        }
    });
    
    console.log(`🎯 ${fixed} productos corregidos`);
    console.log(`📊 Total productos: ${window.productosData.length}`);
    
    // Verificar duplicados
    const ids = window.productosData.map(p => p.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    
    if (duplicates.length > 0) {
        console.warn('⚠️ IDs duplicados encontrados:', duplicates);
        
        // Corregir duplicados
        const usedIds = new Set();
        let nextId = 1;
        
        window.productosData.forEach(product => {
            if (usedIds.has(product.id)) {
                // Buscar el siguiente ID disponible
                while (usedIds.has(nextId)) {
                    nextId++;
                }
                console.log(`🔄 Cambiando ID duplicado ${product.id} a ${nextId} para: ${product.title}`);
                product.id = nextId;
            }
            usedIds.add(product.id);
            nextId = Math.max(nextId, product.id + 1);
        });
    }
    
    // Verificar que todos los productos tengan campos básicos
    let invalidProducts = 0;
    window.productosData.forEach((product, index) => {
        if (!product.title) {
            console.error(`❌ Producto ${index + 1} sin título:`, product);
            invalidProducts++;
        }
        if (!product.category) {
            console.error(`❌ Producto ${index + 1} sin categoría:`, product);
            invalidProducts++;
        }
    });
    
    if (invalidProducts > 0) {
        console.error(`❌ ${invalidProducts} productos con campos inválidos`);
    }
    
    console.log('✅ Verificación de IDs completada');
}

// Ejecutar automáticamente
if (typeof window !== 'undefined') {
    setTimeout(() => {
        fixProductIds();
    }, 100);
}

window.fixProductIds = fixProductIds;