/**
 * SCRIPT DE PRUEBA PARA VERIFICAR PDF CON DESCUENTOS
 * Velas Starlight - Test PDF with Discounts
 */

(function() {
    'use strict';

    console.log('🧪 Inicializando pruebas de PDF con descuentos...');

    // Función para probar PDF con productos que tienen descuentos
    function testPDFWithDiscounts() {
        console.log('\n📄 === PRUEBA: PDF con productos con descuento ===');

        // Simular agregar productos con descuento al carrito
        const testCart = [
            {
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
            },
            {
                id: 2,
                title: 'Suspiro de Ángel',
                category: 'Vela',
                image: '../images/vela-starlight-angeles.jpeg',
                type: 'Soya',
                size: { label: '120 gr', price: 65 },
                fragrance: 'Lavanda',
                quantity: 1,
                unitPrice: 65,
                price: 65,
                total: 65,
                promotion2x1: false,
                specialDiscount: { percentage: 10, text: "Oferta especial" }
            }
        ];

        // Calcular usando la lógica del PDF
        let subtotal = 0;
        let totalDiscountAmount = 0;

        const processedItems = testCart.map(item => {
            const unitPrice = item.unitPrice || item.size?.price || item.price || 0;
            const quantity = parseInt(item.quantity) || 1;
            let itemSubtotal = unitPrice * quantity;
            let itemDiscount = 0;

            // Aplicar descuento 2x1
            if (item.promotion2x1 && quantity >= 2) {
                const freeItems = Math.floor(quantity / 2);
                itemDiscount += freeItems * unitPrice;
                console.log(`   ↳ ${item.title}: 2x1 aplicado, ${freeItems} gratis (-$${itemDiscount})`);
            }

            // Aplicar descuento especial del producto
            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                const specialDiscountAmount = itemSubtotal * (item.specialDiscount.percentage / 100);
                itemDiscount += specialDiscountAmount;
                console.log(`   ↳ ${item.title}: ${item.specialDiscount.percentage}% descuento (-$${specialDiscountAmount.toFixed(2)})`);
            }

            subtotal += itemSubtotal;
            totalDiscountAmount += itemDiscount;

            return {
                ...item,
                unitPrice: unitPrice,
                quantity: quantity,
                total: itemSubtotal - itemDiscount,
                originalTotal: itemSubtotal,
                itemDiscount: itemDiscount
            };
        });

        const shipping = testCart.length > 0 ? 50 : 0;
        const promoDiscountAmount = 0; // Sin descuento promocional para esta prueba
        const totalFinalDiscount = totalDiscountAmount + promoDiscountAmount;
        const total = subtotal + shipping - totalFinalDiscount;

        const cartData = {
            items: processedItems,
            subtotal: subtotal,
            shipping: shipping,
            discount: totalFinalDiscount,
            productDiscount: totalDiscountAmount,
            promoDiscount: promoDiscountAmount,
            total: total
        };

        console.log('\n💰 RESUMEN DE PRUEBA:');
        console.log(`   Subtotal: $${subtotal.toFixed(2)}`);
        console.log(`   Descuento productos: -$${totalDiscountAmount.toFixed(2)}`);
        console.log(`   Envío: $${shipping.toFixed(2)}`);
        console.log(`   Total descuento: -$${totalFinalDiscount.toFixed(2)}`);
        console.log(`   TOTAL FINAL: $${total.toFixed(2)}`);

        const testShippingData = {
            fullName: 'Cliente de Prueba',
            email: 'cliente@test.com',
            phone: '+52 55 1234 5678',
            address: 'Calle de Prueba 123',
            city: 'Ciudad de México',
            state: 'CDMX',
            postalCode: '12345',
            references: 'Entre calle A y calle B'
        };

        // Generar PDF con estos datos
        try {
            if (window.quotePDFGenerator) {
                window.quotePDFGenerator.generateQuotePDF(cartData, testShippingData);
                console.log('✅ PDF generado con datos de prueba');
            } else {
                console.error('❌ Generador de PDF no disponible');
            }
        } catch (error) {
            console.error('❌ Error generando PDF de prueba:', error);
        }

        return cartData;
    }

    // Función para verificar sincronización entre carrito y PDF
    function verifyCartPDFSync() {
        console.log('\n🔄 === VERIFICANDO SINCRONIZACIÓN CARRITO-PDF ===');

        if (!window.enhancedCart) {
            console.error('❌ Carrito no disponible para verificación');
            return false;
        }

        // Obtener datos actuales del carrito
        const currentCart = window.enhancedCart.cart;
        console.log(`📊 Carrito actual: ${currentCart.length} productos`);

        if (currentCart.length === 0) {
            console.log('⚠️ Carrito vacío, no hay nada que verificar');
            return false;
        }

        // Ejecutar diagnóstico del carrito
        if (window.enhancedCart.diagnoseDiscounts) {
            console.log('🔍 Ejecutando diagnóstico del carrito...');
            const diagnosis = window.enhancedCart.diagnoseDiscounts();

            console.log('\n📋 DIAGNÓSTICO COMPLETO:');
            console.log(`   Subtotal calculado: $${diagnosis.subtotal.toFixed(2)}`);
            console.log(`   Descuento productos: -$${diagnosis.totalDiscountAmount.toFixed(2)}`);
            console.log(`   Descuento promoción: -$${diagnosis.promoDiscountAmount.toFixed(2)}`);
            console.log(`   Envío: $${window.enhancedCart.currentShippingCost || 50}`);
            console.log(`   Total descuento: -$${(diagnosis.totalDiscountAmount + diagnosis.promoDiscountAmount).toFixed(2)}`);
            console.log(`   TOTAL: $${diagnosis.total.toFixed(2)}`);

            return diagnosis;
        } else {
            console.error('❌ Función de diagnóstico no disponible');
            return false;
        }
    }

    // Función para comparar cálculos entre carrito y PDF
    function compareCalculations() {
        console.log('\n⚖️ === COMPARANDO CÁLCULOS CARRITO vs PDF ===');

        if (!window.enhancedCart) {
            console.error('❌ Carrito no disponible para comparación');
            return false;
        }

        const currentCart = window.enhancedCart.cart;
        if (currentCart.length === 0) {
            console.log('⚠️ Carrito vacío, no hay nada que comparar');
            return false;
        }

        // Obtener diagnóstico del carrito
        const cartDiagnosis = window.enhancedCart.diagnoseDiscounts();

        // Simular cálculo del PDF
        let pdfSubtotal = 0;
        let pdfTotalDiscount = 0;

        currentCart.forEach(item => {
            const unitPrice = item.unitPrice || item.size?.price || item.price || 0;
            const quantity = parseInt(item.quantity) || 1;
            let itemSubtotal = unitPrice * quantity;
            let itemDiscount = 0;

            // Aplicar descuento 2x1
            if (item.promotion2x1 && quantity >= 2) {
                const freeItems = Math.floor(quantity / 2);
                itemDiscount += freeItems * unitPrice;
            }

            // Aplicar descuento especial
            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                const specialDiscountAmount = itemSubtotal * (item.specialDiscount.percentage / 100);
                itemDiscount += specialDiscountAmount;
            }

            pdfSubtotal += itemSubtotal;
            pdfTotalDiscount += itemDiscount;
        });

        const shipping = currentCart.length > 0 ? window.enhancedCart.currentShippingCost : 0;
        const promoDiscount = window.enhancedCart.discountApplied ?
            (pdfSubtotal * window.enhancedCart.discountPercentage / 100) : 0;
        const pdfTotal = pdfSubtotal + shipping - pdfTotalDiscount - promoDiscount;

        console.log('\n📊 COMPARACIÓN:');
        console.log(`   Carrito Subtotal: $${cartDiagnosis.subtotal.toFixed(2)}`);
        console.log(`   PDF Subtotal:     $${pdfSubtotal.toFixed(2)}`);
        console.log(`   ↳ Coinciden: ${Math.abs(cartDiagnosis.subtotal - pdfSubtotal) < 0.01 ? '✅' : '❌'}`);

        console.log(`   Carrito Desc. Prod: $${cartDiagnosis.totalDiscountAmount.toFixed(2)}`);
        console.log(`   PDF Desc. Prod:     $${pdfTotalDiscount.toFixed(2)}`);
        console.log(`   ↳ Coinciden: ${Math.abs(cartDiagnosis.totalDiscountAmount - pdfTotalDiscount) < 0.01 ? '✅' : '❌'}`);

        console.log(`   Carrito Desc. Promo: $${cartDiagnosis.promoDiscountAmount.toFixed(2)}`);
        console.log(`   PDF Desc. Promo:     $${promoDiscount.toFixed(2)}`);
        console.log(`   ↳ Coinciden: ${Math.abs(cartDiagnosis.promoDiscountAmount - promoDiscount) < 0.01 ? '✅' : '❌'}`);

        console.log(`   Carrito TOTAL: $${cartDiagnosis.total.toFixed(2)}`);
        console.log(`   PDF TOTAL:     $${pdfTotal.toFixed(2)}`);
        console.log(`   ↳ Coinciden: ${Math.abs(cartDiagnosis.total - pdfTotal) < 0.01 ? '✅' : '❌'}`);

        const allMatch = Math.abs(cartDiagnosis.subtotal - pdfSubtotal) < 0.01 &&
                        Math.abs(cartDiagnosis.totalDiscountAmount - pdfTotalDiscount) < 0.01 &&
                        Math.abs(cartDiagnosis.promoDiscountAmount - promoDiscount) < 0.01 &&
                        Math.abs(cartDiagnosis.total - pdfTotal) < 0.01;

        console.log(`\n🎯 RESULTADO: ${allMatch ? '✅ CÁLCULOS SINCRONIZADOS' : '❌ HAY DIFERENCIAS'}`);

        return {
            cart: cartDiagnosis,
            pdf: { subtotal: pdfSubtotal, totalDiscount: pdfTotalDiscount, promoDiscount, total: pdfTotal },
            match: allMatch
        };
    }

    // Función específica para probar el problema de Flor de Cempasúchil
    function testFlorCempasuchilPDF() {
        console.log('\n🌸 === PRUEBA ESPECÍFICA: Flor de Cempasúchil 2x1 ===');

        // Simular exactamente el producto problemático
        const testCart = [
            {
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
            }
        ];

        // Calcular usando la lógica del PDF
        let subtotal = 0;
        let totalDiscountAmount = 0;

        const processedItems = testCart.map(item => {
            const unitPrice = item.unitPrice || item.size?.price || item.price || 0;
            const quantity = parseInt(item.quantity) || 1;
            let itemSubtotal = unitPrice * quantity;
            let itemDiscount = 0;

            // Aplicar descuento 2x1
            if (item.promotion2x1 && quantity >= 2) {
                const freeItems = Math.floor(quantity / 2);
                itemDiscount += freeItems * unitPrice;
                console.log(`   ↳ ${item.title}: 2x1 aplicado, ${freeItems} gratis (-$${itemDiscount})`);
            }

            subtotal += itemSubtotal;
            totalDiscountAmount += itemDiscount;

            return {
                ...item,
                unitPrice: unitPrice,
                quantity: quantity,
                total: itemSubtotal - itemDiscount,
                originalTotal: itemSubtotal,
                itemDiscount: itemDiscount
            };
        });

        console.log('\n💰 RESULTADO ESPERADO para Flor de Cempasúchil:');
        console.log(`   Precio unitario original: $55.00`);
        console.log(`   Cantidad: 2 unidades`);
        console.log(`   Subtotal sin descuento: $110.00`);
        console.log(`   Descuento 2x1: -$55.00 (1 unidad gratis)`);
        console.log(`   Precio unitario con descuento: $27.50 (55/2)`);
        console.log(`   Total final: $55.00`);

        const cartData = {
            items: processedItems,
            subtotal: subtotal,
            shipping: 50,
            discount: totalDiscountAmount,
            productDiscount: totalDiscountAmount,
            promoDiscount: 0,
            total: subtotal + 50 - totalDiscountAmount
        };

        // Generar PDF
        const testShippingData = {
            fullName: 'Cliente de Prueba',
            email: 'cliente@test.com',
            phone: '+52 55 1234 5678',
            address: 'Calle de Prueba 123',
            city: 'Ciudad de México',
            state: 'CDMX',
            postalCode: '12345',
            references: 'Entre calle A y calle B'
        };

        try {
            if (window.quotePDFGenerator) {
                window.quotePDFGenerator.generateQuotePDF(cartData, testShippingData);
                console.log('✅ PDF generado para Flor de Cempasúchil');
                console.log('🔍 Verificar que el precio unitario muestre $55.00 (no $27.50)');
            } else {
                console.error('❌ Generador de PDF no disponible');
            }
        } catch (error) {
            console.error('❌ Error generando PDF de prueba:', error);
        }

        return cartData;
    }

    // Función para limpiar y probar desde cero
    function resetAndTest() {
        console.log('\n🔄 === REINICIANDO Y PROBANDO ===');

        // Limpiar carrito
        if (window.enhancedCart) {
            window.enhancedCart.clearCart();
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        // Agregar productos de prueba
        setTimeout(() => {
            testPDFWithDiscounts();
        }, 500);
    }

    // Exponer funciones globalmente
    window.testPDFDiscounts = {
        testPDFWithDiscounts: testPDFWithDiscounts,
        testFlorCempasuchilPDF: testFlorCempasuchilPDF,
        verifyCartPDFSync: verifyCartPDFSync,
        resetAndTest: resetAndTest
    };

    // Exponer función de comparación globalmente
    window.compareCalculations = compareCalculations;

    console.log('\n💡 Funciones de prueba disponibles:');
    console.log('- testPDFDiscounts.testPDFWithDiscounts() // Genera PDF con productos con descuento');
    console.log('- testPDFDiscounts.testFlorCempasuchilPDF() // Prueba específica del problema de precio unitario');
    console.log('- testPDFDiscounts.verifyCartPDFSync() // Verifica sincronización carrito-PDF');
    console.log('- testPDFDiscounts.resetAndTest() // Reinicia y prueba desde cero');
    console.log('- compareCalculations() // Compara cálculos entre página y PDF');
    console.log('- enhancedCart.diagnoseDiscounts() // Diagnóstico detallado del carrito');

    console.log('\n✅ Script de pruebas de PDF con descuentos cargado');

})();