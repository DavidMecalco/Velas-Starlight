/**
 * ========================================
 * CONFIGURACIÓN DE PROMOCIONES
 * Velas Starlight - Promotions Config
 * ========================================
 */

class PromotionsManager {
    constructor() {
        this.config = this.loadConfig();
    }

    /**
     * Cargar configuración de promociones
     */
    loadConfig() {
        const saved = localStorage.getItem('starlightPromotions');
        if (saved) {
            return JSON.parse(saved);
        }

        // Configuración por defecto
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
     * Obtener código promocional activo
     */
    getActivePromoCode() {
        return this.config.promoCode.active ? this.config.promoCode : null;
    }

    /**
     * Validar código promocional
     */
    validatePromoCode(code) {
        const promo = this.getActivePromoCode();
        if (!promo) return null;

        return code.toUpperCase() === promo.code ? promo : null;
    }

    /**
     * Verificar si aplica envío gratis
     */
    checkFreeShipping(total) {
        return this.config.freeShipping.active && total >= this.config.freeShipping.minAmount;
    }

    /**
     * Verificar descuento por cantidad
     */
    checkBulkDiscount(quantity) {
        return this.config.bulkDiscount.active && quantity >= this.config.bulkDiscount.minQuantity
            ? this.config.bulkDiscount.discount
            : 0;
    }

    /**
     * Actualizar código promocional en la página principal
     */
    updatePromoCodeDisplay() {
        const promoElement = document.getElementById('promo-code-text');
        if (promoElement && this.config.promoCode.active) {
            promoElement.textContent = this.config.promoCode.code;
        }
    }

    /**
     * Actualizar hints de descuento en carrito
     */
    updateDiscountHints() {
        const hintElements = document.querySelectorAll('.discount-hint span');
        hintElements.forEach(element => {
            if (this.config.promoCode.active) {
                element.innerHTML = `Usa <strong>${this.config.promoCode.code}</strong> para obtener ${this.config.promoCode.discount}% de descuento`;
            }
        });
    }

    /**
     * Inicializar promociones en la página
     */
    init() {
        this.updatePromoCodeDisplay();
        this.updateDiscountHints();

        // Sin sincronización automática - solo manual
        console.log('✅ Promociones cargadas (modo manual)');
    }
}

// Función global para copiar código promocional
function copyPromoCode() {
    const promotions = new PromotionsManager();
    const promo = promotions.getActivePromoCode();

    if (promo) {
        navigator.clipboard.writeText(promo.code).then(() => {
            // Mostrar confirmación visual
            const button = event.target.closest('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check mr-2"></i>¡Copiado!';
            button.classList.add('bg-green-500');

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('bg-green-500');
            }, 2000);
        });
    }
}

// Hacer disponible globalmente
window.PromotionsManager = PromotionsManager;
window.copyPromoCode = copyPromoCode;

// Auto-inicializar si estamos en el DOM
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const promotions = new PromotionsManager();
        promotions.init();
    });
}