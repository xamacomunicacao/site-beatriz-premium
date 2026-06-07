// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initFAQ();
    initAnimations();
    initMobileMenu();
    initHeroVideoControl();
});

/**
 * Controle de Efeitos da Navbar ao Rolar a Página
 */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });
}

/**
 * Comportamento Dinâmico de Acordeão (FAQ)
 */
function initFAQ() {
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isOpen = item.classList.contains("active");
            
            // Fechar todos os outros accordions abertos
            document.querySelectorAll(".accordion-item").forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".accordion-content").style.maxHeight = null;
                }
            });
            
            // Alternar estado do item clicado
            if (isOpen) {
                item.classList.remove("active");
                content.style.maxHeight = null;
            } else {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

/**
 * Menu de Navegação Responsivo (Mobile Menu)
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");
            // Adicionar estilos inline temporários de toggle ou classe ativa no CSS
            const isOpened = navLinks.classList.contains("mobile-active");
            toggleBtn.innerHTML = isOpened 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
                
            if (isOpened) {
                gsap.to(navLinks, {
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: "100%",
                    left: "2rem",
                    right: "2rem",
                    backgroundColor: "rgba(42, 69, 58, 0.98)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "2rem",
                    gap: "1.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    opacity: 1,
                    y: 10,
                    duration: 0.3,
                    pointerEvents: "auto"
                });
            } else {
                gsap.to(navLinks, {
                    opacity: 0,
                    y: 0,
                    duration: 0.2,
                    onComplete: () => {
                        navLinks.removeAttribute("style");
                    }
                });
            }
        });
        
        // Fechar menu ao clicar em qualquer link
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks.classList.contains("mobile-active")) {
                    navLinks.classList.remove("mobile-active");
                    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                    gsap.to(navLinks, {
                        opacity: 0,
                        y: 0,
                        duration: 0.2,
                        onComplete: () => {
                            navLinks.removeAttribute("style");
                        }
                    });
                }
            });
        });
    }
}

/**
 * Efeitos de Animação de Entrada e Scroll com GSAP Premium
 */
function initAnimations() {
    // 1. Entrada Hero Section (Carregamento da Página)
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    heroTl.from(".navbar", {
        y: -20,
        opacity: 0,
        duration: 1.2
    })
    .from(".hero-tag", {
        opacity: 0,
        y: 10,
        duration: 1
    }, "-=0.6")
    .from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 1.2
    }, "-=0.8")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1
    }, "-=0.9")
    .from(".hero-actions .btn", {
        y: 15,
        opacity: 0,
        stagger: 0.2,
        duration: 1
    }, "-=0.8")
    .from(".hero-scroll-indicator", {
        opacity: 0,
        y: -10,
        duration: 0.8
    }, "-=0.4");

    // 2. Animação ScrollTrigger: Cards do Método Beatriz
    gsap.from(".pilar-card", {
        scrollTrigger: {
            trigger: ".metodo-section",
            start: "top 85%", // Dispara um pouco antes para suavidade
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform" // Remove as propriedades em linha ao final da animação para evitar resquícios fantasmas
    });

    // 3. Animação ScrollTrigger: Seção Sobre Mim
    const sobreTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sobre-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    sobreTl.from(".sobre-visual", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform"
    })
    .from(".sobre-content > *", {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform"
    }, "-=0.6");

    // 4. Animação ScrollTrigger: Cards de Diferenciais (Fundo Escuro)
    gsap.from(".dif-card", {
        scrollTrigger: {
            trigger: ".diferenciais-section",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "opacity,transform"
    });
}

/**
 * Controle de Play/Pause do Vídeo de Fundo (Acessibilidade e Camuflagem)
 */
function initHeroVideoControl() {
    const video = document.getElementById("heroVideo");
    const controlBtn = document.getElementById("heroVideoControl");

    if (video && controlBtn) {
        controlBtn.addEventListener("click", () => {
            if (video.paused) {
                video.play();
                controlBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                video.pause();
                controlBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        });
    }
}
