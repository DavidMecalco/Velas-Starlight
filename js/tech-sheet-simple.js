/**
 * ========================================
 * GENERADOR PROFESIONAL DE FICHA TÉCNICA PDF
 * Velas Starlight - Diseño Corporativo Minimalista
 * ========================================
 */

// Función profesional para generar PDF corporativo
function generateSimpleTechSheet(product) {
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
        
        let yPos = 0;

        // ===== ENCABEZADO CORPORATIVO MINIMALISTA =====
        
        // Fondo blanco limpio
        doc.setFillColor(...colors.white);
        doc.rect(0, 0, 210, 45, 'F');
        
        // Línea superior corporativa sutil
        doc.setFillColor(...colors.accent);
        doc.rect(0, 0, 210, 2, 'F');
        
        // Logo simulado (rectángulo con iniciales)
        doc.setFillColor(...colors.primary);
        doc.rect(20, 12, 25, 20, 'F');
        doc.setFontSize(16);
        doc.setTextColor(...colors.white);
        doc.setFont(undefined, 'bold');
        doc.text('VS', 28, 25);
        
        // Nombre de la empresa
        doc.setFontSize(20);
        doc.setTextColor(...colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text('VELAS STARLIGHT', 55, 20);
        
        // Subtítulo corporativo
        doc.setFontSize(12);
        doc.setTextColor(...colors.secondary);
        doc.setFont(undefined, 'normal');
        doc.text('FICHA TÉCNICA DE PRODUCTO', 55, 28);
        
        // Fecha y código en el lado derecho
        const today = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        doc.setFontSize(9);
        doc.setTextColor(...colors.lightText);
        doc.text(`Fecha: ${today}`, 140, 18);
        doc.text(`Código: VS-${String(product.id).padStart(4, '0')}`, 140, 25);
        doc.text('Documento Oficial', 140, 32);
        
        // Línea divisoria sutil
        doc.setDrawColor(...colors.lightBorder);
        doc.setLineWidth(0.5);
        doc.line(20, 40, 190, 40);

        yPos = 55;

        // ===== INFORMACIÓN PRINCIPAL DEL PRODUCTO =====
        
        // Título del producto con tipografía corporativa
        doc.setFontSize(18);
        doc.setTextColor(...colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text(product.title, 20, yPos + 10);
        
        // Línea divisoria bajo el título
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.3);
        doc.line(20, yPos + 15, 190, yPos + 15);
        
        // Información básica en formato tabla limpia
        doc.setFontSize(10);
        doc.setTextColor(...colors.text);
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
        doc.setTextColor(product.available ? [34, 139, 34] : [220, 20, 60]);
        doc.text(status, 145, yPos + 25);
        
        // Código del producto
        doc.setTextColor(...colors.text);
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
            doc.setTextColor(...colors.primary);
            doc.setFont(undefined, 'bold');
            doc.text(title, 20, yPosition);
            
            // Línea divisoria sutil
            doc.setDrawColor(...colors.border);
            doc.setLineWidth(0.3);
            doc.line(20, yPosition + 3, 190, yPosition + 3);
            
            return yPosition + 12;
        }
        
        yPos = addSectionTitle('DESCRIPCIÓN DEL PRODUCTO', yPos);
        
        // Descripción en formato corporativo limpio
        const descLines = doc.splitTextToSize(product.description, 170);
        
        doc.setFontSize(10);
        doc.setTextColor(...colors.text);
        doc.setFont(undefined, 'normal');
        doc.text(descLines, 20, yPos);
        
        yPos += (descLines.length * 5) + 15;

        // ===== TABLA ELEGANTE DE TAMAÑOS Y PRECIOS =====
        if (product.sizes && product.sizes.length > 0) {
            yPos = addSectionTitle('TAMAÑOS Y PRECIOS', yPos);
            
            // Encabezado de tabla elegante
            const tableY = yPos;
            const rowHeight = 12;
            const colWidths = [60, 60, 50];
            const tableWidth = colWidths.reduce((a, b) => a + b, 0);
            
            // Fondo del encabezado con gradiente simulado
            doc.setFillColor(...colors.primary);
            doc.rect(20, tableY, tableWidth, rowHeight, 'F');
            
            // Línea dorada superior
            doc.setFillColor(...colors.gold);
            doc.rect(20, tableY, tableWidth, 2, 'F');
            
            // Texto del encabezado
            doc.setFontSize(11);
            doc.setTextColor(...colors.white);
            doc.setFont(undefined, 'bold');
            doc.text('TAMAÑO', 25, tableY + 8);
            doc.text('PRECIO', 85, tableY + 8);
            doc.text('ESTADO', 125, tableY + 8);
            
            let currentY = tableY + rowHeight;
            
            // Filas de datos con estilo alternado
            product.sizes.forEach((size, index) => {
                // Fondo alternado elegante
                if (index % 2 === 0) {
                    doc.setFillColor(...colors.background);
                    doc.rect(20, currentY, tableWidth, rowHeight, 'F');
                }
                
                // Bordes sutiles
                doc.setDrawColor(...colors.border);
                doc.setLineWidth(0.2);
                doc.rect(20, currentY, tableWidth, rowHeight, 'S');
                
                // Contenido con tipografía elegante
                doc.setFontSize(10);
                doc.setTextColor(...colors.text);
                doc.setFont(undefined, 'normal');
                doc.text(size.label, 25, currentY + 8);
                
                // Precio con formato elegante
                doc.setFont(undefined, 'bold');
                doc.text(`$${size.price} MXN`, 85, currentY + 8);
                
                // Estado con badge verde
                doc.setFillColor(34, 197, 94);
                doc.roundedRect(125, currentY + 2, 25, 8, 1, 1, 'F');
                doc.setFontSize(8);
                doc.setTextColor(...colors.white);
                doc.setFont(undefined, 'bold');
                doc.text('✓ Stock', 127, currentY + 7);
                
                currentY += rowHeight;
            });
            
            yPos = currentY + 20;
        }

        // ===== GRID ELEGANTE DE FRAGANCIAS =====
        if (product.fragrances && product.fragrances.length > 0) {
            if (yPos > 220) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('FRAGANCIAS DISPONIBLES', yPos);
            
            // Grid elegante de fragancias
            const itemsPerRow = 3;
            const itemWidth = 50;
            const itemHeight = 12;
            const startX = 25;
            
            product.fragrances.forEach((fragrance, index) => {
                const row = Math.floor(index / itemsPerRow);
                const col = index % itemsPerRow;
                const x = startX + (col * (itemWidth + 5));
                const y = yPos + (row * (itemHeight + 3));
                
                // Caja elegante para cada fragancia
                doc.setFillColor(...colors.background);
                doc.roundedRect(x, y, itemWidth, itemHeight, 2, 2, 'F');
                doc.setDrawColor(...colors.secondary);
                doc.setLineWidth(0.3);
                doc.roundedRect(x, y, itemWidth, itemHeight, 2, 2, 'S');
                
                // Punto decorativo
                doc.setFillColor(...colors.gold);
                doc.circle(x + 4, y + 6, 1.5, 'F');
                
                // Texto de fragancia
                doc.setFontSize(9);
                doc.setTextColor(...colors.text);
                doc.setFont(undefined, 'normal');
                const fragranceText = fragrance.length > 12 ? fragrance.substring(0, 12) + '...' : fragrance;
                doc.text(fragranceText, x + 8, y + 7);
            });
            
            const totalRows = Math.ceil(product.fragrances.length / itemsPerRow);
            yPos += (totalRows * (itemHeight + 3)) + 20;
        }

        // ===== TIPOS DE CERA CON BADGES ELEGANTES =====
        if (product.types && product.types.length > 0) {
            if (yPos > 240) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('COMPOSICIÓN DE CERA', yPos);
            
            // Badges elegantes para tipos de cera
            product.types.forEach((type, index) => {
                const badgeWidth = 40;
                const badgeHeight = 10;
                const xPos = 25 + (index * (badgeWidth + 10));
                
                // Badge con gradiente simulado
                doc.setFillColor(...colors.secondary);
                doc.roundedRect(xPos, yPos, badgeWidth, badgeHeight, 3, 3, 'F');
                
                // Borde dorado
                doc.setDrawColor(...colors.gold);
                doc.setLineWidth(0.5);
                doc.roundedRect(xPos, yPos, badgeWidth, badgeHeight, 3, 3, 'S');
                
                // Texto del tipo
                doc.setFontSize(9);
                doc.setTextColor(...colors.white);
                doc.setFont(undefined, 'bold');
                doc.text(type, xPos + 2, yPos + 7);
            });
            
            yPos += 25;
        }

        // ===== INGREDIENTES PREMIUM =====
        if (product.ingredients && product.ingredients.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('COMPOSICIÓN E INGREDIENTES', yPos);
            
            product.ingredients.forEach((ingredient, index) => {
                // Caja elegante para cada ingrediente
                const boxHeight = ingredient.description ? 20 : 15;
                
                doc.setFillColor(...colors.background);
                doc.roundedRect(20, yPos, 170, boxHeight, 2, 2, 'F');
                doc.setDrawColor(...colors.border);
                doc.setLineWidth(0.3);
                doc.roundedRect(20, yPos, 170, boxHeight, 2, 2, 'S');
                
                // Número de ingrediente con círculo dorado
                doc.setFillColor(...colors.gold);
                doc.circle(28, yPos + 7, 3, 'F');
                doc.setFontSize(8);
                doc.setTextColor(...colors.white);
                doc.setFont(undefined, 'bold');
                doc.text((index + 1).toString(), 26.5, yPos + 8.5);
                
                // Nombre del ingrediente
                doc.setFontSize(11);
                doc.setTextColor(...colors.primary);
                doc.setFont(undefined, 'bold');
                doc.text(ingredient.name, 35, yPos + 8);
                
                // Porcentaje y origen con badges
                let infoX = 120;
                if (ingredient.percentage) {
                    doc.setFillColor(...colors.secondary);
                    doc.roundedRect(infoX, yPos + 3, 20, 6, 1, 1, 'F');
                    doc.setFontSize(8);
                    doc.setTextColor(...colors.white);
                    doc.setFont(undefined, 'bold');
                    doc.text(ingredient.percentage, infoX + 2, yPos + 7);
                    infoX += 25;
                }
                
                if (ingredient.origin) {
                    const originColor = ingredient.origin === 'Natural' ? [34, 197, 94] : [156, 163, 175];
                    doc.setFillColor(...originColor);
                    doc.roundedRect(infoX, yPos + 3, 25, 6, 1, 1, 'F');
                    doc.setFontSize(7);
                    doc.setTextColor(...colors.white);
                    doc.setFont(undefined, 'bold');
                    doc.text(ingredient.origin, infoX + 2, yPos + 7);
                }
                
                // Descripción si existe
                if (ingredient.description) {
                    doc.setFontSize(9);
                    doc.setTextColor(...colors.lightText);
                    doc.setFont(undefined, 'normal');
                    const descLines = doc.splitTextToSize(ingredient.description, 150);
                    doc.text(descLines, 35, yPos + 14);
                }
                
                yPos += boxHeight + 5;
            });
            
            yPos += 15;
        }

        // ===== CARACTERÍSTICAS PREMIUM =====
        if (product.characteristics && product.characteristics.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('CARACTERÍSTICAS DISTINTIVAS', yPos);
            
            // Grid elegante de características
            const itemsPerRow = 2;
            const itemWidth = 80;
            const itemHeight = 18;
            
            product.characteristics.forEach((char, index) => {
                const row = Math.floor(index / itemsPerRow);
                const col = index % itemsPerRow;
                const x = 25 + (col * (itemWidth + 10));
                const y = yPos + (row * (itemHeight + 5));
                
                // Caja elegante con borde dorado
                doc.setFillColor(...colors.background);
                doc.roundedRect(x, y, itemWidth, itemHeight, 3, 3, 'F');
                doc.setDrawColor(...colors.gold);
                doc.setLineWidth(0.5);
                doc.roundedRect(x, y, itemWidth, itemHeight, 3, 3, 'S');
                
                // Icono decorativo (simulado con símbolo)
                doc.setFontSize(12);
                doc.setTextColor(...colors.gold);
                doc.text('◆', x + 4, y + 8);
                
                // Título de característica
                doc.setFontSize(10);
                doc.setTextColor(...colors.primary);
                doc.setFont(undefined, 'bold');
                doc.text(char.title, x + 12, y + 7);
                
                // Descripción
                doc.setFontSize(8);
                doc.setTextColor(...colors.lightText);
                doc.setFont(undefined, 'normal');
                const descLines = doc.splitTextToSize(char.description, itemWidth - 15);
                doc.text(descLines, x + 12, y + 12);
            });
            
            const totalRows = Math.ceil(product.characteristics.length / itemsPerRow);
            yPos += (totalRows * (itemHeight + 5)) + 20;
        }

        // ===== INSTRUCCIONES DE CUIDADO PREMIUM =====
        if (product.care && product.care.length > 0) {
            if (yPos > 200) {
                doc.addPage();
                yPos = 20;
            }
            
            yPos = addSectionTitle('INSTRUCCIONES DE USO Y CUIDADO', yPos);
            
            // Caja de advertencia elegante
            doc.setFillColor(255, 248, 220); // Amarillo muy claro
            doc.roundedRect(20, yPos, 170, 12, 3, 3, 'F');
            doc.setDrawColor(...colors.gold);
            doc.setLineWidth(0.8);
            doc.roundedRect(20, yPos, 170, 12, 3, 3, 'S');
            
            doc.setFontSize(10);
            doc.setTextColor(180, 83, 9); // Naranja oscuro
            doc.setFont(undefined, 'bold');
            doc.text('⚠️ IMPORTANTE: Siga estas instrucciones para garantizar la calidad y seguridad', 25, yPos + 8);
            
            yPos += 20;
            
            // Lista numerada elegante de cuidados
            product.care.forEach((careItem, index) => {
                // Número de paso con círculo elegante
                doc.setFillColor(...colors.primary);
                doc.circle(28, yPos + 5, 4, 'F');
                doc.setFillColor(...colors.gold);
                doc.circle(28, yPos + 5, 3, 'F');
                doc.setFontSize(9);
                doc.setTextColor(...colors.white);
                doc.setFont(undefined, 'bold');
                doc.text((index + 1).toString(), 26.5, yPos + 7);
                
                // Título del cuidado
                doc.setFontSize(11);
                doc.setTextColor(...colors.primary);
                doc.setFont(undefined, 'bold');
                doc.text(careItem.title, 38, yPos + 6);
                
                // Descripción con formato elegante
                doc.setFontSize(10);
                doc.setTextColor(...colors.text);
                doc.setFont(undefined, 'normal');
                const descLines = doc.splitTextToSize(careItem.description, 140);
                doc.text(descLines, 38, yPos + 12);
                
                yPos += Math.max(15, descLines.length * 4 + 10);
            });
        }

        // ===== PIE DE PÁGINA ELEGANTE =====
        const pageHeight = doc.internal.pageSize.height;
        const footerY = pageHeight - 30;
        
        // Fondo elegante del pie de página
        doc.setFillColor(...colors.background);
        doc.rect(0, footerY - 5, 210, 35, 'F');
        
        // Línea decorativa dorada superior
        doc.setDrawColor(...colors.gold);
        doc.setLineWidth(2);
        doc.line(20, footerY - 2, 190, footerY - 2);
        
        // Logo/Nombre de la empresa
        doc.setFontSize(12);
        doc.setTextColor(...colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text('VELAS STARLIGHT', 20, footerY + 8);
        
        // Slogan elegante
        doc.setFontSize(9);
        doc.setTextColor(...colors.lightText);
        doc.setFont(undefined, 'italic');
        doc.text('Productos Artesanales de Calidad Premium', 20, footerY + 15);
        
        // Información de contacto con iconos
        doc.setFontSize(9);
        doc.setTextColor(...colors.text);
        doc.setFont(undefined, 'normal');
        doc.text('📱 WhatsApp: +52 564 682 112', 20, footerY + 22);
        doc.text('📧 Instagram: @velas_starlight', 100, footerY + 22);
        
        // Información del documento
        doc.setTextColor(...colors.lightText);
        doc.text('📄 Documento Oficial Generado Automáticamente', 20, footerY + 28);
        
        // Fecha y número de página
        doc.setTextColor(...colors.primary);
        doc.setFont(undefined, 'bold');
        const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
        doc.text(`Página ${pageNum}`, 160, footerY + 15);
        doc.text(`${today}`, 160, footerY + 22);

        // Descargar
        const fileName = `Ficha_Tecnica_${product.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}.pdf`;
        doc.save(fileName);

        console.log('✅ PDF generado exitosamente');
        return true;

    } catch (error) {
        console.error('❌ Error generando PDF:', error);
        alert('Error al generar la ficha técnica. Por favor, inténtalo de nuevo.');
        return false;
    }
}

// Hacer la función disponible globalmente
window.generateTechSheet = generateSimpleTechSheet;

console.log('📄 Generador simple de PDF inicializado');