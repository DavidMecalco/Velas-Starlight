/**
 * ========================================
 * GENERADOR PROFESIONAL DE FICHA TÉCNICA PDF
 * Velas Starlight - Premium PDF Generator
 * ========================================
 */

// Función profesional para generar PDF de alta gama
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
        
        // Configuración de colores profesionales
        const colors = {
            primary: [45, 62, 51],      // Verde oscuro elegante
            secondary: [163, 177, 138],  // Verde suave
            accent: [58, 90, 64],       // Verde medio
            gold: [212, 175, 55],       // Dorado elegante
            text: [33, 37, 41],         // Gris muy oscuro
            lightText: [108, 117, 125], // Gris medio
            background: [248, 249, 250], // Gris muy claro
            white: [255, 255, 255],     // Blanco puro
            border: [222, 226, 230]     // Gris claro para bordes
        };
        
        let yPos = 0;

        // ===== ENCABEZADO ELEGANTE DE ALTA GAMA =====
        
        // Fondo degradado del encabezado principal
        doc.setFillColor(...colors.primary);
        doc.rect(0, 0, 210, 50, 'F');
        
        // Línea dorada superior elegante
        doc.setFillColor(...colors.gold);
        doc.rect(0, 0, 210, 3, 'F');
        
        // Logo/Título principal con tipografía elegante
        doc.setFontSize(24);
        doc.setTextColor(...colors.white);
        doc.setFont(undefined, 'bold');
        doc.text('VELAS STARLIGHT', 20, 25);
        
        // Subtítulo elegante
        doc.setFontSize(14);
        doc.setFont(undefined, 'normal');
        doc.text('FICHA TÉCNICA PREMIUM', 20, 35);
        
        // Fecha y versión en el lado derecho
        const today = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200);
        doc.text(`${today}`, 140, 30);
        doc.text('Documento Oficial', 140, 37);
        
        // Línea decorativa inferior
        doc.setFillColor(...colors.secondary);
        doc.rect(0, 47, 210, 2, 'F');

        yPos = 65;

        // ===== INFORMACIÓN PRINCIPAL DEL PRODUCTO =====
        
        // Caja elegante para información principal
        doc.setFillColor(...colors.background);
        doc.roundedRect(15, yPos, 180, 40, 3, 3, 'F');
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.5);
        doc.roundedRect(15, yPos, 180, 40, 3, 3, 'S');
        
        // Título del producto con tipografía elegante
        doc.setFontSize(22);
        doc.setTextColor(...colors.primary);
        doc.setFont(undefined, 'bold');
        doc.text(product.title, 20, yPos + 15);
        
        // Badge de categoría elegante
        doc.setFillColor(...colors.secondary);
        doc.roundedRect(20, yPos + 22, 35, 8, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setTextColor(...colors.white);
        doc.setFont(undefined, 'bold');
        doc.text(product.category.toUpperCase(), 22, yPos + 27);
        
        // ID del producto con estilo
        doc.setFontSize(11);
        doc.setTextColor(...colors.lightText);
        doc.setFont(undefined, 'normal');
        doc.text(`Código: VS-${String(product.id).padStart(4, '0')}`, 140, yPos + 20);
        
        // Estado de disponibilidad con badge colorido
        const status = product.available ? 'DISPONIBLE' : 'NO DISPONIBLE';
        const statusColor = product.available ? [34, 197, 94] : [239, 68, 68];
        doc.setFillColor(...statusColor);
        doc.roundedRect(140, yPos + 25, 40, 7, 2, 2, 'F');
        doc.setFontSize(8);
        doc.setTextColor(...colors.white);
        doc.setFont(undefined, 'bold');
        doc.text(status, 142, yPos + 30);

        yPos += 55;

        // ===== DESCRIPCIÓN ELEGANTE =====
        
        // Función auxiliar para crear títulos de sección elegantes
        function addSectionTitle(title, yPosition) {
            // Línea decorativa dorada
            doc.setDrawColor(...colors.gold);
            doc.setLineWidth(2);
            doc.line(20, yPosition, 35, yPosition);
            
            // Título de sección
            doc.setFontSize(16);
            doc.setTextColor(...colors.primary);
            doc.setFont(undefined, 'bold');
            doc.text(title, 40, yPosition + 2);
            
            return yPosition + 15;
        }
        
        yPos = addSectionTitle('DESCRIPCIÓN DEL PRODUCTO', yPos);
        
        // Caja elegante para la descripción
        const descLines = doc.splitTextToSize(product.description, 160);
        const descHeight = Math.max(25, descLines.length * 5 + 10);
        
        doc.setFillColor(...colors.background);
        doc.roundedRect(20, yPos, 170, descHeight, 2, 2, 'F');
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.3);
        doc.roundedRect(20, yPos, 170, descHeight, 2, 2, 'S');
        
        // Texto de descripción con tipografía elegante
        doc.setFontSize(11);
        doc.setTextColor(...colors.text);
        doc.setFont(undefined, 'normal');
        doc.text(descLines, 25, yPos + 8);
        
        yPos += descHeight + 20;

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