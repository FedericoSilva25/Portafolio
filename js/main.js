// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skills Animation
const skillBars = document.querySelectorAll('.progress-bar');
const skillsSection = document.querySelector('.skills');

if (skillsSection) {
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.dataset.width || bar.style.width; // Captura el ancho definido
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(skillsSection);
}

// Scroll Animations
const scrollElements = document.querySelectorAll('.js-scroll');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = element => element.classList.add('scrolled');
const hideScrollElement = element => element.classList.remove('scrolled');

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // Ejecutar en carga inicial

// Contact Form Submission using EmailJS
document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("ms_wB11dR7LoYDevD"); // Reemplaza con tu Public Key

    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const nombre = contactForm.querySelector("input[placeholder='Nombre']").value.trim();
            const email = contactForm.querySelector("input[placeholder='Email']").value.trim();
            const mensaje = contactForm.querySelector("textarea[placeholder='Mensaje']").value.trim();
            const botonEnviar = contactForm.querySelector(".btn-primary");

            if (nombre === "" || email === "" || mensaje === "") {
                alert("⚠️ Por favor completa todos los campos.");
                return;
            }

            // Deshabilitar el botón para evitar múltiples envíos
            botonEnviar.textContent = "Enviando...";
            botonEnviar.disabled = true;

            emailjs.send("service_dmc49ia", "template_u1kucud", { nombre, email, mensaje }, "ms_wB11dR7LoYDevD")
                .then(function(response) {
                    if (response.status === 200) { // Solo si la respuesta es correcta
                        alert("✅ Mensaje enviado con éxito!");
                        contactForm.reset();
                    } else {
                        alert("⚠️ El mensaje se envió, pero hubo un problema con el servidor.");
                    }
                })
                .catch(function(error) {
                    console.error("EmailJS Error:", error);
                    alert("❌ Error al enviar el mensaje. Inténtalo nuevamente.");
                })
                .finally(() => {
                    botonEnviar.textContent = "Enviar Mensaje";
                    botonEnviar.disabled = false;
                });
        });
    }
});