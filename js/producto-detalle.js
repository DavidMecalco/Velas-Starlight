/**
 * ========================================
 * PÁGINA DE DETALLE DEL PRODUCTO
 * Velas Starlight - Product Detail Page
 * ========================================
 */

class ProductDetailPage {
    constructor() {
        this.product = null;
        this.selectedSize = null;
        this.selectedFragrance = null;
        this.selectedType = null;
        this.quantity = 1;
    }

    /**
     * Inicializar la página
     */
    init() {
        console.log('🚀 Inicializando página de detalle del producto...');
        
        // Limpiar secciones dinámicas al inicializar
        this.clearDynamicSections();
        
        // Obtener ID del producto desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            console.error('❌ No se encontró ID del producto en la URL');
            this.showError('Producto no encontrado');
            return;
        }
        
        // Cargar producto
        this.loadProduct(parseInt(productId));
        
        // Configurar event listeners
        this.setupEventListeners();
        
        console.log('✅ Página de detalle inicializada');
    }

    /**
     * Cargar producto por ID
     */
    loadProduct(productId) {
        console.log(`🔍 Buscando producto con ID: ${productId}`);
        
        // Obtener productos actuales
        const products = window.getCurrentProducts ? window.getCurrentProducts() : window.productosData || [];
        
        // Buscar producto
        this.product = products.find(p => p.id === productId);
        
        if (!this.product) {
            console.error(`❌ Producto con ID ${productId} no encontrado`);
            this.showError('Producto no encontrado');
            return;
        }
        
        console.log(`✅ Producto encontrado: ${this.product.title}`);
        this.renderProduct();
    }

    /**
     * Renderizar producto en la página
     */
    renderProduct() {
        const product = this.product;
        
        // Limpiar secciones dinámicas anteriores
        this.clearDynamicSections();
        
        // Actualizar título de la página
        document.title = `${product.title} | Velas Starlight`;
        document.getElementById('page-title').textContent = `${product.title} | Velas Starlight`;
        document.getElementById('page-description').content = product.description;
        
        // Actualizar breadcrumbs
        document.getElementById('breadcrumb-category').textContent = product.category;
        document.getElementById('breadcrumb-product').textContent = product.title;
        
        // Imagen principal
        const mainImage = document.getElementById('main-product-image');
        if (product.imageData && product.imageData.base64) {
            console.log(`🖼️ Cargando imagen base64 para: ${product.title}`);
            mainImage.src = product.imageData.base64;
        } else {
            console.log(`🖼️ Cargando imagen URL para: ${product.title}`);
            mainImage.src = product.image || '../images/placeholder-vela.jpg';
        }
        mainImage.alt = product.title;
        
        // Verificar si la imagen se carga correctamente
        mainImage.onerror = function() {
            console.error(`❌ Error cargando imagen para: ${product.title}`);
            this.src = '../images/placeholder-vela.jpg';
        };
        
        // Badges
        this.renderBadges();
        
        // Categoría
        document.getElementById('product-category-badge').textContent = product.category;
        
        // Título y descripción
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
        
        // Precio
        this.updatePrice();
        
        // Tipos/Materiales
        this.renderTypes();
        
        // Tamaños
        this.renderSizes();
        
        // Fragancias
        this.renderFragrances();
        
        // Características (si existen)
        this.renderCharacteristics();
        
        // Cuidados (si existen)
        this.renderCare();
        
        // Configurar botones
        this.setupButtons();
        
        // Renderizar productos relacionados
        this.renderRelatedProducts();
    }

    /**
     * Renderizar badges
     */
    renderBadges() {
        const badgesContainer = document.getElementById('product-badges');
        const badges = [];
        
        if (this.product.new) {
            badges.push('<span class="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">🆕 Nuevo</span>');
        }
        
        if (this.product.featured) {
            badges.push('<span class="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">⭐ Destacado</span>');
        }
        
        if (!this.product.available) {
            badges.push('<span class="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">❌ No disponible</span>');
        }
        
        badgesContainer.innerHTML = badges.join('');
    }

    /**
     * Renderizar tipos/materiales
     */
    renderTypes() {
        const typesContainer = document.getElementById('type-options');
        const typeSection = document.getElementById('type-section');
        
        if (!this.product.types || this.product.types.length === 0) {
            typeSection.style.display = 'none';
            return;
        }
        
        // Actualizar etiqueta según la categoría
        const typeLabel = document.getElementById('type-label');
        if (this.product.category === 'Belleza') {
            typeLabel.textContent = 'Tipo:';
        } else {
            typeLabel.textContent = 'Tipo de Cera:';
        }
        
        const typesHTML = this.product.types.map(type => `
            <button class="option-card px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-sage-green transition-colors type-option" 
                    data-type="${type}">
                <span class="font-medium">${type}</span>
            </button>
        `).join('');
        
        typesContainer.innerHTML = typesHTML;
        
        // Seleccionar el primer tipo por defecto si hay tipos
        if (this.product.types && this.product.types.length > 0) {
            this.selectedType = this.product.types[0];
            this.updateSelectedType();
        }
    }

    /**
     * Renderizar tamaños
     */
    renderSizes() {
        const sizesContainer = document.getElementById('size-options');
        
        if (!this.product.sizes || this.product.sizes.length === 0) {
            sizesContainer.innerHTML = '<p class="text-gray-500">No hay tamaños disponibles</p>';
            return;
        }
        
        const sizesHTML = this.product.sizes.map(size => `
            <div class="option-card p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-sage-green transition-colors size-option" 
                 data-size="${size.label}" data-price="${size.price}">
                <div class="flex justify-between items-center">
                    <span class="font-medium">${size.label}</span>
                    <span class="text-sage-green font-bold">$${size.price} MXN</span>
                </div>
            </div>
        `).join('');
        
        sizesContainer.innerHTML = sizesHTML;
        
        // Seleccionar el primer tamaño por defecto si hay tamaños
        if (this.product.sizes && this.product.sizes.length > 0) {
            this.selectedSize = this.product.sizes[0];
            this.updateSelectedSize();
        }
    }

    /**
     * Renderizar fragancias
     */
    renderFragrances() {
        const fragranceSelect = document.getElementById('fragrance-select');
        const fragranceLabel = document.getElementById('fragrance-label');
        
        if (!this.product.fragrances || this.product.fragrances.length === 0) {
            fragranceSelect.parentElement.style.display = 'none';
            return;
        }
        
        // Actualizar etiqueta según la categoría
        if (this.product.category === 'Belleza') {
            fragranceLabel.textContent = 'Variante:';
        } else {
            fragranceLabel.textContent = 'Fragancia:';
        }
        
        fragranceSelect.innerHTML = '<option value="">Selecciona una opción</option>';
        
        this.product.fragrances.forEach(fragrance => {
            const option = document.createElement('option');
            option.value = fragrance;
            option.textContent = fragrance;
            fragranceSelect.appendChild(option);
        });
        
        // Seleccionar la primera fragancia por defecto si hay fragancias
        if (this.product.fragrances && this.product.fragrances.length > 0) {
            this.selectedFragrance = this.product.fragrances[0];
            fragranceSelect.value = this.selectedFragrance;
        }
    }

    /**
     * Renderizar características
     */
    renderCharacteristics() {
        console.log('🎨 Renderizando características...');
        console.log('🎨 Características del producto:', this.product.characteristics);
        
        // Usar la sección existente en el HTML
        const featuresContainer = document.getElementById('product-features');
        
        if (!this.product.characteristics || this.product.characteristics.length === 0) {
            console.log('🎨 No hay características personalizadas, usando características por defecto');
            this.renderDefaultCharacteristics();
            return;
        }
        
        const characteristicsHTML = this.product.characteristics.map(char => `
            <li class="flex items-center space-x-3">
                <i class="${char.icon} ${char.color} text-lg"></i>
                <div>
                    <span class="font-semibold text-dark-green">${char.title}:</span>
                    <span class="text-gray-600 ml-1">${char.description}</span>
                </div>
            </li>
        `).join('');
        
        featuresContainer.innerHTML = characteristicsHTML;
        console.log('🎨 Características personalizadas renderizadas');
    }

    /**
     * Renderizar características por defecto según categoría
     */
    renderDefaultCharacteristics() {
        const featuresContainer = document.getElementById('product-features');
        
        if (this.product.category === 'Vela') {
            featuresContainer.innerHTML = `
                <li class="flex items-center"><i class="fas fa-leaf text-green-500 mr-3"></i>Cera de ${this.product.types ? this.product.types.join(' y ') : 'alta calidad'}</li>
                <li class="flex items-center"><i class="fas fa-palette text-purple-500 mr-3"></i>${this.product.fragrances ? this.product.fragrances.length : 'Múltiples'} fragancias naturales</li>
                <li class="flex items-center"><i class="fas fa-hand-sparkles text-blue-500 mr-3"></i>Elaboración artesanal</li>
                <li class="flex items-center"><i class="fas fa-home text-sage-green mr-3"></i>Ideal para ambientar espacios</li>
            `;
        } else if (this.product.category === 'Belleza') {
            featuresContainer.innerHTML = `
                <li class="flex items-center"><i class="fas fa-spa text-pink-500 mr-3"></i>Apto para todo tipo de piel</li>
                <li class="flex items-center"><i class="fas fa-vial text-purple-500 mr-3"></i>Fórmula concentrada y efectiva</li>
                <li class="flex items-center"><i class="fas fa-heart text-red-500 mr-3"></i>Sin parabenos ni sulfatos</li>
                <li class="flex items-center"><i class="fas fa-leaf text-green-600 mr-3"></i>Cruelty-free y vegano</li>
                <li class="flex items-center"><i class="fas fa-hand-sparkles text-blue-500 mr-3"></i>Elaboración artesanal</li>
            `;
        } else {
            featuresContainer.innerHTML = `
                <li class="flex items-center"><i class="fas fa-star text-sage-green mr-3"></i>Producto de alta calidad</li>
                <li class="flex items-center"><i class="fas fa-hand-sparkles text-blue-500 mr-3"></i>Elaboración artesanal</li>
                <li class="flex items-center"><i class="fas fa-heart text-red-500 mr-3"></i>Hecho con amor y dedicación</li>
            `;
        }
    }

    /**
     * Renderizar cuidados
     */
    renderCare() {
        console.log('🛡️ Renderizando cuidados...');
        console.log('🛡️ Cuidados del producto:', this.product.care);
        
        // Usar la sección existente en el HTML
        const careContainer = document.getElementById('product-care');
        
        if (!this.product.care || this.product.care.length === 0) {
            console.log('🛡️ No hay cuidados personalizados, usando cuidados por defecto');
            this.renderDefaultCare();
            return;
        }
        
        const careHTML = this.product.care.map(care => `
            <li class="flex items-center space-x-3">
                <i class="${care.icon} ${care.color} text-lg"></i>
                <div>
                    <span class="font-semibold text-dark-green">${care.title}:</span>
                    <span class="text-gray-600 ml-1">${care.description}</span>
                </div>
            </li>
        `).join('');
        
        careContainer.innerHTML = careHTML;
        console.log('🛡️ Cuidados personalizados renderizados');
    }

    /**
     * Renderizar cuidados por defecto según categoría
     */
    renderDefaultCare() {
        const careContainer = document.getElementById('product-care');
        
        if (this.product.category === 'Vela') {
            careContainer.innerHTML = `
                <li class="flex items-center"><i class="fas fa-exclamation-triangle text-yellow-500 mr-3"></i>Nunca dejar encendida sin supervisión</li>
                <li class="flex items-center"><i class="fas fa-scissors text-gray-500 mr-3"></i>Recortar mecha a 5mm antes de encender</li>
                <li class="flex items-center"><i class="fas fa-clock text-blue-500 mr-3"></i>Encender máximo 4 horas continuas</li>
                <li class="flex items-center"><i class="fas fa-wind text-red-500 mr-3"></i>Mantener alejada de corrientes de aire</li>
                <li class="flex items-center"><i class="fas fa-shield-alt text-green-500 mr-3"></i>Colocar sobre superficie resistente al calor</li>
            `;
        } else if (this.product.category === 'Belleza') {
            careContainer.innerHTML = `
                <li class="flex items-center"><i class="fas fa-hand-paper text-blue-500 mr-3"></i>Aplicar sobre piel limpia y seca</li>
                <li class="flex items-center"><i class="fas fa-eye text-yellow-500 mr-3"></i>Evitar contacto directo con los ojos</li>
                <li class="flex items-center"><i class="fas fa-thermometer-half text-red-500 mr-3"></i>Conservar en lugar fresco y seco</li>
                <li class="flex items-center"><i class="fas fa-calendar text-green-500 mr-3"></i>Usar dentro de 12 meses tras abrir</li>
                <li class="flex items-center"><i class="fas fa-test-tube text-purple-500 mr-3"></i>Realizar prueba de alergia antes del primer uso</li>
            `;
        } else {
            careContainer.innerHTML = `
                <li class="flex items-center"><i class="fas fa-shield-alt text-sage-green mr-3"></i>Mantener en lugar seguro</li>
                <li class="flex items-center"><i class="fas fa-hand-paper text-blue-500 mr-3"></i>Usar según las instrucciones</li>
                <li class="flex items-center"><i class="fas fa-thermometer-half text-red-500 mr-3"></i>Conservar en lugar fresco y seco</li>
            `;
        }
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Tipos
        document.addEventListener('click', (e) => {
            if (e.target.closest('.type-option')) {
                const typeButton = e.target.closest('.type-option');
                this.selectedType = typeButton.dataset.type;
                this.updateSelectedType();
            }
        });
        
        // Tamaños
        document.addEventListener('click', (e) => {
            if (e.target.closest('.size-option')) {
                const sizeOption = e.target.closest('.size-option');
                this.selectedSize = {
                    label: sizeOption.dataset.size,
                    price: parseFloat(sizeOption.dataset.price)
                };
                this.updateSelectedSize();
                this.updatePrice();
            }
        });
        
        // Fragancia
        const fragranceSelect = document.getElementById('fragrance-select');
        if (fragranceSelect) {
            fragranceSelect.addEventListener('change', (e) => {
                this.selectedFragrance = e.target.value;
            });
        }
        
        // Cantidad
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const quantityInput = document.getElementById('quantity-input');
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    quantityInput.value = this.quantity;
                }
            });
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.quantity++;
                quantityInput.value = this.quantity;
            });
        }
        
        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                if (value > 0) {
                    this.quantity = value;
                }
            });
        }
        
        // Zoom de imagen
        const mainImage = document.getElementById('main-product-image');
        if (mainImage) {
            mainImage.addEventListener('click', () => {
                this.toggleImageZoom();
            });
        }
    }

    /**
     * Configurar botones de acción
     */
    setupButtons() {
        // Botón agregar al carrito
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            // Prevenir múltiples clicks
            let isProcessing = false;
            
            addToCartBtn.addEventListener('click', (e) => {
                console.log('🛒 Click en botón detectado');
                console.log('🛒 isProcessing:', isProcessing);
                console.log('🛒 addToCartInProgress:', window.addToCartInProgress);
                
                // Prevenir múltiples clicks o ejecuciones
                if (isProcessing || window.addToCartInProgress) {
                    console.log('🛒 Ya se está procesando, ignorando click');
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
                
                isProcessing = true;
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Agregando...';
                
                try {
                    this.addToCart();
                } finally {
                    // Restaurar botón después de un breve delay
                    setTimeout(() => {
                        isProcessing = false;
                        addToCartBtn.disabled = false;
                        addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart mr-3"></i>Agregar al Carrito';
                    }, 1500);
                }
            });
        }
        
        // Botón WhatsApp
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                this.contactWhatsApp();
            });
        }
        
        // Botón compartir
        const shareBtn = document.getElementById('share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareProduct();
            });
        }
    }

    /**
     * Actualizar tipo seleccionado
     */
    updateSelectedType() {
        document.querySelectorAll('.type-option').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.type === this.selectedType) {
                btn.classList.add('selected');
            }
        });
    }

    /**
     * Actualizar tamaño seleccionado
     */
    updateSelectedSize() {
        document.querySelectorAll('.size-option').forEach(option => {
            option.classList.remove('selected');
            if (option.dataset.size === this.selectedSize.label) {
                option.classList.add('selected');
            }
        });
    }

    /**
     * Actualizar precio
     */
    updatePrice() {
        const priceElement = document.getElementById('product-price');
        if (this.selectedSize && priceElement) {
            priceElement.textContent = `$${this.selectedSize.price} MXN`;
        } else if (priceElement && this.product && this.product.sizes && this.product.sizes.length > 0) {
            // Mostrar "Precio desde:" con el precio mínimo
            const prices = this.product.sizes.map(size => parseFloat(size.price) || 0);
            const minPrice = Math.min(...prices);
            priceElement.textContent = `$${minPrice.toFixed(2)} MXN`;
        } else if (priceElement) {
            priceElement.textContent = 'Precio no disponible';
        }
    }

    /**
     * Alternar zoom de imagen
     */
    toggleImageZoom() {
        const mainImage = document.getElementById('main-product-image');
        mainImage.classList.toggle('zoomed');
    }

    /**
     * Agregar al carrito
     */
    addToCart() {
        // Prevenir ejecuciones múltiples con un flag global
        if (window.addToCartInProgress) {
            console.log('🛒 ⚠️ addToCart ya en progreso, ignorando llamada');
            return;
        }
        
        window.addToCartInProgress = true;
        
        try {
            console.log('🛒 ========== INICIO addToCart ==========');
            console.log('🛒 Timestamp:', new Date().toISOString());
            console.log('🛒 Stack trace:', new Error().stack);
            console.log('🛒 Producto:', this.product);
            console.log('🛒 Tamaño seleccionado:', this.selectedSize);
            console.log('🛒 Fragancia seleccionada:', this.selectedFragrance);
            console.log('🛒 Tipo seleccionado:', this.selectedType);
            console.log('🛒 Cantidad seleccionada:', this.quantity);
        
        // Validación de tamaño (obligatorio)
        if (!this.selectedSize) {
            this.showNotification('Por favor selecciona un tamaño', 'warning');
            return;
        }
        
        // Validación de fragancia (solo si el producto tiene fragancias)
        if (this.product.fragrances && this.product.fragrances.length > 0 && !this.selectedFragrance) {
            this.showNotification('Por favor selecciona una fragancia', 'warning');
            return;
        }
        
        // Determinar la imagen correcta a usar
        let imageUrl = '../images/placeholder-vela.jpg';
        if (this.product.imageData && this.product.imageData.base64) {
            imageUrl = this.product.imageData.base64;
            console.log('🛒 Usando imagen base64 para el carrito');
        } else if (this.product.image) {
            imageUrl = this.product.image;
            console.log('🛒 Usando imagen URL para el carrito');
        }
        
        const cartItem = {
            id: this.product.id,
            title: this.product.title,
            image: imageUrl,
            category: this.product.category,
            type: this.selectedType || 'N/A',
            size: this.selectedSize,
            fragrance: this.selectedFragrance || 'Sin fragancia',
            quantity: this.quantity,
            unitPrice: this.selectedSize.price, // Precio por unidad
            price: this.selectedSize.price, // Precio por unidad (para compatibilidad)
            total: this.selectedSize.price * this.quantity // Total = precio unitario × cantidad
        };
        
        console.log('🛒 Item del carrito:', cartItem);
        
            try {
                // Agregar al carrito
                this.addItemToCart(cartItem);
                this.showNotification(`${this.product.title} agregado al carrito`, 'success');
                console.log('✅ Producto agregado al carrito exitosamente');
            } catch (error) {
                console.error('❌ Error agregando al carrito:', error);
                this.showNotification('Error al agregar al carrito. Inténtalo de nuevo.', 'error');
            }
        } finally {
            // Limpiar el flag después de un breve delay
            setTimeout(() => {
                window.addToCartInProgress = false;
                console.log('🛒 Flag addToCartInProgress limpiado');
            }, 500);
        }
    }

    /**
     * Agregar item al carrito - Versión simplificada
     */
    addItemToCart(item) {
        try {
            console.log('🛒 === INICIO addItemToCart SIMPLIFICADO ===');
            
            // Siempre agregar como nuevo item para evitar duplicaciones
            // El carrito manejará la consolidación después
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            console.log('🛒 Carrito antes:', cart.length, 'items');
            console.log('🛒 Agregando item:', {
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            });
            
            // Simplemente agregar el item
            cart.push(item);
            
            // Guardar inmediatamente
            localStorage.setItem('cart', JSON.stringify(cart));
            
            console.log('🛒 Carrito después:', cart.length, 'items');
            console.log('🛒 Total unidades:', cart.reduce((sum, item) => sum + item.quantity, 0));
            
            // Actualizar contador
            this.updateCartCount();
            
            console.log('🛒 === FIN addItemToCart SIMPLIFICADO ===');
            
        } catch (error) {
            console.error('❌ Error en addItemToCart:', error);
            throw error;
        }
    }

    /**
     * Actualizar contador del carrito
     */
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    /**
     * Contactar por WhatsApp
     */
    contactWhatsApp() {
        const message = `Hola! Me interesa el producto: ${this.product.title}`;
        const whatsappUrl = `https://wa.me/5564682112?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Compartir producto
     */
    shareProduct() {
        if (navigator.share) {
            navigator.share({
                title: this.product.title,
                text: this.product.description,
                url: window.location.href
            });
        } else {
            // Fallback: copiar URL al portapapeles
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('URL copiada al portapapeles', 'info');
            });
        }
    }

    /**
     * Limpiar secciones dinámicas
     */
    clearDynamicSections() {
        console.log('🧹 Limpiando contenido de secciones...');
        
        // Limpiar contenido de las secciones existentes en lugar de eliminarlas
        const featuresContainer = document.getElementById('product-features');
        const careContainer = document.getElementById('product-care');
        
        if (featuresContainer) {
            featuresContainer.innerHTML = '';
            console.log('🧹 Contenido de características limpiado');
        }
        
        if (careContainer) {
            careContainer.innerHTML = '';
            console.log('🧹 Contenido de cuidados limpiado');
        }
        
        console.log('✅ Secciones dinámicas limpiadas');
    }

    /**
     * Mostrar error
     */
    showError(message) {
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-beige-almond">
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
                    <h1 class="text-2xl font-bold text-dark-green mb-4">Error</h1>
                    <p class="text-gray-600 mb-6">${message}</p>
                    <a href="productos.html" class="bg-sage-green text-white px-6 py-3 rounded-lg hover:bg-dark-green transition-colors">
                        Ver Todos los Productos
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Renderizar productos relacionados
     */
    renderRelatedProducts() {
        console.log('🔗 Renderizando productos relacionados...');
        
        // Buscar contenedor de productos relacionados existente
        let relatedContainer = document.getElementById('related-products');
        
        // Si no existe, buscar el alternativo
        if (!relatedContainer) {
            relatedContainer = document.getElementById('related-products-container');
        }
        
        if (!relatedContainer) {
            console.error('❌ No se encontró el contenedor de productos relacionados');
            return;
        }
        
        // Obtener productos relacionados
        const relatedProducts = this.getRelatedProducts();
        
        if (relatedProducts.length === 0) {
            console.log('🔗 No hay productos relacionados disponibles');
            relatedContainer.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">No hay productos relacionados disponibles</p>
                </div>
            `;
            return;
        }
        
        // Renderizar productos relacionados
        relatedContainer.innerHTML = relatedProducts.map(product => this.generateRelatedProductCard(product)).join('');
        console.log(`🔗 ${relatedProducts.length} productos relacionados renderizados`);
    }

    /**
     * Obtener productos relacionados
     */
    getRelatedProducts() {
        const products = window.getCurrentProducts ? window.getCurrentProducts() : window.productosData || [];
        
        // Filtrar productos de la misma categoría, excluyendo el actual
        let related = products.filter(p => 
            p.id !== this.product.id && 
            p.category === this.product.category &&
            p.available !== false
        );
        
        // Si no hay suficientes de la misma categoría, agregar otros productos
        if (related.length < 4) {
            const others = products.filter(p => 
                p.id !== this.product.id && 
                p.category !== this.product.category &&
                p.available !== false
            );
            
            // Mezclar aleatoriamente los otros productos
            const shuffledOthers = others.sort(() => Math.random() - 0.5);
            related = [...related, ...shuffledOthers];
        }
        
        // Mezclar aleatoriamente y tomar máximo 4
        return related.sort(() => Math.random() - 0.5).slice(0, 4);
    }

    /**
     * Generar tarjeta de producto relacionado
     */
    generateRelatedProductCard(product) {
        const imageUrl = this.getProductImage(product);
        const minPrice = this.getMinPrice(product);
        const badges = this.generateBadges(product);
        
        return `
            <div class="related-product-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer" 
                 onclick="window.location.href='producto-detalle.html?id=${product.id}'"
                 data-aos="fade-up"
                 data-aos-delay="100">
                
                <!-- Imagen del producto -->
                <div class="relative overflow-hidden h-56">
                    <img src="${imageUrl}" 
                         alt="${product.title}" 
                         class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                         onerror="this.src='../images/placeholder-vela.jpg'">
                    
                    <!-- Badges -->
                    <div class="absolute top-3 left-3 flex flex-col space-y-2">
                        ${badges}
                    </div>
                    
                    <!-- Categoría -->
                    <div class="absolute top-3 right-3">
                        <span class="bg-sage-green text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            ${product.category}
                        </span>
                    </div>
                    
                    <!-- Overlay con botón -->
                    <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <button class="bg-white text-dark-green px-6 py-2 rounded-full font-semibold transform scale-90 hover:scale-100 transition-transform duration-300"
                                onclick="event.stopPropagation(); window.location.href='producto-detalle.html?id=${product.id}'">
                            <i class="fas fa-eye mr-2"></i>Ver Detalles
                        </button>
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="p-6">
                    <!-- Título -->
                    <h3 class="text-xl font-bold text-dark-green mb-3 line-clamp-2 min-h-[3rem]">
                        ${product.title}
                    </h3>
                    
                    <!-- Información adicional -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-palette text-purple-500 mr-2"></i>
                            <span>${product.fragrances ? product.fragrances.length : 0} fragancias</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-weight text-blue-500 mr-2"></i>
                            <span>${product.sizes ? product.sizes.length : 0} tamaños</span>
                        </div>
                    </div>
                    
                    <!-- Precio -->
                    <div class="text-center">
                        <span class="text-sm text-gray-600">Desde </span>
                        <span class="text-2xl font-bold text-sage-green">${minPrice} MXN</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Obtener imagen del producto para productos relacionados
     */
    getProductImage(product) {
        if (product.imageData && product.imageData.base64) {
            return product.imageData.base64;
        }
        return product.image || '../images/placeholder-vela.jpg';
    }

    /**
     * Obtener precio mínimo para productos relacionados
     */
    getMinPrice(product) {
        if (!product.sizes || product.sizes.length === 0) {
            return '0.00';
        }
        const prices = product.sizes.map(size => parseFloat(size.price) || 0);
        return Math.min(...prices).toFixed(2);
    }

    /**
     * Generar badges para productos relacionados
     */
    generateBadges(product) {
        const badges = [];
        
        if (product.new) {
            badges.push('<span class="badge new px-3 py-1 rounded-full text-xs font-semibold shadow-lg">🆕 Nuevo</span>');
        }
        
        if (product.featured) {
            badges.push('<span class="badge featured px-3 py-1 rounded-full text-xs font-semibold shadow-lg">⭐ Destacado</span>');
        }
        
        if (!product.available) {
            badges.push('<span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">❌ Agotado</span>');
        }
        
        return badges.join('');
    }

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        // Remover notificaciones existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        // Agregar estilos CSS si no existen
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    padding: 16px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transform: translateX(100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    max-width: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                .notification.success {
                    background: linear-gradient(135deg, #10b981, #059669);
                }
                .notification.error {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                }
                .notification.warning {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                }
                .notification.info {
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                }
                .notification .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    margin-left: 12px;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                .notification .close-btn:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-btn" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar notificación
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto ocultar después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const productDetailPage = new ProductDetailPage();
    productDetailPage.init();
    
    // Hacer disponible globalmente
    window.productDetailPage = productDetailPage;
});