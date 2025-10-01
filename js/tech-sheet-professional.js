/**
 * ========================================
 * GENERADOR PROFESIONAL DE FICHA TÉCNICA PDF
 * Velas Starlight - Diseño Corporativo Minimalista
 * ========================================
 */

// Función profesional para generar PDF corporativo
function generateProfessionalTechSheet(product) {
    console.log('📄 Generando ficha técnica profesional para:', product.title);
    
    // Verificar que jsPDF esté disponible
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error('❌ jsPDF no está disponible');
        alert('Error: No se puede generar el PDF. Biblioteca no disponible.');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
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
        doc.text('FICHA TÉCNICA DE PRODUCTO', 55, 28);
        
        // Fecha y código en el lado derecho
        const today = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        doc.setFontSize(9);
        setColor(doc, colors.lightText, 'text');
        doc.text(`Fecha: ${today}`, 140, 18);
        doc.text(`Código: VS-${String(product.id).padStart(4, '0')}`, 140, 25);
        doc.text('Documento Oficial', 140, 32);
        
        // Línea divisoria sutil
        setColor(doc, colors.lightBorder, 'draw');
        doc.setLineWidth(0.5);
        doc.line(20, 40, 190, 40);

        yPos = 55;

        // ===== INFORMACIÓN PRINCIPAL DEL PRODUCTO =====
        
        // Título del producto con tipografía corporativa
        doc.setFontSize(18);
        setColor(doc, colors.primary, 'text');
        doc.setFont(undefined, 'bold');
        doc.text(product.title, 20, yPos + 10);
        
        // Línea divisoria bajo el título
        setColor(doc, colors.border, 'draw');
        doc.setLineWidth(0.3);
        doc.line(20, yPos + 15, 190, yPos + 15);
        
        // Información básica en formato tabla limpia
        doc.setFontSize(10);
        setColor(doc, colors.text, 'text');
        doc.setFont(undefined, 'normal');
        
        // Categoría
        doc.setFont(undefined, 'bold');
        doc.text('Categoría:', 20, yPos + 25);
        doc.setFont(undefined, 'normal');
        doc.text(product.category, 50, yPos + 25);
        
        // Estado de disponibilidad
        doc.setFont(undefined, 'bold');
        doc.text('Estado:', 120, yPos + 25);
        doc.setFont(undefined, 'normal');
        const status = product.available ? 'Disponible' : 'No Disponible';
        if (product.available) {
            doc.setTextColor(34, 139, 34);
        } else {
            doc.setTextColor(220, 20, 60);
        }
        doc.text(status, 145, yPos + 25);
        
        // Código del producto
        setColor(doc, colors.text, 'text');
        doc.setFont(undefined, 'bold');
        doc.text('Código de Producto:', 20, yPos + 35);
        doc.setFont(undefined, 'normal');
        doc.text(`VS-${String(product.id).padStart(4, '0')}`, 70, yPos + 35);

        yPos += 50;

        // ===== DESCRIPCIÓN CORPORATIVA =====
        
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
        
        yPos = addSectionTitle('DESCRIPCIÓN DEL PRODUCTO', yPos);
        
        // Descripción en formato corporativo limpio
        const descLines = doc.splitTextToSize(product.description, 170);
        
        doc.setFontSize(10);
        setColor(doc, colors.text, 'text');
        doc.setFont(undefined, 'normal');
        doc.text(descLines, 20, yPos);
        
        yPos += (descLines.length * 5) + 15;

        // ===== TABLA CORPORATIVA DE TAMAÑOS Y PRECIOS =====
        if (product.sizes && product.sizes.length > 0) {
            yPos = addSectionTitle('TAMAÑOS Y PRECIOS', yPos);
            
            // Encabezado de tabla corporativo
            const tableY = yPos;
            const rowHeight = 10;
            const colWidths = [70, 70, 50];
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
            doc.text('TAMAÑO', 25, tableY + 7);
            doc.text('PRECIO (MXN)', 95, tableY + 7);
            doc.text('DISPONIBILIDAD', 145, tableY + 7);
            
            let currentY = tableY + rowHeight;
            
            // Filas de datos con estilo corporativo
            product.sizes.forEach((size, index) => {
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
                doc.setFont(undefined, 'normal');
                doc.text(size.label, 25, currentY + 7);
                
                // Precio
                doc.setFont(undefined, 'bold');
                doc.text(`$${size.price}`, 95, currentY + 7);
                
                // Estado simple
                doc.setFont(undefined, 'normal');
                doc.setTextColor(34, 139, 34);
                doc.text('En Stock', 145, currentY + 7);
                
                currentY += rowHeight;
            });
            
            yPos = currentY + 15;
        }

        // ===== FRAGANCIAS/VARIANTES EN FORMATO CORPORATIVO =====
        const options = product.fragrances || product.variants;
        if (options && options.length > 0) {
            if (yPos > 220) {
                doc.addPage();
                yPos = 20;
            }
            
            const sectionTitle = product.fragrances ? 'FRAGANCIAS DISPONIBLES' : 'VARIANTES DISPONIBLES';
            yPos = addSectionTitle(sectionTitle, yPos);
            
            // Lista simple de opciones
            const itemsPerRow = 3;
            const itemWidth = 55;
            const itemHeight = 8;
            const startX = 20;
            
            options.forEach((option, index) => {
                const row = Math.floor(index / itemsPerRow);
                const col = index % itemsPerRow;
                const x = startX + (col * (itemWidth + 5));
                const y = yPos + (row * (itemHeight + 2));
                
                // Punto simple
                setColor(doc, colors.primary, 'fill');
                doc.circle(x + 2, y + 4, 1, 'F');
                
                // Texto de opción
                doc.setFontSize(9);
                setColor(doc, colors.text, 'text');
                doc.setFont(undefined, 'normal');
                const optionText = option.length > 15 ? option.substring(0, 15) + '...' : option;
                doc.text(optionText, x + 6, y + 5);
            });
            
            const totalRows = Math.ceil(options.length / itemsPerRow);
            yPos += (totalRows * (itemHeight + 2)) + 15;
        }

        // ===== TIPO DE CERA CORPORATIVO =====
        if (product.type) {
            if (yPos > 240) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('TIPO DE CERA', yPos);
            
            // Mostrar tipo simple
            doc.setFontSize(9);
            setColor(doc, colors.text, 'text');
            doc.setFont(undefined, 'normal');
            
            // Punto simple
            setColor(doc, colors.primary, 'fill');
            doc.circle(22, yPos + 4, 1, 'F');
            
            doc.text(product.type, 28, yPos + 5);
            yPos += 18;
        }

        // ===== INGREDIENTES CORPORATIVO =====
        if (product.ingredients && product.ingredients.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('COMPOSICIÓN E INGREDIENTES', yPos);
            
            product.ingredients.forEach((ingredient, index) => {
                // Punto simple
                setColor(doc, colors.primary, 'fill');
                doc.circle(22, yPos + 4, 1, 'F');
                
                // Ingrediente como string simple
                doc.setFontSize(9);
                setColor(doc, colors.text, 'text');
                doc.setFont(undefined, 'normal');
                doc.text(ingredient, 28, yPos + 5);
                
                yPos += 8;
            });
            
            yPos += 10;
        }

        // ===== CARACTERÍSTICAS CORPORATIVAS =====
        if (product.characteristics && product.characteristics.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('CARACTERÍSTICAS DISTINTIVAS', yPos);
            
            product.characteristics.forEach((characteristic, index) => {
                // Punto simple
                setColor(doc, colors.primary, 'fill');
                doc.circle(22, yPos + 4, 1, 'F');
                
                // Característica como string simple
                doc.setFontSize(9);
                setColor(doc, colors.text, 'text');
                doc.setFont(undefined, 'normal');
                doc.text(characteristic, 28, yPos + 5);
                
                yPos += 8;
            });
            
            yPos += 10;
        }

        // ===== INSTRUCCIONES DE CUIDADO CORPORATIVAS =====
        if (product.care && product.care.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('INSTRUCCIONES DE USO Y CUIDADO', yPos);
            
            // Advertencia simple
            doc.setFillColor(255, 248, 220);
            doc.rect(20, yPos, 170, 10, 'F');
            setColor(doc, colors.border, 'draw');
            doc.setLineWidth(0.3);
            doc.rect(20, yPos, 170, 10, 'S');
            
            doc.setFontSize(8);
            doc.setTextColor(180, 83, 9);
            doc.setFont(undefined, 'bold');
            doc.text('IMPORTANTE: Siga estas instrucciones para garantizar la calidad y seguridad', 25, yPos + 6);
            
            yPos += 18;
            
            // Lista numerada simple
            product.care.forEach((careItem, index) => {
                // Número de paso
                doc.setFontSize(9);
                setColor(doc, colors.primary, 'text');
                doc.setFont(undefined, 'bold');
                doc.text(`${index + 1}.`, 20, yPos + 5);
                
                // Instrucción de cuidado como string simple
                setColor(doc, colors.text, 'text');
                doc.setFont(undefined, 'normal');
                const careLines = doc.splitTextToSize(careItem, 160);
                doc.text(careLines, 28, yPos + 5);
                
                yPos += (careLines.length * 5) + 8;
            });
        }

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
        const fileName = `Ficha_Tecnica_${product.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);

        console.log('✅ PDF profesional generado exitosamente');
        return true;

    } catch (error) {
        console.error('❌ Error generando PDF:', error);
        alert('Error al generar la ficha técnica. Por favor, inténtalo de nuevo.');
        return false;
    }
}

// Hacer la función disponible globalmente
window.generateTechSheet = generateProfessionalTechSheet;

console.log('📄 Generador profesional de PDF inicializado');