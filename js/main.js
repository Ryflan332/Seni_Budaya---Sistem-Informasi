/**
 * BUDAYA INDONESIA - MAIN JAVASCRIPT
 * Interaktivitas animasi scroll reveal, modal lightbox, mobile navigation, dan filter dinamis
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Scroll Reveal Animations with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 3. Like / Bookmark Heart Toggle Animation
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid', 'text-terracotta');
                btn.classList.add('scale-125');
                setTimeout(() => btn.classList.remove('scale-125'), 200);
            } else {
                icon.classList.remove('fa-solid', 'text-terracotta');
                icon.classList.add('fa-regular');
            }
        });
    });

    // 4. Modal Lightbox untuk Galeri
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');

    if (modal && modalImg && modalClose) {
        document.querySelectorAll('.lightbox-trigger').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.getAttribute('data-caption') || img?.alt || 'Dokumentasi Warisan Budaya';
                if (img) {
                    modalImg.src = img.src;
                    if (modalCaption) modalCaption.textContent = caption;
                    modal.classList.remove('hidden', 'opacity-0', 'invisible');
                    modal.classList.add('active', 'flex');
                }
            });
        });

        const closeModal = () => {
            modal.classList.add('opacity-0', 'invisible');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 300);
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
        });
    }

    // 5. Dynamic Category Filter untuk Galeri
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-filter');

                // Update Button Active States
                filterButtons.forEach(b => {
                    b.classList.remove('bg-[#231A14]', 'text-white', 'shadow');
                    b.classList.add('bg-white', 'text-earth', 'border', 'border-[#E8DEC9]');
                });
                btn.classList.add('bg-[#231A14]', 'text-white', 'shadow');
                btn.classList.remove('bg-white', 'text-earth', 'border', 'border-[#E8DEC9]');

                // Filter Gallery Items
                galleryItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    if (category === 'all' || itemCat === category) {
                        item.classList.remove('hidden');
                        item.classList.add('active');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
});
