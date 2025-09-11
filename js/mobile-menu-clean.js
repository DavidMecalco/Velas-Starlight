/**
 * MENÚ MÓVIL LIMPIO - Velas Starlight
 * Solución definitiva sin conflictos - Versión Robusta
 */

(function() {
    'use strict';
    
    console.log('📱 Cargando menú móvil limpio...');
    
    function initMobileMenu() {
        // Buscar elementos con reintentos
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!menuToggle || !mobileMenu) {
            console.log('❌ Elementos del menú no encontrados, reintentando...');
            return false;
        }
        
        console.log('✅ Elementos del menú encontrados');
        
        // Limpiar event listeners previos
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Estado inicial: menú oculto
        mobileMenu.classList.add('hidden');
        
        // Función para mostrar el menú
        function showMenu() {
            console.log('📱 Mostrando menú');
            mobileMenu.classList.remove('hidden');
            
            // Cambiar icono a X
            const icon = newMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
        
        // Función para ocultar el menú
        function hideMenu() {
            console.log('📱 Ocultando menú');
            mobileMenu.classList.add('hidden');
            
            // Cambiar icono a hamburguesa
            const icon = newMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Toggle del menú
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('📱 Toggle menú clickeado');
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                showMenu();
            } else {
                hideMenu();
            }
        }
        
        // Event listener para el botón
        newMenuToggle.addEventListener('click', toggleMenu);
        console.log('📱 Event listener agregado al botón');
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!newMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                hideMenu();
            }
        });
        
        // Cerrar menú al hacer clic en enlaces
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', hideMenu);
        });
        
        // Cerrar menú al redimensionar (cuando se pasa a desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                hideMenu();
            }
        });
        
        console.log('✅ Menú móvil inicializado correctamente');
        return true;
    }
    
    // Función para reintentar inicialización
    function attemptInit() {
        if (initMobileMenu()) {
            return;
        }
        
        // Reintentar con delays progresivos
        const delays = [100, 300, 500, 1000];
        delays.forEach(delay => {
            setTimeout(() => {
                if (!document.getElementById('menu-toggle-initialized')) {
                    if (initMobileMenu()) {
                        // Marcar como inicializado
                        const marker = document.createElement('div');
                        marker.id = 'menu-toggle-initialized';
                        marker.style.display = 'none';
                        document.body.appendChild(marker);
                    }
                }
            }, delay);
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attemptInit);
    } else {
        attemptInit();
    }
    
    // También intentar después de que se cargue completamente
    window.addEventListener('load', attemptInit);
    
})();