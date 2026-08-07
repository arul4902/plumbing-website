document.addEventListener('DOMContentLoaded', () => {
    // Top Navigation Scrolled State
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '10px 0';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Mobile Menu Auto-close
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.style.display = 'none';
        });
    });

    // Active Navigation (ScrollSpy)
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Subtract offset to trigger earlier
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-accent');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('text-accent');
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Uncomment to animate only once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // FAQ Accordion
    const faqData = [
        { q: "Do you offer emergency plumbing services?", a: "Yes, we are available 24/7 for all plumbing emergencies, including burst pipes, overflowing toilets, and severe leaks." },
        { q: "Are your plumbers licensed and insured?", a: "Absolutely. All our technicians undergo rigorous training, background checks, and are fully licensed and insured for your peace of mind." },
        { q: "How much does a service call cost?", a: "We provide upfront, transparent pricing before any work begins. Our dispatch fee is credited toward your repair if you choose to proceed." },
        { q: "Do you offer financing?", a: "Yes! We offer flexible payment plans, including 0% interest options for complete system replacements." },
        { q: "What areas do you serve?", a: "We serve the greater Austin area, including Round Rock, Cedar Park, Pflugerville, Georgetown, and Lakeway." },
        { q: "How quickly can you arrive?", a: "For emergencies, we aim to arrive within 60 minutes. For standard calls, we offer same-day appointments subject to availability." },
        { q: "Do you warranty your work?", a: "Yes, we stand behind our workmanship with a 100% satisfaction guarantee and robust warranties on parts and labor." },
        { q: "Can you fix my tankless water heater?", a: "Yes, our technicians are certified in repairing and installing all major brands of tankless and traditional water heaters." },
        { q: "What forms of payment do you accept?", a: "We accept all major credit cards, cash, checks, and offer secure online payment options." },
        { q: "Do you offer commercial plumbing services?", a: "Yes, we service commercial properties, restaurants, apartment complexes, and office buildings." }
    ];

    const faqAccordion = document.querySelector('.faq-accordion');
    if (faqAccordion) {
        faqData.forEach((item, index) => {
            const faqHtml = `
                <div class="faq-item">
                    <div class="faq-question">
                        <span>${item.q}</span>
                        <i class="ph ph-caret-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>${item.a}</p>
                    </div>
                </div>
            `;
            faqAccordion.insertAdjacentHTML('beforeend', faqHtml);
        });

        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }

    // Counters
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const decimals = counter.getAttribute('data-decimals') ? true : false;
            let count = 0;
            const inc = target / 40;

            const updateCount = () => {
                if (count < target) {
                    count += inc;
                    if (count > target) count = target;
                    counter.innerText = decimals ? count.toFixed(1) : Math.floor(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                runCounters();
                counted = true;
            }
        });
    });

    const statsSection = document.querySelector('.statistics');
    if (statsSection) statObserver.observe(statsSection);

    // Floating Buttons visibility
    const backToTop = document.getElementById('backToTop');
    const floatCall = document.querySelector('.floating-call');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            if (backToTop) backToTop.classList.add('visible');
            if (floatCall) floatCall.classList.add('visible');
        } else {
            if (backToTop) backToTop.classList.remove('visible');
            if (floatCall) floatCall.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 20); // allow display block to apply before transition
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 400); // matched with css transition duration
                }
            });
        });
    });

    // Testimonial Carousel
    const track = document.getElementById('testimonial-track');
    if (track) {
        const cards = track.querySelectorAll('.testimonial-card');
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        // Initial setup for dynamic dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            cards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => scrollToCard(index));
                dotsContainer.appendChild(dot);
            });
        }

        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;

        const updateDots = (index) => {
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        };

        const scrollToCard = (index) => {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            track.scrollTo({ left: (cardWidth + gap) * index, behavior: 'smooth' });
            updateDots(index);
            currentIndex = index;
        };

        track.addEventListener('scroll', () => {
            // Debounce or simple calculation
            const index = Math.round(track.scrollLeft / cards[0].offsetWidth);
            if (index !== currentIndex) {
                updateDots(index);
                currentIndex = index;
            }
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) scrollToCard(currentIndex - 1);
                else scrollToCard(cards.length - 1); // Loop to end
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < cards.length - 1) scrollToCard(currentIndex + 1);
                else scrollToCard(0); // loop to start
            });
        }

        // Auto play
        let autoPlayInterval = setInterval(() => {
            if (currentIndex < cards.length - 1) scrollToCard(currentIndex + 1);
            else scrollToCard(0);
        }, 6000);

        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    }

    // Dynamic Copyright Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
