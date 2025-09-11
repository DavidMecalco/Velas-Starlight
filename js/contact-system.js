/**
 * ========================================
 * SISTEMA DE CONTACTO
 * Velas Starlight - Contact System
 * ========================================
 */

class ContactSystem {
    constructor() {
        this.form = null;
        this.submitButton = null;
        this.isSubmitting = false;
        this.init();
    }

    /**
     * Inicializar el sistema de contacto
     */
    init() {
        console.log('📞 Inicializando sistema de contacto...');
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Configurar elementos y eventos
     */
    setup() {
        this.form = document.getElementById('contact-form');
        this.submitButton = document.getElementById('submit-btn');

        if (!this.form) {
            console.warn('⚠️ Formulario de contacto no encontrado');
            return;
        }

        this.setupEventListeners();
        this.setupValidation();
        console.log('✅ Sistema de contacto configurado');
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Envío del formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validación en tiempo real
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Botones de WhatsApp
        const whatsappButtons = document.querySelectorAll('.whatsapp-btn, [data-whatsapp]');
        whatsappButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleWhatsAppClick(e));
        });

        console.log('📞 Event listeners configurados');
    }

    /**
     * Configurar validación del formulario
     */
    setupValidation() {
        // Configurar validación HTML5 personalizada
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.showFieldError(input, input.validationMessage);
            });
        });
    }

    /**
     * Manejar envío del formulario
     */
    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) {
            console.log('📞 Ya se está enviando el formulario');
            return;
        }

        console.log('📞 Procesando envío del formulario...');

        try {
            this.isSubmitting = true;
            this.setSubmitButtonState(true);

            // Obtener datos del formulario
            const formData = this.getFormData();
            console.log('📞 Datos del formulario:', formData);

            // Validar datos
            const validationErrors = window.emailIntegration.validateFormData(formData);
            if (validationErrors.length > 0) {
                this.showValidationErrors(validationErrors);
                return;
            }

            // Formatear datos
            const emailData = window.emailIntegration.formatEmailData(formData);

            // Enviar email
            const result = await window.emailIntegration.sendContactEmail(emailData);
            console.log('📧 Resultado del envío:', result);

            // Mostrar éxito
            this.showSuccess();
            this.resetForm();

        } catch (error) {
            console.error('❌ Error enviando formulario:', error);
            this.showError(error.message);
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonState(false);
        }
    }

    /**
     * Obtener datos del formulario
     */
    getFormData() {
        const formData = new FormData(this.form);
        const eventType = formData.get('event-type') || '';
        const quantity = formData.get('quantity') || '';
        
        // Crear subject basado en el tipo de evento
        let subject = eventType ? this.getEventTypeLabel(eventType) : 'Consulta General';
        if (quantity) {
            subject += ` (${quantity} unidades)`;
        }
        
        return {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            subject: subject,
            eventType: eventType,
            quantity: quantity,
            message: formData.get('message') || ''
        };
    }

    /**
     * Validar campo individual
     */
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Validaciones específicas por campo
        switch (field.name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;

            case 'email':
                if (!window.emailIntegration.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un email válido';
                }
                break;

            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un teléfono válido';
                }
                break;

            case 'event-type':
                // Campo opcional, no requiere validación
                break;

            case 'quantity':
                if (value && (isNaN(value) || parseInt(value) < 1)) {
                    isValid = false;
                    errorMessage = 'La cantidad debe ser un número mayor a 0';
                }
                break;

            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    /**
     * Mostrar error en campo específico
     */
    showFieldError(field, message) {
        // Remover error anterior
        this.clearFieldError(field);

        // Agregar clase de error
        field.classList.add('border-red-500', 'bg-red-50');

        // Crear mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;

        // Insertar después del campo
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    /**
     * Limpiar error de campo
     */
    clearFieldError(field) {
        field.classList.remove('border-red-500', 'bg-red-50');
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Mostrar errores de validación
     */
    showValidationErrors(errors) {
        const errorMessage = errors.join('\n');
        this.showNotification(errorMessage, 'error');
    }

    /**
     * Mostrar mensaje de éxito
     */
    showSuccess() {
        this.showNotification(
            '¡Mensaje enviado correctamente! Te responderemos pronto.',
            'success'
        );
    }

    /**
     * Mostrar mensaje de error
     */
    showError(message) {
        this.showNotification(
            `Error al enviar el mensaje: ${message}. Por favor intenta de nuevo o contáctanos por WhatsApp.`,
            'error'
        );
    }

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        // Remover notificación anterior
        const existingNotification = document.querySelector('.contact-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = 'contact-notification fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full max-w-md';
        
        // Estilos según el tipo
        const styles = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        notification.classList.add(styles[type] || styles.info);

        // Iconos según el tipo
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };

        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <i class="fas fa-${icons[type] || icons.info} text-lg mt-1"></i>
                <div>
                    <p class="font-semibold whitespace-pre-line">${message}</p>
                </div>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remover automáticamente después de 6 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 6000);
    }

    /**
     * Configurar estado del botón de envío
     */
    setSubmitButtonState(isLoading) {
        if (!this.submitButton) return;

        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Enviando...
            `;
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = `
                <i class="fas fa-paper-plane mr-2"></i>
                Enviar Mensaje
            `;
        }
    }

    /**
     * Resetear formulario
     */
    resetForm() {
        this.form.reset();
        
        // Limpiar errores
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => this.clearFieldError(field));
    }

    /**
     * Obtener etiqueta del tipo de evento
     */
    getEventTypeLabel(eventType) {
        const labels = {
            'boda': 'Boda',
            'corporativo': 'Evento Corporativo',
            'quinceañera': 'Quinceañera',
            'aniversario': 'Aniversario',
            'mayoreo': 'Compra por Mayoreo',
            'personalizado': 'Producto Personalizado',
            'general': 'Consulta General'
        };
        return labels[eventType] || 'Consulta General';
    }

    /**
     * Manejar click en botón de WhatsApp
     */
    handleWhatsAppClick(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        // Si hay datos en el formulario, usarlos para WhatsApp
        if (formData.name || formData.message) {
            const whatsappUrl = window.emailIntegration.generateWhatsAppLink(formData);
            window.open(whatsappUrl, '_blank');
        } else {
            // WhatsApp simple
            const phoneNumber = '5564682112';
            const message = 'Hola! Me interesa conocer más sobre sus productos de Velas Starlight.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    }
}

// Crear instancia global
window.contactSystem = new ContactSystem();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactSystem;
}