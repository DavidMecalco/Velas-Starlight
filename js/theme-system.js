/**
 * Sistema de Temas Premium
 * Modo claro/oscuro y temas personalizados para Velas Starlight
 */

class ThemeSystem {
    constructor() {
        this.currentTheme = 'light';
        this.themes = {
            light: {
                name: 'Claro',
                colors: {
                    primary: '#1a1a1a',
                    secondary: '#2D3E33',
                    accent: '#A3B18A',
                    gold: '#D4AF37',
                    cream: '#FEFEFE',
                    warm: '#F8F6F3',
                    background: '#FEFEFE',
                    surface: '#FFFFFF',
                    text: '#1a1a1a',
                    textSecondary: '#6B7280',
                    border: '#E5E7EB'
                }
            },
            dark: {
                name: 'Oscuro',
                colors: {
                    primary: '#FEFEFE',
                    secondary: '#A3B18A',
                    accent: '#D4AF37',
                    gold: '#F4D03F',
                    cream: '#1a1a1a',
                    warm: '#2D2D2D',
                    background: '#0F0F0F',
                    surface: '#1a1a1a',
                    text: '#FEFEFE',
                    textSecondary: '#B0B0B0',
                    border: '#333333'
                }
            },
            sepia: {
                name: 'Sepia',
                colors: {
                    primary: '#3C2E26',
                    secondary: '#5D4E37',
                    accent: '#8B7355',
                    gold: '#CD853F',
                    cream: '#F5E6D3',
                    warm: '#F0E68C',
                    background: '#FDF5E6',
                    surface: '#FAF0E6',
                    text: '#3C2E26',
                    textSecondary: '#8B7355',
                    border: '#D2B48C'
                }
            },
            midnight: {
                name: 'Medianoche',
                colors: {
                    primary: '#E8E8E8',
                    secondary: '#4A90E2',
                    accent: '#7B68EE',
                    gold: '#FFD700',
                    cream: '#0D1117',
                    warm: '#161B22',
                    background: '#010409',
                    surface: '#0D1117',
                    text: '#E8E8E8',
                    textSecondary: '#8B949E',
                    border: '#30363D'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        // this.createThemeToggle(); // Deshabilitado por preferencia del usuario
        this.setupSystemThemeDetection();
        this.applyTheme(this.currentTheme);
        
        console.log('🎨 Sistema de temas inicializado (sin control visual)');
    }
    
    // ===== GESTIÓN DE TEMAS =====
    
    applyTheme(themeName) {
        if (!this.themes[themeName]) {
            console.warn(`Tema no encontrado: ${themeName}`);
            return;
        }
        
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        // Aplicar variables CSS
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
        
        // Actualizar clases del body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);
        
        // Actualizar meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = theme.colors.secondary;
        }
        
        this.currentTheme = themeName;
        this.saveTheme();
        // this.updateThemeToggle(); // Deshabilitado - no hay control visual
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: themeName, colors: theme.colors }
        }));
        
        console.log(`🎨 Tema aplicado: ${theme.name}`);
    }
    
    // ===== TOGGLE DE TEMA =====
    
    createThemeToggle() {
        // Función deshabilitada - no se crea el control de temas
        console.log('Control de temas deshabilitado por preferencia del usuario');
        return;
        
        themeToggle.innerHTML = `
            <div class="theme-toggle-content">
                <!-- Botón principal -->
                <button class="theme-toggle-btn" id="theme-toggle-btn" title="Cambiar tema">
                    <i class="fas fa-palette" id="theme-icon"></i>
                </button>
                
                <!-- Panel de temas -->
                <div class="theme-panel" id="theme-panel">
                    <div class="theme-panel-header">
                        <h4>Seleccionar Tema</h4>
                        <button class="theme-panel-close" id="theme-panel-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="theme-panel-body">
                        <div class="theme-options" id="theme-options">
                            ${Object.entries(this.themes).map(([key, theme]) => `
                                <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                                        data-theme="${key}">
                                    <div class="theme-preview">
                                        <div class="theme-color" style="background: ${theme.colors.background}"></div>
                                        <div class="theme-color" style="background: ${theme.colors.secondary}"></div>
                                        <div class="theme-color" style="background: ${theme.colors.accent}"></div>
                                        <div class="theme-color" style="background: ${theme.colors.gold}"></div>
                                    </div>
                                    <span class="theme-name">${theme.name}</span>
                                </button>
                            `).join('')}
                        </div>
                        
                        <!-- Configuraciones adicionales -->
                        <div class="theme-settings">
                            <div class="theme-setting">
                                <label class="theme-switch">
                                    <input type="checkbox" id="auto-theme-toggle">
                                    <span class="theme-slider"></span>
                                </label>
                                <span class="theme-label">Seguir sistema</span>
                            </div>
                            
                            <div class="theme-setting">
                                <label class="theme-switch">
                                    <input type="checkbox" id="reduce-motion-toggle">
                                    <span class="theme-slider"></span>
                                </label>
                                <span class="theme-label">Reducir animaciones</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.addThemeStyles();
        document.body.appendChild(themeToggle);
        this.setupThemeEventListeners();
    }
    
    addThemeStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .theme-toggle-container {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                z-index: 9999;
                font-family: 'Inter', system-ui, sans-serif;
            }
            
            .theme-toggle-btn {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 50%;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                border: none;
                color: white;
                font-size: 1.25rem;
                cursor: pointer;
                box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.1);
            }
            
            .theme-toggle-btn:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 12px 40px rgba(212, 175, 55, 0.4);
                background: linear-gradient(135deg, #B8860B, #D4AF37);
            }
            
            .theme-panel {
                position: absolute;
                bottom: 4.5rem;
                right: 0;
                width: 300px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 1rem;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.9);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .theme-panel.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }
            
            .theme-panel-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.25rem 1.5rem 0.75rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .theme-panel-header h4 {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--color-text, #2D3E33);
            }
            
            .theme-panel-close {
                background: none;
                border: none;
                color: var(--color-textSecondary, #6B7280);
                font-size: 1rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: all 0.2s ease;
            }
            
            .theme-panel-close:hover {
                color: var(--color-text, #2D3E33);
                background: rgba(0, 0, 0, 0.05);
            }
            
            .theme-panel-body {
                padding: 1.5rem;
            }
            
            .theme-options {
                display: grid;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }
            
            .theme-option {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                background: transparent;
                border: 2px solid rgba(0, 0, 0, 0.1);
                border-radius: 0.75rem;
                cursor: pointer;
                transition: all 0.2s ease;
                width: 100%;
            }
            
            .theme-option:hover {
                border-color: var(--color-accent, #A3B18A);
                background: rgba(163, 177, 138, 0.05);
            }
            
            .theme-option.active {
                border-color: var(--color-accent, #A3B18A);
                background: rgba(163, 177, 138, 0.1);
                box-shadow: 0 4px 12px rgba(163, 177, 138, 0.2);
            }
            
            .theme-preview {
                display: flex;
                gap: 0.25rem;
            }
            
            .theme-color {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .theme-name {
                font-size: 0.9rem;
                font-weight: 500;
                color: var(--color-text, #374151);
            }
            
            .theme-settings {
                border-top: 1px solid rgba(0, 0, 0, 0.1);
                padding-top: 1rem;
            }
            
            .theme-setting {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.75rem;
            }
            
            .theme-setting:last-child {
                margin-bottom: 0;
            }
            
            .theme-switch {
                position: relative;
                display: inline-block;
                width: 2.5rem;
                height: 1.25rem;
            }
            
            .theme-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .theme-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #D1D5DB;
                transition: 0.3s;
                border-radius: 1.25rem;
            }
            
            .theme-slider:before {
                position: absolute;
                content: "";
                height: 1rem;
                width: 1rem;
                left: 0.125rem;
                bottom: 0.125rem;
                background-color: white;
                transition: 0.3s;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            
            input:checked + .theme-slider {
                background: linear-gradient(135deg, #D4AF37, #B8860B);
            }
            
            input:checked + .theme-slider:before {
                transform: translateX(1.25rem);
            }
            
            .theme-label {
                font-size: 0.9rem;
                color: var(--color-text, #374151);
                font-weight: 500;
            }
            
            /* Temas específicos */
            .theme-dark {
                --color-primary: #FEFEFE;
                --color-secondary: #A3B18A;
                --color-accent: #D4AF37;
                --color-gold: #F4D03F;
                --color-cream: #1a1a1a;
                --color-warm: #2D2D2D;
                --color-background: #0F0F0F;
                --color-surface: #1a1a1a;
                --color-text: #FEFEFE;
                --color-textSecondary: #B0B0B0;
                --color-border: #333333;
            }
            
            .theme-dark .theme-panel {
                background: rgba(26, 26, 26, 0.95);
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .theme-sepia {
                --color-primary: #3C2E26;
                --color-secondary: #5D4E37;
                --color-accent: #8B7355;
                --color-gold: #CD853F;
                --color-cream: #F5E6D3;
                --color-warm: #F0E68C;
                --color-background: #FDF5E6;
                --color-surface: #FAF0E6;
                --color-text: #3C2E26;
                --color-textSecondary: #8B7355;
                --color-border: #D2B48C;
            }
            
            .theme-midnight {
                --color-primary: #E8E8E8;
                --color-secondary: #4A90E2;
                --color-accent: #7B68EE;
                --color-gold: #FFD700;
                --color-cream: #0D1117;
                --color-warm: #161B22;
                --color-background: #010409;
                --color-surface: #0D1117;
                --color-text: #E8E8E8;
                --color-textSecondary: #8B949E;
                --color-border: #30363D;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .theme-toggle-container {
                    bottom: 6rem;
                    right: 1rem;
                }
                
                .theme-panel {
                    width: 280px;
                    right: -1rem;
                }
                
                .theme-toggle-btn {
                    width: 3rem;
                    height: 3rem;
                    font-size: 1.1rem;
                }
            }
            
            /* Animaciones reducidas */
            @media (prefers-reduced-motion: reduce) {
                .theme-toggle-btn,
                .theme-panel,
                .theme-option {
                    transition: none;
                }
            }
            
            .reduce-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    setupThemeEventListeners() {
        const toggleBtn = document.getElementById('theme-toggle-btn');
        const panel = document.getElementById('theme-panel');
        const closeBtn = document.getElementById('theme-panel-close');
        const options = document.querySelectorAll('.theme-option');
        const autoToggle = document.getElementById('auto-theme-toggle');
        const motionToggle = document.getElementById('reduce-motion-toggle');
        
        // Toggle panel
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('visible');
        });
        
        // Cerrar panel
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('visible');
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-toggle-container')) {
                panel.classList.remove('visible');
            }
        });
        
        // Seleccionar tema
        options.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);
                
                // Actualizar UI
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Efecto de confetti
                if (window.visualEffects) {
                    const rect = option.getBoundingClientRect();
                    window.visualEffects.createConfetti(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                    );
                }
            });
        });
        
        // Auto theme
        autoToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableSystemTheme();
            } else {
                this.disableSystemTheme();
            }
        });
        
        // Reduce motion
        motionToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
            localStorage.setItem('reduceMotion', e.target.checked);
        });
        
        // Cargar configuraciones
        this.loadSettings();
    }
    
    // ===== DETECCIÓN DEL SISTEMA =====
    
    setupSystemThemeDetection() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            this.handleSystemThemeChange = (e) => {
                if (this.followSystem) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            };
            
            mediaQuery.addListener(this.handleSystemThemeChange);
        }
    }
    
    enableSystemTheme() {
        this.followSystem = true;
        localStorage.setItem('followSystem', 'true');
        
        // Aplicar tema del sistema inmediatamente
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.applyTheme('dark');
        } else {
            this.applyTheme('light');
        }
    }
    
    disableSystemTheme() {
        this.followSystem = false;
        localStorage.setItem('followSystem', 'false');
    }
    
    // ===== PERSISTENCIA =====
    
    saveTheme() {
        localStorage.setItem('selectedTheme', this.currentTheme);
    }
    
    loadSavedTheme() {
        const saved = localStorage.getItem('selectedTheme');
        const followSystem = localStorage.getItem('followSystem') === 'true';
        
        this.followSystem = followSystem;
        
        if (followSystem) {
            // Usar tema del sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
            } else {
                this.currentTheme = 'light';
            }
        } else if (saved && this.themes[saved]) {
            this.currentTheme = saved;
        }
    }
    
    loadSettings() {
        // Auto theme
        const autoToggle = document.getElementById('auto-theme-toggle');
        if (autoToggle) {
            autoToggle.checked = this.followSystem;
        }
        
        // Reduce motion
        const motionToggle = document.getElementById('reduce-motion-toggle');
        const reduceMotion = localStorage.getItem('reduceMotion') === 'true';
        if (motionToggle) {
            motionToggle.checked = reduceMotion;
        }
        if (reduceMotion) {
            document.body.classList.add('reduce-motion');
        }
    }
    
    updateThemeToggle() {
        // Función deshabilitada - no hay control visual de temas
        return;
    }
    
    // ===== MÉTODOS PÚBLICOS =====
    
    getTheme() {
        return this.currentTheme;
    }
    
    getThemeColors() {
        return this.themes[this.currentTheme].colors;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
    
    // Crear tema personalizado
    createCustomTheme(name, colors) {
        this.themes[name] = {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            colors: { ...this.themes.light.colors, ...colors }
        };
        
        console.log(`🎨 Tema personalizado creado: ${name}`);
    }
}

// Crear instancia global
window.themeSystem = new ThemeSystem();

// Funciones de conveniencia
window.toggleTheme = () => window.themeSystem.toggleTheme();
window.setTheme = (theme) => window.themeSystem.applyTheme(theme);

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSystem;
}