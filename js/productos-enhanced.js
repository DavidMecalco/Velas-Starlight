// Mejoras de interactividad para productos.html

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Inicializando mejoras visuales para productos...');

    // ========================================
    // ANIMACIONES DE ENTRADA
    // ========================================
    
    // Función para animar números (contador)
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Animar estadísticas cuando sean visibles
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsSection = entry.target;
                
                // Animar números de estadísticas
                setTimeout(() => {
                    const productsEl = document.getElementById('stats-products');
                    const fragrancesEl = document.getElementById('stats-fragrances');
                    const typesEl = document.getElementById('stats-types');
                    
                    if (productsEl && window.productosData) {
                        animateNumber(productsEl, window.productosData.length);
                    }
                    
                    if (fragrancesEl && window.productosData) {
                        // Contar fragancias únicas de todos los productos
                        const allFragrances = new Set();
                        window.productosData.forEach(product => {
                            if (product.fragrances && Array.isArray(product.fragrances)) {
                                product.fragrances.forEach(fragrance => allFragrances.add(fragrance));
                            }
                        });
                        animateNumber(fragrancesEl, allFragrances.size);
                    }
                    
                    if (typesEl && window.productosData) {
                        // Contar tipos únicos de todos los productos
                        const allTypes = new Set();
                        window.productosData.forEach(product => {
                            if (product.types && Array.isArray(product.types)) {
                                product.types.forEach(type => allTypes.add(type));
                            }
                        });
                        animateNumber(typesEl, allTypes.size);
                    }
                }, 500);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar sección de estadísticas
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ========================================
    // EFECTOS DE HOVER MEJORADOS
    // ========================================
    
    // Efecto de inclinación para tarjetas de productos
    function addTiltEffect() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
            });
        });
    }

    // ========================================
    // EFECTOS DE BÚSQUEDA MEJORADOS
    // ========================================
    
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    
    if (searchInput) {
        // Efecto de escritura
        searchInput.addEventListener('input', function() {
            const value = this.value;
            
            if (value.length > 0) {
                clearButton?.classList.remove('hidden');
                this.style.transform = 'translateY(-2px)';
            } else {
                clearButton?.classList.add('hidden');
                this.style.transform = 'translateY(0)';
            }
            
            // Efecto de ondas en el input
            this.style.boxShadow = '0 0 0 4px rgba(58, 90, 64, 0.1), 0 10px 15px -3px rgba(45, 62, 51, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(45, 62, 51, 0.1)';
        });
    }

    // ========================================
    // ANIMACIONES DE FILTROS
    // ========================================
    
    function animateFilterChange() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        
        // Añadir clase de animación
        productGrid.style.opacity = '0.7';
        productGrid.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            productGrid.style.opacity = '1';
            productGrid.style.transform = 'scale(1)';
            
            // Re-aplicar efectos de hover
            addTiltEffect();
        }, 300);
    }

    // Interceptar cambios de filtro
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Efecto de ondas en el botón
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Animar cambio de filtro
            setTimeout(animateFilterChange, 100);
        });
    });

    // ========================================
    // EFECTOS DE SCROLL
    // ========================================
    
    // Parallax sutil para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.gradient-bg');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Efecto de fade para elementos
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-slide-up');
            }
        });
    });

    // ========================================
    // EFECTOS DE CARGA
    // ========================================
    
    // Skeleton loading para productos
    function showSkeletonLoading() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        
        productGrid.innerHTML = '';
        
        for (let i = 0; i < 8; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'product-card';
            skeleton.innerHTML = `
                <div class="loading-skeleton aspect-square mb-4"></div>
                <div class="p-6">
                    <div class="loading-skeleton h-6 mb-4"></div>
                    <div class="loading-skeleton h-4 mb-2"></div>
                    <div class="loading-skeleton h-4 w-3/4 mb-4"></div>
                    <div class="loading-skeleton h-10"></div>
                </div>
            `;
            productGrid.appendChild(skeleton);
        }
    }

    // ========================================
    // MEJORAS DE ACCESIBILIDAD
    // ========================================
    
    // Navegación por teclado mejorada
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Limpiar búsqueda con Escape
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
        
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            // Enfocar búsqueda con "/"
            e.preventDefault();
            searchInput?.focus();
        }
    });

    // ========================================
    // EFECTOS ADICIONALES
    // ========================================
    
    // Efecto de partículas en el hero (sutil)
    function createFloatingParticles() {
        const hero = document.querySelector('.gradient-bg');
        if (!hero) return;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            hero.appendChild(particle);
        }
    }

    // Inicializar efectos
    setTimeout(() => {
        addTiltEffect();
        createFloatingParticles();
    }, 1000);

    // ========================================
    // CSS DINÁMICO PARA ANIMACIONES
    // ========================================
    
    // Añadir estilos de animación dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .product-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        #product-grid {
            transition: all 0.3s ease;
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-on-scroll.animate-slide-up {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✨ Mejoras visuales cargadas correctamente');
});

// ========================================
// UTILIDADES EXPORTADAS
// ========================================

window.productosEnhanced = {
    animateFilterChange: function() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        
        productGrid.style.opacity = '0.7';
        productGrid.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            productGrid.style.opacity = '1';
            productGrid.style.transform = 'scale(1)';
        }, 300);
    },
    
    showLoading: function() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        
        productGrid.innerHTML = '';
        
        for (let i = 0; i < 8; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'product-card';
            skeleton.innerHTML = `
                <div class="loading-skeleton aspect-square mb-4"></div>
                <div class="p-6">
                    <div class="loading-skeleton h-6 mb-4"></div>
                    <div class="loading-skeleton h-4 mb-2"></div>
                    <div class="loading-skeleton h-4 w-3/4 mb-4"></div>
                    <div class="loading-skeleton h-10"></div>
                </div>
            `;
            productGrid.appendChild(skeleton);
        }
    }
};