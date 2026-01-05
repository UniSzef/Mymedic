// ============================================
// NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCookieBanner();
    initPricingFilters();
});

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.nav-menu');
    let menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .nav-menu a[href*=".html"]');
    
    if (!hamburger || !menu) return;
    
    // Create overlay if it doesn't exist
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Hamburger toggle
    hamburger.addEventListener('click', toggleMenu);
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('aria-expanded', 'false');
    
    // ESC key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Desktop dropdowns - hover and focus
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const submenu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !submenu) return;
        
        // Set ARIA attributes
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        submenu.setAttribute('role', 'menu');
        submenu.querySelectorAll('a').forEach(link => {
            link.setAttribute('role', 'menuitem');
        });
        
        // Desktop: hover and focus
        if (window.innerWidth > 900) {
            dropdown.addEventListener('mouseenter', () => {
                openDropdown(dropdown);
            });
            
            dropdown.addEventListener('mouseleave', () => {
                closeDropdown(dropdown);
            });
            
            trigger.addEventListener('focus', () => {
                openDropdown(dropdown);
            });
            
            dropdown.addEventListener('focusout', (e) => {
                if (!dropdown.contains(e.relatedTarget)) {
                    closeDropdown(dropdown);
                }
            });
        }
        
        // Mobile: click to toggle
        if (window.innerWidth <= 900) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDropdown(dropdown);
            });
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 900) {
                closeMenu();
                dropdowns.forEach(dropdown => closeDropdown(dropdown));
            }
        }, 250);
    });
    
    // Close menu when clicking nav links (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });
    
    function toggleMenu() {
        const isActive = menu.classList.contains('active');
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function openMenu() {
        menu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
        // Close all dropdowns
        dropdowns.forEach(dropdown => closeDropdown(dropdown));
    }
    
    function toggleDropdown(dropdown) {
        const isOpen = dropdown.classList.contains('open');
        const trigger = dropdown.querySelector('a');
        
        if (isOpen) {
            closeDropdown(dropdown);
        } else {
            // Close other dropdowns first
            dropdowns.forEach(d => {
                if (d !== dropdown) closeDropdown(d);
            });
            openDropdown(dropdown);
        }
    }
    
    function openDropdown(dropdown) {
        dropdown.classList.add('open');
        const trigger = dropdown.querySelector('a');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'true');
        }
    }
    
    function closeDropdown(dropdown) {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('a');
        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        }
    }
}

// ============================================
// COOKIE BANNER
// ============================================

function initCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;
    
    // Check if user already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (cookieChoice) {
        banner.classList.remove('active');
        return;
    }
    
    // Show banner after a short delay
    setTimeout(() => {
        banner.classList.add('active');
    }, 1000);
    
    // Accept button
    const acceptBtn = banner.querySelector('.btn-accept');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookiePreferences', JSON.stringify({
                necessary: true,
                analytics: true,
                marketing: true
            }));
            banner.classList.remove('active');
        });
    }
    
    // Reject button
    const rejectBtn = banner.querySelector('.btn-reject');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            localStorage.setItem('cookiePreferences', JSON.stringify({
                necessary: true,
                analytics: false,
                marketing: false
            }));
            banner.classList.remove('active');
        });
    }
    
    // Customize button
    const customizeBtn = banner.querySelector('.btn-customize');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', () => {
            openCookieModal();
        });
    }
    
    // Cookie modal
    const modal = document.querySelector('.cookie-modal');
    if (modal) {
        const saveBtn = modal.querySelector('.btn-save');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                saveCookiePreferences();
            });
        }
        
        const cancelBtn = modal.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                closeCookieModal();
            });
        }
        
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCookieModal();
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeCookieModal();
            }
        });
    }
}

function openCookieModal() {
    const modal = document.querySelector('.cookie-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCookieModal() {
    const modal = document.querySelector('.cookie-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function saveCookiePreferences() {
    const modal = document.querySelector('.cookie-modal');
    if (!modal) return;
    
    const preferences = {
        necessary: true, // Always true
        analytics: document.getElementById('cookie-analytics')?.checked || false,
        marketing: document.getElementById('cookie-marketing')?.checked || false
    };
    
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.classList.remove('active');
    }
    
    closeCookieModal();
}

// ============================================
// PRICING FILTERS
// ============================================

function initPricingFilters() {
    const filterButtons = document.querySelectorAll('.pricing-filters button');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (filterButtons.length === 0 || pricingCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category || 'all';
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter cards
            pricingCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

