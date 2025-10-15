/**
 * Sistema de Efectos Visuales Premium
 * Animaciones y efectos avanzados para Velas Starlight
 */

class VisualEffects {
    constructor() {
        this.particles = [];
        this.isInitialized = false;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.mousePosition = { x: 0, y: 0 };
        this.scrollY = 0;
        
        this.init();
    }
    
    init() {
        this.createParticleCanvas();
        this.setupScrollEffects();
        this.setupMicroInteractions();
        this.setupLoadingAnimations();
        this.setupParallaxEffects();
        
        this.isInitialized = true;
        console.log('✨ Sistema de efectos visuales inicializado');
    }
    
    // ===== SISTEMA DE PARTÍCULAS =====
    createParticleCanvas() {
        // Crear canvas para partículas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Configurar canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Inicializar partículas
        this.initParticles();
        this.startParticleAnimation();
        
        // Seguir mouse
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                color: this.getRandomColor(),
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(45, 62, 51, 0.4)',   // dark-green
            'rgba(163, 177, 138, 0.3)', // leaf-green
            'rgba(212, 175, 55, 0.2)',  // accent-gold
            'rgba(58, 90, 64, 0.3)'     // sage-green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Movimiento básico
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Efecto de mouse
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
            }
            
            // Pulso
            particle.pulse += particle.pulseSpeed;
            particle.opacity = (Math.sin(particle.pulse) * 0.1 + 0.2);
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Conectar partículas cercanas
        this.connectParticles();
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.1;
                    this.ctx.strokeStyle = 'rgba(163, 177, 138, 0.3)';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    startParticleAnimation() {
        const animate = () => {
            this.updateParticles();
            this.drawParticles();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    // ===== EFECTOS DE SCROLL =====
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            this.scrollY = window.pageYOffset;
            
            // Parallax en hero sections
            const heroElements = document.querySelectorAll('.hero-premium, .hero-section');
            heroElements.forEach(hero => {
                const speed = 0.5;
                hero.style.transform = `translateY(${this.scrollY * speed}px)`;
            });
            
            // Fade in elements deshabilitado
            
            // Header blur effect
            this.updateHeaderBlur();
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
    
    handleScrollFadeIn() {
        // Función deshabilitada - los elementos son visibles inmediatamente
        return;
    }
    
    updateHeaderBlur() {
        const header = document.querySelector('.header-premium');
        if (header) {
            const blurAmount = Math.min(this.scrollY / 100, 1);
            header.style.backdropFilter = `blur(${10 + blurAmount * 10}px)`;
            header.style.background = `rgba(255, 255, 255, ${0.9 + blurAmount * 0.1})`;
        }
    }
    
    // ===== MICRO-INTERACCIONES =====
    setupMicroInteractions() {
        // Efecto ripple en botones
        this.setupRippleEffect();
        
        // Hover magnético en tarjetas
        this.setupMagneticHover();
        
        // Animaciones de entrada
        this.setupEntranceAnimations();
        
        // Efectos de typing
        this.setupTypingEffects();
    }
    
    setupRippleEffect() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button, .btn, .ripple-effect');
            if (!button) return;
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Asegurar posición relativa en el botón
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.style.overflow = 'hidden';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Agregar keyframes para ripple
        this.addRippleStyles();
    }
    
    addRippleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .fade-in-scroll {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: none !important;
            }
            
            .fade-in-scroll.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .magnetic-hover {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .typing-effect {
                overflow: hidden;
                border-right: 2px solid #2D3E33;
                white-space: nowrap;
                animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
            }
            
            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }
            
            @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: #2D3E33; }
            }
            
            .floating-animation {
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            .pulse-glow {
                animation: pulse-glow 2s ease-in-out infinite alternate;
            }
            
            @keyframes pulse-glow {
                from {
                    box-shadow: 0 0 20px rgba(163, 177, 138, 0.4);
                }
                to {
                    box-shadow: 0 0 40px rgba(163, 177, 138, 0.8);
                }
            }
            
            .shimmer-effect {
                position: relative;
                overflow: hidden;
            }
            
            .shimmer-effect::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.4),
                    transparent
                );
                animation: shimmer 2s infinite;
            }
            
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            .glass-morphism {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            
            .gradient-border {
                position: relative;
                background: linear-gradient(45deg, #2D3E33, #A3B18A, #D4AF37);
                padding: 2px;
                border-radius: 12px;
            }
            
            .gradient-border::before {
                content: '';
                position: absolute;
                inset: 2px;
                background: white;
                border-radius: 10px;
                z-index: -1;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupMagneticHover() {
        const magneticElements = document.querySelectorAll('.product-card, .magnetic-hover');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
    
    setupEntranceAnimations() {
        // Animaciones de entrada deshabilitadas por preferencia del usuario
        // Los elementos serán visibles inmediatamente sin animaciones de scroll
        console.log('Animaciones de entrada deshabilitadas');
    }
    
    setupTypingEffects() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.width = '0';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            // Iniciar cuando el elemento sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.width = '100%';
                        setTimeout(typeWriter, 500);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    // ===== LOADING STATES ELEGANTES =====
    setupLoadingAnimations() {
        this.createSkeletonLoaders();
        this.enhanceExistingLoaders();
    }
    
    createSkeletonLoaders() {
        const skeletonStyle = document.createElement('style');
        skeletonStyle.textContent = `
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
            }
            
            @keyframes skeleton-loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            .skeleton-card {
                background: white;
                border-radius: 16px;
                padding: 1.5rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            
            .skeleton-image {
                width: 100%;
                height: 200px;
                border-radius: 12px;
                margin-bottom: 1rem;
            }
            
            .skeleton-title {
                height: 24px;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                width: 80%;
            }
            
            .skeleton-text {
                height: 16px;
                border-radius: 4px;
                margin-bottom: 0.5rem;
            }
            
            .skeleton-text.short {
                width: 60%;
            }
            
            .skeleton-button {
                height: 40px;
                border-radius: 8px;
                width: 120px;
                margin-top: 1rem;
            }
        `;
        document.head.appendChild(skeletonStyle);
    }
    
    enhanceExistingLoaders() {
        // Mejorar el loader existente
        const existingLoader = document.querySelector('.loading-state');
        if (existingLoader) {
            existingLoader.classList.add('glass-morphism');
        }
    }
    
    // ===== EFECTOS DE PARALLAX =====
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // ===== MÉTODOS PÚBLICOS =====
    
    // Crear efecto de confetti
    createConfetti(x, y) {
        const colors = ['#2D3E33', '#A3B18A', '#D4AF37', '#3A5A40'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 10000;
                border-radius: 50%;
            `;
            
            document.body.appendChild(confetti);
            
            // Animar confetti
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10 + 5;
            const gravity = 0.5;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;
            let posX = x;
            let posY = y;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                vy += gravity;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.opacity = Math.max(0, 1 - posY / window.innerHeight);
                
                if (posY < window.innerHeight && confetti.style.opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            };
            
            animate();
        }
    }
    
    // Agregar efecto de brillo a elemento
    addGlowEffect(element, color = 'rgba(163, 177, 138, 0.6)') {
        element.style.boxShadow = `0 0 20px ${color}`;
        element.style.transition = 'box-shadow 0.3s ease';
        
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 2000);
    }
    
    // Shake effect para errores
    shakeElement(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
        
        // Agregar keyframes si no existen
        if (!document.querySelector('#shake-keyframes')) {
            const style = document.createElement('style');
            style.id = 'shake-keyframes';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Destruir efectos (para cleanup)
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.canvas) {
            this.canvas.remove();
        }
        
        this.isInitialized = false;
    }
}

// Crear instancia global
window.visualEffects = new VisualEffects();

// Funciones de conveniencia
window.createConfetti = (x, y) => window.visualEffects.createConfetti(x, y);
window.addGlow = (element, color) => window.visualEffects.addGlowEffect(element, color);
window.shakeElement = (element) => window.visualEffects.shakeElement(element);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clases de efectos a elementos existentes
    setTimeout(() => {
        // Floating animation para logos
        document.querySelectorAll('img[alt*="logo"], .logo').forEach(logo => {
            logo.classList.add('floating-animation');
        });
        
        // Shimmer effect para botones principales
        document.querySelectorAll('.btn-view, .btn-primary').forEach(btn => {
            btn.classList.add('shimmer-effect');
        });
        
        // Pulse glow para elementos destacados
        document.querySelectorAll('.badge-new, .badge-featured').forEach(badge => {
            badge.classList.add('pulse-glow');
        });
    }, 1000);
});

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisualEffects;
}