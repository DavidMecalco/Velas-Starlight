/**
 * ========================================
 * GENERADOR PROFESIONAL DE COTIZACIÓN PDF
 * Velas Starlight - Diseño Corporativo Minimalista
 * ========================================
 */

// Función profesional para generar PDF de cotización corporativo
function generateProfessionalQuote() {
    console.log('📄 Generando cotización profesional...');
    
    // Verificar que jsPDF esté disponible
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error('❌ jsPDF no está disponible');
        
        // Cargar jsPDF dinámicamente
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
            setTimeout(() => generateProfessionalQuote(), 500);
        };
        document.head.appendChild(script);
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Obtener datos del carrito
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cart.length === 0) {
            alert('No hay productos en el carrito');
            return;
        }

        // Configuración de colores profesionales minimalistas
        const colors = {
            primary: [33, 37, 41],       // Negro corporativo
            secondary: [108, 117, 125],   // Gris medio
            accent: [45, 62, 51],        // Verde corporativo sutil
            text: [33, 37, 41],          // Negro para texto
            lightText: [108, 117, 125],  // Gris para texto secundario
            background: [248, 249, 250], // Gris muy claro
            white: [255, 255, 255],      // Blanco puro
            border: [222, 226, 230],     // Gris claro para bordes
            lightBorder: [233, 236, 239] // Gris muy claro para bordes
        };

        // Función helper para aplicar colores de forma segura
        function setColor(doc, colorArray, method = 'text') {
            if (method === 'text') {
                doc.setTextColor(colorArray[0], colorArray[1], colorArray[2]);
            } else if (method === 'fill') {
                doc.setFillColor(colorArray[0], colorArray[1], colorArray[2]);
            } else if (method === 'draw') {
                doc.setDrawColor(colorArray[0], colorArray[1], colorArray[2]);
            }
        }
        
        let yPos = 0;

        // ===== ENCABEZADO CORPORATIVO MINIMALISTA =====
        
        // Fondo blanco limpio
        setColor(doc, colors.white, 'fill');
        doc.rect(0, 0, 210, 45, 'F');
        
        // Línea superior corporativa sutil
        setColor(doc, colors.accent, 'fill');
        doc.rect(0, 0, 210, 2, 'F');
        
        // Logo simulado (rectángulo con iniciales)
        setColor(doc, colors.primary, 'fill');
        doc.rect(20, 12, 25, 20, 'F');
        doc.setFontSize(16);
        setColor(doc, colors.white, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('VS', 28, 25);
        
        // Nombre de la empresa
        doc.setFontSize(20);
        setColor(doc, colors.primary, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('VELAS STARLIGHT', 55, 20);
        
        // Subtítulo corporativo
        doc.setFontSize(12);
        setColor(doc, colors.secondary, 'text');
        doc.setFont(undefined, 'normal');
        doc.text('COTIZACIÓN COMERCIAL', 55, 28);
        
        // Fecha y número de cotización en el lado derecho
        const today = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const quotationNumber = `COT-${Date.now().toString().slice(-8)}`;
        
        doc.setFontSize(9);
        setColor(doc, colors.lightText, 'text');
        doc.text(`Fecha: ${today}`, 140, 18);
        doc.text(`Cotización: ${quotationNumber}`, 140, 25);
        doc.text('Documento Oficial', 140, 32);
        
        // Línea divisoria sutil
        setColor(doc, colors.lightBorder, 'draw');
        doc.setLineWidth(0.5);
        doc.line(20, 40, 190, 40);

        yPos = 55;

        // ===== INFORMACIÓN DEL CLIENTE =====
        
        // Función auxiliar para crear títulos de sección corporativos
        function addSectionTitle(title, yPosition) {
            // Título de sección corporativo
            doc.setFontSize(12);
            setColor(doc, colors.primary, 'text');
            doc.setFont(undefined, 'bold');
            doc.text(title, 20, yPosition);
            
            // Línea divisoria sutil
            setColor(doc, colors.border, 'draw');
            doc.setLineWidth(0.3);
            doc.line(20, yPosition + 3, 190, yPosition + 3);
            
            return yPosition + 12;
        }
        
        // Obtener datos del formulario de envío
        const formData = getShippingFormData();
        
        if (formData.fullName) {
            yPos = addSectionTitle('DATOS DEL CLIENTE', yPos);
            
            // Información del cliente en formato corporativo
            doc.setFontSize(10);
            setColor(doc, colors.text, 'text');
            doc.setFont(undefined, 'normal');
            
            // Primera columna
            doc.setFont(undefined, 'bold');
            doc.text('Nombre:', 20, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(formData.fullName, 50, yPos);
            
            doc.setFont(undefined, 'bold');
            doc.text('Teléfono:', 20, yPos + 8);
            doc.setFont(undefined, 'normal');
            doc.text(formData.phone, 50, yPos + 8);
            
            doc.setFont(undefined, 'bold');
            doc.text('Email:', 20, yPos + 16);
            doc.setFont(undefined, 'normal');
            doc.text(formData.email || 'No proporcionado', 50, yPos + 16);
            
            // Segunda columna
            doc.setFont(undefined, 'bold');
            doc.text('Dirección:', 110, yPos);
            doc.setFont(undefined, 'normal');
            const addressLines = doc.splitTextToSize(formData.address, 80);
            doc.text(addressLines, 145, yPos);
            
            doc.setFont(undefined, 'bold');
            doc.text('Ciudad:', 110, yPos + 8);
            doc.setFont(undefined, 'normal');
            doc.text(`${formData.city}, ${formData.state}`, 145, yPos + 8);
            
            doc.setFont(undefined, 'bold');
            doc.text('Código Postal:', 110, yPos + 16);
            doc.setFont(undefined, 'normal');
            doc.text(formData.postalCode, 145, yPos + 16);
            
            yPos += 30;
        }

        // ===== TABLA CORPORATIVA DE PRODUCTOS =====
        yPos = addSectionTitle('DETALLE DE PRODUCTOS', yPos);
        
        // Encabezado de tabla corporativo
        const tableY = yPos;
        const rowHeight = 12;
        const colWidths = [80, 25, 30, 30, 25];
        const tableWidth = colWidths.reduce((a, b) => a + b, 0);
        
        // Encabezado con fondo gris claro
        setColor(doc, colors.background, 'fill');
        doc.rect(20, tableY, tableWidth, rowHeight, 'F');
        
        // Bordes del encabezado
        setColor(doc, colors.border, 'draw');
        doc.setLineWidth(0.3);
        doc.rect(20, tableY, tableWidth, rowHeight, 'S');
        
        // Texto del encabezado
        doc.setFontSize(9);
        setColor(doc, colors.primary, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('PRODUCTO', 25, tableY + 8);
        doc.text('CANT.', 105, tableY + 8);
        doc.text('PRECIO UNIT.', 130, tableY + 8);
        doc.text('DESCUENTO', 160, tableY + 8);
        doc.text('TOTAL', 185, tableY + 8);
        
        let currentY = tableY + rowHeight;
        let subtotal = 0;
        
        // Filas de productos con estilo corporativo
        cart.forEach((item, index) => {
            // Verificar si necesitamos nueva página
            if (currentY > 250) {
                doc.addPage();
                currentY = 20;
            }
            
            // Calcular precios
            let itemPrice = item.price * item.quantity;
            let unitPrice = item.price;
            let discountText = 'N/A';
            let discountAmount = 0;
            
            // Aplicar promoción 2x1
            if (item.promotion2x1) {
                const paidQuantity = Math.ceil(item.quantity / 2);
                itemPrice = item.price * paidQuantity;
                discountAmount = (item.quantity - paidQuantity) * item.price;
                discountText = '2x1';
            }
            
            // Aplicar descuento especial
            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                const additionalDiscount = itemPrice * (item.specialDiscount.percentage / 100);
                discountAmount += additionalDiscount;
                itemPrice -= additionalDiscount;
                discountText = discountText === 'N/A' ? 
                    `${item.specialDiscount.percentage}%` : 
                    `${discountText} + ${item.specialDiscount.percentage}%`;
            }
            
            subtotal += itemPrice;
            
            // Fondo alternado sutil
            if (index % 2 === 0) {
                doc.setFillColor(252, 252, 252);
                doc.rect(20, currentY, tableWidth, rowHeight, 'F');
            }
            
            // Bordes sutiles
            setColor(doc, colors.lightBorder, 'draw');
            doc.setLineWidth(0.2);
            doc.rect(20, currentY, tableWidth, rowHeight, 'S');
            
            // Contenido con tipografía corporativa
            doc.setFontSize(8);
            setColor(doc, colors.text, 'text');
            doc.setFont(undefined, 'normal');
            
            // Nombre del producto (truncado si es muy largo)
            const productName = (item.title || item.name);
            const truncatedName = productName.length > 35 ? 
                productName.substring(0, 35) + '...' : productName;
            doc.text(truncatedName, 25, currentY + 8);
            
            // Cantidad
            doc.text(item.quantity.toString(), 110, currentY + 8);
            
            // Precio unitario
            doc.text(`$${unitPrice.toFixed(2)}`, 135, currentY + 8);
            
            // Descuento
            setColor(doc, discountAmount > 0 ? [220, 38, 38] : colors.lightText, 'text');
            doc.text(discountText, 165, currentY + 8);
            
            // Total
            setColor(doc, colors.text, 'text');
            doc.setFont(undefined, 'bold');
            doc.text(`$${itemPrice.toFixed(2)}`, 190, currentY + 8);
            
            currentY += rowHeight;
        });
        
        yPos = currentY + 10;

        // ===== RESUMEN FINANCIERO CORPORATIVO =====
        
        // Calcular totales
        let codeDiscount = 0;
        const appliedCode = window.appliedCode || null;
        
        if (appliedCode) {
            codeDiscount = subtotal * appliedCode.discount;
        }
        
        const subtotalAfterCode = subtotal - codeDiscount;
        const shipping = subtotalAfterCode >= 500 ? 0 : 120;
        const total = subtotalAfterCode + shipping;
        
        // Caja de resumen
        const summaryY = yPos;
        const summaryHeight = 50;
        
        setColor(doc, colors.background, 'fill');
        doc.rect(120, summaryY, 70, summaryHeight, 'F');
        setColor(doc, colors.border, 'draw');
        doc.setLineWidth(0.3);
        doc.rect(120, summaryY, 70, summaryHeight, 'S');
        
        // Título del resumen
        doc.setFontSize(10);
        setColor(doc, colors.primary, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('RESUMEN FINANCIERO', 125, summaryY + 8);
        
        // Línea divisoria
        setColor(doc, colors.border, 'draw');
        doc.line(125, summaryY + 12, 185, summaryY + 12);
        
        // Detalles del resumen
        doc.setFontSize(9);
        setColor(doc, colors.text, 'text');
        doc.setFont(undefined, 'normal');
        
        let summaryYPos = summaryY + 18;
        
        // Subtotal
        doc.text('Subtotal:', 125, summaryYPos);
        doc.text(`$${subtotal.toFixed(2)}`, 185, summaryYPos, { align: 'right' });
        summaryYPos += 6;
        
        // Descuento por código (si aplica)
        if (codeDiscount > 0) {
            setColor(doc, [220, 38, 38], 'text');
            doc.text(`Descuento (${appliedCode.code}):`, 125, summaryYPos);
            doc.text(`-$${codeDiscount.toFixed(2)}`, 185, summaryYPos, { align: 'right' });
            summaryYPos += 6;
            setColor(doc, colors.text, 'text');
        }
        
        // Envío
        doc.text('Envío:', 125, summaryYPos);
        doc.text(shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`, 185, summaryYPos, { align: 'right' });
        summaryYPos += 8;
        
        // Total final
        setColor(doc, colors.primary, 'fill');
        doc.rect(125, summaryYPos - 3, 60, 10, 'F');
        doc.setFontSize(10);
        setColor(doc, colors.white, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL:', 128, summaryYPos + 3);
        doc.text(`$${total.toFixed(2)} MXN`, 182, summaryYPos + 3, { align: 'right' });

        // ===== TÉRMINOS Y CONDICIONES =====
        yPos = summaryY + summaryHeight + 15;
        
        if (yPos > 220) {
            doc.addPage();
            yPos = 20;
        }
        
        yPos = addSectionTitle('TÉRMINOS Y CONDICIONES', yPos);
        
        const terms = [
            '• Esta cotización tiene validez de 30 días a partir de la fecha de emisión.',
            '• Los precios incluyen IVA y están sujetos a cambios sin previo aviso.',
            '• El envío es gratuito para compras mayores a $500.00 MXN.',
            '• Los productos están sujetos a disponibilidad en inventario.',
            '• Para confirmar su pedido, envíe esta cotización por WhatsApp.',
            '• Tiempo de entrega: 3-5 días hábiles en área metropolitana.'
        ];
        
        doc.setFontSize(8);
        setColor(doc, colors.lightText, 'text');
        doc.setFont(undefined, 'normal');
        
        terms.forEach((term, index) => {
            doc.text(term, 20, yPos + (index * 5));
        });
        
        yPos += terms.length * 5 + 10;

        // ===== PIE DE PÁGINA CORPORATIVO =====
        const pageHeight = doc.internal.pageSize.height;
        const footerY = pageHeight - 25;
        
        // Línea divisoria superior
        setColor(doc, colors.border, 'draw');
        doc.setLineWidth(0.3);
        doc.line(20, footerY - 5, 190, footerY - 5);
        
        // Logo/Nombre de la empresa
        doc.setFontSize(10);
        setColor(doc, colors.primary, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('VELAS STARLIGHT', 20, footerY + 5);
        
        // Slogan
        doc.setFontSize(8);
        setColor(doc, colors.lightText, 'text');
        doc.setFont(undefined, 'normal');
        doc.text('Productos Artesanales de Calidad Premium', 20, footerY + 12);
        
        // Información de contacto
        doc.setFontSize(8);
        setColor(doc, colors.text, 'text');
        doc.text('WhatsApp: +52 564 682 112  |  Instagram: @velas_starlight', 20, footerY + 18);
        
        // Fecha y número de página
        setColor(doc, colors.lightText, 'text');
        const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
        doc.text(`Página ${pageNum} - ${today}`, 140, footerY + 12);

        // Descargar
        const fileName = `Cotizacion_${quotationNumber}.pdf`;
        doc.save(fileName);

        console.log('✅ Cotización profesional generada exitosamente');
        
        // Mostrar mensaje de éxito si existe la función
        if (typeof showToast === 'function') {
            showToast('Cotización profesional descargada exitosamente', 'success');
        }
        
        return true;

    } catch (error) {
        console.error('❌ Error generando cotización:', error);
        if (typeof showToast === 'function') {
            showToast('Error al generar la cotización. Por favor, inténtalo de nuevo.', 'error');
        } else {
            alert('Error al generar la cotización. Por favor, inténtalo de nuevo.');
        }
        return false;
    }
}

// Función para obtener datos del formulario de envío
function getShippingFormData() {
    return {
        fullName: document.getElementById('full-name')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        email: document.getElementById('email')?.value || '',
        address: document.getElementById('address')?.value || '',
        city: document.getElementById('city')?.value || '',
        state: document.getElementById('state')?.value || '',
        postalCode: document.getElementById('postal-code')?.value || '',
        references: document.getElementById('references')?.value || ''
    };
}

// Hacer la función disponible globalmente
window.generateProfessionalQuote = generateProfessionalQuote;

console.log('📄 Generador profesional de cotización inicializado');