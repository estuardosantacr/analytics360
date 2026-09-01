import { animate, inView, stagger } from "motion"
import { createIcons, icons } from "lucide"

document.addEventListener('DOMContentLoaded', () => {
    // ── Lucide Icons (bundled localmente, no CDN) ──
    createIcons({ icons });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Mobile Menu ──
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', String(!isOpen));

            if (!isOpen && !prefersReducedMotion) {
                animate(
                    mobileMenu.querySelectorAll('li'),
                    { opacity: [0, 1], transform: ['translateY(8px)', 'translateY(0)'] },
                    { delay: stagger(0.05), duration: 0.3 }
                );
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ── Scroll Reveal Animations (Enhanced) ──
    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    } else {
        document.querySelectorAll('.reveal').forEach(el => {
            inView(el, () => {
                el.classList.add('active');

                // Stagger-animate grid children with enhanced easing
                const grid = el.querySelector('.grid');
                if (grid && grid.children.length > 1) {
                    animate(
                        grid.children,
                        { opacity: [0, 1], transform: ['translateY(30px) scale(0.95)', 'translateY(0) scale(1)'] },
                        { delay: stagger(0.1), duration: 0.7, easing: [0.22, 1, 0.36, 1] }
                    );
                }

                // Animate section headers with a subtle slide
                const sectionTitle = el.querySelector('h3, h2');
                if (sectionTitle && !grid) {
                    animate(
                        sectionTitle,
                        { opacity: [0, 1], transform: ['translateY(15px)', 'translateY(0)'] },
                        { duration: 0.8, easing: [0.22, 1, 0.36, 1] }
                    );
                }
            }, { amount: 0.15 });
        });
    }

    // ── Hero Counter Animation (all counters on page) ──
    document.querySelectorAll('.hero-counter').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if (!target) return;

        inView(el, () => {
            const duration = 2000;
            const start = performance.now();
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }, { amount: 0.5 });
    });

    // ── Service Cards: Animated icon entrance ──
    if (!prefersReducedMotion) {
        document.querySelectorAll('.service-card').forEach(card => {
            inView(card, () => {
                const icon = card.querySelector('.icon-hover-rotate');
                if (icon) {
                    animate(icon,
                        { transform: ['scale(0) rotate(-90deg)', 'scale(1) rotate(0deg)'] },
                        { duration: 0.6, easing: [0.22, 1, 0.36, 1] }
                    );
                }
            }, { amount: 0.3 });
        });
    }

    // ── Testimonial Cards: Staggered slide-in ──
    if (!prefersReducedMotion) {
        const testimonialGrid = document.querySelector('[data-testimonials]');
        if (testimonialGrid) {
            inView(testimonialGrid, () => {
                const cards = testimonialGrid.children;
                animate(
                    cards,
                    { opacity: [0, 1], transform: ['translateX(-40px) scale(0.95)', 'translateX(0) scale(1)'] },
                    { delay: stagger(0.15), duration: 0.8, easing: [0.22, 1, 0.36, 1] }
                );
            }, { amount: 0.1 });
        }
    }

    // ── CTA Steps: Sequential entrance ──
    if (!prefersReducedMotion) {
        const stepsGrid = document.querySelector('[data-steps]');
        if (stepsGrid) {
            inView(stepsGrid, () => {
                const steps = stepsGrid.children;
                animate(
                    steps,
                    { opacity: [0, 1], transform: ['translateY(40px) scale(0.9)', 'translateY(0) scale(1)'] },
                    { delay: stagger(0.2), duration: 0.8, easing: [0.22, 1, 0.36, 1] }
                );
                // Animate step numbers after cards appear
                setTimeout(() => {
                    stepsGrid.querySelectorAll('.step-number').forEach((num, i) => {
                        setTimeout(() => {
                            num.classList.add('animate');
                            animate(num,
                                { transform: ['scale(0.5)', 'scale(1.15)', 'scale(1)'] },
                                { duration: 0.5, easing: 'ease-out' }
                            );
                        }, i * 200);
                    });
                }, 600);
            }, { amount: 0.2 });
        }
    }

    // ── Value Proposition Cards: Count-up numbers ──
    if (!prefersReducedMotion) {
        document.querySelectorAll('[data-count-target]').forEach(el => {
            inView(el, () => {
                const target = parseInt(el.getAttribute('data-count-target'));
                const suffix = el.getAttribute('data-count-suffix') || '';
                const duration = 1500;
                const start = performance.now();
                const step = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }, { amount: 0.5 });
        });
    }

    // ── Parallax effect on hero background elements ──
    if (!prefersReducedMotion) {
        const parallaxSlow = document.querySelectorAll('.parallax-slow');
        const parallaxFast = document.querySelectorAll('.parallax-fast');

        if (parallaxSlow.length || parallaxFast.length) {
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const y = window.scrollY;
                        parallaxSlow.forEach(el => {
                            el.style.transform = `translateY(${y * 0.15}px)`;
                        });
                        parallaxFast.forEach(el => {
                            el.style.transform = `translateY(${y * 0.3}px)`;
                        });
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    // ── Navbar: Hide on scroll down, show on scroll up ──
    const navbar = document.querySelector('nav');
    if (navbar && !prefersReducedMotion) {
        let lastY = 0;
        let ticking = false;
        let isHidden = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;

                    if (y > 300 && y > lastY + 5 && !isHidden) {
                        animate(navbar, { transform: 'translateY(-100%)' }, { duration: 0.3, easing: 'ease-in' });
                        isHidden = true;
                    } else if ((y < lastY - 5 || y <= 100) && isHidden) {
                        animate(navbar, { transform: 'translateY(0)' }, { duration: 0.25, easing: 'ease-out' });
                        isHidden = false;
                    }

                    lastY = y;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

});
