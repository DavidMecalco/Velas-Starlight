/**
 * Productos de emergencia en caso de que haya problemas con el archivo principal
 */

const emergencyProducts = [
    {
        id: 1,
        title: "Vela de Soya",
        category: "Vela",
        description: "Vela artesanal de soya con fragancias naturales",
        image: "../images/vela-soya.jpeg",
        types: ["Soya"],
        sizes: [{ label: "100 gr", price: 120 }],
        fragrances: ["Vainilla", "Lavanda"],
        characteristics: [],
        care: [],
        featured: false,
        new: false,
        bestseller: false,
        available: true,
        theme: null,
        promotion2x1: false,
        specialDiscount: null,
        ingredients: []
    },
    {
        id: 2,
        title: "Vela de Parafina",
        category: "Vela",
        description: "Vela artesanal de parafina con fragancias intensas",
        image: "../images/vela-parafina.jpeg",
        types: ["Parafina"],
        sizes: [{ label: "100 gr", price: 120 }],
        fragrances: ["Rosas", "Canela"],
        characteristics: [],
        care: [],
        featured: false,
        new: false,
        bestseller: false,
        available: true,
        theme: null,
        promotion2x1: false,
        specialDiscount: null,
        ingredients: []
    }
];

function useEmergencyProducts() {
    console.warn('⚠️ Usando productos de emergencia');
    window.productosData = emergencyProducts;
    
    // Reinicializar el generador si existe
    if (window.productGenerator) {
        window.productGenerator.updateProducts(emergencyProducts);
    }
}

// Verificar si los productos principales están corruptos
function checkProductsHealth() {
    if (!window.productosData || !Array.isArray(window.productosData) || window.productosData.length === 0) {
        console.error('❌ Productos principales no disponibles o corruptos');
        useEmergencyProducts();
        return false;
    }
    
    // Verificar que al menos algunos productos tengan estructura básica
    const validProducts = window.productosData.filter(p => p.id && p.title && p.category);
    
    if (validProducts.length < window.productosData.length * 0.5) {
        console.error('❌ Más del 50% de productos tienen estructura inválida');
        useEmergencyProducts();
        return false;
    }
    
    console.log('✅ Productos principales están saludables');
    return true;
}

// Ejecutar verificación
if (typeof window !== 'undefined') {
    setTimeout(() => {
        checkProductsHealth();
    }, 200);
}

window.useEmergencyProducts = useEmergencyProducts;
window.checkProductsHealth = checkProductsHealth;