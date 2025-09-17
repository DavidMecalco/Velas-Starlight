/**
 * Debug específico para página de detalle
 */

console.log('🔍 DEBUG PÁGINA DE DETALLE');

// Función para debuggear la página de detalle
function debugProductDetail() {
    console.log('=== DEBUG DETALLE DE PRODUCTO ===');
    
    // Obtener ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log('ID desde URL:', productId, typeof productId);
    
    // Verificar productos disponibles
    console.log('productosData disponible:', !!window.productosData);
    console.log('productosData longitud:', window.productosData ? window.productosData.length : 'N/A');
    
    if (window.productosData && window.productosData.length > 0) {
        console.log('IDs disponibles:', window.productosData.map(p => ({ id: p.id, type: typeof p.id, title: p.title })));
        
        // Buscar el producto específico
        const product = window.productosData.find(p => {
            return p.id == productId || 
                   p.id === productId || 
                   p.id === parseInt(productId) || 
                   p.id === productId.toString() ||
                   parseInt(p.id) === parseInt(productId);
        });
        
        console.log('Producto encontrado:', !!product);
        if (product) {
            console.log('Producto:', { id: product.id, title: product.title, category: product.category });
        } else {
            console.error('❌ Producto no encontrado con ID:', productId);
            
            // Intentar búsquedas alternativas
            console.log('Intentando búsquedas alternativas...');
            const byString = window.productosData.find(p => p.id.toString() === productId);
            const byNumber = window.productosData.find(p => p.id === parseInt(productId));
            const byLoose = window.productosData.find(p => p.id == productId);
            
            console.log('Por string:', !!byString);
            console.log('Por número:', !!byNumber);
            console.log('Por comparación suelta:', !!byLoose);
        }
    }
}

// Ejecutar debug después de que se carguen los datos
setTimeout(debugProductDetail, 1000);

// Hacer disponible globalmente
window.debugProductDetail = debugProductDetail;