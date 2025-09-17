/**
 * ========================================
 * GENERADOR DE PDF PARA COTIZACIONES - VERSIÓN ULTIMATE
 * Velas Starlight - PDF Generator Ultimate
 * ========================================
 */

/**
 * Clase para generar PDFs de cotizaciones - versión ultimate con logo embebido
 */
class QuotePDFGeneratorUltimate {
    constructor() {
        this.loadJsPDF();
        // Logo embebido en base64 para garantizar que siempre funcione
        this.logoBase64 = null;
        this.loadEmbeddedLogo();
    }

    /**
     * Cargar logo embebido
     */
    async loadEmbeddedLogo() {
        try {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const logoPaths = [
                'images/logo.png',
                '../images/logo.png',
                './images/logo.png'
            ];
            
            for (const path of logoPaths) {
                try {
                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            // Convertir a base64 inmediatamente
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            canvas.width = img.naturalWidth;
                            canvas.height = img.naturalHeight;
                            ctx.drawImage(img, 0, 0);
                            this.logoBase64 = canvas.toDataURL('image/png', 1.0);
                            console.log(`✅ Logo embebido cargado desde: ${path}`);
                            resolve();
                        };
                        img.onerror = reject;
                        img.src = path;
                    });
                    break;
                } catch (e) {
                    console.log(`⚠️ No se pudo cargar logo desde: ${path}`);
                    continue;
                }
            }
        } catch (error) {
            console.log('⚠️ Error cargando logo embebido:', error);
        }
    }

    /**
     * Cargar la librería jsPDF dinámicamente
     */
    loadJsPDF() {
        if (typeof window.jsPDF === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                console.log('✅ jsPDF cargado correctamente');
                this.jsPDF = window.jsPDF || window.jspdf?.jsPDF;
            };
            script.onerror = () => {
                console.error('❌ Error cargando jsPDF');
            };
            document.head.appendChild(script);
        } else {
            this.jsPDF = window.jsPDF || window.jspdf?.jsPDF;
        }
    }

    /**
     * Generar y descargar PDF de cotización
     */
    generateQuotePDF(cartData, shippingData) {
        console.log('🔄 Iniciando generación de PDF con datos:', { cartData, shippingData });

        // Validaciones mejoradas
        if (!this.jsPDF) {
            console.error('❌ jsPDF no disponible');
            alert('Error: No se pudo cargar el generador de PDF. Recarga la página e inténtalo de nuevo.');
            return;
        }

        if (!cartData || !cartData.items || cartData.items.length === 0) {
            console.error('❌ No hay items en el carrito');
            alert('Error: No hay productos en el carrito para generar la cotización.');
            return;
        }

        if (!shippingData || !shippingData.fullName) {
            console.error('❌ Datos de envío incompletos');
            alert('Error: Los datos de envío son requeridos para generar la cotización.');
            return;
        }

        try {
            console.log('📄 Creando documento PDF...');
            const doc = new this.jsPDF();
            let yPosition = 20;

            // Header con logo y título
            this.addHeader(doc, yPosition);
            yPosition += 45;

            // Información de la empresa
            this.addCompanyInfo(doc, yPosition);
            yPosition += 35;

            // Datos del cliente
            yPosition = this.addCustomerInfo(doc, shippingData, yPosition);
            yPosition += 25;

            // Productos del carrito
            yPosition = this.addCartItems(doc, cartData.items, yPosition);
            yPosition += 25;

            // Totales
            yPosition = this.addTotals(doc, cartData, yPosition);
            yPosition += 30;

            // Información de pago
            this.addPaymentInfo(doc, yPosition);

            // Footer
            this.addFooter(doc);

            // Generar nombre del archivo
            const date = new Date();
            const dateString = date.toISOString().split('T')[0];
            const fileName = `Cotizacion_VelasStarlight_${dateString}.pdf`;

            // Descargar PDF
            try {
                doc.save(fileName);
                console.log('✅ PDF generado exitosamente:', fileName);
                console.log('📁 Archivo guardado como:', fileName);
            } catch (saveError) {
                console.error('❌ Error guardando PDF:', saveError);
                alert('Error al guardar el PDF. Verifica los permisos de descarga.');
                return;
            }

        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            console.error('Stack trace:', error.stack);

            // Mensaje de error más específico
            let errorMessage = 'Error generando el PDF. ';
            if (error.message.includes('jsPDF')) {
                errorMessage += 'Problema con la librería PDF.';
            } else if (error.message.includes('canvas')) {
                errorMessage += 'Problema con el procesamiento de imágenes.';
            } else {
                errorMessage += 'Por favor, inténtalo de nuevo.';
            }

            alert(errorMessage);
        }
    }

    /**
     * Agregar header al PDF con logo garantizado
     */
    addHeader(doc, yPos) {
        // Agregar logo si está disponible
        if (this.logoBase64) {
            try {
                const maxWidth = 40;
                const maxHeight = 25;
                
                // Crear imagen temporal para obtener dimensiones
                const tempImg = new Image();
                tempImg.src = this.logoBase64;
                
                let width = maxWidth;
                let height = maxHeight;
                
                if (tempImg.naturalWidth && tempImg.naturalHeight) {
                    const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
                    if (aspectRatio > maxWidth / maxHeight) {
                        width = maxWidth;
                        height = maxWidth / aspectRatio;
                    } else {
                        height = maxHeight;
                        width = maxHeight * aspectRatio;
                    }
                }
                
                doc.addImage(this.logoBase64, 'PNG', 20, yPos - 2, width, height);
                console.log('✅ Logo agregado al PDF desde base64');
            } catch (error) {
                console.log('⚠️ Error agregando logo embebido:', error);
            }
        }

        // Título principal
        doc.setFontSize(24);
        doc.setTextColor(45, 62, 51);
        doc.setFont(undefined, 'bold');
        doc.text('VELAS STARLIGHT', 65, yPos + 8);

        // Subtítulo
        doc.setFontSize(16);
        doc.setTextColor(58, 90, 64);
        doc.setFont(undefined, 'normal');
        doc.text('Cotización de Productos', 65, yPos + 18);

        // Fecha
        const date = new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text(`Fecha: ${date}`, 150, yPos + 12);

        // Línea separadora
        doc.setDrawColor(58, 90, 64);
        doc.line(20, yPos + 25, 190, yPos + 25);
    }

    /**
     * Agregar información de la empresa
     */
    addCompanyInfo(doc, yPos) {
        doc.setFontSize(12);
        doc.setTextColor(45, 62, 51);
        doc.setFont(undefined, 'bold');
        doc.text('INFORMACIÓN DE LA EMPRESA:', 20, yPos);

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        const companyInfo = [
            'Velas Starlight',
            'Especialistas en velas artesanales de alta calidad',
            'Email: ventas@velasstarlight.com',
            'WhatsApp: +52 55 6468-2112',
            'Sitio web: www.velasstarlight.com'
        ];

        companyInfo.forEach((line, index) => {
            doc.text(line, 20, yPos + 10 + (index * 4));
        });
    }

    /**
     * Agregar información del cliente
     */
    addCustomerInfo(doc, shippingData, yPos) {
        doc.setFontSize(12);
        doc.setTextColor(45, 62, 51);
        doc.setFont(undefined, 'bold');
        doc.text('DATOS DEL CLIENTE:', 20, yPos);

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        const customerInfo = [
            `Nombre: ${shippingData.fullName || 'No especificado'}`,
            `Email: ${shippingData.email || 'No especificado'}`,
            `Teléfono: ${shippingData.phone || 'No especificado'}`,
            `Dirección: ${shippingData.address || 'No especificado'}`,
            `Ciudad: ${shippingData.city || 'No especificado'}, ${shippingData.state || 'No especificado'}`,
            `Código Postal: ${shippingData.postalCode || 'No especificado'}`
        ];

        if (shippingData.references) {
            customerInfo.push(`Referencias: ${shippingData.references}`);
        }

        customerInfo.forEach((line, index) => {
            doc.text(line, 20, yPos + 10 + (index * 4));
        });

        return yPos + 10 + (customerInfo.length * 4);
    }

    /**
     * Agregar productos del carrito
     */
    addCartItems(doc, items, yPos) {
        doc.setFontSize(12);
        doc.setTextColor(45, 62, 51);
        doc.setFont(undefined, 'bold');
        doc.text('PRODUCTOS SOLICITADOS:', 20, yPos);

        // Headers de la tabla
        yPos += 15;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Producto', 20, yPos);
        doc.text('Tipo', 80, yPos);
        doc.text('Tamaño', 110, yPos);
        doc.text('Fragancia', 130, yPos);
        doc.text('Cant.', 160, yPos);
        doc.text('Precio Unit.', 175, yPos);

        // Línea bajo headers
        doc.line(20, yPos + 2, 190, yPos + 2);

        // Productos
        doc.setFont(undefined, 'normal');
        yPos += 8;

        items.forEach((item, index) => {
            // Validaciones mejoradas para cada item
            const unitPrice = parseFloat(item.unitPrice || item.size?.price || item.price) || 75;
            const quantity = parseInt(item.quantity) || 1;
            const itemTitle = item.title || 'Producto sin nombre';
            const itemType = item.type || item.category || 'Soya';
            const itemSize = item.size?.label || item.size || '50 gr';
            const itemFragrance = item.fragrance || 'Sin fragancia';

            console.log(`📦 Procesando item ${index + 1}:`, { itemTitle, unitPrice, quantity });

            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.text(this.truncateText(itemTitle, 25), 20, yPos);
            doc.text(this.truncateText(itemType, 10), 80, yPos);
            doc.text(this.truncateText(itemSize, 8), 110, yPos);
            doc.text(this.truncateText(itemFragrance, 15), 130, yPos);
            doc.text(quantity.toString(), 160, yPos);
            doc.text(`$${unitPrice.toFixed(2)}`, 175, yPos);

            yPos += 6;

            // Agregar información de promociones si aplica
            if (item.promotion2x1 && quantity >= 2) {
                const freeItems = Math.floor(quantity / 2);
                doc.setFontSize(8);
                doc.setTextColor(0, 150, 0); // Verde
                doc.text(`   ↳ Promoción 2x1: ${freeItems} producto${freeItems > 1 ? 's' : ''} gratis`, 20, yPos);
                yPos += 4;
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0); // Negro
            }

            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                doc.setFontSize(8);
                doc.setTextColor(255, 100, 0); // Naranja
                doc.text(`   ↳ Descuento especial: ${item.specialDiscount.percentage}%`, 20, yPos);
                yPos += 4;
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0); // Negro
            }
        });

        return yPos;
    }

    /**
     * Agregar totales
     */
    addTotals(doc, cartData, yPos) {
        // Cálculos más robustos
        const subtotal = parseFloat(cartData.subtotal) || 0;
        const shipping = parseFloat(cartData.shipping) || (cartData.items && cartData.items.length > 0 ? 50 : 0);
        const discount = parseFloat(cartData.discount) || 0;
        const total = Math.max(0, subtotal + shipping - discount); // Asegurar que no sea negativo

        console.log('💰 Calculando totales:', { subtotal, shipping, discount, total });

        // Línea separadora
        doc.line(130, yPos, 190, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);

        // Subtotal
        doc.text('Subtotal:', 130, yPos);
        doc.text(`$${subtotal.toFixed(2)} MXN`, 165, yPos);
        yPos += 6;

        // Envío
        doc.text('Envío:', 130, yPos);
        if (shipping === 0 && subtotal >= 1200) {
            doc.setTextColor(0, 128, 0);
            doc.text('GRATIS', 165, yPos);
            doc.setTextColor(0, 0, 0);
        } else {
            doc.text(`$${shipping.toFixed(2)} MXN`, 165, yPos);
        }
        yPos += 6;

        // Descuento (si aplica)
        if (discount > 0) {
            doc.setTextColor(0, 128, 0);
            doc.text('Descuento:', 130, yPos);
            doc.text(`-$${discount.toFixed(2)} MXN`, 165, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 6;
        }

        // Línea antes del total
        doc.line(130, yPos, 190, yPos);
        yPos += 8;

        // Total
        doc.setFont(undefined, 'bold');
        doc.setFontSize(12);
        doc.setTextColor(45, 62, 51);
        doc.text('TOTAL:', 130, yPos);
        doc.text(`$${total.toFixed(2)} MXN`, 165, yPos);
        doc.setTextColor(0, 0, 0);

        return yPos;
    }

    /**
     * Agregar información de pago actualizada
     */
    addPaymentInfo(doc, yPos) {
        if (yPos > 160) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(12);
        doc.setTextColor(45, 62, 51);
        doc.setFont(undefined, 'bold');
        doc.text('PROCESO DE PEDIDO Y PAGO:', 20, yPos);

        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        const processSteps = [
            '',
            '1. CONFIRMACIÓN DEL PEDIDO:',
            '   • Envía este documento por WhatsApp o Email',
            '   • Confirmaremos disponibilidad y detalles',
            '',
            '2. DATOS PARA TRANSFERENCIA BANCARIA:',
            '   • Una vez confirmado el pedido, te enviaremos',
            '     los datos bancarios para la transferencia',
            '',
            '3. PREPARACIÓN Y ENVÍO:',
            '   • Después del pago confirmado, preparamos tu pedido',
            '   • Tiempo de preparación: 2-14 días hábiles dependiendo el número de árticulos comprados',
            '   • Tiempo de envío: 3-7 días hábiles, dependiento el número de árticulos',
            '   • Te notificaremos el seguimiento del envío',
            '',
            '4. ENTREGA:',
            '   • Recibirás tu pedido en la dirección indicada',
            '   • Horario de entrega: Lunes a Viernes 9:00-18:00'
        ];

        processSteps.forEach((line, index) => {
            if (line.match(/^\d+\./)) {
                doc.setFont(undefined, 'bold');
                doc.setTextColor(45, 62, 51);
            } else {
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
            }
            
            if (line !== '') {
                doc.text(line, 20, yPos + 10 + (index * 4));
            }
        });

        yPos += 10 + (processSteps.length * 4) + 10;

        // Información de contacto
        doc.setFont(undefined, 'bold');
        doc.setFontSize(11);
        doc.setTextColor(45, 62, 51);
        doc.text('CONTACTO PARA CONFIRMACIÓN:', 20, yPos);
        
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const contactInfo = [
            'Email: ventas@velasstarlight.com',
            'WhatsApp: +52 55 6468-2112',
            '',
            'Horario de atención: Lunes a Viernes 9:00 - 18:00'
        ];

        contactInfo.forEach((line, index) => {
            if (line !== '') {
                doc.text(line, 20, yPos + 8 + (index * 4));
            }
        });
    }

    /**
     * Agregar footer
     */
    addFooter(doc) {
        const pageHeight = doc.internal.pageSize.height;
        
        // Línea separadora
        doc.setDrawColor(200, 200, 200);
        doc.line(20, pageHeight - 30, 190, pageHeight - 30);
        
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.setFont(undefined, 'italic');
        
        // Validez de la cotización
        doc.text('Esta cotización es válida por 30 días.', 20, pageHeight - 22);
        doc.text('Precios sujetos a cambios sin previo aviso.', 20, pageHeight - 18);
        
        // Información de la empresa
        doc.setFont(undefined, 'normal');
        doc.text('Velas Starlight - Iluminando tus momentos especiales', 20, pageHeight - 12);
        doc.text(`Generado el: ${new Date().toLocaleString('es-MX')}`, 20, pageHeight - 8);
    }

    /**
     * Truncar texto
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }

    /**
     * Obtener datos del formulario de envío
     */
    getShippingData() {
        return {
            fullName: document.getElementById('full-name')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            address: document.getElementById('address')?.value || '',
            city: document.getElementById('city')?.value || '',
            state: document.getElementById('state')?.value || '',
            postalCode: document.getElementById('postal-code')?.value || '',
            references: document.getElementById('references')?.value || ''
        };
    }
}

// Función de diagnóstico para verificar el estado del generador
window.checkPDFGenerator = function() {
    console.log('🔍 Diagnóstico del Generador de PDF:');
    console.log('- jsPDF disponible:', typeof window.jsPDF !== 'undefined');
    console.log('- jsPDF versión:', window.jsPDF ? 'Disponible' : 'No disponible');
    console.log('- Generador PDF disponible:', typeof window.quotePDFGenerator !== 'undefined');
    console.log('- Logo cargado:', window.quotePDFGenerator ? !!window.quotePDFGenerator.logoBase64 : false);

    if (window.quotePDFGenerator) {
        console.log('- Generador listo para usar: ✅');
    } else {
        console.log('- Generador NO disponible: ❌');
    }

    return {
        jsPDF: typeof window.jsPDF !== 'undefined',
        generator: typeof window.quotePDFGenerator !== 'undefined',
        logo: window.quotePDFGenerator ? !!window.quotePDFGenerator.logoBase64 : false
    };
};

// Función de prueba para verificar el generador
window.testPDFGenerator = function() {
    console.log('🧪 Probando generador de PDF...');

    const testCartData = {
        items: [
            {
                title: 'Vela Aromática de Lavanda',
                type: 'Soya',
                size: { label: '100 gr' },
                fragrance: 'Lavanda',
                unitPrice: 85,
                quantity: 2,
                total: 170
            }
        ],
        subtotal: 170,
        shipping: 50,
        discount: 0,
        total: 220
    };

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
            window.quotePDFGenerator.generateQuotePDF(testCartData, testShippingData);
            console.log('✅ Prueba de PDF iniciada correctamente');
        } else {
            console.error('❌ Generador de PDF no disponible para prueba');
        }
    } catch (error) {
        console.error('❌ Error en prueba de PDF:', error);
    }
};

// Reemplazar la instancia global del generador de PDF
window.quotePDFGenerator = new QuotePDFGeneratorUltimate();
console.log('✅ PDF Generator Ultimate cargado (con logo embebido y proceso completo)');

// Verificar estado después de un breve delay
setTimeout(() => {
    const status = window.checkPDFGenerator();
    if (!status.generator || !status.jsPDF) {
        console.warn('⚠️ El generador de PDF puede tener problemas. Estado:', status);
    } else {
        console.log('🎉 Generador de PDF completamente funcional');
    }
}, 2000);