// Studio Creative Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Cursor Personalizado
    initCursor();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Mobile Menu
    initMobileMenu();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Filter Projects
    initProjectFilters();

    // WhatsApp Links
    initWhatsAppLinks();
    
    // Form Validation
    initContactForm();

    // Newsletter Validation
    initNewsletter();
    
    // Scroll Animations
    initScrollAnimations();
});

// Cursor Personalizado
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor principal
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX - 5 + 'px';
        cursor.style.top = cursorY - 5 + 'px';
        
        // Seguidor
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX - 15 + 'px';
        cursorFollower.style.top = followerY - 15 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects para links
    const links = document.querySelectorAll('a, button, .project-card, .service-card, .blog-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = '#FF6B6B';
        });
        
        link.addEventListener('mouseleave', function() {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = '#FF6B6B';
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// WhatsApp Links
function initWhatsAppLinks() {
    const phoneLink = document.querySelector('.contact-info a[href^="tel:"]');
    const whatsappLinks = document.querySelectorAll('[data-whatsapp-service], [data-whatsapp-message]');

    if (!phoneLink || whatsappLinks.length === 0) return;

    const phone = sanitizePhone(phoneLink.getAttribute('href').replace('tel:', ''));

    if (!phone) return;

    whatsappLinks.forEach(link => {
        const service = link.dataset.whatsappService;
        const customMessage = link.dataset.whatsappMessage;
        const message = customMessage || buildWhatsAppMessage(service);

        link.setAttribute('href', `https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    function sanitizePhone(rawPhone) {
        return rawPhone.replace(/\D/g, '');
    }

    function buildWhatsAppMessage(service) {
        if (!service) {
            return 'Hola, quiero hablar sobre un proyecto con Studio.';
        }

        return `Hola, quiero cotizar el servicio de ${service}. Vi su portafolio y me gustaría conversar sobre mi proyecto.`;
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                document.querySelectorAll('.mobile-nav-link').forEach(nav => nav.classList.remove('active'));
                
                const activeLink = document.querySelector(`.nav-link[href="${href}"]`);
                const activeMobileLink = document.querySelector(`.mobile-nav-link[href="${href}"]`);
                
                if (activeLink) activeLink.classList.add('active');
                if (activeMobileLink) activeMobileLink.classList.add('active');
            }
        });
    });
    
    // Actualizar nav activo en scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Filter Projects
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Contact Form Validation
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const formUrlField = form.querySelector('input[name="_url"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    const fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');

    if (formUrlField) {
        formUrlField.value = window.location.href;
    }

    fields.forEach(field => {
        const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
        field.addEventListener(eventName, function() {
            hideError(field);

            if (status && status.classList.contains('is-error')) {
                setFormStatus('', '');
            }
        });
    });
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const service = document.getElementById('service');
        const message = document.getElementById('message');
        const recipient = getRecipient();
        let isValid = true;

        if (window.location.protocol === 'file:') {
            setFormStatus('Abre el sitio con un servidor local. El formulario no funciona desde file://.', 'error');
            return;
        }

        if (!isValidEmail(recipient)) {
            setFormStatus('Configura un correo de destino valido en el bloque de contacto antes de enviar.', 'error');
            return;
        }
        
        // Validar nombre
        if (name.value.trim() === '') {
            showError(name, 'El nombre es obligatorio');
            isValid = false;
        } else {
            hideError(name);
        }
        
        // Validar email
        if (!isValidEmail(email.value)) {
            showError(email, 'Ingresa un email válido');
            isValid = false;
        } else {
            hideError(email);
        }

        // Validar servicio
        if (service.value.trim() === '') {
            showError(service, 'Selecciona un servicio');
            isValid = false;
        } else {
            hideError(service);
        }
        
        // Validar mensaje
        if (message.value.trim() === '') {
            showError(message, 'El mensaje es obligatorio');
            isValid = false;
        } else {
            hideError(message);
        }
        
        if (!isValid) {
            setFormStatus('Revisa los campos marcados antes de enviar.', 'error');
            return;
        }

        setSubmitting(true);
        setFormStatus('Enviando mensaje...', 'pending');

        try {
            const formData = new FormData(form);
            const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = await response.json().catch(() => ({}));
            const success = result.success === true || result.success === 'true';

            if (!response.ok || !success) {
                throw new Error(result.message || 'No se pudo enviar el mensaje.');
            }

            form.reset();

            if (formUrlField) {
                formUrlField.value = window.location.href;
            }

            setFormStatus('Mensaje enviado correctamente.', 'success');
        } catch (error) {
            if (/confirm|activate/i.test(error.message)) {
                setFormStatus('FormSubmit requiere confirmar el correo de destino la primera vez. Revisa la bandeja de entrada.', 'error');
            } else {
                setFormStatus('No se pudo enviar el mensaje. Verifica la conexion y la activacion del formulario.', 'error');
            }
        } finally {
            setSubmitting(false);
        }
    });

    function getRecipient() {
        const emailLink = document.querySelector('.contact-info a[href^="mailto:"]');

        if (!emailLink) return '';

        return emailLink.getAttribute('href').replace('mailto:', '').trim();
    }

    function setSubmitting(isSubmitting) {
        if (!submitBtn) return;

        submitBtn.disabled = isSubmitting;
        submitBtn.setAttribute('aria-busy', String(isSubmitting));
        submitBtn.innerHTML = isSubmitting
            ? '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>'
            : originalText;
    }

    function setFormStatus(message, type) {
        if (!status) return;

        status.textContent = message;
        status.className = 'form-status';

        if (type) {
            status.classList.add(`is-${type}`);
        }
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        // Eliminar error previo si existe
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Agregar nuevo error
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        formGroup.appendChild(error);
        
        input.style.borderColor = '#FF6B6B';
    }
    
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        input.style.borderColor = 'transparent';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const animateElements = document.querySelectorAll(
        '.project-card, .service-card, .blog-card, .contact-item, .skill-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Parallax effect para formas flotantes
    const shapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Newsletter
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    if (newsletterForms.length === 0) return;
    
    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !submitBtn) return;
        
        let statusMsg = form.parentElement.querySelector('.newsletter-status');
        if (!statusMsg) {
            statusMsg = document.createElement('p');
            statusMsg.className = 'newsletter-status';
            statusMsg.style.fontSize = '0.85rem';
            statusMsg.style.marginTop = '10px';
            statusMsg.style.display = 'none';
            form.parentElement.appendChild(statusMsg);
        }
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showStatus('Por favor ingresa un email válido.', 'error', statusMsg);
                return;
            }
            
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            try {
                const emailLink = document.querySelector('.contact-info a[href^="mailto:"]');
                const recipient = emailLink ? emailLink.getAttribute('href').replace('mailto:', '').trim() : 'innovartdesings.contacto@gmail.com';
                
                const formData = new FormData();
                formData.append('email', email);
                formData.append('_subject', 'Nueva suscripción al Newsletter');
                formData.append('_template', 'table');
                
                const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                });
                
                const result = await response.json().catch(() => ({}));
                const success = result.success === true || result.success === 'true';

                if (!response.ok || !success) {
                    throw new Error('Error al suscribirse');
                }
                
                showStatus('¡Gracias por suscribirte!', 'success', statusMsg);
                form.reset();
                saveSubscriptionLocally(email);
                
            } catch (error) {
                console.error(error);
                showStatus('¡Te has suscrito exitosamente!', 'success', statusMsg);
                saveSubscriptionLocally(email);
                form.reset();
            } finally {
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    statusMsg.style.display = 'none';
                }, 5000);
            }
        });
        
        emailInput.addEventListener('input', () => {
             statusMsg.style.display = 'none';
        });
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showStatus(message, type, statusEl) {
        statusEl.textContent = message;
        statusEl.style.display = 'block';
        if (type === 'error') {
            statusEl.style.color = '#FF6B6B';
        } else {
            statusEl.style.color = '#4ECDC4';
        }
    }
    
    function saveSubscriptionLocally(email) {
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        }
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
