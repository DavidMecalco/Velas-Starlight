/**
 * Script de debug para productos
 */

function debugProducts() {
    console.log('🔍 DEBUGGING PRODUCTOS');
    
    // Verificar que productosData existe
    if (typeof window.productosData === 'undefined') {
        console.error('❌ window.productosData no está definido');
        return;
    }
    
    console.log(`📊 Total productos: ${window.productosData.length}`);
    
    // Verificar estructura de cada producto
    window.productosData.forEach((product, index) => {
        console.log(`\n📦 Producto ${index + 1}:`);
        console.log(`  ID: ${product.id}`);
        console.log(`  Título: ${product.title}`);
        console.log(`  Categoría: ${product.category}`);
        console.log(`  Imagen: ${product.image}`);
        console.log(`  Disponible: ${product.available}`);
        console.log(`  Nuevo: ${product.new}`);
        console.log(`  Destacado: ${product.featured}`);
        console.log(`  Bestseller: ${product.bestseller}`);
        console.log(`  Tema: ${product.theme}`);
        console.log(`  Promoción 2x1: ${product.promotion2x1}`);
        console.log(`  Descuento especial: ${product.specialDiscount}`);
        console.log(`  Ingredientes: ${product.ingredients ? product.ingredients.length : 'undefined'}`);
        
        // Verificar campos requeridos
        const requiredFields = ['id', 'title', 'category', 'image'];
        const missingFields = requiredFields.filter(field => !product[field]);
        
        if (missingFields.length > 0) {
            console.error(`  ❌ Campos faltantes: ${missingFields.join(', ')}`);
        } else {
            console.log(`  ✅ Campos básicos completos`);
        }
    });
    
    // Verificar el generador de productos
    if (typeof window.EnhancedProductGenerator !== 'undefined') {
        console.log('\n🎨 Probando generador de productos...');
        
        const testGenerator = new window.EnhancedProductGenerator();
        const testProducts = window.productosData.slice(0, 3); // Solo los primeros 3
        
        testProducts.forEach((product, index) => {
            try {
                const card = testGenerator.generateProductCard(product, index);
                if (card) {
                    console.log(`  ✅ Tarjeta generada para: ${product.title}`);
                } else {
                    console.error(`  ❌ Tarjeta vacía para: ${product.title}`);
                }
            } catch (error) {
                console.error(`  ❌ Error generando tarjeta para ${product.title}:`, error);
            }
        });
    }
    
    console.log('\n🏁 Debug completado');
}

// Ejecutar debug automáticamente
if (typeof window !== 'undefined') {
    // Esperar a que se carguen los productos
    setTimeout(() => {
        debugProducts();
    }, 1000);
}

// Hacer disponible globalmente
window.debugProducts = debugProducts;