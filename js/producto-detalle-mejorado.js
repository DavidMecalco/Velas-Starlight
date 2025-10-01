/**
 * ========================================
 * PÁGINA DE DETALLE DEL PRODUCTO MEJORADA
 * Velas Starlight - Enhanced Product Detail Page
 * ========================================
 */

class EnhancedProductDetailPage {
    constructor() {
        this.product = null;
        this.selectedSize = null;
        this.selectedFragrance = null;
        this.selectedType = null;
        this.quantity = 1;
        this.isLoading = false;
        this.currentImageIndex = 0;
        this.productImages = [];

        // Configuración de animaciones
        this.animationConfig = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };
    }

    /**
     * Inicializar la página
     */
    init() {
        console.log('🚀 Inicializando página de detalle mejorada...');

        // Obtener ID del producto desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            console.error('❌ No se encontró ID del producto en la URL');
            this.showError('Producto no encontrado');
            return;
        }

        console.log(`🔍 ID del producto desde URL: ${productId} (tipo: ${typeof productId})`);

        // Función para intentar cargar el producto
        const tryLoadProduct = () => {
            if (window.productosData && Array.isArray(window.productosData) && window.productosData.length > 0) {
                console.log(`📊 Intentando cargar producto con ${window.productosData.length} productos disponibles`);
                this.loadProduct(productId); // Pasar como string, la función ya maneja la conversión
                this.setupEventListeners();
                console.log('✅ Página de detalle mejorada inicializada');
                return true;
            }
            return false;
        };

        // Intentar cargar inmediatamente
        if (!tryLoadProduct()) {
            console.log('⏳ Esperando a que los productos estén disponibles...');
            
            // Intentar varias veces
            let attempts = 0;
            const maxAttempts = 20;
            
            const retryInterval = setInterval(() => {
                attempts++;
                console.log(`🔄 Intento ${attempts}/${maxAttempts} de cargar producto`);
                
                if (tryLoadProduct()) {
                    clearInterval(retryInterval);
                } else if (attempts >= maxAttempts) {
                    clearInterval(retryInterval);
                    console.error('❌ No se pudieron cargar los productos después de todos los intentos');
                    this.showError('Error cargando producto');
                }
            }, 200);
        }
    }

    /**
     * Cargar producto por ID
     */
    loadProduct(productId) {
        console.log(`🔍 Buscando producto con ID: ${productId}`);

        // Obtener productos actuales con múltiples fallbacks
        let products = [];
        
        if (window.productosData && Array.isArray(window.productosData)) {
            products = window.productosData;
        } else if (window.getCurrentProducts && typeof window.getCurrentProducts === 'function') {
            products = window.getCurrentProducts();
        } else {
            console.error('❌ No se pueden obtener los productos');
        }
        
        console.log(`📊 Buscando en ${products.length} productos disponibles`);

        // Buscar producto con múltiples métodos de comparación
        this.product = products.find(p => {
            return p.id == productId || 
                   p.id === productId || 
                   p.id === parseInt(productId) || 
                   p.id === productId.toString() ||
                   parseInt(p.id) === parseInt(productId);
        });

        if (!this.product) {
            console.error(`❌ Producto con ID ${productId} no encontrado`);
            console.log('📋 IDs disponibles:', products.map(p => ({ id: p.id, title: p.title })));
            this.showError('Producto no encontrado');
            return;
        }

        console.log(`✅ Producto encontrado: ${this.product.title}`);
        this.renderProduct();
    }

    /**
     * Renderizar producto en la página con animaciones mejoradas
     */
    renderProduct() {
        const product = this.product;

        // Mostrar loading state
        this.showLoadingState();

        // Simular un pequeño delay para mostrar la transición
        setTimeout(() => {
            // Actualizar metadatos de la página
            this.updatePageMetadata(product);

            // Actualizar breadcrumbs con animación
            this.updateBreadcrumbs(product);

            // Configurar galería de imágenes
            this.setupImageGallery(product);

            // Renderizar información del producto
            this.renderProductInfo(product);

            // Renderizar opciones del producto
            this.renderProductOptions(product);

            // Configurar botones de acción
            this.setupButtons();

            // Productos relacionados eliminados

            // Ocultar loading state
            this.hideLoadingState();

            // Inicializar animaciones de entrada
            this.initializeAnimations();

            // Agregar efectos de hover
            this.addHoverEffects();

        }, 300);
    }

    /**
     * Actualizar metadatos de la página
     */
    updatePageMetadata(product) {
        document.title = `${product.title} | Velas Starlight`;

        // Actualizar meta tags
        const pageTitle = document.getElementById('page-title');
        const pageDescription = document.getElementById('page-description');
        const ogTitle = document.getElementById('og-title');
        const ogDescription = document.getElementById('og-description');
        const ogImage = document.getElementById('og-image');

        if (pageTitle) pageTitle.textContent = `${product.title} | Velas Starlight`;
        if (pageDescription) pageDescription.content = product.description;
        if (ogTitle) ogTitle.content = `${product.title} | Velas Starlight`;
        if (ogDescription) ogDescription.content = product.description;
        if (ogImage && product.image) ogImage.content = product.image;
    }

    /**
     * Actualizar breadcrumbs con animación
     */
    updateBreadcrumbs(product) {
        const categoryElement = document.getElementById('breadcrumb-category');
        const productElement = document.getElementById('breadcrumb-product');

        if (categoryElement) {
            categoryElement.style.opacity = '0';
            setTimeout(() => {
                categoryElement.textContent = product.category;
                categoryElement.style.opacity = '1';
                categoryElement.style.transition = 'opacity 0.3s ease';
            }, 150);
        }

        if (productElement) {
            productElement.style.opacity = '0';
            setTimeout(() => {
                productElement.textContent = product.title;
                productElement.style.opacity = '1';
                productElement.style.transition = 'opacity 0.3s ease';
            }, 200);
        }
    }

    /**
     * Configurar galería de imágenes mejorada
     */
    setupImageGallery(product) {
        const mainImage = document.getElementById('main-product-image');

        // Configurar imagen principal
        if (product.imageData && product.imageData.base64) {
            this.productImages = [product.imageData.base64];
            mainImage.src = product.imageData.base64;
        } else if (product.image) {
            this.productImages = [product.image];
            mainImage.src = product.image;
        } else {
            this.productImages = ['../images/placeholder-vela.jpg'];
            mainImage.src = '../images/placeholder-vela.jpg';
        }

        mainImage.alt = product.title;

        // Manejar errores de carga de imagen
        mainImage.onerror = () => {
            console.error(`❌ Error cargando imagen para: ${product.title}`);
            mainImage.src = '../images/placeholder-vela.jpg';
        };

        // Agregar efecto de carga suave
        mainImage.onload = () => {
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
                mainImage.style.transition = 'opacity 0.3s ease';
            }, 100);
        };

        // Configurar zoom de imagen
        this.setupImageZoom(mainImage);
    }

    /**
     * Configurar zoom de imagen mejorado
     */
    setupImageZoom(imageElement) {
        let isZoomed = false;

        imageElement.addEventListener('click', () => {
            if (!isZoomed) {
                // Crear overlay para zoom
                const overlay = document.createElement('div');
                overlay.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center cursor-zoom-out';
                overlay.style.animation = 'fadeIn 0.3s ease-out';

                const zoomedImage = document.createElement('img');
                zoomedImage.src = imageElement.src;
                zoomedImage.alt = imageElement.alt;
                zoomedImage.className = 'max-w-[90vw] max-h-[90vh] object-contain';
                zoomedImage.style.animation = 'scaleIn 0.3s ease-out';

                overlay.appendChild(zoomedImage);
                document.body.appendChild(overlay);

                // Cerrar al hacer clic
                overlay.addEventListener('click', () => {
                    overlay.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        if (document.body.contains(overlay)) {
                            document.body.removeChild(overlay);
                        }
                        isZoomed = false;
                    }, 300);
                });

                // Cerrar con ESC
                const handleEsc = (e) => {
                    if (e.key === 'Escape') {
                        overlay.click();
                        document.removeEventListener('keydown', handleEsc);
                    }
                };
                document.addEventListener('keydown', handleEsc);

                isZoomed = true;
            }
        });
    }

    /**
     * Renderizar información del producto
     */
    renderProductInfo(product) {
        // Badges
        this.renderBadges();

        // Categoría
        const categoryBadge = document.getElementById('product-category-badge');
        if (categoryBadge) {
            categoryBadge.textContent = product.category;
            categoryBadge.style.animation = 'fadeIn 0.5s ease-out';
        }

        // Título con animación de escritura
        const titleElement = document.getElementById('product-title');
        if (titleElement) {
            this.typewriterEffect(titleElement, product.title);
        }

        // Descripción con fade in
        const descriptionElement = document.getElementById('product-description');
        if (descriptionElement) {
            descriptionElement.style.opacity = '0';
            descriptionElement.textContent = product.description;
            setTimeout(() => {
                descriptionElement.style.opacity = '1';
                descriptionElement.style.transition = 'opacity 0.5s ease-out';
            }, 500);
        }

        // Precio con animación
        this.updatePrice(true);
    }

    /**
     * Efecto de escritura para el título
     */
    typewriterEffect(element, text) {
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-green)';

        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 500);
            }
        }, 50);
    }

    /**
     * Renderizar badges
     */
    renderBadges() {
        const badgesContainer = document.getElementById('product-badges');
        if (!badgesContainer) return;

        const badges = [];

        if (this.product.new) {
            badges.push('<span class="product-badge new">🆕 Nuevo</span>');
        }

        if (this.product.featured) {
            badges.push('<span class="product-badge featured">⭐ Destacado</span>');
        }

        if (!this.product.available) {
            badges.push('<span class="product-badge bg-red-500">❌ No disponible</span>');
        }

        badgesContainer.innerHTML = badges.join('');
        
        // Renderizar badges de promociones por separado
        this.renderPromotionBadges();
    }

    /**
     * Renderizar badges de promociones
     */
    renderPromotionBadges() {
        const promotionContainer = document.getElementById('promotion-badges');
        if (!promotionContainer) return;

        const promotionBadges = [];

        // Badge para promoción 2x1
        if (this.product.promotion2x1) {
            promotionBadges.push(`
                <div class="promotion-badge-detail bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <i class="fas fa-gift"></i>
                    <span class="font-semibold">¡Promoción 2x1!</span>
                </div>
            `);
        }

        // Badge para descuento especial
        if (this.product.specialDiscount && this.product.specialDiscount.percentage > 0) {
            promotionBadges.push(`
                <div class="promotion-badge-detail bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                    <i class="fas fa-percent"></i>
                    <span class="font-semibold">${this.product.specialDiscount.percentage}% de descuento</span>
                </div>
            `);
        }

        promotionContainer.innerHTML = promotionBadges.join('');

        // Agregar animación a los badges
        setTimeout(() => {
            const badges = promotionContainer.querySelectorAll('.promotion-badge-detail');
            badges.forEach((badge, index) => {
                badge.style.opacity = '0';
                badge.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                    badge.style.transition = 'all 0.3s ease';
                }, index * 100);
            });
        }, 100);
    }

    /**
     * Renderizar opciones del producto
     */
    renderProductOptions(product) {
        // Tipos/Materiales
        this.renderTypes();

        // Tamaños
        this.renderSizes();

        // Fragancias
        this.renderFragrances();

        // Características
        this.renderCharacteristics();

        // Ingredientes
        this.renderIngredients();

        // Cuidados
        this.renderCare();
    }

    /**
     * Renderizar tipos/materiales
     */
    renderTypes() {
        const typesContainer = document.getElementById('type-options');
        const typeSection = document.getElementById('type-section');

        if (!this.product.types || this.product.types.length === 0) {
            if (typeSection) typeSection.style.display = 'none';
            return;
        }

        // Actualizar etiqueta según la categoría
        const typeLabel = document.getElementById('type-label');
        if (typeLabel) {
            if (this.product.category === 'Belleza') {
                typeLabel.textContent = 'Tipo:';
            } else {
                typeLabel.textContent = 'Tipo de Cera:';
            }
        }

        const typesHTML = this.product.types.map(type => `
            <button class="option-card type-option" data-type="${type}">
                <span class="font-medium">${type}</span>
            </button>
        `).join('');

        if (typesContainer) {
            typesContainer.innerHTML = typesHTML;
        }

        // Seleccionar el primer tipo por defecto
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
            if (sizesContainer) {
                sizesContainer.innerHTML = '<p class="text-gray-500">No hay tamaños disponibles</p>';
            }
            return;
        }

        const sizesHTML = this.product.sizes.map(size => `
            <div class="option-card size-option" data-size="${size.label}" data-price="${size.price}">
                <span>${size.label}</span>
                <span>$${size.price} MXN</span>
            </div>
        `).join('');

        if (sizesContainer) {
            sizesContainer.innerHTML = sizesHTML;
        }

        // Seleccionar el primer tamaño por defecto
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
            if (fragranceSelect && fragranceSelect.parentElement) {
                fragranceSelect.parentElement.style.display = 'none';
            }
            return;
        }

        // Actualizar etiqueta según la categoría
        if (fragranceLabel) {
            if (this.product.category === 'Belleza') {
                fragranceLabel.textContent = 'Variante:';
            } else {
                fragranceLabel.textContent = 'Fragancia:';
            }
        }

        if (fragranceSelect) {
            fragranceSelect.innerHTML = '<option value="">Selecciona una opción</option>';

            this.product.fragrances.forEach(fragrance => {
                const option = document.createElement('option');
                option.value = fragrance;
                option.textContent = fragrance;
                fragranceSelect.appendChild(option);
            });

            // Seleccionar la primera fragancia por defecto
            if (this.product.fragrances && this.product.fragrances.length > 0) {
                this.selectedFragrance = this.product.fragrances[0];
                fragranceSelect.value = this.selectedFragrance;
            }
        }
    }

    /**
     * Renderizar características
     */
    renderCharacteristics() {
        const featuresContainer = document.getElementById('product-features');
        if (!featuresContainer) return;

        if (!this.product.characteristics || this.product.characteristics.length === 0) {
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
    }

    /**
     * Renderizar características por defecto
     */
    renderDefaultCharacteristics() {
        const featuresContainer = document.getElementById('product-features');
        if (!featuresContainer) return;

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
        const careContainer = document.getElementById('product-care');
        if (!careContainer) return;

        if (!this.product.care || this.product.care.length === 0) {
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
    }

    /**
     * Renderizar cuidados por defecto
     */
    renderDefaultCare() {
        const careContainer = document.getElementById('product-care');
        if (!careContainer) return;

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
     * Renderizar ingredientes
     */
    renderIngredients() {
        const ingredientsContainer = document.getElementById('product-ingredients-left');
        if (!ingredientsContainer) return;

        if (!this.product.ingredients || this.product.ingredients.length === 0) {
            ingredientsContainer.style.display = 'none';
            return;
        }

        ingredientsContainer.style.display = 'block';

        const ingredientsHTML = this.product.ingredients.map(ingredient => `
            <div class="ingredient-item bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-all duration-300">
                <div class="flex items-center justify-between mb-1">
                    <h4 class="font-medium text-dark-green text-sm">${ingredient.name}</h4>
                    <div class="flex items-center space-x-1">
                        ${ingredient.percentage ? `<span class="bg-sage-green text-white px-2 py-1 rounded-full text-xs font-medium">${ingredient.percentage}</span>` : ''}
                        <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">${ingredient.origin}</span>
                    </div>
                </div>
                ${ingredient.description ? `<p class="text-gray-600 text-xs">${ingredient.description}</p>` : ''}
            </div>
        `).join('');

        const ingredientsSection = document.getElementById('ingredients-list-left');
        if (ingredientsSection) {
            ingredientsSection.innerHTML = ingredientsHTML;
        }
    }

    /**
     * Actualizar precio con animación
     */
    updatePrice(animate = false) {
        const priceElement = document.getElementById('product-price');
        if (!priceElement) return;

        let newPrice = 'Precio no disponible';

        if (this.selectedSize) {
            newPrice = `$${this.selectedSize.price} MXN`;
        } else if (this.product && this.product.sizes && this.product.sizes.length > 0) {
            const prices = this.product.sizes.map(size => parseFloat(size.price) || 0);
            const minPrice = Math.min(...prices);
            newPrice = `$${minPrice.toFixed(2)} MXN`;
        }

        if (animate) {
            // Animación de cambio de precio
            priceElement.style.transform = 'scale(0.8)';
            priceElement.style.opacity = '0.5';

            setTimeout(() => {
                priceElement.textContent = newPrice;
                priceElement.style.transform = 'scale(1)';
                priceElement.style.opacity = '1';
                priceElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 150);
        } else {
            priceElement.textContent = newPrice;
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
                this.updatePrice(true);
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
        this.setupQuantityControls();
    }

    /**
     * Configurar controles de cantidad
     */
    setupQuantityControls() {
        const decreaseBtn = document.getElementById('decrease-qty');
        const increaseBtn = document.getElementById('increase-qty');
        const quantityInput = document.getElementById('quantity-input');

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                if (this.quantity > 1) {
                    this.quantity--;
                    quantityInput.value = this.quantity;
                    this.animateQuantityChange();
                }
            });
        }

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.quantity++;
                quantityInput.value = this.quantity;
                this.animateQuantityChange();
            });
        }

        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                const value = parseInt(e.target.value);
                if (value > 0) {
                    this.quantity = value;
                    this.animateQuantityChange();
                }
            });
        }
    }

    /**
     * Animar cambio de cantidad
     */
    animateQuantityChange() {
        const quantityInput = document.getElementById('quantity-input');
        if (quantityInput) {
            quantityInput.style.transform = 'scale(1.1)';
            setTimeout(() => {
                quantityInput.style.transform = 'scale(1)';
                quantityInput.style.transition = 'transform 0.2s ease';
            }, 100);
        }
    }

    /**
     * Configurar botones de acción
     */
    setupButtons() {
        // Botón agregar al carrito
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addToCart();
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
     * Agregar al carrito con validación mejorada
     */
    addToCart() {
        // Validar selecciones
        const errors = this.validateSelections();
        if (errors.length > 0) {
            this.showNotification(errors[0], 'warning');
            return;
        }

        // Mostrar estado de carga en el botón
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.classList.add('loading');
        }

        try {
            // Determinar la imagen correcta a usar
            let imageUrl = '../images/placeholder-vela.jpg';
            if (this.product.imageData && this.product.imageData.base64) {
                imageUrl = this.product.imageData.base64;
            } else if (this.product.image) {
                imageUrl = this.product.image;
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
                unitPrice: this.selectedSize.price,
                price: this.selectedSize.price,
                total: this.selectedSize.price * this.quantity,
                // Agregar información de promociones
                promotion2x1: this.product.promotion2x1 || false,
                specialDiscount: this.product.specialDiscount || null
            };

            // Agregar al carrito
            this.addItemToCart(cartItem);
            this.showNotification(`${this.product.title} agregado al carrito`, 'success');

        } catch (error) {
            console.error('❌ Error agregando al carrito:', error);
            this.showNotification('Error al agregar al carrito. Inténtalo de nuevo.', 'error');
        } finally {
            // Restaurar botón
            setTimeout(() => {
                if (addToCartBtn) {
                    addToCartBtn.classList.remove('loading');
                }
            }, 1000);
        }
    }

    /**
     * Agregar item al carrito
     */
    addItemToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
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

            // Animación del contador
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.transition = 'transform 0.2s ease';
            }, 200);
        });
    }

    /**
     * Validar selecciones antes de agregar al carrito
     */
    validateSelections() {
        const errors = [];

        if (!this.selectedSize) {
            errors.push('Selecciona un tamaño');
        }

        if (this.product.fragrances && this.product.fragrances.length > 0 && !this.selectedFragrance) {
            errors.push('Selecciona una fragancia');
        }

        if (this.quantity < 1) {
            errors.push('La cantidad debe ser mayor a 0');
        }

        return errors;
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
     * Renderizar productos relacionados mejorado
     */
    renderRelatedProducts() {
        // Función deshabilitada - sección de productos relacionados eliminada
        return;
        const relatedContainer = document.getElementById('related-products');
        if (!relatedContainer) return;

        // Obtener productos relacionados
        const allProducts = window.getCurrentProducts ? window.getCurrentProducts() : window.productosData || [];
        const relatedProducts = allProducts
            .filter(p => p.id !== this.product.id && p.category === this.product.category)
            .slice(0, 4);

        if (relatedProducts.length === 0) {
            relatedContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">No hay productos relacionados disponibles</p>
                </div>
            `;
            return;
        }

        const relatedHTML = relatedProducts.map((product, index) => {
            const imageUrl = product.imageData?.base64 || product.image || '../images/placeholder-vela.jpg';
            const minPrice = product.sizes && product.sizes.length > 0
                ? Math.min(...product.sizes.map(s => parseFloat(s.price) || 0))
                : 0;

            return `
                <div class="related-product-card" style="animation-delay: ${index * 100}ms">
                    <div class="product-image">
                        <img src="${imageUrl}" alt="${product.title}" 
                             onerror="this.src='../images/placeholder-vela.jpg'">
                        ${product.new ? '<span class="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Nuevo</span>' : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-price">$${minPrice.toFixed(2)} MXN</p>
                        <button class="btn-view" onclick="window.location.href='producto-detalle.html?id=${product.id}'">
                            <i class="fas fa-eye mr-2"></i>Ver Producto
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        relatedContainer.innerHTML = relatedHTML;
    }

    /**
     * Mostrar notificación mejorada
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Remover notificación existente si la hay
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };

        notification.innerHTML = `
            <div class="flex items-center">
                <i class="${icons[type]} mr-3"></i>
                <span>${message}</span>
            </div>
            <button class="close-btn" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Ocultar automáticamente
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    /**
     * Mostrar estado de carga
     */
    showLoadingState() {
        const mainContent = document.querySelector('.product-container');
        if (mainContent) {
            mainContent.style.opacity = '0.7';
            mainContent.style.pointerEvents = 'none';
        }

        // Agregar spinner si no existe
        if (!document.getElementById('loading-spinner')) {
            const spinner = document.createElement('div');
            spinner.id = 'loading-spinner';
            spinner.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
            spinner.innerHTML = `
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
            `;
            document.body.appendChild(spinner);
        }
    }

    /**
     * Ocultar estado de carga
     */
    hideLoadingState() {
        const mainContent = document.querySelector('.product-container');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.pointerEvents = 'auto';
            mainContent.style.transition = 'opacity 0.3s ease-out';
        }

        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    /**
     * Inicializar animaciones de entrada
     */
    initializeAnimations() {
        // Animar elementos con stagger
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 100);
        });
    }

    /**
     * Agregar efectos de hover mejorados
     */
    addHoverEffects() {
        // Efecto hover para opciones
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('selected')) {
                    card.style.transform = 'translateY(-2px)';
                    card.style.boxShadow = '0 10px 25px rgba(45, 62, 51, 0.15)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('selected')) {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'none';
                }
            });
        });

        // Efecto hover para botones
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-1px)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
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
                        Volver al Catálogo
                    </a>
                </div>
            </div>
        `;
    }
}

// Inicialización automática cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Usar la versión mejorada si está disponible, sino usar la original
    if (typeof EnhancedProductDetailPage !== 'undefined') {
        const productDetailPage = new EnhancedProductDetailPage();
        productDetailPage.init();
        console.log('✅ Página de producto detalle mejorada inicializada');
    } else if (typeof ProductDetailPage !== 'undefined') {
        const productDetailPage = new ProductDetailPage();
        productDetailPage.init();
        console.log('✅ Página de producto detalle original inicializada');
    }
});