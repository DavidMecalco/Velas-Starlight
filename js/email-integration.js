/**
 * ========================================
 * SISTEMA DE INTEGRACIÓN DE EMAIL
 * Velas Starlight - Email Integration
 * ========================================
 */

class EmailIntegration {
    constructor() {
        this.emailServiceUrl = 'https://formspree.io/f/YOUR_FORM_ID'; // Reemplazar con tu ID de Formspree
        this.fallbackEmail = 'ventas@velasstarlight.com';
        this.init();
    }

    /**
     * Inicializar el sistema de email
     */
    init() {
        console.log('📧 Inicializando sistema de integración de email...');
        this.setupEmailService();
        console.log('✅ Sistema de email inicializado');
    }

    /**
     * Configurar servicio de email
     */
    setupEmailService() {
        // Detectar si estamos en desarrollo o producción
        const isDevelopment = window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1' ||
                             window.location.hostname === '';

        if (isDevelopment) {
            console.log('🔧 Modo desarrollo: usando simulación de email');
            this.emailServiceUrl = null; // Usar simulación
        }
    }

    /**
     * Enviar email de contacto
     */
    async sendContactEmail(formData) {
        console.log('📧 Enviando email de contacto...', formData);

        try {
            if (this.emailServiceUrl) {
                // Usar servicio real (Formspree, EmailJS, etc.)
                return await this.sendRealEmail(formData);
            } else {
                // Usar simulación para desarrollo
                return await this.simulateEmailSend(formData);
            }
        } catch (error) {
            console.error('❌ Error enviando email:', error);
            throw error;
        }
    }

    /**
     * Enviar email real usando servicio externo
     */
    async sendRealEmail(formData) {
        const response = await fetch(this.emailServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                _replyto: formData.email,
                _subject: `Contacto desde Velas Starlight: ${formData.subject}`
            })
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        return await response.json();
    }

    /**
     * Simular envío de email para desarrollo
     */
    async simulateEmailSend(formData) {
        console.log('🎭 Simulando envío de email...');
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular respuesta exitosa
        const simulatedResponse = {
            success: true,
            message: 'Email enviado correctamente (simulado)',
            timestamp: new Date().toISOString(),
            data: formData
        };

        console.log('📧 Email simulado enviado:', simulatedResponse);
        return simulatedResponse;
    }

    /**
     * Generar enlace de WhatsApp como fallback
     */
    generateWhatsAppLink(formData) {
        const phoneNumber = '5564682112';
        let message = `Hola! Me pongo en contacto desde la página web.

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone || 'No proporcionado'}
*Tipo de consulta:* ${formData.subject}`;

        if (formData.quantity) {
            message += `\n*Cantidad aproximada:* ${formData.quantity} unidades`;
        }

        message += `\n\n*Mensaje:*\n${formData.message}`;

        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }

    /**
     * Validar datos del formulario
     */
    validateFormData(formData) {
        const errors = [];

        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.push('Por favor ingresa un email válido');
        }

        if (!formData.message || formData.message.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }

        // Validar cantidad si se proporciona
        if (formData.quantity && (isNaN(formData.quantity) || parseInt(formData.quantity) < 1)) {
            errors.push('La cantidad debe ser un número mayor a 0');
        }

        return errors;
    }

    /**
     * Validar formato de email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Formatear datos para email
     */
    formatEmailData(formData) {
        return {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone ? formData.phone.trim() : '',
            subject: formData.subject.trim(),
            eventType: formData.eventType || '',
            quantity: formData.quantity || '',
            message: formData.message.trim(),
            timestamp: new Date().toISOString(),
            source: 'Página de Contacto - Velas Starlight'
        };
    }
}

// Crear instancia global
window.emailIntegration = new EmailIntegration();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailIntegration;
}