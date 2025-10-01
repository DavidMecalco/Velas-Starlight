/* ========================================
   CARRITO SIMPLE - SIN PROMOCIONES
   Solo estados: NUEVO, DESTACADO, BESTSELLER, Disponibilidad
   ======================================== */

class SimpleCart {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.updateCartCount();
    }

    loadCart() {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    addItem(item) {
        const existingIndex = this.cart.findIndex(cartItem =>
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.fragrance === item.fragrance &&
            cartItem.type === item.type
        );

        if (existingIndex >= 0) {
            this.cart[existingIndex].quantity += item.quantity;
        } else {
            this.cart.push(item);
        }

        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
    }

    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeItem(index);
        } else {
            this.cart[index].quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
            this.updateCartCount();
        }
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'inline' : 'none';
        });
    }

    updateCartDisplay() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart text-center py-8">
                    <i class="fas fa-shopping-cart text-gray-400 text-4xl mb-4"></i>
                    <p class="text-gray-600">Tu carrito está vacío</p>
                    <a href="../pages/productos.html" class="btn btn-primary mt-4">
                        Ver productos
                    </a>
                </div>
            `;
            return;
        }

        const cartHTML = this.cart.map((item, index) => {
            const itemTotal = item.price * item.quantity;

            return `
                <div class="cart-item bg-white rounded-lg shadow-sm border p-4 mb-4">
                    <div class="flex items-center space-x-4">
                        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-800">${item.title}</h3>
                            <p class="text-sm text-gray-600">
                                ${item.size} | ${item.fragrance} | ${item.type}
                            </p>
                            <div class="flex items-center justify-between mt-2">
                                <div class="flex items-center space-x-2">
                                    <button onclick="cart.updateQuantity(${index}, ${item.quantity - 1})" 
                                            class="btn-quantity">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button onclick="cart.updateQuantity(${index}, ${item.quantity + 1})" 
                                            class="btn-quantity">+</button>
                                </div>
                                <div class="text-right">
                                    <div class="price-main">$${itemTotal.toFixed(2)} MXN</div>
                                    <div class="price-unit">$${item.price.toFixed(2)} c/u</div>
                                </div>
                            </div>
                        </div>
                        <button onclick="cart.removeItem(${index})" 
                                class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        cartContainer.innerHTML = cartHTML;
        this.updateSummary();
    }

    updateSummary() {
        const subtotal = this.calculateTotal();
        const summaryContainer = document.getElementById('cart-summary');

        if (!summaryContainer) return;

        summaryContainer.innerHTML = `
            <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                    <span>Subtotal:</span>
                    <span class="font-semibold">$${subtotal.toFixed(2)} MXN</span>
                </div>
                <div class="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>$${subtotal.toFixed(2)} MXN</span>
                </div>
                <button class="btn btn-primary w-full mt-4" onclick="cart.proceedToCheckout()">
                    Proceder al pago
                </button>
            </div>
        `;
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }

        // Aquí puedes agregar la lógica de checkout
        console.log('Procediendo al checkout con:', this.cart);
        alert('Funcionalidad de checkout en desarrollo');
    }

    setupEventListeners() {
        // Event listeners básicos
        document.addEventListener('DOMContentLoaded', () => {
            this.updateCartDisplay();
            this.updateCartCount();
        });
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.updateCartCount();
    }
}

// Inicializar carrito
const cart = new SimpleCart();

// Funciones globales para compatibilidad
window.addToCart = (productData) => {
    cart.addItem(productData);
};

window.removeFromCart = (index) => {
    cart.removeItem(index);
};

window.updateCartQuantity = (index, quantity) => {
    cart.updateQuantity(index, quantity);
};

window.clearCart = () => {
    cart.clearCart();
};