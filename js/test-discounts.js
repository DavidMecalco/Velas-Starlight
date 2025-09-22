/**
 * SCRIPT DE PRUEBA PARA DESCUENTOS
 * Velas Starlight - Test Discount Functionality
 */

(function() {
    'use strict';

    console.log('🧪 Iniciando pruebas de descuentos...');

    // Función para simular agregar un producto con descuento
    function testAddProductWithDiscount() {
        console.log('\n🛒 === PRUEBA: Agregar producto con descuento ===');

        // Simular producto "Flor en Cemento" con promoción 2x1
        const testProduct = {
            id: 1,
            title: "Flor en Cemento",
            category: "Vela",
            image: "../images/vela-starlight-rosas.jpeg",
            type: "Soya",
            size: { label: "45 gr", price: 60 },
            fragrance: "Rosas Especiales",
            quantity: 2, // Para activar 2x1
            unitPrice: 60,
            price: 60,
            total: 120,
            promotion2x1: true,
            specialDiscount: null
        };

        // Agregar al carrito
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(testProduct);
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log('✅ Producto agregado al carrito');
        console.log('📊 Carrito actual:', cart);

        // Si estamos en la página del carrito, actualizar
        if (window.location.pathname.includes('carrito.html') && window.enhancedCart) {
            console.log('🔄 Actualizando carrito en página...');
            window.enhancedCart.loadCart();
            window.enhancedCart.displayCartItems();
            window.enhancedCart.updateTotals();

            // Ejecutar diagnóstico
            setTimeout(() => {
                if (window.enhancedCart.diagnoseDiscounts) {
                    window.enhancedCart.diagnoseDiscounts();
                }
            }, 500);
        }

        return testProduct;
    }

    // Función para probar descuento especial
    function testAddProductWithSpecialDiscount() {
        console.log('\n🛒 === PRUEBA: Agregar producto con descuento especial ===');

        // Simular producto "Suspiro de Ángel" con descuento especial
        const testProduct = {
            id: 2,
            title: "Suspiro de Ángel",
            category: "Vela",
            image: "../images/vela-starlight-angeles.jpeg",
            type: "Soya",
            size: { label: "120 gr", price: 65 },
            fragrance: "Lavanda",
            quantity: 1,
            unitPrice: 65,
            price: 65,
            total: 65,
            promotion2x1: false,
            specialDiscount: { percentage: 10, text: "Oferta especial" }
        };

        // Agregar al carrito
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(testProduct);
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log('✅ Producto con descuento especial agregado al carrito');
        console.log('📊 Carrito actual:', cart);

        // Si estamos en la página del carrito, actualizar
        if (window.location.pathname.includes('carrito.html') && window.enhancedCart) {
            console.log('🔄 Actualizando carrito en página...');
            window.enhancedCart.loadCart();
            window.enhancedCart.displayCartItems();
            window.enhancedCart.updateTotals();

            // Ejecutar diagnóstico
            setTimeout(() => {
                if (window.enhancedCart.diagnoseDiscounts) {
                    window.enhancedCart.diagnoseDiscounts();
                }
            }, 500);
        }

        return testProduct;
    }

    // Función específica para probar el problema de Flor de Cempasúchil
    function testFlorCempasuchilScenario() {
        console.log('\n🌸 === PRUEBA DEL ESCENARIO REPORTADO: Flor de Cempasúchil ===');

        // Limpiar carrito primero
        clearTestCart();

        // Simular agregar Flor de Cempasúchil con 2 unidades (como reportó el usuario)
        const florCempasuchil = {
            id: 5,
            title: 'Flor de Cempasúchil',
            category: 'Vela',
            image: '../images/vela-flor-cempasuchil.jpeg',
            type: 'Parafina',
            size: { label: '90 gr', price: 55 },
            fragrance: 'Cempasúchil',
            quantity: 2,
            unitPrice: 55,
            price: 55,
            total: 110,
            promotion2x1: true,
            specialDiscount: null
        };

        // Agregar al carrito
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(florCempasuchil);
        localStorage.setItem('cart', JSON.stringify(cart));

        console.log('✅ Flor de Cempasúchil agregada con 2 unidades');
        console.log('📊 Estado esperado:');
        console.log('   - Paso 1: Subtotal $110 (sin descuento visible aún)');
        console.log('   - Paso 2: Subtotal $110, Descuento -$55, Total $55');
        console.log('   - PDF: Precio unitario $55 (no $27.50)');

        // Si estamos en la página del carrito, actualizar
        if (window.location.pathname.includes('carrito.html') && window.enhancedCart) {
            console.log('🔄 Actualizando carrito en página...');
            window.enhancedCart.loadCart();
            window.enhancedCart.displayCartItems();
            window.enhancedCart.updateTotals();

            // Ejecutar diagnóstico
            setTimeout(() => {
                if (window.enhancedCart.diagnoseDiscounts) {
                    console.log('\n🔍 DIAGNÓSTICO DEL CARRITO:');
                    window.enhancedCart.diagnoseDiscounts();
                }

                console.log('\n💡 PRUEBA EL FLUJO COMPLETO:');
                console.log('1. Ve al Paso 2 (Envío) para ver el descuento aplicado');
                console.log('2. Ve al Paso 3 (Pago) para generar PDF');
                console.log('3. Verifica que el precio unitario en PDF sea $55.00 (no $27.50)');
                console.log('4. Ejecuta compareCalculations() para verificar sincronización');
            }, 500);
        }

        return florCempasuchil;
    }

    // Función para limpiar carrito de pruebas
    function clearTestCart() {
        console.log('\n🧹 === LIMPIANDO CARRITO DE PRUEBAS ===');
        localStorage.setItem('cart', JSON.stringify([]));

        if (window.location.pathname.includes('carrito.html') && window.enhancedCart) {
            window.enhancedCart.loadCart();
            window.enhancedCart.displayCartItems();
            window.enhancedCart.updateTotals();
        }

        console.log('✅ Carrito limpiado');
    }

    // Función para ejecutar diagnóstico completo
    function runFullDiagnosis() {
        console.log('\n🔍 === DIAGNÓSTICO COMPLETO ===');

        if (window.enhancedCart && window.enhancedCart.diagnoseDiscounts) {
            return window.enhancedCart.diagnoseDiscounts();
        } else {
            console.log('❌ Función de diagnóstico no disponible');
            return null;
        }
    }

    // Exponer funciones globalmente para pruebas desde consola
    window.testDiscounts = {
        addProductWithDiscount: testAddProductWithDiscount,
        addProductWithSpecialDiscount: testAddProductWithSpecialDiscount,
        testFlorCempasuchilScenario: testFlorCempasuchilScenario,
        clearTestCart: clearTestCart,
        runFullDiagnosis: runFullDiagnosis
    };

    console.log('\n💡 Funciones de prueba disponibles:');
    console.log('- testDiscounts.addProductWithDiscount()');
    console.log('- testDiscounts.addProductWithSpecialDiscount()');
    console.log('- testDiscounts.testFlorCempasuchilScenario() // Prueba el escenario específico reportado');
    console.log('- testDiscounts.clearTestCart()');
    console.log('- testDiscounts.runFullDiagnosis()');
    console.log('- enhancedCart.diagnoseDiscounts() (desde página carrito)');

    console.log('\n✅ Script de pruebas cargado correctamente');

})();