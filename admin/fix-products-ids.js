/**
 * ========================================
 * CORRECTOR DE IDs PARA PRODUCTOS
 * ========================================
 * Este script corrige automáticamente los productos sin ID
 */

// Función para corregir IDs faltantes
function fixProductIds() {
    console.log('🔧 Iniciando corrección de IDs...');
    
    if (!window.productosData) {
        console.error('❌ No se encontró productosData');
        return null;
    }

    let maxId = 0;
    let productsFixed = 0;
    const originalData = [...window.productosData];

    // Paso 1: Encontrar el ID más alto existente
    originalData.forEach(product => {
        if (product.id && typeof product.id === 'number' && product.id > maxId) {
            maxId = product.id;
        }
    });

    console.log(`📊 ID más alto encontrado: ${maxId}`);

    // Paso 2: Asignar IDs a productos que no los tengan
    const fixedData = originalData.map((product, index) => {
        const fixedProduct = { ...product };
        
        if (!fixedProduct.id || typeof fixedProduct.id !== 'number') {
            maxId++;
            fixedProduct.id = maxId;
            productsFixed++;
            console.log(`✅ ID ${maxId} asignado a: "${fixedProduct.title}"`);
        }
        
        return fixedProduct;
    });

    // Paso 3: Generar código corregido
    if (productsFixed > 0) {
        console.log(`🎉 Se corrigieron ${productsFixed} productos`);
        
        const correctedCode = generateCorrectedCode(fixedData);
        
        // Actualizar la variable global
        window.productosData = fixedData;
        
        return {
            fixed: productsFixed,
            total: fixedData.length,
            code: correctedCode,
            data: fixedData
        };
    } else {
        console.log('✅ Todos los productos ya tienen ID válido');
        return {
            fixed: 0,
            total: originalData.length,
            code: null,
            data: originalData
        };
    }
}

// Función para generar código corregido
function generateCorrectedCode(products) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-MX');
    const timeStr = now.toLocaleTimeString('es-MX');
    
    // Calcular estadísticas
    const categories = [...new Set(products.map(p => p.category))];
    const fragrances = [...new Set(products.flatMap(p => p.fragrances || []))];
    const themes = [...new Set(products.filter(p => p.theme).map(p => p.theme))];
    const promotions = products.filter(p => 
        p.promotion2x1 || (p.specialDiscount && p.specialDiscount.percentage > 0)
    ).length;

    const header = `/**
* ========================================
* BASE DE DATOS DE PRODUCTOS
* Velas Starlight - Products Database
* ========================================
* 
* 📅 Generado: ${dateStr} a las ${timeStr}
* 📊 Total productos: ${products.length}
* 🏷️ Categorías: ${categories.join(', ')}
* 🌸 Fragancias únicas: ${fragrances.length}
* 🎯 Temáticas: ${themes.length}
* 🎁 Promociones activas: ${promotions}
* 
* ========================================
*/

// 🛍️ AQUÍ AGREGAS NUEVOS PRODUCTOS FÁCILMENTE
const productosData = ${JSON.stringify(products, null, 4)};

// 🚀 EXPORTAR PARA USO EN LA TIENDA
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productosData;
}

// 🌐 HACER DISPONIBLE GLOBALMENTE
if (typeof window !== 'undefined') {
    window.productosData = productosData;
}`;

    return header;
}

// Función para descargar el archivo corregido
function downloadCorrectedFile() {
    const result = fixProductIds();
    
    if (!result || !result.code) {
        alert('✅ Todos los productos ya tienen ID. No es necesario corregir nada.');
        return;
    }
    
    // Crear blob y descargar
    const blob = new Blob([result.code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos-data-corregido.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`✅ Archivo descargado con ${result.fixed} productos corregidos!\n\nReemplaza el archivo js/productos-data.js con el archivo descargado.`);
}

// Función para mostrar reporte de IDs
function showIdReport() {
    if (!window.productosData) {
        console.error('❌ No se encontró productosData');
        return;
    }

    console.log('\n📊 REPORTE DE IDs DE PRODUCTOS');
    console.log('='.repeat(50));
    
    const withId = [];
    const withoutId = [];
    
    window.productosData.forEach((product, index) => {
        if (product.id && typeof product.id === 'number') {
            withId.push({ index, id: product.id, title: product.title });
        } else {
            withoutId.push({ index, title: product.title });
        }
    });
    
    console.log(`✅ Productos CON ID: ${withId.length}`);
    withId.forEach(p => console.log(`   ${p.id}: ${p.title}`));
    
    console.log(`\n❌ Productos SIN ID: ${withoutId.length}`);
    withoutId.forEach(p => console.log(`   Índice ${p.index}: ${p.title}`));
    
    console.log(`\n📈 Total: ${window.productosData.length} productos`);
    console.log('='.repeat(50));
    
    return { withId: withId.length, withoutId: withoutId.length, total: window.productosData.length };
}

// Ejecutar automáticamente al cargar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log('🔍 Verificando IDs de productos...');
        const report = showIdReport();
        
        if (report && report.withoutId > 0) {
            console.log(`⚠️ Se encontraron ${report.withoutId} productos sin ID`);
            console.log('💡 Usa fixProductIds() para corregirlos automáticamente');
            console.log('📥 Usa downloadCorrectedFile() para descargar el archivo corregido');
        }
    }, 1000);
});

// Hacer funciones disponibles globalmente
window.productIdFixer = {
    fix: fixProductIds,
    download: downloadCorrectedFile,
    report: showIdReport,
    generateCode: generateCorrectedCode
};