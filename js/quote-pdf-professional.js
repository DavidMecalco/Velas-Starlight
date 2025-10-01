/**
 * ========================================
 * GENERADOR PROFESIONAL DE COTIZACIÓN PDF
 * Velas Starlight - Diseño Corporativo Minimalista
 * ========================================
 */

// Función profesional para generar PDF de cotización corporativo
function generateProfessionalQuotePDF(orderData, quoteId) {
    console.log('📄 Generando cotización PDF profesional:', quoteId);
    console.log('📋 Datos del pedido:', orderData);
    
    // Verificar que jsPDF esté disponible
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error('❌ jsPDF no está disponible');
        throw new Error('jsPDF no está disponible');
    }

    // Validar datos del pedido
    if (!orderData) {
        console.error('❌ No hay datos del pedido');
        throw new Error('No hay datos del pedido');
    }

    if (!orderData.items || !Array.isArray(orderData.items)) {
        console.error('❌ Items del pedido no válidos:', orderData.items);
        throw new Error('Items del pedido no válidos');
    }

    if (orderData.items.length === 0) {
        console.error('❌ No hay productos en el pedido');
        throw new Error('No hay productos en el pedido');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = orderData;
    
    // Configuración de colores profesionales minimalistas (igual que ficha técnica)
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
    doc.text('COTIZACIÓN DE PEDIDO', 55, 28);
    
    // Fecha y código en el lado derecho
    const today = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    doc.setFontSize(9);
    setColor(doc, colors.lightText, 'text');
    doc.text(`Fecha: ${today}`, 140, 18);
    doc.text(`Cotización: ${quoteId}`, 140, 25);
    doc.text('Documento Oficial', 140, 32);
    
    // Línea divisoria sutil
    setColor(doc, colors.lightBorder, 'draw');
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    yPos = 55;

    // ===== FUNCIÓN AUXILIAR PARA TÍTULOS DE SECCIÓN =====
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

    // ===== INFORMACIÓN DEL CLIENTE =====
    yPos = addSectionTitle('INFORMACIÓN DEL CLIENTE', yPos);
    
    doc.setFontSize(10);
    setColor(doc, colors.text, 'text');
    doc.setFont(undefined, 'normal');
    
    // Información básica en formato tabla limpia
    doc.setFont(undefined, 'bold');
    doc.text('Nombre:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(`${data.customer.firstName} ${data.customer.lastName}`, 50, yPos);
    
    doc.setFont(undefined, 'bold');
    doc.text('Correo:', 120, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(data.customer.email, 145, yPos);
    
    yPos += 10;
    
    doc.setFont(undefined, 'bold');
    doc.text('Teléfono:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(data.customer.phone, 50, yPos);

    yPos += 20;

    // ===== DIRECCIÓN DE ENVÍO =====
    yPos = addSectionTitle('DIRECCIÓN DE ENVÍO', yPos);
    
    doc.setFontSize(10);
    setColor(doc, colors.text, 'text');
    doc.setFont(undefined, 'normal');
    
    doc.text(`${data.shipping.address}`, 20, yPos);
    yPos += 6;
    doc.text(`${data.shipping.city}, ${data.shipping.state}`, 20, yPos);
    yPos += 6;
    doc.text(`CP: ${data.shipping.zipCode}`, 20, yPos);
    if (data.shipping.references) {
        yPos += 6;
        doc.text(`Referencias: ${data.shipping.references}`, 20, yPos);
    }

    yPos += 20;

    // ===== TABLA CORPORATIVA DE PRODUCTOS =====
    yPos = addSectionTitle('PRODUCTOS SOLICITADOS', yPos);
    
    // Encabezado de tabla corporativo con más espacio para detalles
    const tableY = yPos;
    const rowHeight = 18; // Aumentado aún más para acomodar información completa
    const colWidths = [90, 20, 30, 30]; // Aumentado el ancho de la columna de producto
    const tableWidth = colWidths.reduce((a, b) => a + b, 0);
    
    // Encabezado con fondo gris claro
    setColor(doc, colors.background, 'fill');
    doc.rect(20, tableY, tableWidth, rowHeight * 0.7, 'F');
    
    // Bordes del encabezado
    setColor(doc, colors.border, 'draw');
    doc.setLineWidth(0.3);
    doc.rect(20, tableY, tableWidth, rowHeight * 0.7, 'S');
    
    // Texto del encabezado
    doc.setFontSize(9);
    setColor(doc, colors.primary, 'text');
    doc.setFont(undefined, 'bold');
    doc.text('PRODUCTO', 25, tableY + 7);
    doc.text('CANT.', 115, tableY + 7);
    doc.text('PRECIO UNIT.', 135, tableY + 7);
    doc.text('SUBTOTAL', 165, tableY + 7);
    
    let currentY = tableY + (rowHeight * 0.7);
    let subtotal = 0;
    
    // Filas de datos con estilo corporativo
    data.items.forEach((item, index) => {
        console.log(`📦 Procesando item ${index + 1}:`, item);
        console.log(`   - Nombre: ${item.name || item.title}`);
        console.log(`   - Fragancia: ${item.fragrance || item.selectedFragrance || 'No especificada'}`);
        console.log(`   - Tamaño: ${item.size || item.selectedSize || 'No especificado'}`);
        console.log(`   - Tipo seleccionado: ${item.selectedType || 'No especificado'}`);
        console.log(`   - Tipos disponibles: ${item.types ? item.types.join(', ') : 'No especificados'}`);
        console.log(`   - Tipo simple: ${item.type || 'No especificado'}`);
        console.log(`   - Categoría: ${item.category || 'No especificada'}`);
        console.log(`   - Objeto completo:`, JSON.stringify(item, null, 2));
        
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 1;
        const itemSubtotal = itemPrice * itemQuantity;
        subtotal += itemSubtotal;
        
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
        doc.setFontSize(9);
        setColor(doc, colors.text, 'text');
        doc.setFont(undefined, 'bold');
        
        // Nombre del producto
        const productName = (item.name || item.title || 'Producto sin nombre');
        const truncatedName = productName.length > 20 ? productName.substring(0, 20) + '...' : productName;
        doc.text(truncatedName, 25, currentY + 5);
        
        // Detalles del producto (fragancia y tamaño)
        doc.setFontSize(7);
        doc.setFont(undefined, 'normal');
        setColor(doc, colors.secondary, 'text');
        
        let detailsText = '';
        
        // Agregar fragancia
        const fragrance = item.selectedFragrance || item.fragrance;
        if (fragrance) {
            detailsText += `Fragancia: ${fragrance}`;
        }
        
        // Agregar tamaño
        const size = item.selectedSize || item.size;
        if (size) {
            if (detailsText) detailsText += ' | ';
            detailsText += `Tamaño: ${size}`;
        }
        
        // Agregar tipo de vela (soya, parafina, belleza natural)
        let typeInfo = '';
        if (item.selectedType) {
            typeInfo = item.selectedType;
        } else if (item.types && Array.isArray(item.types) && item.types.length > 0) {
            typeInfo = item.types.join(', ');
        } else if (item.type) {
            typeInfo = item.type;
        } else if (item.category) {
            typeInfo = item.category;
        } else {
            typeInfo = 'Vela Artesanal'; // Valor por defecto
        }
        
        if (typeInfo) {
            if (detailsText) detailsText += ' | ';
            detailsText += `Tipo: ${typeInfo}`;
        }
        
        if (detailsText) {
            // Aumentar el límite y mejorar el truncado
            const maxLength = 60; // Aumentado de 35 a 60 caracteres
            let displayText = detailsText;
            
            if (detailsText.length > maxLength) {
                // Buscar el último separador "|" antes del límite para cortar en un lugar lógico
                const cutPoint = detailsText.lastIndexOf(' | ', maxLength);
                if (cutPoint > 20) { // Si hay un punto de corte razonable
                    displayText = detailsText.substring(0, cutPoint) + '...';
                } else {
                    displayText = detailsText.substring(0, maxLength - 3) + '...';
                }
            }
            
            doc.text(displayText, 25, currentY + 10);
        }
        
        // Cantidad
        doc.setFontSize(9);
        setColor(doc, colors.text, 'text');
        doc.setFont(undefined, 'bold');
        doc.text(itemQuantity.toString(), 118, currentY + 7);
        
        // Precio unitario
        doc.setFont(undefined, 'normal');
        doc.text(`$${itemPrice.toFixed(2)}`, 140, currentY + 7);
        
        // Subtotal
        doc.setFont(undefined, 'bold');
        doc.text(`$${itemSubtotal.toFixed(2)}`, 170, currentY + 7);
        
        currentY += rowHeight;
    });
    
    yPos = currentY + 15;

    // ===== RESUMEN FINANCIERO =====
    yPos = addSectionTitle('RESUMEN FINANCIERO', yPos);
    
    // Calcular altura dinámica del resumen según si hay descuento
    const summaryHeight = data.discount ? 35 : 25;
    
    // Fondo para el resumen
    setColor(doc, colors.background, 'fill');
    doc.rect(120, yPos, 70, summaryHeight, 'F');
    setColor(doc, colors.border, 'draw');
    doc.setLineWidth(0.3);
    doc.rect(120, yPos, 70, summaryHeight, 'S');
    
    doc.setFontSize(10);
    setColor(doc, colors.text, 'text');
    
    // Subtotal
    doc.setFont(undefined, 'normal');
    doc.text('Subtotal:', 125, yPos + 8);
    doc.setFont(undefined, 'bold');
    doc.text(`$${subtotal.toFixed(2)} MXN`, 165, yPos + 8);
    
    let totalYPos = yPos + 16;
    
    // Descuento si aplica
    if (data.discount && data.discount.percentage) {
        const discountAmount = subtotal * (data.discount.percentage / 100);
        
        doc.setFont(undefined, 'normal');
        setColor(doc, colors.text, 'text');
        doc.text('Descuento:', 125, yPos + 16);
        
        doc.setFont(undefined, 'bold');
        doc.setTextColor(220, 20, 60); // Color rojo para el descuento
        doc.text(`-$${discountAmount.toFixed(2)} MXN`, 165, yPos + 16); // Movido más a la derecha
        
        totalYPos = yPos + 24;
    }
    
    // Total
    setColor(doc, colors.primary, 'text');
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('TOTAL:', 125, totalYPos);
    doc.text(`$${data.total.toFixed(2)} MXN`, 165, totalYPos);
    
    yPos += summaryHeight + 15;

    // ===== NOTA IMPORTANTE =====
    // Advertencia simple
    doc.setFillColor(255, 248, 220);
    doc.rect(20, yPos, 170, 25, 'F');
    setColor(doc, colors.border, 'draw');
    doc.setLineWidth(0.3);
    doc.rect(20, yPos, 170, 25, 'S');
    
    doc.setFontSize(9);
    doc.setTextColor(180, 83, 9);
    doc.setFont(undefined, 'bold');
    doc.text('IMPORTANTE:', 25, yPos + 8);
    
    doc.setFontSize(8);
    setColor(doc, colors.text, 'text');
    doc.setFont(undefined, 'normal');
    doc.text('• El costo de envío se cotizará por separado según la ubicación', 25, yPos + 15);
    doc.text('• Esta cotización tiene validez de 30 días naturales', 25, yPos + 21);

    // ===== PIE DE PÁGINA CORPORATIVO =====
    const pageHeight = doc.internal.pageSize.height;
    const footerY = pageHeight - 40; // Mucho más espacio para el footer
    
    // Asegurar que hay suficiente espacio entre el contenido y el footer
    if (yPos > footerY - 20) {
        doc.addPage();
        yPos = 20; // Reset position for new page
    }
    
    // Línea divisoria superior
    setColor(doc, colors.border, 'draw');
    doc.setLineWidth(0.3);
    doc.line(20, footerY - 10, 190, footerY - 10);
    
    // Crear un fondo limpio para el footer
    setColor(doc, colors.white, 'fill');
    doc.rect(20, footerY - 5, 170, 35, 'F');
    
    // Información de la empresa (lado izquierdo)
    doc.setFontSize(10);
    setColor(doc, colors.primary, 'text');
    doc.setFont(undefined, 'bold');
    doc.text('VELAS STARLIGHT', 20, footerY + 2);
    
    doc.setFontSize(8);
    setColor(doc, colors.lightText, 'text');
    doc.setFont(undefined, 'normal');
    doc.text('Velas Artesanales de Calidad Premium', 20, footerY + 10);
    
    // Información de contacto (lado izquierdo, abajo)
    doc.setFontSize(8);
    setColor(doc, colors.text, 'text');
    doc.text('ventas@velasstarlight.com', 20, footerY + 18);
    doc.text('WhatsApp: +52 55 6468 2112', 20, footerY + 26);
    
    // Información de página (lado derecho)
    setColor(doc, colors.lightText, 'text');
    doc.setFontSize(8);
    const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
    doc.text(`Página ${pageNum}`, 160, footerY + 10);
    doc.text(`${today}`, 160, footerY + 18);

    // Descargar
    const fileName = `Cotizacion_VelasStarlight_${quoteId}.pdf`;
    doc.save(fileName);
    
    console.log('✅ PDF profesional de cotización generado exitosamente');
    return true;
}

// Hacer la función disponible globalmente
window.generateProfessionalQuotePDF = generateProfessionalQuotePDF;

console.log('📄 Generador profesional de cotización PDF inicializado');