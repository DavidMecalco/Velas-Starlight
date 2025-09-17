/**
 * Script de corrección inmediata para productos
 * Se ejecuta tan pronto como se carga
 */

(function() {
    'use strict';
    
    console.log('🚀 Iniciando corrección inmediata de productos...');
    
    // Función para corregir productos inmediatamente
    function immediateProductFix() {
        // Esperar a que productosData esté disponible
        if (typeof window.productosData === 'undefined') {
            console.log('⏳ Esperando productosData...');
            setTimeout(immediateProductFix, 50);
            return;
        }
        
        if (!Array.isArray(window.productosData)) {
            console.error('❌ productosData no es un array:', typeof window.productosData);
            return;
        }
        
        console.log(`📊 Verificando ${window.productosData.length} productos...`);
        
        let fixed = 0;
        
        // Solo corregir lo esencial
        window.productosData.forEach((product, index) => {
            // Asegurar que tenga ID
            if (!product.id || product.id === null || product.id === undefined) {
                product.id = index + 1;
                fixed++;
            }
            
            // Asegurar campos mínimos para evitar errores
            if (product.bestseller === undefined) product.bestseller = false;
            if (product.theme === undefined) product.theme = null;
            if (product.promotion2x1 === undefined) product.promotion2x1 = false;
            if (product.specialDiscount === undefined) product.specialDiscount = null;
            if (product.ingredients === undefined) product.ingredients = [];
        });
        
        if (fixed > 0) {
            console.log(`✅ ${fixed} productos corregidos`);
        }
        
        console.log('🎯 Productos verificados y listos');
    }
    
    // Ejecutar inmediatamente
    immediateProductFix();
    
})();