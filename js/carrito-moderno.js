/* ========================================
   CARRITO MODERNO - JAVASCRIPT
   Funcionalidades mejoradas y UX moderna
   ======================================== */

class ModernCart {
    constructor() {
        this.cart = this.loadCart();
        this.currentStep = 1;
        this.discountCodes = {
            'NUEVOSITIO15': { discount: 0.15, description: '15% de descuento' },
            'PRIMERAVEZ10': { discount: 0.10, description: '10% de descuento' },
            'VERANO20': { discount: 0.20, description: '20% de descuento de verano' }
        };
        this.appliedDiscount = null;
        this.shippingCost = 120;
        this.freeShippingThreshold = 500;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.updateCartCount();


        
        // Auto-save cart changes
        this.setupAutoSave();
        
        // Initialize tooltips and animations
        this.initializeAnimations();
        
        // Connect with existing cart system
        this.connectWithExistingSystem();
        
        // Initialize steps
        this.initializeSteps();
        
        // Load shipping options
        this.loadShippingOptions();
    }

    setupEventListeners() {
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Discount code
        const applyDiscountBtn = document.getElementById('apply-discount');
        const discountInput = document.getElementById('discount-code');
        
        if (applyDiscountBtn && discountInput) {
            applyDiscountBtn.addEventListener('click', () => this.applyDiscount());
            discountInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.applyDiscount();
                }
            });
        }

        // Step navigation
        const continueToShipping = document.getElementById('continue-to-shipping');
        const continueToPdf = document.getElementById('continue-to-pdf');
        const backToCart = document.getElementById('back-to-cart');
        const backToShipping = document.getElementById('back-to-shipping');
        const downloadPdf = document.getElementById('download-pdf');
        const sendWhatsapp = document.getElementById('send-whatsapp');
        const newOrder = document.getElementById('new-order');

        if (continueToShipping) {
            continueToShipping.addEventListener('click', () => this.goToStep(2));
        }
        if (continueToPdf) {
            continueToPdf.addEventListener('click', () => this.validateAndGoToPdf());
        }
        if (backToCart) {
            backToCart.addEventListener('click', () => this.goToStep(1));
        }
        if (backToShipping) {
            backToShipping.addEventListener('click', () => this.goToStep(2));
        }
        if (downloadPdf) {
            downloadPdf.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('📄 Botón PDF clickeado');
                this.downloadPDF();
            });
        }
        if (sendWhatsapp) {
            sendWhatsapp.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('📱 Botón WhatsApp clickeado');
                this.sendWhatsApp();
            });
        }
        if (newOrder) {
            newOrder.addEventListener('click', () => this.startNewOrder());
        }

        // Clear cart and PDF actions
        document.addEventListener('click', (e) => {
            if (e.target.matches('#clear-cart')) {
                this.clearCart();
            }
            
            if (e.target.matches('#generate-pdf') || e.target.closest('#generate-pdf')) {
                e.preventDefault();
                console.log('📄 Generando PDF...');
                this.downloadPDF();
            }
            
            if (e.target.matches('#send-whatsapp') || e.target.closest('#send-whatsapp')) {
                e.preventDefault();
                console.log('📱 Enviando por WhatsApp...');
                this.sendWhatsApp();
            }
        });
    }

    connectWithExistingSystem() {
        // Cargar carrito desde localStorage al inicializar
        this.cart = this.loadCart();
        
        // Limpiar productos de prueba si existen
        this.cart = this.cart.filter(item => {
            // Eliminar productos que parezcan de prueba
            const isTestProduct = item.name === 'Suspiro de Ángel' && !item.userAdded;
            return !isTestProduct;
        });
        
        console.log('🛒 Carrito cargado y limpiado:', this.cart);
        
        // Guardar carrito limpio
        this.saveCart();
        
        // Actualizar display inmediatamente
        this.updateCartDisplay();
        this.updateCartCount();
        
        // Listen for cart updates from other parts of the system
        window.addEventListener('cartUpdated', (event) => {
            console.log('🛒 Evento cartUpdated recibido:', event.detail);
            this.cart = this.loadCart(); // Recargar desde localStorage
            this.updateCartDisplay();
            this.updateCartCount();
        });

        // Hacer la instancia disponible globalmente
        window.modernCart = this;
    }

    initializeSteps() {
        console.log('🔄 Inicializando pasos...');
        
        // Verificar que los elementos existan
        const progressContainer = document.querySelector('.progress-container');
        const cartStep = document.getElementById('cart-step');
        
        console.log('📊 Progress container encontrado:', !!progressContainer);
        console.log('🛒 Cart step encontrado:', !!cartStep);
        
        // Asegurar que el paso 1 esté activo al cargar
        this.currentStep = 1;
        this.updateProgressSteps(1);
        
        // Mostrar solo el paso 1
        document.querySelectorAll('.checkout-step').forEach((step, index) => {
            step.classList.add('hidden');
            console.log(`📋 Paso ${index + 1} ocultado:`, step.id);
        });
        
        if (cartStep) {
            cartStep.classList.remove('hidden');
            console.log('🛒 Cart step mostrado');
        }
        
        // Forzar visibilidad de los pasos
        if (progressContainer) {
            progressContainer.style.display = 'flex';
            progressContainer.style.visibility = 'visible';
            console.log('👁️ Progress container forzado a visible');
        }
        
        console.log('✅ Pasos inicializados - Paso actual:', this.currentStep);
    }

    loadShippingOptions() {
        const container = document.getElementById('shipping-options-container');
        if (!container) return;

        const options = [
            {
                id: 'standard',
                name: 'Envío Estándar',
                description: '5-7 días hábiles',
                price: 120,
                selected: true
            },
            {
                id: 'express',
                name: 'Envío Express',
                description: '2-3 días hábiles',
                price: 200
            }
        ];

        container.innerHTML = options.map(option => `
            <div class="shipping-option ${option.selected ? 'selected' : ''}" data-option="${option.id}" data-price="${option.price}">
                <input type="radio" name="shipping-option" value="${option.id}" ${option.selected ? 'checked' : ''}>
                <div class="shipping-option-details">
                    <div class="shipping-option-name">${option.name}</div>
                    <div class="shipping-option-description">${option.description}</div>
                </div>
                <div class="shipping-option-price">$${option.price} MXN</div>
            </div>
        `).join('');

        // Add event listeners
        container.querySelectorAll('.shipping-option').forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected from all options
                container.querySelectorAll('.shipping-option').forEach(opt => {
                    opt.classList.remove('selected');
                    opt.querySelector('input').checked = false;
                });
                
                // Select clicked option
                option.classList.add('selected');
                option.querySelector('input').checked = true;
                
                // Update shipping cost
                this.shippingCost = parseInt(option.dataset.price);
                this.updateSummary();
                
                console.log('🚚 Opción de envío seleccionada:', option.dataset.option, 'Precio:', this.shippingCost);
            });
        });

        // Set initial shipping cost
        this.shippingCost = 120; // Estándar por defecto
    }

    setupAutoSave() {
        // Auto-save cart every 30 seconds
        setInterval(() => {
            this.saveCart();
        }, 30000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveCart();
        });
    }

    setupFormValidation() {
        const form = document.getElementById('shipping-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    initializeAnimations() {
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        });

        document.querySelectorAll('[class*="animate-"]').forEach(el => {
            observer.observe(el);
        });
    }

    // Cart Management
    loadCart() {
        try {
            // Usar el mismo localStorage que el sistema existente
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            // Usar el mismo localStorage que el sistema existente
            localStorage.setItem('cart', JSON.stringify(this.cart));
            
            // Disparar evento para que otros componentes se actualicen
            window.dispatchEvent(new CustomEvent('cartUpdated', { 
                detail: this.cart 
            }));
        } catch (error) {
            console.error('Error saving cart:', error);
            this.showToast('Error al guardar el carrito', 'error');
        }
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => 
            item.id === product.id && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
        this.showToast(`${product.name} agregado al carrito`, 'success');
    }

    removeFromCart(productId, size, color) {
        const index = this.cart.findIndex(item => 
            item.id === productId && 
            item.size === size && 
            item.color === color
        );

        if (index > -1) {
            this.removeFromCartByIndex(index);
        }
    }

    removeFromCartByIndex(index) {
        if (index >= 0 && index < this.cart.length) {
            const removedItem = this.cart.splice(index, 1)[0];
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
            this.showToast(`${removedItem.title || removedItem.name} eliminado del carrito`, 'success');
        }
    }

    updateQuantity(productId, size, color, newQuantity) {
        const item = this.cart.find(item => 
            item.id === productId && 
            item.size === size && 
            item.color === color
        );

        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId, size, color);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
                this.updateCartCount();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.appliedDiscount = null;
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
        this.showToast('Carrito vaciado', 'success');
    }

    // Display Updates
    updateCartDisplay() {
        const container = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');
        const itemsCount = document.getElementById('cart-items-count');
        const unitsCount = document.getElementById('cart-units-count');

        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '';
            if (emptyMessage) emptyMessage.classList.remove('hidden');
        } else {
            if (emptyMessage) emptyMessage.classList.add('hidden');
            container.innerHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
            this.attachCartItemEvents();
        }

        // Update counts
        if (itemsCount) itemsCount.textContent = this.cart.length;
        if (unitsCount) {
            const totalUnits = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            unitsCount.textContent = totalUnits;
        }

        this.updateSummary();
    }

    createCartItemHTML(item) {
        let itemTotal = item.price * item.quantity;
        let originalTotal = itemTotal;
        let promotionText = '';
        
        // Calcular promoción 2x1
        if (item.promotion2x1) {
            const paidQuantity = Math.ceil(item.quantity / 2);
            itemTotal = item.price * paidQuantity;
            const savedAmount = originalTotal - itemTotal;
            promotionText = `
                <div class="promotion-badge bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    <i class="fas fa-gift mr-1"></i>
                    2x1 - Ahorras $${savedAmount.toFixed(2)}
                </div>
            `;
        }
        
        // Aplicar descuento especial del producto
        if (item.specialDiscount && item.specialDiscount.percentage > 0) {
            const discount = itemTotal * (item.specialDiscount.percentage / 100);
            const discountedTotal = itemTotal - discount;
            promotionText += `
                <div class="promotion-badge bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                    <i class="fas fa-percent mr-1"></i>
                    ${item.specialDiscount.percentage}% OFF - Ahorras $${discount.toFixed(2)}
                </div>
            `;
            itemTotal = discountedTotal;
        }
        
        return `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size || ''}" data-color="${item.color || ''}" data-fragrance="${item.fragrance || ''}">
                <img src="${item.image}" alt="${item.title || item.name}" class="cart-item-image">
                
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title || item.name}</h4>
                    <div class="cart-item-specs">
                        ${item.fragrance ? `
                            <div class="cart-item-spec">
                                <i class="fas fa-leaf"></i>
                                <span>${item.fragrance}</span>
                            </div>
                        ` : ''}
                        ${item.color ? `
                            <div class="cart-item-spec">
                                <i class="fas fa-palette"></i>
                                <span>${item.color}</span>
                            </div>
                        ` : ''}
                        ${item.size ? `
                            <div class="cart-item-spec">
                                <i class="fas fa-ruler"></i>
                                <span>${typeof item.size === 'object' ? item.size.name || item.size.label || JSON.stringify(item.size) : item.size}</span>
                            </div>
                        ` : ''}
                        ${item.type ? `
                            <div class="cart-item-spec">
                                <i class="fas fa-fire"></i>
                                <span>${item.type}</span>
                            </div>
                        ` : ''}
                    </div>
                    ${promotionText}
                </div>

                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-action="decrease">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn increase-btn" data-action="increase">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>

                <div class="price-display">
                    <div class="price-main">$${itemTotal.toFixed(2)} MXN</div>
                    <div class="price-unit">$${item.price.toFixed(2)} c/u</div>
                    ${item.promotion2x1 || (item.specialDiscount && item.specialDiscount.percentage > 0) ? `
                        <div class="price-original text-xs text-gray-500 line-through">
                            Original: $${originalTotal.toFixed(2)}
                        </div>
                    ` : ''}
                </div>

                <button class="remove-btn" data-action="remove" title="Eliminar producto">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    attachCartItemEvents() {
        document.querySelectorAll('.cart-item').forEach((item, index) => {
            // Usar el índice del array para identificar el item
            const cartIndex = index;

            // Quantity controls
            item.querySelector('.decrease-btn')?.addEventListener('click', () => {
                if (this.cart[cartIndex]) {
                    const newQuantity = this.cart[cartIndex].quantity - 1;
                    if (newQuantity <= 0) {
                        this.removeFromCartByIndex(cartIndex);
                    } else {
                        this.cart[cartIndex].quantity = newQuantity;
                        this.saveCart();
                        this.updateCartDisplay();
                        this.updateCartCount();
                    }
                }
            });

            item.querySelector('.increase-btn')?.addEventListener('click', () => {
                if (this.cart[cartIndex]) {
                    this.cart[cartIndex].quantity += 1;
                    this.saveCart();
                    this.updateCartDisplay();
                    this.updateCartCount();
                }
            });

            // Remove button
            item.querySelector('.remove-btn')?.addEventListener('click', () => {
                this.removeFromCartByIndex(cartIndex);
            });
        });
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        document.querySelectorAll('#cart-count, #cart-count-mobile').forEach(element => {
            if (element) {
                element.textContent = totalItems;
                
                // Add animation
                element.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    updateSummary() {
        const originalSubtotal = this.calculateOriginalSubtotal();
        const subtotal = this.calculateSubtotal();
        const promotionSavings = originalSubtotal - subtotal;
        const discount = this.calculateDiscount(subtotal);
        const shipping = this.calculateShipping(subtotal);
        const total = subtotal - discount + shipping;

        // Update all summary displays
        const summarySelectors = [
            { subtotal: '#subtotal', shipping: '#shipping', discount: '#discount', total: '#total' },
            { subtotal: '#shipping-subtotal', shipping: '#shipping-cost', discount: '#shipping-discount', total: '#shipping-total' },
            { subtotal: '#final-subtotal', shipping: '#final-shipping', discount: '#final-discount', total: '#final-total' }
        ];

        summarySelectors.forEach(selectors => {
            if (document.querySelector(selectors.subtotal)) {
                document.querySelector(selectors.subtotal).textContent = `$${subtotal.toFixed(2)} MXN`;
            }
            if (document.querySelector(selectors.shipping)) {
                const shippingElement = document.querySelector(selectors.shipping);
                if (shipping === 0) {
                    shippingElement.textContent = 'GRATIS';
                    shippingElement.classList.add('text-green-600');
                } else {
                    shippingElement.textContent = `$${shipping.toFixed(2)} MXN`;
                    shippingElement.classList.remove('text-green-600');
                }
            }
            if (document.querySelector(selectors.discount)) {
                document.querySelector(selectors.discount).textContent = `-$${discount.toFixed(2)} MXN`;
            }
            if (document.querySelector(selectors.total)) {
                document.querySelector(selectors.total).textContent = `$${total.toFixed(2)} MXN`;
            }
        });

        // Show promotion savings if any
        this.updatePromotionSavings(promotionSavings);

        // Update continue button state
        const continueBtn = document.getElementById('continue-to-shipping');
        if (continueBtn) {
            continueBtn.disabled = this.cart.length === 0;
            continueBtn.classList.toggle('opacity-50', this.cart.length === 0);
        }
    }

    calculateOriginalSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    updatePromotionSavings(savings) {
        // Limpiar elementos de promociones anteriores en todos los resúmenes
        document.querySelectorAll('.promotion-savings').forEach(el => el.remove());
        
        // Solo mostrar ahorros por promociones si existen Y son mayores a 0
        if (savings > 0) {
            // Buscar todos los contenedores de resumen
            const discountElements = [
                document.querySelector('#discount'),
                document.querySelector('#shipping-discount'),
                document.querySelector('#final-discount')
            ];
            
            discountElements.forEach(discountElement => {
                if (discountElement && discountElement.parentNode) {
                    const promotionElement = document.createElement('div');
                    promotionElement.className = 'summary-line promotion-savings';
                    promotionElement.innerHTML = `
                        <span>Ahorros por promociones:</span>
                        <span class="font-semibold text-green-600">-$${savings.toFixed(2)} MXN</span>
                    `;
                    discountElement.parentNode.insertBefore(promotionElement, discountElement);
                }
            });
        }
    }

    calculateSubtotal() {
        return this.cart.reduce((sum, item) => {
            let itemTotal = 0;
            
            // Manejar promoción 2x1
            if (item.promotion2x1) {
                // En 2x1, pagas solo la mitad de las unidades (redondeado hacia arriba)
                const paidQuantity = Math.ceil(item.quantity / 2);
                itemTotal = item.price * paidQuantity;
            } else {
                itemTotal = item.price * item.quantity;
            }
            
            // Aplicar descuento especial del producto si existe
            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                const discount = itemTotal * (item.specialDiscount.percentage / 100);
                itemTotal -= discount;
            }
            
            return sum + itemTotal;
        }, 0);
    }

    calculateDiscount(subtotal) {
        if (!this.appliedDiscount) return 0;
        return subtotal * this.appliedDiscount.discount;
    }

    calculateShipping(subtotal) {
        // Si el carrito está vacío, no hay costo de envío
        if (this.cart.length === 0 || subtotal === 0) return 0;
        
        // Envío gratis si supera el umbral
        if (subtotal >= this.freeShippingThreshold) return 0;
        
        return this.shippingCost;
    }

    // Discount Management
    applyDiscount() {
        const input = document.getElementById('discount-code');
        const code = input.value.trim().toUpperCase();

        if (!code) {
            this.showToast('Ingresa un código de descuento', 'warning');
            return;
        }

        if (this.discountCodes[code]) {
            this.appliedDiscount = this.discountCodes[code];
            this.updateSummary();
            this.showToast(`Código aplicado: ${this.appliedDiscount.description}`, 'success');
            
            // Update button state
            const btn = document.getElementById('apply-discount');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Aplicado';
                btn.classList.add('bg-green-600');
                btn.disabled = true;
            }
        } else {
            this.showToast('Código de descuento inválido', 'error');
        }
    }

    // Step Navigation
    goToStep(step) {
        if (!this.canGoToStep(step)) return;

        // Hide all steps
        document.querySelectorAll('.checkout-step').forEach(stepEl => {
            stepEl.classList.add('hidden');
        });

        // Show target step
        const stepNames = { 1: 'cart', 2: 'shipping', 3: 'pdf' };
        const targetStep = document.getElementById(`${stepNames[step]}-step`);
        if (targetStep) {
            targetStep.classList.remove('hidden');
            targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update progress
        this.updateProgressSteps(step);
        this.currentStep = step;

        // Update summary for current step
        this.updateSummary();

        // Special handling for final step
        if (step === 3) {
            this.updateFinalOrderSummary();
        }
    }

    canGoToStep(step) {
        if (step === 1) return true;
        if (step === 2) return this.cart.length > 0;
        if (step === 3) return this.cart.length > 0 && this.validateShippingForm();
        return false;
    }

    updateProgressSteps(currentStep) {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNumber = index + 1;
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber === currentStep) {
                step.classList.add('active');
            } else if (stepNumber < currentStep) {
                step.classList.add('completed');
            }
        });
    }

    validateAndGoToPdf() {
        if (this.validateShippingForm()) {
            this.goToStep(3);
        } else {
            this.showToast('Por favor completa todos los campos requeridos', 'warning');
        }
    }

    validateShippingForm() {
        const requiredFields = ['full-name', 'phone', 'address', 'city', 'state', 'postal-code'];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                return false;
            }
        }
        return true;
    }

    updateFinalOrderSummary() {
        const container = document.getElementById('final-order-summary');
        if (!container) return;

        const formData = this.getShippingFormData();
        const originalSubtotal = this.calculateOriginalSubtotal();
        const subtotal = this.calculateSubtotal();
        const promotionSavings = originalSubtotal - subtotal;
        const discount = this.calculateDiscount(subtotal);
        const shipping = this.calculateShipping(subtotal);
        const total = subtotal - discount + shipping;

        container.innerHTML = `
            <div class="space-y-4">
                <div class="border-b pb-4">
                    <h4 class="font-semibold text-lg mb-2">Información de Envío</h4>
                    <p><strong>Nombre:</strong> ${formData.fullName}</p>
                    <p><strong>Teléfono:</strong> ${formData.phone}</p>
                    ${formData.email ? `<p><strong>Email:</strong> ${formData.email}</p>` : ''}
                    <p><strong>Dirección:</strong> ${formData.address}</p>
                    <p><strong>Ciudad:</strong> ${formData.city}, ${formData.state} ${formData.postalCode}</p>
                    ${formData.references ? `<p><strong>Referencias:</strong> ${formData.references}</p>` : ''}
                </div>
                
                <div class="border-b pb-4">
                    <h4 class="font-semibold text-lg mb-2">Productos (${this.cart.length})</h4>
                    ${this.cart.map(item => {
                        const itemName = item.title || item.name;
                        let itemPrice = item.price * item.quantity;
                        let promotionText = '';
                        
                        if (item.promotion2x1) {
                            const paidQuantity = Math.ceil(item.quantity / 2);
                            itemPrice = item.price * paidQuantity;
                            promotionText = ' (2x1)';
                        }
                        
                        if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                            const discountAmount = itemPrice * (item.specialDiscount.percentage / 100);
                            itemPrice -= discountAmount;
                            promotionText += ` (${item.specialDiscount.percentage}% OFF)`;
                        }
                        
                        return `
                            <div class="flex justify-between items-center py-2">
                                <div>
                                    <span class="font-medium">${itemName}${promotionText}</span>
                                    <span class="text-sm text-gray-600 ml-2">x${item.quantity}</span>
                                </div>
                                <span class="font-semibold">$${itemPrice.toFixed(2)} MXN</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="space-y-2">
                    ${promotionSavings > 0 ? `
                        <div class="flex justify-between text-green-600">
                            <span>Ahorros por promociones:</span>
                            <span>-$${promotionSavings.toFixed(2)} MXN</span>
                        </div>
                    ` : ''}
                    <div class="flex justify-between">
                        <span>Subtotal:</span>
                        <span>$${subtotal.toFixed(2)} MXN</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Envío:</span>
                        <span>${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)} MXN`}</span>
                    </div>
                    ${discount > 0 ? `
                        <div class="flex justify-between text-green-600">
                            <span>Descuento adicional:</span>
                            <span>-$${discount.toFixed(2)} MXN</span>
                        </div>
                    ` : ''}
                    <div class="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>$${total.toFixed(2)} MXN</span>
                    </div>
                </div>
            </div>
        `;
    }

    getShippingFormData() {
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

    downloadPDF() {
        console.log('📄 Iniciando generación de PDF...');
        this.showToast('Generando PDF...', 'info');
        this.showLoading(true);
        
        // Cargar jsPDF si no está disponible
        if (typeof window.jsPDF === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                setTimeout(() => this.generateActualPDF(), 500);
            };
            document.head.appendChild(script);
        } else {
            setTimeout(() => this.generateActualPDF(), 500);
        }
    }

    generateActualPDF() {
        try {
            this.showLoading(false);
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configuración del PDF
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const margin = 20;
            let yPosition = 25;
            
            // Colores corporativos
            const primaryColor = [45, 62, 51]; // Verde principal
            const accentColor = [163, 177, 138]; // Verde claro
            const grayColor = [107, 114, 128]; // Gris
            
            // Header con logo y empresa
            doc.setFillColor(...primaryColor);
            doc.rect(0, 0, pageWidth, 35, 'F');
            
            // Logo placeholder (puedes reemplazar con imagen real)
            doc.setFillColor(255, 255, 255);
            doc.circle(30, 17.5, 8, 'F');
            doc.setTextColor(45, 62, 51);
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text('VLS', 30, 20, { align: 'center' });
            
            // Nombre de la empresa
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.text('VELAS STARLIGHT', 45, 20);
            
            // Información de contacto
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text('www.velasstarlight.com | contacto@velasstarlight.com', pageWidth - margin, 15, { align: 'right' });
            doc.text('Tel: (55) 1234-5678 | WhatsApp: (55) 9876-5432', pageWidth - margin, 25, { align: 'right' });
            
            yPosition = 50;
            
            // Título de cotización
            doc.setTextColor(45, 62, 51);
            doc.setFontSize(24);
            doc.setFont(undefined, 'bold');
            doc.text('COTIZACIÓN', pageWidth / 2, yPosition, { align: 'center' });
            
            yPosition += 15;
            
            // Información de la cotización
            const quotationNumber = `VLS-${Date.now().toString().slice(-8)}`;
            const currentDate = new Date().toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(...grayColor);
            doc.text(`Cotización No: ${quotationNumber}`, margin, yPosition);
            doc.text(`Fecha: ${currentDate}`, pageWidth - margin, yPosition, { align: 'right' });
            
            // Código de barras simple (simulado)
            yPosition += 10;
            doc.setFillColor(...primaryColor);
            for (let i = 0; i < 50; i++) {
                const barWidth = Math.random() > 0.5 ? 1 : 0.5;
                doc.rect(margin + (i * 2), yPosition, barWidth, 8, 'F');
            }
            doc.setFontSize(8);
            doc.text(quotationNumber, margin, yPosition + 12);
            
            yPosition += 25;
            
            // Datos del cliente en tabla
            const formData = this.getShippingFormData();
            
            // Encabezado de cliente
            doc.setFillColor(...accentColor);
            doc.rect(margin, yPosition, pageWidth - (margin * 2), 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('DATOS DEL CLIENTE', margin + 5, yPosition + 6);
            
            yPosition += 15;
            doc.setTextColor(45, 62, 51);
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            
            // Información del cliente en dos columnas
            const clientInfo = [
                [`Nombre:`, formData.fullName],
                [`Teléfono:`, formData.phone],
                [`Email:`, formData.email || 'No proporcionado'],
                [`Dirección:`, formData.address],
                [`Ciudad:`, `${formData.city}, ${formData.state}`],
                [`Código Postal:`, formData.postalCode]
            ];
            
            clientInfo.forEach(([label, value], index) => {
                const xPos = index % 2 === 0 ? margin : pageWidth / 2 + 10;
                const yPos = yPosition + Math.floor(index / 2) * 8;
                
                doc.setFont(undefined, 'bold');
                doc.text(label, xPos, yPos);
                doc.setFont(undefined, 'normal');
                doc.text(value, xPos + 25, yPos);
            });
            
            yPosition += Math.ceil(clientInfo.length / 2) * 8 + 15;
            
            // Tabla de productos
            doc.setFillColor(...accentColor);
            doc.rect(margin, yPosition, pageWidth - (margin * 2), 10, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            
            // Headers de tabla
            doc.text('PRODUCTO', margin + 5, yPosition + 7);
            doc.text('CANT.', pageWidth - 80, yPosition + 7);
            doc.text('PRECIO UNIT.', pageWidth - 60, yPosition + 7);
            doc.text('TOTAL', pageWidth - 25, yPosition + 7, { align: 'right' });
            
            yPosition += 15;
            doc.setTextColor(45, 62, 51);
            doc.setFontSize(9);
            
            // Productos
            this.cart.forEach((item, index) => {
                if (yPosition > pageHeight - 50) {
                    doc.addPage();
                    yPosition = 30;
                }
                
                const itemName = item.title || item.name;
                let itemPrice = item.price * item.quantity;
                let unitPrice = item.price;
                let promotionText = '';
                
                if (item.promotion2x1) {
                    const paidQuantity = Math.ceil(item.quantity / 2);
                    itemPrice = item.price * paidQuantity;
                    promotionText = ' (2x1)';
                }
                
                if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                    const discountAmount = itemPrice * (item.specialDiscount.percentage / 100);
                    itemPrice -= discountAmount;
                    promotionText += ` (${item.specialDiscount.percentage}% OFF)`;
                }
                
                // Alternar color de fondo
                if (index % 2 === 0) {
                    doc.setFillColor(248, 249, 250);
                    doc.rect(margin, yPosition - 3, pageWidth - (margin * 2), 12, 'F');
                }
                
                doc.setFont(undefined, 'normal');
                
                // Nombre del producto (con wrap si es muy largo)
                const maxWidth = pageWidth - 120;
                const splitName = doc.splitTextToSize(`${itemName}${promotionText}`, maxWidth);
                doc.text(splitName, margin + 5, yPosition + 3);
                
                // Cantidad
                doc.text(item.quantity.toString(), pageWidth - 80, yPosition + 3);
                
                // Precio unitario
                doc.text(`$${unitPrice.toFixed(2)}`, pageWidth - 60, yPosition + 3);
                
                // Total
                doc.setFont(undefined, 'bold');
                doc.text(`$${itemPrice.toFixed(2)}`, pageWidth - 25, yPosition + 3, { align: 'right' });
                
                yPosition += Math.max(12, splitName.length * 4 + 8);
            });
            
            // Línea separadora
            yPosition += 5;
            doc.setDrawColor(...accentColor);
            doc.setLineWidth(0.5);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 15;
            
            // Resumen financiero
            const originalSubtotal = this.calculateOriginalSubtotal();
            const subtotal = this.calculateSubtotal();
            const promotionSavings = originalSubtotal - subtotal;
            const discount = this.calculateDiscount(subtotal);
            const shipping = this.calculateShipping(subtotal);
            const total = subtotal - discount + shipping;
            
            const summaryItems = [];
            
            if (promotionSavings > 0) {
                summaryItems.push(['Ahorros por promociones:', `-$${promotionSavings.toFixed(2)}`, true]);
            }
            summaryItems.push(['Subtotal:', `$${subtotal.toFixed(2)}`]);
            summaryItems.push(['Envío:', shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`]);
            if (discount > 0) {
                summaryItems.push(['Descuento adicional:', `-$${discount.toFixed(2)}`, true]);
            }
            
            // Mostrar resumen
            summaryItems.forEach(([label, value, isDiscount]) => {
                doc.setFont(undefined, 'normal');
                doc.setTextColor(isDiscount ? 34, 197, 94 : 107, 114, 128);
                doc.text(label, pageWidth - 80, yPosition);
                doc.text(value, pageWidth - 25, yPosition, { align: 'right' });
                yPosition += 8;
            });
            
            // Total final
            yPosition += 5;
            doc.setFillColor(...primaryColor);
            doc.rect(pageWidth - 85, yPosition - 5, 60, 15, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('TOTAL:', pageWidth - 80, yPosition + 5);
            doc.text(`$${total.toFixed(2)} MXN`, pageWidth - 30, yPosition + 5, { align: 'right' });
            
            // Footer
            yPosition = pageHeight - 30;
            doc.setFillColor(...accentColor);
            doc.rect(0, yPosition, pageWidth, 30, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text('Esta cotización tiene validez de 30 días a partir de la fecha de emisión.', pageWidth / 2, yPosition + 10, { align: 'center' });
            doc.text('Gracias por confiar en Velas Starlight - Iluminamos tus momentos especiales', pageWidth / 2, yPosition + 18, { align: 'center' });
            
            // Descargar PDF
            const filename = `Cotizacion-VelasStarlight-${quotationNumber}.pdf`;
            doc.save(filename);
            
            this.showToast('PDF descargado exitosamente', 'success');
            console.log('✅ PDF descargado correctamente');
            
        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            this.showToast('Error al generar el PDF', 'error');
            this.showLoading(false);
        }
    }

    generatePDFContent() {
        const formData = this.getShippingFormData();
        const originalSubtotal = this.calculateOriginalSubtotal();
        const subtotal = this.calculateSubtotal();
        const promotionSavings = originalSubtotal - subtotal;
        const discount = this.calculateDiscount(subtotal);
        const shipping = this.calculateShipping(subtotal);
        const total = subtotal - discount + shipping;

        let content = '';
        content += 'COTIZACION - VELAS STARLIGHT\n';
        content += '============================\n\n';
        content += `FECHA: ${new Date().toLocaleDateString('es-MX')}\n`;
        content += `COTIZACION #: VLS-${Date.now()}\n\n`;
        
        content += 'DATOS DEL CLIENTE:\n';
        content += '------------------\n';
        content += `Nombre: ${formData.fullName}\n`;
        content += `Telefono: ${formData.phone}\n`;
        if (formData.email) content += `Email: ${formData.email}\n`;
        content += `Direccion: ${formData.address}\n`;
        content += `Ciudad: ${formData.city}, ${formData.state} ${formData.postalCode}\n`;
        if (formData.references) content += `Referencias: ${formData.references}\n`;
        content += '\n';
        
        content += 'PRODUCTOS:\n';
        content += '----------\n';
        
        this.cart.forEach((item, index) => {
            const itemName = item.title || item.name;
            let itemPrice = item.price * item.quantity;
            let promotionText = '';
            
            if (item.promotion2x1) {
                const paidQuantity = Math.ceil(item.quantity / 2);
                itemPrice = item.price * paidQuantity;
                promotionText = ' (PROMOCION 2x1)';
            }
            
            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                const discountAmount = itemPrice * (item.specialDiscount.percentage / 100);
                itemPrice -= discountAmount;
                promotionText += ` (${item.specialDiscount.percentage}% OFF)`;
            }
            
            content += `${index + 1}. ${itemName}${promotionText}\n`;
            content += `   Cantidad: ${item.quantity}\n`;
            if (item.fragrance) content += `   Fragancia: ${item.fragrance}\n`;
            if (item.size) {
                const sizeText = typeof item.size === 'object' ? 
                    (item.size.name || item.size.label || 'N/A') : 
                    item.size;
                content += `   Tamaño: ${sizeText}\n`;
            }
            if (item.type) content += `   Tipo: ${item.type}\n`;
            content += `   Precio: $${itemPrice.toFixed(2)} MXN\n\n`;
        });
        
        content += 'RESUMEN:\n';
        content += '--------\n';
        if (promotionSavings > 0) {
            content += `Subtotal original: $${originalSubtotal.toFixed(2)} MXN\n`;
            content += `Ahorros por promociones: -$${promotionSavings.toFixed(2)} MXN\n`;
        }
        content += `Subtotal: $${subtotal.toFixed(2)} MXN\n`;
        content += `Envio: ${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)} MXN`}\n`;
        if (discount > 0) {
            content += `Descuento adicional: -$${discount.toFixed(2)} MXN\n`;
        }
        content += `TOTAL: $${total.toFixed(2)} MXN\n\n`;
        
        if (promotionSavings > 0 || discount > 0) {
            const totalSavings = promotionSavings + discount;
            content += `TOTAL AHORRADO: $${totalSavings.toFixed(2)} MXN!\n\n`;
        }
        
        content += 'NOTAS:\n';
        content += '------\n';
        content += '- Esta cotizacion es valida por 7 dias\n';
        content += '- Los precios incluyen IVA\n';
        content += '- Tiempo de entrega segun opcion seleccionada\n';
        content += '- Para confirmar el pedido, contacta por WhatsApp\n\n';
        
        content += 'CONTACTO:\n';
        content += '---------\n';
        content += 'WhatsApp: 5564682112\n';
        content += 'Email: ventas@velasstarlight.com\n\n';
        content += 'Gracias por elegir Velas Starlight!\n';

        return content;
    }

    createAndDownloadFile(content, filename) {
        try {
            console.log('📁 Creando archivo:', filename);
            
            // Crear un blob con el contenido
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            
            // Crear enlace de descarga
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            
            // Agregar al DOM, hacer clic y limpiar
            document.body.appendChild(a);
            a.click();
            
            // Limpiar después de un breve delay
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                console.log('🧹 Archivo limpiado del DOM');
            }, 100);
            
        } catch (error) {
            console.error('❌ Error creando archivo:', error);
            throw error;
        }
    }

    sendWhatsApp() {
        const message = this.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/5564682112?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        this.showToast('Abriendo WhatsApp con tu cotización...', 'success');
    }

    startNewOrder() {
        this.clearCart();
        this.goToStep(1);
        this.showToast('¡Listo para un nuevo pedido!', 'success');
    }

    generateWhatsAppMessage() {
        const originalSubtotal = this.calculateOriginalSubtotal();
        const subtotal = this.calculateSubtotal();
        const promotionSavings = originalSubtotal - subtotal;
        const discount = this.calculateDiscount(subtotal);
        const shipping = this.calculateShipping(subtotal);
        const total = subtotal - discount + shipping;

        let message = "*PEDIDO VELAS STARLIGHT*\n\n";
        message += "*PRODUCTOS:*\n";
        
        this.cart.forEach((item, index) => {
            const itemName = item.title || item.name;
            let itemPrice = item.price * item.quantity;
            
            message += `${index + 1}. ${itemName}\n`;
            if (item.fragrance) message += `   - Fragancia: ${item.fragrance}\n`;
            if (item.color) message += `   - Color: ${item.color}\n`;
            if (item.size) {
                const sizeText = typeof item.size === 'object' ? 
                    (item.size.name || item.size.label || JSON.stringify(item.size)) : 
                    item.size;
                message += `   - Tamaño: ${sizeText}\n`;
            }
            if (item.type) message += `   - Tipo: ${item.type}\n`;
            message += `   - Cantidad: ${item.quantity}\n`;
            
            // Mostrar promociones
            if (item.promotion2x1) {
                const paidQuantity = Math.ceil(item.quantity / 2);
                itemPrice = item.price * paidQuantity;
                message += `   *PROMOCION 2x1*\n`;
                message += `   - Pagas solo: ${paidQuantity} unidades\n`;
            }
            
            if (item.specialDiscount && item.specialDiscount.percentage > 0) {
                const discountAmount = itemPrice * (item.specialDiscount.percentage / 100);
                itemPrice -= discountAmount;
                message += `   *DESCUENTO ${item.specialDiscount.percentage}%*\n`;
                message += `   - Ahorras: $${discountAmount.toFixed(2)} MXN\n`;
            }
            
            message += `   - Precio final: $${itemPrice.toFixed(2)} MXN\n\n`;
        });

        message += "*RESUMEN:*\n";
        if (promotionSavings > 0) {
            message += `- Subtotal original: $${originalSubtotal.toFixed(2)} MXN\n`;
            message += `- Ahorros por promociones: -$${promotionSavings.toFixed(2)} MXN\n`;
        }
        message += `- Subtotal: $${subtotal.toFixed(2)} MXN\n`;
        if (discount > 0) {
            message += `- Descuento adicional: -$${discount.toFixed(2)} MXN\n`;
        }
        message += `- Envio: ${shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)} MXN`}\n`;
        message += `- *TOTAL: $${total.toFixed(2)} MXN*\n\n`;
        
        if (promotionSavings > 0 || discount > 0) {
            const totalSavings = promotionSavings + discount;
            message += `*TOTAL AHORRADO: $${totalSavings.toFixed(2)} MXN!*\n\n`;
        }
        
        message += "Hola! Me interesa realizar este pedido. Podrias ayudarme con los detalles de envio?";

        return message;
    }

    // Utility Functions
    formatPrice(price) {
        return `$${price.toFixed(2)} MXN`;
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('es-MX');
    }

    // Additional cart features
    saveCartForLater() {
        const savedCarts = JSON.parse(localStorage.getItem('starlight_saved_carts') || '[]');
        const cartToSave = {
            id: Date.now(),
            items: [...this.cart],
            savedAt: new Date().toISOString(),
            name: `Carrito guardado ${new Date().toLocaleDateString('es-MX')}`
        };
        
        savedCarts.push(cartToSave);
        localStorage.setItem('starlight_saved_carts', JSON.stringify(savedCarts));
        
        this.showToast('Carrito guardado exitosamente', 'success');
    }

    loadSavedCart(cartId) {
        const savedCarts = JSON.parse(localStorage.getItem('starlight_saved_carts') || '[]');
        const savedCart = savedCarts.find(cart => cart.id === cartId);
        
        if (savedCart) {
            this.cart = [...savedCart.items];
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
            this.showToast('Carrito cargado exitosamente', 'success');
        }
    }

    // UI Helpers
    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toast.innerHTML = `
            <i class="toast-icon ${icons[type]}"></i>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove
        const removeToast = () => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        };

        setTimeout(removeToast, duration);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', removeToast);
    }

    showConfirmDialog(message, onConfirm) {
        if (confirm(message)) {
            onConfirm();
        }
    }

    showLoading(show) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden', !show);
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modernCart = new ModernCart();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernCart;
}

// Función auxiliar para mejorar el manejo de promociones
ModernCart.prototype.updatePromotionSavingsImproved = function(savings) {
    // Limpiar elementos de promociones anteriores
    document.querySelectorAll('.promotion-savings').forEach(el => el.remove());
    
    // Solo mostrar ahorros por promociones si existen Y son mayores a 0
    if (savings > 0) {
        // Buscar todos los contenedores de resumen
        const summaryContainers = document.querySelectorAll('.summary-content');
        
        summaryContainers.forEach(container => {
            if (container) {
                // Crear elemento de promoción
                const promotionElement = document.createElement('div');
                promotionElement.className = 'summary-line promotion-savings';
                promotionElement.innerHTML = `
                    <span>Ahorros por promociones:</span>
                    <span class="font-semibold text-green-600">-${savings.toFixed(2)} MXN</span>
                `;
                
                // Buscar donde insertar (antes del subtotal)
                const subtotalElement = container.querySelector('[id*="subtotal"]');
                if (subtotalElement) {
                    container.insertBefore(promotionElement, subtotalElement);
                } else {
                    // Si no hay subtotal, insertar al principio
                    container.insertBefore(promotionElement, container.firstChild);
                }
            }
        });
    }
};

// Reemplazar la función original
if (window.modernCart) {
    window.modernCart.updatePromotionSavings = window.modernCart.updatePromotionSavingsImproved;
}
// F
unción mejorada para manejar promociones integradas
ModernCart.prototype.updatePromotionSavingsImproved = function(savings) {
    // Integrar ahorros por promociones en la línea de descuento
    const discountElements = [
        document.querySelector('#discount'),
        document.querySelector('#shipping-discount'), 
        document.querySelector('#final-discount')
    ];
    
    discountElements.forEach(discountElement => {
        if (discountElement && discountElement.parentNode) {
            const discountLine = discountElement.parentNode;
            const discountLabel = discountLine.querySelector('span:first-child');
            
            if (discountLabel) {
                discountLabel.classList.add('discount-with-promotions');
                
                if (savings > 0) {
                    discountLabel.innerHTML = `
                        Descuento:
                        <span class="promotion-detail">
                            (Incluye ${savings.toFixed(2)} MXN en promociones)
                        </span>
                    `;
                } else {
                    discountLabel.innerHTML = 'Descuento:';
                }
            }
        }
    });
};

// Reemplazar la función original si existe una instancia
if (window.modernCart) {
    window.modernCart.updatePromotionSavings = window.modernCart.updatePromotionSavingsImproved;
}