/**
 * ========================================
 * PORTAL DE ADMINISTRACIÓN
 * Velas Starlight - Admin Portal
 * ========================================
 */

class AdminPortal {
    constructor() {
        this.products = [...(window.productosData || [])];
        this.currentProduct = null;
        this.editingIndex = -1;
        this.currentIconCallback = null;
        this.currentImageFile = null;
        this.currentImageData = null;

        // Available icons for characteristics and care
        this.availableIcons = [
            // Elementos naturales
            'fas fa-fire', 'fas fa-leaf', 'fas fa-tree', 'fas fa-seedling', 'fas fa-flower',
            'fas fa-sun', 'fas fa-moon', 'fas fa-snowflake', 'fas fa-water', 'fas fa-wind',

            // Emociones y estados
            'fas fa-heart', 'fas fa-star', 'fas fa-smile', 'fas fa-peace', 'fas fa-yin-yang',
            'fas fa-infinity', 'fas fa-feather', 'fas fa-dove', 'fas fa-rainbow',

            // Tiempo y duración
            'fas fa-clock', 'fas fa-hourglass', 'fas fa-calendar', 'fas fa-stopwatch',
            'fas fa-history', 'fas fa-timer',

            // Cuidado y belleza
            'fas fa-hand-sparkles', 'fas fa-spa', 'fas fa-palette', 'fas fa-brush',
            'fas fa-hand-paper', 'fas fa-hands', 'fas fa-hand-holding-heart',
            'fas fa-female', 'fas fa-user-friends', 'fas fa-baby',

            // Hogar y ambiente
            'fas fa-home', 'fas fa-couch', 'fas fa-bed', 'fas fa-bath',
            'fas fa-lightbulb', 'fas fa-candle', 'fas fa-lamp',

            // Seguridad y cuidados
            'fas fa-shield-alt', 'fas fa-exclamation-triangle', 'fas fa-info-circle',
            'fas fa-check-circle', 'fas fa-times-circle', 'fas fa-eye',
            'fas fa-eye-slash', 'fas fa-lock', 'fas fa-unlock',

            // Herramientas y acciones
            'fas fa-scissors', 'fas fa-cut', 'fas fa-tools', 'fas fa-wrench',
            'fas fa-hammer', 'fas fa-magic', 'fas fa-wand-magic',

            // Temperatura y ambiente
            'fas fa-thermometer-half', 'fas fa-temperature-high', 'fas fa-temperature-low',
            'fas fa-snowman', 'fas fa-icicles', 'fas fa-fire-flame-curved',

            // Ciencia y laboratorio
            'fas fa-test-tube', 'fas fa-flask', 'fas fa-microscope', 'fas fa-atom',
            'fas fa-dna', 'fas fa-pills', 'fas fa-syringe',

            // Líquidos y texturas
            'fas fa-droplet', 'fas fa-tint', 'fas fa-spray-can', 'fas fa-oil-can',
            'fas fa-wine-bottle', 'fas fa-glass-water',

            // Calidad y certificaciones
            'fas fa-gem', 'fas fa-diamond', 'fas fa-award', 'fas fa-medal',
            'fas fa-certificate', 'fas fa-crown', 'fas fa-star-of-life',
            'fas fa-recycle', 'fas fa-eco', 'fas fa-globe',

            // Formas y diseños
            'fas fa-circle', 'fas fa-square', 'fas fa-heart-circle',
            'fas fa-star-circle', 'fas fa-hexagon', 'fas fa-triangle',

            // Animales y naturaleza
            'fas fa-butterfly', 'fas fa-bug', 'fas fa-spider', 'fas fa-cat',
            'fas fa-dog', 'fas fa-fish', 'fas fa-bird',

            // Comida y sabores
            'fas fa-apple', 'fas fa-lemon', 'fas fa-carrot', 'fas fa-pepper-hot',
            'fas fa-candy-cane', 'fas fa-cookie', 'fas fa-ice-cream',

            // Místico y espiritual
            'fas fa-ankh', 'fas fa-cross', 'fas fa-om', 'fas fa-praying-hands',
            'fas fa-candle-holder', 'fas fa-incense'
        ];

        // Color options
        this.colorOptions = [
            'text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500',
            'text-purple-500', 'text-pink-500', 'text-orange-500', 'text-teal-500',
            'text-indigo-500', 'text-gray-500'
        ];

        // Predefined types and fragrances
        this.predefinedTypes = ['Soya', 'Parafina', 'Origen Natural', 'Cera de Abeja'];
        this.predefinedFragrances = [
            'Vainilla', 'Lavanda', 'Rosas Especiales', 'Canela', 'Fresa', 'Frutos Rojos',
            'Blue Berry', 'Cereza', 'Manzana-Canela', 'Pitaya', 'Flores Hawaianas',
            'Citricos', 'Coco', 'Menta', 'Sandalo', 'Eucalipto', 'Pino Fresco',
            'Cempasúchil', 'Incienso', 'Copal', 'Chocolate', 'Ácido Hialurónico (5%)',
            'Té Verde', 'Vitamina E y C', 'Piña'
        ];

        // Load saved types and fragrances
        this.loadSavedOptions();

        // Promociones y configuración
        this.promotions = this.loadPromotions();
    }

    /**
     * Initialize the admin portal
     */
    init() {
        if (!this.checkSession()) {
            window.location.href = 'login.html';
            return;
        }

        this.setupEventListeners();
        this.loadProducts();
        this.updateProductCount();
        this.loadPredefinedOptions();
        this.displayUserInfo();
        this.loadPromotionsUI();
        console.log('✅ Portal de administración inicializado');
    }

    /**
     * Check if user is logged in
     */
    checkSession() {
        const session = localStorage.getItem('adminSession');
        if (!session) return false;

        const sessionData = JSON.parse(session);
        const now = new Date().getTime();

        // Session válida por 24 horas
        if (now - sessionData.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('adminSession');
            return false;
        }

        return true;
    }

    /**
     * Display user info
     */
    displayUserInfo() {
        const session = localStorage.getItem('adminSession');
        if (session) {
            const sessionData = JSON.parse(session);
            document.getElementById('admin-user').textContent = `Bienvenido, ${sessionData.username}`;
        }
    }

    /**
     * Load saved types and fragrances
     */
    loadSavedOptions() {
        const savedTypes = localStorage.getItem('customTypes');
        const savedFragrances = localStorage.getItem('customFragrances');

        if (savedTypes) {
            const customTypes = JSON.parse(savedTypes);
            this.predefinedTypes = [...new Set([...this.predefinedTypes, ...customTypes])];
        }

        if (savedFragrances) {
            const customFragrances = JSON.parse(savedFragrances);
            this.predefinedFragrances = [...new Set([...this.predefinedFragrances, ...customFragrances])];
        }
    }

    /**
     * Save custom options
     */
    saveCustomOptions() {
        localStorage.setItem('customTypes', JSON.stringify(this.predefinedTypes));
        localStorage.setItem('customFragrances', JSON.stringify(this.predefinedFragrances));
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Main buttons
        document.getElementById('add-product-btn').addEventListener('click', () => this.openProductModal());
        document.getElementById('manage-promos-btn').addEventListener('click', () => this.openPromotionsModal());
        document.getElementById('export-images-btn').addEventListener('click', () => this.exportImages());
        document.getElementById('generate-code-btn').addEventListener('click', () => this.generateCode());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => this.closeProductModal());
        document.getElementById('cancel-btn').addEventListener('click', () => this.closeProductModal());
        document.getElementById('product-form').addEventListener('submit', (e) => this.saveProduct(e));

        // Category change
        document.getElementById('product-category').addEventListener('change', (e) => this.handleCategoryChange(e));

        // Image handling
        document.getElementById('product-image').addEventListener('input', (e) => this.previewImageFromURL(e));
        document.getElementById('upload-btn').addEventListener('click', () => document.getElementById('image-file').click());
        document.getElementById('image-file').addEventListener('change', (e) => this.handleImageUpload(e));
        document.getElementById('remove-image').addEventListener('click', () => this.removeImage());

        // Dynamic fields
        document.getElementById('add-type').addEventListener('click', () => this.addType());
        document.getElementById('add-fragrance').addEventListener('click', () => this.addFragrance());
        document.getElementById('add-size').addEventListener('click', () => this.addSize());
        document.getElementById('add-characteristic').addEventListener('click', () => this.addCharacteristic());
        document.getElementById('add-care').addEventListener('click', () => this.addCare());
        document.getElementById('add-ingredient').addEventListener('click', () => this.addIngredient());

        // Search and filter
        document.getElementById('search-input').addEventListener('input', (e) => this.filterProducts());
        document.getElementById('category-filter').addEventListener('change', (e) => this.filterProducts());
        document.getElementById('theme-filter').addEventListener('change', (e) => this.filterProducts());

        // Icon modal
        document.getElementById('close-icon-modal').addEventListener('click', () => this.closeIconModal());

        // Code modal
        document.getElementById('close-code-modal').addEventListener('click', () => this.closeCodeModal());

        // Promotions modal
        document.getElementById('close-promotions-modal').addEventListener('click', () => this.closePromotionsModal());
        document.getElementById('save-promo-code').addEventListener('click', () => this.savePromoCode());
        document.getElementById('save-promotions').addEventListener('click', () => this.savePromotions());
        document.getElementById('reset-promotions').addEventListener('click', () => this.resetPromotions());
        document.getElementById('generate-promo-code').addEventListener('click', () => this.showCodeModal(this.generatePromotionsCode(), 'Código de Promociones'));

        // Promociones en productos
        document.getElementById('product-discount').addEventListener('change', (e) => this.toggleDiscountOptions(e));

        // Vista previa del código promocional
        document.getElementById('promo-code').addEventListener('input', () => this.updatePromoPreview());
        document.getElementById('promo-discount').addEventListener('input', () => this.updatePromoPreview());
        document.getElementById('promo-description').addEventListener('input', () => this.updatePromoPreview());
        document.getElementById('copy-code-btn').addEventListener('click', () => this.copyCode());
        document.getElementById('download-code-btn').addEventListener('click', () => this.downloadCode());

        // Enter key handlers
        document.getElementById('new-type').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addType();
        });
        document.getElementById('new-fragrance').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addFragrance();
        });

        // Fragrance search
        document.getElementById('fragrance-search').addEventListener('input', (e) => {
            this.filterFragrances(e.target.value);
        });

        // Color selection handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-option')) {
                this.selectColor(e.target);
            }
        });
    }

    /**
     * Logout user
     */
    logout() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            localStorage.removeItem('adminSession');
            window.location.href = 'login.html';
        }
    }

    /**
     * Load and display products
     */
    loadProducts() {
        const grid = document.getElementById('products-grid');
        const emptyState = document.getElementById('empty-state');

        if (this.products.length === 0) {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');

        grid.innerHTML = '';

        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            grid.appendChild(productCard);
        });
    }

    /**
     * Create product card
     */
    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'admin-card p-4';

        const minPrice = Math.min(...product.sizes.map(s => s.price));
        const badges = this.generateBadges(product);

        // Determinar la imagen a usar
        const imageUrl = product.imageData && product.imageData.base64
            ? product.imageData.base64
            : product.image || '../images/placeholder-vela.jpg';

        card.innerHTML = `
            <div class="relative mb-4">
                <img src="${imageUrl}" alt="${product.title}" 
                     class="w-full h-48 object-cover rounded-lg"
                     onerror="this.src='../images/placeholder-vela.jpg'">
                <div class="absolute top-2 left-2 flex flex-col space-y-1">
                    ${badges}
                </div>
                <div class="absolute top-2 right-2">
                    <span class="bg-sage-green text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ${product.category}
                    </span>
                </div>
            </div>
            
            <div class="space-y-3">
                <h3 class="font-bold text-lg text-dark-green line-clamp-2">${product.title}</h3>
                
                <div class="text-sm text-gray-600">
                    <div class="flex items-center mb-1">
                        <i class="fas fa-tag mr-2 text-sage-green"></i>
                        <span>Desde $${minPrice} MXN</span>
                    </div>
                    <div class="flex items-center mb-1">
                        <i class="fas fa-palette mr-2 text-purple-500"></i>
                        <span>${product.fragrances.length} fragancias</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-weight mr-2 text-blue-500"></i>
                        <span>${product.sizes.length} tamaños</span>
                    </div>
                </div>
                
                <div class="flex space-x-2 pt-3 border-t border-gray-200">
                    <button onclick="adminPortal.editProduct(${index})" 
                            class="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                        <i class="fas fa-edit mr-1"></i>Editar
                    </button>
                    <button onclick="adminPortal.duplicateProduct(${index})" 
                            class="bg-green-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button onclick="adminPortal.deleteProduct(${index})" 
                            class="bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Generate product badges
     */
    generateBadges(product) {
        let badges = '';

        if (product.featured) {
            badges += '<span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">⭐ Destacado</span>';
        }

        if (product.new) {
            badges += '<span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">🆕 Nuevo</span>';
        }

        if (!product.available) {
            badges += '<span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">❌ No disponible</span>';
        }

        return badges;
    }

    /**
     * Open product modal
     */
    openProductModal(product = null, index = -1) {
        this.currentProduct = product;
        this.editingIndex = index;

        const modal = document.getElementById('product-modal');
        const title = document.getElementById('modal-title');

        title.textContent = product ? 'Editar Producto' : 'Agregar Producto';

        if (product) {
            this.populateFormEnhanced(product);
        } else {
            this.resetFormEnhanced();
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close product modal
     */
    closeProductModal() {
        const modal = document.getElementById('product-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.resetFormEnhanced();
    }

    /**
     * Reset form
     */
    resetForm() {
        document.getElementById('product-form').reset();
        document.getElementById('types-display').innerHTML = '';
        document.getElementById('fragrances-display').innerHTML = '';
        document.getElementById('sizes-container').innerHTML = '';
        document.getElementById('characteristics-container').innerHTML = '';
        document.getElementById('care-container').innerHTML = '';
        document.getElementById('ingredients-container').innerHTML = '';
        document.getElementById('image-preview').classList.add('hidden');
        document.getElementById('care-type-section').classList.add('hidden');
        document.getElementById('upload-btn').innerHTML = '<i class="fas fa-upload mr-2"></i>Seleccionar imagen...';

        // Resetear checkboxes específicamente
        document.getElementById('product-featured').checked = false;
        document.getElementById('product-new').checked = false;
        document.getElementById('product-bestseller').checked = false;
        document.getElementById('product-available').checked = true; // Por defecto disponible

        this.currentImageFile = null;
        this.currentImageData = null;
    }

    /**
     * Populate form with product data
     */
    populateForm(product) {
        document.getElementById('product-title').value = product.title;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-description').value = product.description;
        // Mostrar solo el nombre del archivo si es una ruta ../images/
        let imageValue = product.image || '';
        if (imageValue.startsWith('../images/')) {
            imageValue = imageValue.replace('../images/', '');
        }
        document.getElementById('product-image').value = imageValue;
        document.getElementById('product-featured').checked = product.featured || false;
        document.getElementById('product-new').checked = product.new || false;
        document.getElementById('product-bestseller').checked = product.bestseller || false;
        document.getElementById('product-available').checked = product.available !== false;

        if (product.careType) {
            document.getElementById('product-care-type').value = product.careType;
            document.getElementById('care-type-section').classList.remove('hidden');
        }

        // Preview image
        if (product.image) {
            // Check if product has base64 image data
            if (product.imageData && product.imageData.base64) {
                this.showImagePreview(product.imageData.base64, product.imageData.fileName);
                this.currentImageData = product.imageData;
            } else {
                this.showImagePreview(product.image, product.image);
            }
        }

        // Populate types
        product.types.forEach(type => this.displayType(type));

        // Populate fragrances
        product.fragrances.forEach(fragrance => this.displayFragrance(fragrance));

        // Populate sizes
        product.sizes.forEach(size => this.displaySize(size));

        // Populate characteristics
        if (product.characteristics) {
            product.characteristics.forEach(char => this.displayCharacteristic(char));
        }

        // Populate care
        if (product.care) {
            product.care.forEach(care => this.displayCare(care));
        }

        // Populate ingredients
        if (product.ingredients) {
            product.ingredients.forEach(ingredient => this.displayIngredient(ingredient));
        }
    }

    /**
     * Handle category change
     */
    handleCategoryChange(e) {
        const careTypeSection = document.getElementById('care-type-section');

        if (e.target.value === 'Belleza') {
            careTypeSection.classList.remove('hidden');
        } else {
            careTypeSection.classList.add('hidden');
        }
    }

    /**
     * Load predefined options
     */
    loadPredefinedOptions() {
        this.loadPredefinedTypes();
        this.loadPredefinedFragrances();
    }

    /**
     * Load predefined types
     */
    loadPredefinedTypes() {
        const container = document.getElementById('predefined-types');
        container.innerHTML = '';

        this.predefinedTypes.forEach(type => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'predefined-type bg-gray-100 hover:bg-sage-green hover:text-white px-3 py-1 rounded-full text-sm transition-colors';
            button.setAttribute('data-type', type);
            button.textContent = type;
            button.addEventListener('click', () => this.selectPredefinedType(type));
            container.appendChild(button);
        });
    }

    /**
     * Load predefined fragrances
     */
    loadPredefinedFragrances() {
        const container = document.getElementById('predefined-fragrances');
        container.innerHTML = '';

        this.predefinedFragrances.forEach(fragrance => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'predefined-fragrance bg-gray-100 hover:bg-sage-green hover:text-white px-2 py-1 rounded text-xs transition-colors';
            button.setAttribute('data-fragrance', fragrance);
            button.textContent = fragrance;
            button.addEventListener('click', () => this.selectPredefinedFragrance(fragrance));
            container.appendChild(button);
        });
    }

    /**
     * Select predefined type
     */
    selectPredefinedType(type) {
        this.displayType(type);
    }

    /**
     * Select predefined fragrance
     */
    selectPredefinedFragrance(fragrance) {
        this.displayFragrance(fragrance);
    }

    /**
     * Handle image upload
     */
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor selecciona un archivo de imagen válido', 'error');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('La imagen es demasiado grande. Máximo 5MB', 'error');
            return;
        }

        this.currentImageFile = file;

        // Create preview and convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Data = e.target.result;
            const fileName = this.generateImageFileName(file.name);

            // Store base64 data for saving
            this.currentImageData = {
                base64: base64Data,
                fileName: fileName,
                originalName: file.name,
                size: file.size,
                type: file.type
            };

            this.showImagePreview(base64Data, fileName);
            this.showNotification(`Imagen procesada: ${fileName}`, 'success');
        };
        reader.readAsDataURL(file);

        // Update upload button text
        document.getElementById('upload-btn').innerHTML = `<i class="fas fa-check mr-2"></i>${file.name}`;
        document.getElementById('product-image').value = ''; // Clear URL input
    }

    /**
     * Generate standardized image file name
     */
    generateImageFileName(originalName) {
        const extension = originalName.split('.').pop().toLowerCase();
        const productTitle = document.getElementById('product-title').value || 'producto';
        const timestamp = Date.now();

        // Create clean filename
        const cleanTitle = productTitle
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        return `${cleanTitle}-${timestamp}.${extension}`;
    }

    /**
     * Generate version number based on current data
     */
    generateVersion() {
        const baseVersion = "2.1";
        const productCount = this.products.length;
        const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp

        // Create version based on product count and timestamp
        return `${baseVersion}.${productCount}.${timestamp}`;
    }

    /**
     * Preview image from URL
     */
    previewImageFromURL(e) {
        const filename = e.target.value.trim();
        if (filename) {
            // Construir la ruta completa con ../images/
            const fullPath = `../images/${filename}`;
            this.showImagePreview(fullPath, fullPath);
            this.currentImageFile = null;
            document.getElementById('upload-btn').innerHTML = '<i class="fas fa-upload mr-2"></i>Seleccionar imagen...';
        }
    }

    /**
     * Show image preview
     */
    showImagePreview(src, path) {
        const preview = document.getElementById('image-preview');
        const img = document.getElementById('preview-img');
        const pathElement = document.getElementById('image-path');

        img.src = src;
        pathElement.textContent = path;
        preview.classList.remove('hidden');
    }

    /**
     * Remove image
     */
    removeImage() {
        document.getElementById('image-preview').classList.add('hidden');
        document.getElementById('product-image').value = '';
        document.getElementById('image-file').value = '';
        document.getElementById('upload-btn').innerHTML = '<i class="fas fa-upload mr-2"></i>Seleccionar imagen...';
        this.currentImageFile = null;
        this.currentImageData = null;
    }

    /**
     * Add type
     */
    addType() {
        const input = document.getElementById('new-type');
        const type = input.value.trim();

        if (type) {
            this.displayType(type);

            // Add to predefined types if not exists
            if (!this.predefinedTypes.includes(type)) {
                this.predefinedTypes.push(type);
                this.saveCustomOptions();
                this.loadPredefinedTypes();
            }

            input.value = '';
        }
    }

    /**
     * Display type
     */
    displayType(type) {
        const container = document.getElementById('types-display');
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `
            ${type}
            <button type="button" onclick="this.parentElement.remove()" class="ml-2 text-white hover:text-red-200">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(tag);
    }

    /**
     * Add fragrance
     */
    addFragrance() {
        const input = document.getElementById('new-fragrance');
        const fragrance = input.value.trim();

        if (fragrance) {
            this.displayFragrance(fragrance);

            // Add to predefined fragrances if not exists
            if (!this.predefinedFragrances.includes(fragrance)) {
                this.predefinedFragrances.push(fragrance);
                this.saveCustomOptions();
                this.loadPredefinedFragrances();
            }

            input.value = '';
        }
    }

    /**
     * Display fragrance
     */
    displayFragrance(fragrance) {
        const container = document.getElementById('fragrances-display');
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `
            ${fragrance}
            <button type="button" onclick="this.parentElement.remove()" class="ml-2 text-white hover:text-red-200">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(tag);
    }

    /**
     * Add size
     */
    addSize() {
        this.displaySize({ label: '', price: 0 });
    }

    /**
     * Display size
     */
    displaySize(size) {
        const container = document.getElementById('sizes-container');
        const sizeDiv = document.createElement('div');
        sizeDiv.className = 'flex gap-3 items-center bg-gray-50 p-3 rounded-lg';
        sizeDiv.innerHTML = `
            <input type="text" placeholder="Ej: 50 gr, 100 mL" value="${size.label}" 
                   class="form-input flex-1 px-3 py-2 size-label">
            <input type="number" placeholder="Precio" value="${size.price}" min="0" step="0.01"
                   class="form-input w-32 px-3 py-2 size-price">
            <button type="button" onclick="this.parentElement.remove()" 
                    class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(sizeDiv);
    }

    /**
     * Add characteristic
     */
    addCharacteristic() {
        this.displayCharacteristic({
            icon: 'fas fa-star',
            title: '',
            description: '',
            color: 'text-blue-500'
        });
    }

    /**
     * Display characteristic
     */
    displayCharacteristic(characteristic) {
        const container = document.getElementById('characteristics-container');
        const charDiv = document.createElement('div');
        charDiv.className = 'characteristic-item';
        charDiv.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold text-gray-700">Característica</h4>
                <button type="button" onclick="this.closest('.characteristic-item').remove()" 
                        class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Título</label>
                    <input type="text" value="${characteristic.title}" 
                           class="form-input w-full px-3 py-2 char-title">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
                    <input type="text" value="${characteristic.description}" 
                           class="form-input w-full px-3 py-2 char-description">
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Icono</label>
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="adminPortal.openIconSelector(this)" 
                                class="form-input px-3 py-2 flex items-center justify-center w-12 char-icon-btn">
                            <i class="${characteristic.icon} char-icon"></i>
                        </button>
                        <span class="text-sm text-gray-500">Clic para cambiar</span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Color</label>
                    <div class="grid grid-cols-5 gap-2">
                        ${this.colorOptions.map(color => {
            const colorClass = color.replace('text-', 'bg-');
            const isSelected = color === characteristic.color;
            return `
                                <button type="button" 
                                        class="color-option w-8 h-8 rounded-full border-2 ${colorClass} ${isSelected ? 'border-gray-800 ring-2 ring-gray-400' : 'border-gray-300'}"
                                        data-color="${color}"
                                        title="${color}">
                                    ${isSelected ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                                </button>
                            `;
        }).join('')}
                    </div>
                    <input type="hidden" class="char-color" value="${characteristic.color}">
                </div>
            </div>
        `;
        container.appendChild(charDiv);
    }

    /**
     * Add care instruction
     */
    addCare() {
        this.displayCare({
            icon: 'fas fa-exclamation-triangle',
            title: '',
            description: '',
            color: 'text-yellow-500'
        });
    }

    /**
     * Display care instruction
     */
    displayCare(care) {
        const container = document.getElementById('care-container');
        const careDiv = document.createElement('div');
        careDiv.className = 'care-item';
        careDiv.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold text-gray-700">Cuidado</h4>
                <button type="button" onclick="this.closest('.care-item').remove()" 
                        class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Título</label>
                    <input type="text" value="${care.title}" 
                           class="form-input w-full px-3 py-2 care-title">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
                    <input type="text" value="${care.description}" 
                           class="form-input w-full px-3 py-2 care-description">
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Icono</label>
                    <div class="flex items-center gap-2">
                        <button type="button" onclick="adminPortal.openIconSelector(this)" 
                                class="form-input px-3 py-2 flex items-center justify-center w-12 care-icon-btn">
                            <i class="${care.icon} care-icon"></i>
                        </button>
                        <span class="text-sm text-gray-500">Clic para cambiar</span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Color</label>
                    <div class="grid grid-cols-5 gap-2">
                        ${this.colorOptions.map(color => {
            const colorClass = color.replace('text-', 'bg-');
            const isSelected = color === care.color;
            return `
                                <button type="button" 
                                        class="color-option w-8 h-8 rounded-full border-2 ${colorClass} ${isSelected ? 'border-gray-800 ring-2 ring-gray-400' : 'border-gray-300'}"
                                        data-color="${color}"
                                        title="${color}">
                                    ${isSelected ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                                </button>
                            `;
        }).join('')}
                    </div>
                    <input type="hidden" class="care-color" value="${care.color}">
                </div>
            </div>
        `;
        container.appendChild(careDiv);
    }

    /**
     * Add ingredient
     */
    addIngredient() {
        this.displayIngredient({
            name: '',
            percentage: '',
            description: '',
            origin: 'Natural'
        });
    }

    /**
     * Display ingredient
     */
    displayIngredient(ingredient) {
        const container = document.getElementById('ingredients-container');
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient-item';
        ingredientDiv.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <h4 class="font-semibold text-gray-700">Ingrediente</h4>
                <button type="button" onclick="this.closest('.ingredient-item').remove()" 
                        class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Nombre del Ingrediente</label>
                    <input type="text" value="${ingredient.name}" 
                           class="form-input w-full px-3 py-2 ingredient-name"
                           placeholder="Ej: Cera de Soya, Aceite Esencial de Lavanda">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Porcentaje (Opcional)</label>
                    <input type="text" value="${ingredient.percentage}" 
                           class="form-input w-full px-3 py-2 ingredient-percentage"
                           placeholder="Ej: 85%, 5%">
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Descripción</label>
                    <input type="text" value="${ingredient.description}" 
                           class="form-input w-full px-3 py-2 ingredient-description"
                           placeholder="Ej: Proporciona hidratación profunda">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">Origen</label>
                    <select class="form-input w-full px-3 py-2 ingredient-origin">
                        <option value="Natural" ${ingredient.origin === 'Natural' ? 'selected' : ''}>Natural</option>
                        <option value="Orgánico" ${ingredient.origin === 'Orgánico' ? 'selected' : ''}>Orgánico</option>
                        <option value="Sintético" ${ingredient.origin === 'Sintético' ? 'selected' : ''}>Sintético</option>
                        <option value="Vegano" ${ingredient.origin === 'Vegano' ? 'selected' : ''}>Vegano</option>
                        <option value="Mineral" ${ingredient.origin === 'Mineral' ? 'selected' : ''}>Mineral</option>
                    </select>
                </div>
            </div>
        `;
        container.appendChild(ingredientDiv);
    }

    /**
     * Open icon selector
     */
    openIconSelector(button) {
        this.currentIconCallback = button;
        const modal = document.getElementById('icon-modal');
        const selector = document.getElementById('icon-selector');

        selector.innerHTML = '';

        this.availableIcons.forEach(icon => {
            const iconDiv = document.createElement('div');
            iconDiv.className = 'icon-option';
            iconDiv.innerHTML = `<i class="${icon}"></i>`;
            iconDiv.addEventListener('click', () => this.selectIcon(icon));
            selector.appendChild(iconDiv);
        });

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Select icon
     */
    selectIcon(icon) {
        if (this.currentIconCallback) {
            const iconElement = this.currentIconCallback.querySelector('i');
            if (iconElement) {
                // Update the icon class, keeping only the color classes
                const existingClasses = iconElement.className.split(' ');
                const colorClasses = existingClasses.filter(c => c.startsWith('text-') || c.startsWith('char-') || c.startsWith('care-'));
                iconElement.className = icon + ' ' + colorClasses.join(' ');
            }
        }
        this.closeIconModal();
    }

    /**
     * Close icon modal
     */
    closeIconModal() {
        document.getElementById('icon-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentIconCallback = null;
    }

    /**
     * Save product
     */
    saveProduct(e) {
        e.preventDefault();

        const formData = this.collectFormDataEnhanced();

        if (!this.validateProduct(formData)) {
            return;
        }

        if (this.editingIndex >= 0) {
            // Update existing product
            this.products[this.editingIndex] = formData;
            this.showNotification('Producto actualizado localmente. Usa "Generar Código" para actualizar producción.', 'success');
        } else {
            // Add new product
            formData.id = this.getNextId();
            this.products.push(formData);

            this.showNotification('Producto agregado localmente. Usa "Generar Código" para actualizar producción.', 'success');
        }

        this.saveToStorage();
        this.loadProducts();
        this.updateProductCount();
        this.closeProductModal();
    }

    /**
     * Collect form data
     */
    collectFormData() {
        let imageUrl = document.getElementById('product-image').value.trim();
        let imageData = null;

        // If there's an uploaded file with base64 data, use it
        if (this.currentImageData) {
            imageUrl = this.currentImageData.fileName;
            imageData = {
                base64: this.currentImageData.base64,
                fileName: this.currentImageData.fileName,
                originalName: this.currentImageData.originalName,
                size: this.currentImageData.size,
                type: this.currentImageData.type
            };
        } else if (imageUrl) {
            // Si es solo un nombre de archivo, agregar la ruta ../images/
            if (!imageUrl.startsWith('http') && !imageUrl.startsWith('../')) {
                imageUrl = `../images/${imageUrl}`;
            }
        }

        const formData = {
            title: document.getElementById('product-title').value,
            category: document.getElementById('product-category').value,
            description: document.getElementById('product-description').value,
            image: imageUrl,
            imageData: imageData, // Store base64 data
            featured: document.getElementById('product-featured').checked,
            new: document.getElementById('product-new').checked,
            bestseller: document.getElementById('product-bestseller').checked,
            available: document.getElementById('product-available').checked,
            types: this.collectTags('types-display'),
            fragrances: this.collectTags('fragrances-display'),
            sizes: this.collectSizes(),
            characteristics: this.collectCharacteristics(),
            care: this.collectCare()
        };

        // Add care type for beauty products
        if (formData.category === 'Belleza') {
            formData.careType = document.getElementById('product-care-type').value;
        }

        return formData;
    }

    /**
     * Collect tags from container
     */
    collectTags(containerId) {
        const container = document.getElementById(containerId);
        const tags = [];

        container.querySelectorAll('.tag').forEach(tag => {
            const text = tag.textContent.trim().replace('×', '').trim();
            if (text) tags.push(text);
        });

        return tags;
    }

    /**
     * Collect sizes
     */
    collectSizes() {
        const container = document.getElementById('sizes-container');
        const sizes = [];

        container.querySelectorAll('.flex').forEach(sizeDiv => {
            const label = sizeDiv.querySelector('.size-label').value.trim();
            const price = parseFloat(sizeDiv.querySelector('.size-price').value) || 0;

            if (label && price > 0) {
                sizes.push({ label, price });
            }
        });

        return sizes;
    }

    /**
     * Collect characteristics
     */
    collectCharacteristics() {
        const container = document.getElementById('characteristics-container');
        const characteristics = [];

        container.querySelectorAll('.characteristic-item').forEach(item => {
            const title = item.querySelector('.char-title').value.trim();
            const description = item.querySelector('.char-description').value.trim();
            const icon = item.querySelector('.char-icon').className;
            const color = item.querySelector('.char-color').value;

            if (title && description) {
                characteristics.push({ icon, title, description, color });
            }
        });

        return characteristics;
    }

    /**
     * Collect care instructions
     */
    collectCare() {
        const container = document.getElementById('care-container');
        const care = [];

        container.querySelectorAll('.care-item').forEach(item => {
            const title = item.querySelector('.care-title').value.trim();
            const description = item.querySelector('.care-description').value.trim();
            const icon = item.querySelector('.care-icon').className;
            const color = item.querySelector('.care-color').value;

            if (title && description) {
                care.push({ icon, title, description, color });
            }
        });

        return care;
    }

    /**
     * Collect ingredients
     */
    collectIngredients() {
        const container = document.getElementById('ingredients-container');
        const ingredients = [];

        container.querySelectorAll('.ingredient-item').forEach(item => {
            const name = item.querySelector('.ingredient-name').value.trim();
            const percentage = item.querySelector('.ingredient-percentage').value.trim();
            const description = item.querySelector('.ingredient-description').value.trim();
            const origin = item.querySelector('.ingredient-origin').value;

            if (name) {
                ingredients.push({ name, percentage, description, origin });
            }
        });

        return ingredients;
    }

    /**
     * Validate product
     */
    validateProduct(product) {
        if (!product.title) {
            this.showNotification('El nombre del producto es requerido', 'error');
            return false;
        }

        if (!product.category) {
            this.showNotification('La categoría es requerida', 'error');
            return false;
        }

        if (!product.description) {
            this.showNotification('La descripción es requerida', 'error');
            return false;
        }

        if (!product.image && !this.currentImageFile) {
            this.showNotification('Debe seleccionar una imagen o proporcionar una URL', 'error');
            return false;
        }

        if (product.sizes.length === 0) {
            this.showNotification('Debe agregar al menos un tamaño', 'error');
            return false;
        }

        if (product.fragrances.length === 0) {
            this.showNotification('Debe agregar al menos una fragancia', 'error');
            return false;
        }

        return true;
    }

    /**
     * Get next available ID
     */
    getNextId() {
        return Math.max(...this.products.map(p => p.id), 0) + 1;
    }

    /**
     * Edit product
     */
    editProduct(index) {
        this.openProductModal(this.products[index], index);
    }

    /**
     * Duplicate product
     */
    duplicateProduct(index) {
        const original = this.products[index];
        const duplicate = {
            ...original,
            id: this.getNextId(),
            title: original.title + ' (Copia)',
            featured: false,
            new: true
        };

        this.products.push(duplicate);
        this.saveToStorage();
        this.loadProducts();
        this.updateProductCount();
        this.showNotification('Producto duplicado correctamente', 'success');
    }

    /**
     * Delete product
     */
    deleteProduct(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            const product = this.products[index];
            this.products.splice(index, 1);
            this.saveToStorage();
            this.loadProducts();
            this.updateProductCount();
            this.showNotification(`"${product.title}" eliminado localmente. Usa "Generar Código" para actualizar producción.`, 'success');
        }
    }

    /**
     * Filter products
     */
    filterProducts() {
        const search = document.getElementById('search-input').value.toLowerCase();
        const category = document.getElementById('category-filter').value;

        let filtered = this.products;

        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (search) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search) ||
                p.fragrances.some(f => f.toLowerCase().includes(search))
            );
        }

        this.displayFilteredProducts(filtered);
    }

    /**
     * Display filtered products
     */
    displayFilteredProducts(products) {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        products.forEach((product, index) => {
            const originalIndex = this.products.findIndex(p => p.id === product.id);
            const productCard = this.createProductCard(product, originalIndex);
            grid.appendChild(productCard);
        });
    }



    /**
     * Export images
     */
    exportImages() {
        const productsWithImages = this.products.filter(product =>
            product.imageData && product.imageData.base64
        );

        if (productsWithImages.length === 0) {
            this.showNotification('No hay imágenes base64 para exportar', 'warning');
            return;
        }

        let exportedCount = 0;

        productsWithImages.forEach((product, index) => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = product.imageData.base64;
                link.download = product.imageData.fileName;
                link.click();

                exportedCount++;

                if (exportedCount === productsWithImages.length) {
                    this.showNotification(`${exportedCount} imágenes exportadas. Guárdalas en la carpeta /images/`, 'success');
                }
            }, index * 500); // Delay between downloads
        });
    }







    /**
     * Filter fragrances based on search
     */
    filterFragrances(searchTerm) {
        const container = document.getElementById('predefined-fragrances');
        const noResultsDiv = document.getElementById('no-fragrances-found');
        const buttons = container.querySelectorAll('.predefined-fragrance');

        let visibleCount = 0;

        buttons.forEach(button => {
            const fragrance = button.textContent.toLowerCase();
            const matches = fragrance.includes(searchTerm.toLowerCase());

            if (matches || searchTerm === '') {
                button.style.display = 'block';
                visibleCount++;
            } else {
                button.style.display = 'none';
            }
        });

        // Mostrar/ocultar mensaje de "no encontrado"
        if (visibleCount === 0 && searchTerm !== '') {
            noResultsDiv.classList.remove('hidden');
            container.classList.add('hidden');
        } else {
            noResultsDiv.classList.add('hidden');
            container.classList.remove('hidden');
        }
    }

    /**
     * Select color for characteristics/care
     */
    selectColor(colorButton) {
        const color = colorButton.dataset.color;
        const container = colorButton.parentElement;
        const hiddenInput = container.parentElement.querySelector('input[type="hidden"]');

        // Remover selección anterior
        container.querySelectorAll('.color-option').forEach(btn => {
            btn.classList.remove('border-gray-800', 'ring-2', 'ring-gray-400');
            btn.classList.add('border-gray-300');
            btn.innerHTML = '';
        });

        // Agregar selección actual
        colorButton.classList.remove('border-gray-300');
        colorButton.classList.add('border-gray-800', 'ring-2', 'ring-gray-400');
        colorButton.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';

        // Actualizar input oculto
        if (hiddenInput) {
            hiddenInput.value = color;
        }
    }

    /**
     * Generate product statistics
     */
    generateProductStats(products) {
        const categories = [...new Set(products.map(p => p.category))];
        const fragrances = [...new Set(products.flatMap(p => p.fragrances || []))];
        const themes = [...new Set(products.map(p => p.theme).filter(t => t))];

        let promotions = 0;
        products.forEach(p => {
            if (p.promotion2x1) promotions++;
            if (p.specialDiscount) promotions++;
        });

        return {
            categories,
            fragrances,
            themes,
            promotions
        };
    }

    /**
     * Generate complete code for productos-data.js
     */
    generateCode() {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString('es-MX');

        // Preparar productos para exportación
        const productsForExport = this.products.map(product => {
            const exportProduct = { ...product };

            // Si tiene imagen base64, convertir a nombre de archivo
            if (exportProduct.imageData && exportProduct.imageData.base64) {
                exportProduct.image = `../images/${exportProduct.imageData.fileName}`;
                delete exportProduct.imageData; // Limpiar datos base64
            }

            // Asegurar que todos los nuevos campos estén presentes
            exportProduct.bestseller = exportProduct.bestseller || false;
            exportProduct.theme = exportProduct.theme || null;
            exportProduct.promotion2x1 = exportProduct.promotion2x1 || false;
            exportProduct.specialDiscount = exportProduct.specialDiscount || null;

            return exportProduct;
        });

        // Generar estadísticas
        const stats = this.generateProductStats(productsForExport);

        const codeContent = `/**
* ========================================
* BASE DE DATOS DE PRODUCTOS
* Velas Starlight - Products Database
* ========================================
* 
* 📅 Generado: ${currentDate} a las ${currentTime}
* 📊 Total productos: ${productsForExport.length}
* 🏷️ Categorías: ${stats.categories.join(', ')}
* 🌸 Fragancias únicas: ${stats.fragrances.length}
* 🎯 Temáticas: ${stats.themes.length}
* � PromocionAes activas: ${stats.promotions}
* 
* ========================================
*/

// 🛍️ AQUÍ AGREGAS NUEVOS PRODUCTOS FÁCILMENTE
const productosData = ${JSON.stringify(productsForExport, null, 4)};

// 🎨 CONFIGURACIÓN DE CATEGORÍAS
const categorias = [
    { id: "all", name: "Todos", icon: "fa-th-large" },
    { id: "Vela", name: "Velas", icon: "fa-fire" },
    { id: "Decoracion", name: "Decoración", icon: "fa-home" },
    { id: "Belleza", name: "Belleza", icon: "fa-spa" }
];

// 🌸 FRAGANCIAS POPULARES (para la sección especial)
const fraganciasPopulares = [
    { name: "Vainilla", emoji: "🍦", description: "Dulce y relajante" },
    { name: "Lavanda", emoji: "💜", description: "Calmante y floral" },
    { name: "Rosas Especiales", emoji: "🌹", description: "Romántico y elegante" },
    { name: "Canela", emoji: "🍂", description: "Cálido y acogedor" },
    { name: "Citricos", emoji: "🍊", description: "Fresco y energizante" }
];

// 🎭 TEMÁTICAS DISPONIBLES
const tematicasDisponibles = [
    { id: "Día de Muertos", name: "Día de Muertos", emoji: "🎃", season: "Otoño" },
    { id: "Navidad", name: "Navidad", emoji: "🎄", season: "Invierno" },
    { id: "Baby Shower", name: "Baby Shower", emoji: "👶", season: "Todo el año" },
    { id: "Boda", name: "Boda", emoji: "💒", season: "Todo el año" },
    { id: "San Valentín", name: "San Valentín", emoji: "💕", season: "Invierno" },
    { id: "Cumpleaños", name: "Cumpleaños", emoji: "🎂", season: "Todo el año" },
    { id: "Graduación", name: "Graduación", emoji: "🎓", season: "Primavera/Verano" },
    { id: "Aniversario", name: "Aniversario", emoji: "💍", season: "Todo el año" },
    { id: "Spa/Relajación", name: "Spa/Relajación", emoji: "🧘", season: "Todo el año" },
    { id: "Primavera", name: "Primavera", emoji: "🌸", season: "Primavera" },
    { id: "Verano", name: "Verano", emoji: "☀️", season: "Verano" },
    { id: "Otoño", name: "Otoño", emoji: "🍂", season: "Otoño" },
    { id: "Invierno", name: "Invierno", emoji: "❄️", season: "Invierno" }
];

// 📊 CONFIGURACIÓN GENERAL
const configuracion = {
    moneda: "MXN",
    simboloMoneda: "$",
    mostrarDescuentos: true,
    mostrarStock: false, // Cambiar a true si quieres mostrar disponibilidad
    animaciones: true
};

// 🔄 FUNCIÓN PARA OBTENER PRODUCTOS ACTUALES
function getCurrentProducts() {
    // Intentar cargar desde localStorage primero (datos del admin)
    const storedData = localStorage.getItem('adminProducts');
    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            if (Array.isArray(parsed)) {
                console.log(\`📦 Cargando \${parsed.length} productos desde localStorage (admin)\`);
                return parsed;
            }
        } catch (error) {
            console.error('Error parsing stored products:', error);
            // Limpiar datos corruptos
            localStorage.removeItem('adminProducts');
        }
    }
    
    // Fallback a datos del archivo
    console.log(\`📦 Cargando \${productosData.length} productos desde archivo base\`);
    return [...productosData]; // Crear copia para evitar mutaciones
}

// 🚀 EXPORTAR DATOS
if (typeof window !== 'undefined') {
    // Obtener productos actuales (localStorage o archivo)
    const currentProducts = getCurrentProducts();
    
    window.productosData = currentProducts;
    window.categorias = categorias;
    window.fraganciasPopulares = fraganciasPopulares;
    window.configuracion = configuracion;
    window.getCurrentProducts = getCurrentProducts;
    
    console.log(\`✅ Productos cargados: \${currentProducts.length} items\`);
}

// Para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productosData,
        categorias,
        fraganciasPopulares,
        configuracion
    };
}`;

        // Mostrar el modal con el código
        this.showCodeModal(codeContent);
    }

    /**
     * Generate promotions configuration code
     */
    generatePromotionsCode() {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString('es-MX');

        const promotionsCode = `/**
* ========================================
* CONFIGURACIÓN DE PROMOCIONES
* Velas Starlight - Promotions Config
* ========================================
* 
* 📅 Generado: ${currentDate} a las ${currentTime}
* 🎯 Código actual: ${this.promotions.promoCode.code}
* 💰 Descuento: ${this.promotions.promoCode.discount}%
* 🚚 Envío gratis: $${this.promotions.freeShipping.minAmount} MXN
* 
* ========================================
*/

// Configuración actual de promociones
const promotionsConfig = ${JSON.stringify(this.promotions, null, 4)};

// Actualizar localStorage con la nueva configuración
localStorage.setItem('starlightPromotions', JSON.stringify(promotionsConfig));

console.log('✅ Promociones actualizadas:', promotionsConfig);

// INSTRUCCIONES:
// 1. Copia este código
// 2. Ejecuta en la consola del navegador de tu tienda
// 3. Recarga la página para ver los cambios
// 4. O reemplaza el contenido de js/promotions-config.js`;

        return promotionsCode;
    }

    /**
     * Show code modal
     */
    showCodeModal(code, title = 'Código para productos-data.js') {
        const modal = document.getElementById('code-modal');
        const codeElement = document.getElementById('generated-code');
        const titleElement = modal.querySelector('h3');

        if (titleElement) {
            titleElement.textContent = title;
        }

        codeElement.textContent = code;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Guardar código para copiar/descargar
        this.generatedCode = code;
    }

    /**
     * Close code modal
     */
    closeCodeModal() {
        const modal = document.getElementById('code-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    /**
     * Copy code to clipboard
     */
    async copyCode() {
        try {
            await navigator.clipboard.writeText(this.generatedCode);

            // Mostrar confirmación
            const status = document.getElementById('copy-status');
            status.classList.remove('hidden');
            setTimeout(() => {
                status.classList.add('hidden');
            }, 2000);

            this.showNotification('Código copiado al portapapeles', 'success');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            this.showNotification('Error al copiar. Selecciona y copia manualmente.', 'error');
        }
    }

    /**
     * Download code as file
     */
    downloadCode() {
        const blob = new Blob([this.generatedCode], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `productos-data-${new Date().toISOString().split('T')[0]}.js`;
        link.click();

        URL.revokeObjectURL(url);
        this.showNotification('Archivo descargado correctamente', 'success');
    }



    /**
     * Save to storage (Solo local, NO actualiza producción)
     */
    saveToStorage() {
        // Guardar SOLO en localStorage del admin
        localStorage.setItem('adminProducts', JSON.stringify(this.products));

        // NO actualizar versión automáticamente
        // NO forzar actualización del cache
        // NO actualizar datos globales automáticamente

        console.log(`💾 Productos guardados localmente: ${this.products.length} items`);
        console.log(`ℹ️ Para actualizar producción, usa "Generar Código"`);
    }

    /**
     * Generate products file content
     */
    generateProductsFile() {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentVersion = this.generateVersion();

        const content = `/**
* ========================================
* BASE DE DATOS DE PRODUCTOS
* Velas Starlight - Products Database
* ========================================
*/

// 🛍️ PRODUCTOS GENERADOS DESDE EL PORTAL DE ADMINISTRACIÓN
const productosData = ${JSON.stringify(this.products, null, 4)};

// 🎨 CONFIGURACIÓN DE CATEGORÍAS
const categorias = [
    { id: "all", name: "Todos", icon: "fa-th-large" },
    { id: "Vela", name: "Velas", icon: "fa-fire" },
    { id: "Decoracion", name: "Decoración", icon: "fa-home" },
    { id: "Belleza", name: "Belleza", icon: "fa-spa" }
];

// 🌸 FRAGANCIAS POPULARES
const fraganciasPopulares = [
    { name: "Vainilla", emoji: "🍦", description: "Dulce y relajante" },
    { name: "Lavanda", emoji: "💜", description: "Calmante y floral" },
    { name: "Rosas Especiales", emoji: "🌹", description: "Romántico y elegante" },
    { name: "Canela", emoji: "🍂", description: "Cálido y acogedor" },
    { name: "Citricos", emoji: "🍊", description: "Fresco y energizante" }
];

// 📊 CONFIGURACIÓN GENERAL
const configuracion = {
    moneda: "MXN",
    simboloMoneda: "$",
    mostrarDescuentos: true,
    mostrarStock: false,
    animaciones: true,
    version: "${currentVersion}",
    lastUpdate: "${currentDate}"
};

// 🔄 CONTROL DE VERSIONES Y CACHE
function checkDataVersion() {
    const currentVersion = configuracion.version;
    const storedVersion = localStorage.getItem('productosVersion');
    const storedData = localStorage.getItem('adminProducts');
    
    // Si no hay versión almacenada o es diferente, actualizar
    if (!storedVersion || storedVersion !== currentVersion || !storedData) {
        console.log(\`🔄 Actualizando datos de productos de v\${storedVersion || '0.0.0'} a v\${currentVersion}\`);
        
        // Limpiar datos antiguos
        localStorage.removeItem('adminProducts');
        localStorage.removeItem('productosVersion');
        
        // Guardar nueva versión
        localStorage.setItem('productosVersion', currentVersion);
        localStorage.setItem('adminProducts', JSON.stringify(productosData));
        
        return true; // Datos actualizados
    }
    
    return false; // Sin cambios
}

// 🚀 EXPORTAR DATOS
if (typeof window !== 'undefined') {
    window.productosData = productosData;
    window.categorias = categorias;
    window.fraganciasPopulares = fraganciasPopulares;
    window.configuracion = configuracion;
    window.checkDataVersion = checkDataVersion;
    
    // Ejecutar verificación automáticamente
    checkDataVersion();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productosData,
        categorias,
        fraganciasPopulares,
        configuracion
    };
}`;

        // Create download link for the file
        const blob = new Blob([content], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        // Store the URL for manual download if needed
        this.generatedFileUrl = url;
    }

    /**
     * Update product count
     */
    updateProductCount() {
        const count = this.products.length;
        document.getElementById('product-count').textContent = `${count} producto${count !== 1 ? 's' : ''}`;
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 px-6 py-4 rounded-lg text-white font-semibold z-50 transform translate-x-full transition-transform duration-300`;

        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500');
                break;
            case 'error':
                notification.classList.add('bg-red-500');
                break;
            case 'warning':
                notification.classList.add('bg-yellow-500');
                break;
            default:
                notification.classList.add('bg-blue-500');
        }

        notification.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Load from storage
     */
    loadFromStorage() {
        console.log('🔄 Cargando productos...');

        // Verificar versión de datos primero
        if (typeof window.checkDataVersion === 'function') {
            const wasUpdated = window.checkDataVersion();
            if (wasUpdated) {
                this.showNotification('Sistema de productos inicializado', 'info');
            }
        }

        // Obtener productos actuales usando la función centralizada
        if (typeof window.getCurrentProducts === 'function') {
            this.products = window.getCurrentProducts();
        } else {
            // Fallback manual
            const stored = localStorage.getItem('adminProducts');
            if (stored) {
                try {
                    this.products = JSON.parse(stored);
                    console.log(`📦 Cargados ${this.products.length} productos desde localStorage`);
                } catch (error) {
                    console.error('Error loading from storage:', error);
                    this.products = [...(window.productosData || [])];
                    console.log(`📦 Fallback: ${this.products.length} productos desde archivo`);
                }
            } else {
                this.products = [...(window.productosData || [])];
                console.log(`📦 Inicializado con ${this.products.length} productos base`);
                // Guardar inmediatamente para futuras cargas
                this.saveToStorage();
            }
        }

        console.log(`✅ Productos cargados: ${this.products.length} items`);
    }
    // ========================================
    // GESTIÓN DE PROMOCIONES
    // ========================================

    /**
     * Cargar promociones desde localStorage
     */
    loadPromotions() {
        const saved = localStorage.getItem('starlightPromotions');
        if (saved) {
            return JSON.parse(saved);
        }

        // Valores por defecto
        return {
            promoCode: {
                code: 'NUEVOSITIO15',
                discount: 15,
                description: 'Obtén 15% de descuento en tu primera compra',
                active: true
            },
            freeShipping: {
                minAmount: 500,
                active: true
            },
            bulkDiscount: {
                minQuantity: 3,
                discount: 10,
                active: false
            }
        };
    }

    /**
     * Guardar promociones en localStorage
     */
    savePromotionsData() {
        localStorage.setItem('starlightPromotions', JSON.stringify(this.promotions));
        console.log('✅ Promociones guardadas');
    }

    /**
     * Abrir modal de promociones
     */
    openPromotionsModal() {
        document.getElementById('promotions-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.loadPromotionsUI();
    }

    /**
     * Cerrar modal de promociones
     */
    closePromotionsModal() {
        document.getElementById('promotions-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    /**
     * Cargar datos de promociones en la UI
     */
    loadPromotionsUI() {
        const promo = this.promotions.promoCode;
        document.getElementById('promo-code').value = promo.code;
        document.getElementById('promo-discount').value = promo.discount;
        document.getElementById('promo-description').value = promo.description;
        document.getElementById('promo-active').checked = promo.active;

        document.getElementById('free-shipping-min').value = this.promotions.freeShipping.minAmount;
        document.getElementById('free-shipping-active').checked = this.promotions.freeShipping.active;

        document.getElementById('bulk-discount-qty').value = this.promotions.bulkDiscount.minQuantity;
        document.getElementById('bulk-discount-percent').value = this.promotions.bulkDiscount.discount;
        document.getElementById('bulk-discount-active').checked = this.promotions.bulkDiscount.active;

        this.updatePromoPreview();
    }

    /**
     * Actualizar vista previa del código promocional
     */
    updatePromoPreview() {
        const code = document.getElementById('promo-code').value || 'CODIGO';
        const discount = document.getElementById('promo-discount').value || '0';
        const description = document.getElementById('promo-description').value || 'Descripción del descuento';

        document.getElementById('preview-code').textContent = code;
        document.getElementById('preview-description').textContent =
            description.replace('{discount}', discount + '%');
    }

    /**
     * Guardar código promocional
     */
    savePromoCode() {
        const code = document.getElementById('promo-code').value.trim().toUpperCase();
        const discount = parseInt(document.getElementById('promo-discount').value);
        const description = document.getElementById('promo-description').value.trim();
        const active = document.getElementById('promo-active').checked;

        if (!code || !discount || discount < 1 || discount > 90) {
            alert('Por favor, ingresa un código válido y un descuento entre 1% y 90%');
            return;
        }

        this.promotions.promoCode = { code, discount, description, active };
        this.savePromotionsData();
        this.updatePromoPreview();

        // Mostrar confirmación
        const btn = document.getElementById('save-promo-code');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>¡Guardado!';
        btn.classList.add('bg-green-700');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-green-700');
        }, 2000);
    }

    /**
     * Guardar todas las promociones
     */
    savePromotions() {
        // Código promocional
        this.savePromoCode();

        // Envío gratis
        this.promotions.freeShipping = {
            minAmount: parseInt(document.getElementById('free-shipping-min').value) || 500,
            active: document.getElementById('free-shipping-active').checked
        };

        // Descuento por cantidad
        this.promotions.bulkDiscount = {
            minQuantity: parseInt(document.getElementById('bulk-discount-qty').value) || 3,
            discount: parseInt(document.getElementById('bulk-discount-percent').value) || 10,
            active: document.getElementById('bulk-discount-active').checked
        };

        this.savePromotionsData();

        // Mostrar confirmación
        const btn = document.getElementById('save-promotions');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>¡Todo Guardado!';
        btn.classList.add('bg-green-700');

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('bg-green-700');
        }, 2000);
    }

    /**
     * Restaurar valores por defecto
     */
    resetPromotions() {
        if (confirm('¿Estás seguro de que quieres restaurar los valores por defecto?')) {
            this.promotions = {
                promoCode: {
                    code: 'NUEVOSITIO15',
                    discount: 15,
                    description: 'Obtén 15% de descuento en tu primera compra',
                    active: true
                },
                freeShipping: {
                    minAmount: 500,
                    active: true
                },
                bulkDiscount: {
                    minQuantity: 3,
                    discount: 10,
                    active: false
                }
            };

            this.savePromotionsData();
            this.loadPromotionsUI();
        }
    }

    /**
     * Toggle opciones de descuento en productos
     */
    toggleDiscountOptions(e) {
        const options = document.getElementById('discount-options');
        if (e.target.checked) {
            options.classList.remove('opacity-50', 'pointer-events-none');
        } else {
            options.classList.add('opacity-50', 'pointer-events-none');
        }
    }

    // ========================================
    // ACTUALIZACIÓN DE FUNCIONES EXISTENTES
    // ========================================

    /**
     * Actualizar collectFormData para incluir nuevos campos
     */
    collectFormDataEnhanced() {
        const baseData = this.collectFormData();

        // Agregar nuevos campos
        baseData.theme = document.getElementById('product-theme').value || null;
        baseData.promotion2x1 = document.getElementById('product-2x1').checked;

        // Descuento especial
        if (document.getElementById('product-discount').checked) {
            baseData.specialDiscount = {
                percentage: parseInt(document.getElementById('discount-percentage').value) || 0,
                text: document.getElementById('discount-text').value.trim() || 'Oferta especial'
            };
        } else {
            baseData.specialDiscount = null;
        }

        // Ingredientes
        baseData.ingredients = this.collectIngredients();

        return baseData;
    }

    /**
     * Actualizar populateForm para incluir nuevos campos
     */
    populateFormEnhanced(product) {
        this.populateForm(product);

        // Cargar nuevos campos
        document.getElementById('product-theme').value = product.theme || '';
        document.getElementById('product-2x1').checked = product.promotion2x1 || false;

        if (product.specialDiscount) {
            document.getElementById('product-discount').checked = true;
            document.getElementById('discount-percentage').value = product.specialDiscount.percentage;
            document.getElementById('discount-text').value = product.specialDiscount.text;
            this.toggleDiscountOptions({ target: { checked: true } });
        } else {
            document.getElementById('product-discount').checked = false;
            this.toggleDiscountOptions({ target: { checked: false } });
        }
    }

    /**
     * Actualizar resetForm para incluir nuevos campos
     */
    resetFormEnhanced() {
        this.resetForm();

        // Resetear nuevos campos
        document.getElementById('product-theme').value = '';
        document.getElementById('product-2x1').checked = false;
        document.getElementById('product-discount').checked = false;
        document.getElementById('discount-percentage').value = '';
        document.getElementById('discount-text').value = '';
        this.toggleDiscountOptions({ target: { checked: false } });
    }

    /**
     * Actualizar filtros para incluir temática
     */
    filterProducts() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        const themeFilter = document.getElementById('theme-filter').value;

        const filteredProducts = this.products.filter(product => {
            const matchesSearch = !searchTerm ||
                product.title.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);

            const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
            const matchesTheme = themeFilter === 'all' || product.theme === themeFilter;

            return matchesSearch && matchesCategory && matchesTheme;
        });

        this.displayProducts(filteredProducts);
    }
}

// Initialize admin portal
const adminPortal = new AdminPortal();

document.addEventListener('DOMContentLoaded', () => {
    adminPortal.loadFromStorage();
    adminPortal.init();
});

// Make adminPortal globally available
window.adminPortal = adminPortal;