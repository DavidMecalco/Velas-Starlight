/**
 * Sistema de Notificaciones Premium
 * Notificaciones elegantes y animadas para Velas Starlight
 */

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.maxNotifications = 5;
        this.defaultDuration = 5000;
        
        this.init();
    }
    
    init() {
        this.createContainer();
        this.addStyles();
        
        console.log('🔔 Sistema de notificaciones inicializado');
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }
    
    addStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .notification-container {
                position: fixed;
                top: 2rem;
                right: 2rem;
                z-index: 10001;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                max-width: 400px;
                pointer-events: none;
            }
            
            .notification {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 1rem;
                padding: 1.25rem 1.5rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: auto;
                position: relative;
                overflow: hidden;
                min-height: 80px;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.hide {
                transform: translateX(100%);
                opacity: 0;
                margin-top: -100px;
            }
            
            .notification::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background: var(--notification-color, #A3B18A);
                border-radius: 2px 0 0 2px;
            }
            
            .notification-icon {
                flex-shrink: 0;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.25rem;
                color: white;
                background: var(--notification-color, #A3B18A);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .notification-content {
                flex: 1;
                min-width: 0;
            }
            
            .notification-title {
                font-weight: 600;
                font-size: 1rem;
                color: var(--color-text, #1a1a1a);
                margin-bottom: 0.25rem;
                line-height: 1.3;
            }
            
            .notification-message {
                font-size: 0.9rem;
                color: var(--color-textSecondary, #6B7280);
                line-height: 1.4;
                margin-bottom: 0.5rem;
            }
            
            .notification-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.75rem;
            }
            
            .notification-btn {
                padding: 0.375rem 0.75rem;
                border-radius: 0.5rem;
                border: none;
                font-size: 0.8rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .notification-btn.primary {
                background: var(--notification-color, #A3B18A);
                color: white;
            }
            
            .notification-btn.primary:hover {
                background: var(--color-secondary, #2D3E33);
                transform: translateY(-1px);
            }
            
            .notification-btn.secondary {
                background: rgba(0, 0, 0, 0.05);
                color: var(--color-text, #374151);
            }
            
            .notification-btn.secondary:hover {
                background: rgba(0, 0, 0, 0.1);
            }
            
            .notification-close {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                background: none;
                border: none;
                color: var(--color-textSecondary, #6B7280);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: all 0.2s ease;
                font-size: 0.875rem;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.05);
                color: var(--color-text, #374151);
            }
            
            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: var(--notification-color, #A3B18A);
                border-radius: 0 0 1rem 1rem;
                transition: width linear;
                opacity: 0.7;
            }
            
            /* Tipos de notificación */
            .notification.success {
                --notification-color: #10B981;
            }
            
            .notification.error {
                --notification-color: #EF4444;
            }
            
            .notification.warning {
                --notification-color: #F59E0B;
            }
            
            .notification.info {
                --notification-color: #3B82F6;
            }
            
            .notification.cart {
                --notification-color: #8B5CF6;
            }
            
            .notification.whatsapp {
                --notification-color: #25D366;
            }
            
            /* Efectos especiales */
            .notification.glow {
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 
                           0 0 20px var(--notification-color);
            }
            
            .notification.pulse .notification-icon {
                animation: pulse-notification 2s ease-in-out infinite;
            }
            
            @keyframes pulse-notification {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .notification.shake {
                animation: shake-notification 0.5s ease-in-out;
            }
            
            @keyframes shake-notification {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .notification-container {
                    top: 1rem;
                    right: 1rem;
                    left: 1rem;
                    max-width: none;
                }
                
                .notification {
                    padding: 1rem;
                }
                
                .notification-title {
                    font-size: 0.9rem;
                }
                
                .notification-message {
                    font-size: 0.8rem;
                }
            }
            
            /* Tema oscuro */
            .theme-dark .notification {
                background: rgba(26, 26, 26, 0.95);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .theme-midnight .notification {
                background: rgba(13, 17, 23, 0.95);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .theme-sepia .notification {
                background: rgba(250, 240, 230, 0.95);
                border-color: rgba(139, 115, 85, 0.2);
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    // ===== MÉTODOS PRINCIPALES =====
    
    show(options) {
        const notification = this.createNotification(options);
        this.addNotification(notification);
        return notification.id;
    }
    
    createNotification(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = this.defaultDuration,
            actions = [],
            closable = true,
            progress = true,
            effects = [],
            icon = null,
            onClick = null,
            onClose = null
        } = options;
        
        const id = 'notification-' + Date.now() + Math.random().toString(36).substr(2, 9);
        
        const notification = document.createElement('div');
        notification.className = `notification ${type} ${effects.join(' ')}`;
        notification.id = id;
        
        // Icono
        const iconElement = document.createElement('div');
        iconElement.className = 'notification-icon';
        iconElement.innerHTML = icon || this.getDefaultIcon(type);
        
        // Contenido
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        if (title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'notification-title';
            titleElement.textContent = title;
            content.appendChild(titleElement);
        }
        
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'notification-message';
            messageElement.textContent = message;
            content.appendChild(messageElement);
        }
        
        // Acciones
        if (actions.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'notification-actions';
            
            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `notification-btn ${action.type || 'secondary'}`;
                button.textContent = action.text;
                button.addEventListener('click', () => {
                    if (action.onClick) action.onClick();
                    if (action.close !== false) this.remove(id);
                });
                actionsContainer.appendChild(button);
            });
            
            content.appendChild(actionsContainer);
        }
        
        // Botón cerrar
        if (closable) {
            const closeButton = document.createElement('button');
            closeButton.className = 'notification-close';
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            closeButton.addEventListener('click', () => this.remove(id));
            notification.appendChild(closeButton);
        }
        
        // Barra de progreso
        if (progress && duration > 0) {
            const progressBar = document.createElement('div');
            progressBar.className = 'notification-progress';
            progressBar.style.width = '100%';
            notification.appendChild(progressBar);
        }
        
        notification.appendChild(iconElement);
        notification.appendChild(content);
        
        // Event listeners
        if (onClick) {
            notification.style.cursor = 'pointer';
            notification.addEventListener('click', onClick);
        }
        
        // Datos de la notificación
        const notificationData = {
            id,
            element: notification,
            duration,
            progress,
            onClose,
            timer: null,
            progressTimer: null
        };
        
        return notificationData;
    }
    
    addNotification(notificationData) {
        // Limitar número de notificaciones
        while (this.notifications.length >= this.maxNotifications) {
            this.remove(this.notifications[0].id);
        }
        
        this.notifications.push(notificationData);
        this.container.appendChild(notificationData.element);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notificationData.element.classList.add('show');
        });
        
        // Configurar auto-close
        if (notificationData.duration > 0) {
            this.setupAutoClose(notificationData);
        }
        
        // Los sonidos han sido eliminados por preferencia del usuario
    }
    
    setupAutoClose(notificationData) {
        const { element, duration, progress } = notificationData;
        
        // Timer principal
        notificationData.timer = setTimeout(() => {
            this.remove(notificationData.id);
        }, duration);
        
        // Barra de progreso
        if (progress) {
            const progressBar = element.querySelector('.notification-progress');
            if (progressBar) {
                progressBar.style.transition = `width ${duration}ms linear`;
                requestAnimationFrame(() => {
                    progressBar.style.width = '0%';
                });
            }
        }
        
        // Pausar en hover
        element.addEventListener('mouseenter', () => {
            if (notificationData.timer) {
                clearTimeout(notificationData.timer);
                const progressBar = element.querySelector('.notification-progress');
                if (progressBar) {
                    progressBar.style.animationPlayState = 'paused';
                }
            }
        });
        
        element.addEventListener('mouseleave', () => {
            const remainingTime = this.getRemainingTime(element);
            if (remainingTime > 0) {
                notificationData.timer = setTimeout(() => {
                    this.remove(notificationData.id);
                }, remainingTime);
            }
        });
    }
    
    getRemainingTime(element) {
        const progressBar = element.querySelector('.notification-progress');
        if (!progressBar) return 0;
        
        const currentWidth = parseFloat(progressBar.style.width) || 100;
        const totalDuration = parseFloat(progressBar.style.transitionDuration) * 1000 || 5000;
        
        return (currentWidth / 100) * totalDuration;
    }
    
    remove(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index === -1) return;
        
        const notificationData = this.notifications[index];
        const { element, timer, onClose } = notificationData;
        
        // Limpiar timers
        if (timer) clearTimeout(timer);
        
        // Animar salida
        element.classList.add('hide');
        
        // Remover después de la animación
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
            
            // Callback de cierre
            if (onClose) onClose();
        }, 400);
        
        // Remover de la lista
        this.notifications.splice(index, 1);
    }
    
    getDefaultIcon(type) {
        const icons = {
            success: '<i class="fas fa-check"></i>',
            error: '<i class="fas fa-times"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info"></i>',
            cart: '<i class="fas fa-shopping-cart"></i>',
            whatsapp: '<i class="fab fa-whatsapp"></i>'
        };
        
        return icons[type] || icons.info;
    }
    
    // ===== MÉTODOS DE CONVENIENCIA =====
    
    success(title, message, options = {}) {
        return this.show({
            type: 'success',
            title,
            message,
            effects: ['glow', 'pulse'],
            ...options
        });
    }
    
    error(title, message, options = {}) {
        return this.show({
            type: 'error',
            title,
            message,
            effects: ['shake'],
            duration: 7000,
            ...options
        });
    }
    
    warning(title, message, options = {}) {
        return this.show({
            type: 'warning',
            title,
            message,
            ...options
        });
    }
    
    info(title, message, options = {}) {
        return this.show({
            type: 'info',
            title,
            message,
            ...options
        });
    }
    
    cart(title, message, options = {}) {
        return this.show({
            type: 'cart',
            title: title || '¡Producto agregado!',
            message,
            effects: ['glow'],
            actions: [
                {
                    text: 'Ver carrito',
                    type: 'primary',
                    onClick: () => window.location.href = 'carrito.html'
                },
                {
                    text: 'Seguir comprando',
                    type: 'secondary'
                }
            ],
            ...options
        });
    }
    
    whatsapp(title, message, options = {}) {
        return this.show({
            type: 'whatsapp',
            title: title || 'Redirigiendo a WhatsApp',
            message: message || 'Te conectaremos con nuestro equipo de ventas',
            effects: ['pulse'],
            duration: 3000,
            ...options
        });
    }
    
    // Notificación personalizada con confetti
    celebration(title, message, options = {}) {
        const id = this.success(title, message, {
            effects: ['glow', 'pulse'],
            duration: 6000,
            ...options
        });
        
        // Crear confetti
        if (window.visualEffects) {
            setTimeout(() => {
                window.visualEffects.createConfetti(
                    window.innerWidth - 200,
                    100
                );
            }, 500);
        }
        
        return id;
    }
    
    // ===== MÉTODOS DE GESTIÓN =====
    
    clear() {
        this.notifications.forEach(notification => {
            this.remove(notification.id);
        });
    }
    
    count() {
        return this.notifications.length;
    }
    
    setMaxNotifications(max) {
        this.maxNotifications = max;
    }
    
    setDefaultDuration(duration) {
        this.defaultDuration = duration;
    }
}

// Crear instancia global
window.notificationSystem = new NotificationSystem();

// Funciones de conveniencia globales
window.showNotification = (options) => window.notificationSystem.show(options);
window.showSuccess = (title, message, options) => window.notificationSystem.success(title, message, options);
window.showError = (title, message, options) => window.notificationSystem.error(title, message, options);
window.showWarning = (title, message, options) => window.notificationSystem.warning(title, message, options);
window.showInfo = (title, message, options) => window.notificationSystem.info(title, message, options);

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationSystem;
}