document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navbarDefault = document.getElementById('navbar-default');

    if (mobileMenuButton && navbarDefault) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            navbarDefault.classList.toggle('hidden');
        });
    }

    async function fetchAndRenderEvents() {
        const eventsContainer = document.querySelector('.max-w-4xl.mx-auto.space-y-12');
        if (!eventsContainer) return;

        try {
            const response = await fetch('/api/events');
            if (!response.ok) throw new Error('Failed to fetch events.');
            
            const events = await response.json();
            
            eventsContainer.innerHTML = ''; 
            if (events.length === 0) {
                eventsContainer.innerHTML = '<p class="text-center text-slate-500">No events scheduled at this time. Please check back later.</p>';
            } else {
                events.forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'flex bg-slate-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300';
                    eventElement.innerHTML = `
                        <div class="w-1/3">
                            <img class="w-full h-full object-cover" src="${event.imageUrl}" alt="${event.title}" />
                        </div>
                        <div class="w-2/3 p-4 flex flex-col justify-center">
                            <p class="text-sm font-semibold text-brand-red uppercase tracking-wider">${event.date}</p>
                            <h3 class="text-lg font-bold text-slate-800 mt-1 mb-2">${event.title}</h3>
                            <p class="text-slate-600 text-sm">${event.description}</p>
                        </div>
                    `;
                    eventsContainer.appendChild(eventElement);
                });
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            eventsContainer.innerHTML = '<p class="text-center text-red-500">Could not load events. Please try refreshing the page.</p>';
        }
    }

    // --- Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('close-lightbox');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
            }
        });
    }

    // Initial Fetch
    fetchAndRenderEvents();
});