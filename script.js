// JavaScript for Kamran Ahmed Portfolio Website

// ── Helper: render FA star icons based on decimal rating ───────────────
// e.g. 4.5 → ★★★★½  (Font Awesome: fas fa-star x4 + fas fa-star-half-alt x1)
function renderStars(rating) {
  const r = parseFloat(rating) || 5;
  let out = '';
  for (let i = 1; i <= 5; i++) {
    if (r >= i) {
      out += '<i class="fas fa-star"></i>';          // full star ★
    } else if (r >= i - 0.5) {
      out += '<i class="fas fa-star-half-alt"></i>'; // half star ½
    } else {
      out += '<i class="far fa-star"></i>';           // empty star ☆
    }
  }
  return out;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Glowing Mouse Cursor Effect
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  const follower = document.createElement('div');
  follower.classList.add('cursor-follower');
  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const interactables = document.querySelectorAll('a, button, .portfolio-card, input, select, textarea');
  interactables.forEach(item => {
    item.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Portfolio Filtering & Mobile Touch Live Preview Toggle
  const tabBtns = document.querySelectorAll('.tab-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Mobile/Tablet tap toggle for preview scrolling inside card
  document.querySelectorAll('.portfolio-card, .featured-card').forEach(card => {
    const imgBox = card.querySelector('.portfolio-img-box, .featured-mockup-box');
    if (imgBox) {
      imgBox.addEventListener('touchstart', () => {
        card.classList.toggle('is-scrolling');
      }, { passive: true });
    }
  });

  // 5. REPLACED 6 NEW PORTFOLIO PROJECTS & MATCHING CLIENT REVIEWS
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDesc = document.getElementById('modalDesc');
  const modalPreviewImg = document.getElementById('modalPreviewImg');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalReviewQuote = document.getElementById('modalReviewQuote');
  const modalReviewClient = document.getElementById('modalReviewClient');
  const modalClose = document.getElementById('modalClose');
  const modalBackBtn = document.getElementById('modalBackBtn');

  const projectData = {
    '1': {
      title: 'URBANCART STORE',
      category: 'E-COMMERCE',
      categoryIcon: 'fas fa-shopping-cart',
      location: 'Pakistan',
      rating: '5.0',
      ratingText: 'Client Review',
      desc: 'A clean and simple online shopping website featuring product cards, prices, Add to Cart buttons, new arrivals, and category browsing.',
      preview: 'project4.svg',
      liveUrl: 'https://urbancart.store',
      features: ['E-Commerce UI', 'Product Cards & Prices', 'Add to Cart Flow', 'Responsive Design'],
      review: 'The website gives our online store a clean and professional appearance. Customers can easily browse products and understand the shopping process.',
      clientLabel: '— Sample E-commerce Client'
    },
    '2': {
      title: 'Lotus Wellness Spa',
      category: 'SPA & WELLNESS',
      categoryIcon: 'fas fa-spa',
      location: 'USA',
      rating: '5.0',
      ratingText: 'Client Review',
      desc: 'An elegant and simple spa & wellness website featuring massage therapies, organic facials, body detox scrubs, relaxation packages, and appointment booking.',
      preview: 'project5.svg',
      liveUrl: 'https://lotuswellness.spa',
      features: ['Spa Treatment Menu', 'Relaxation Packages', 'Calming Aesthetic', 'Appointment Booking UI'],
      review: 'The website gives our spa a calm and professional identity. Our treatments and appointment information are presented clearly.',
      clientLabel: '— Sample Spa Client'
    },
    '3': {
      title: 'Maison Ember Restaurant',
      category: 'RESTAURANT WEBSITE',
      categoryIcon: 'fas fa-utensils',
      location: 'France',
      rating: '5.0',
      ratingText: 'Client Review',
      desc: 'A simple professional restaurant website showcasing food menus (Starters, Main Course, Desserts, Drinks), prices, opening hours, location, and table reservation.',
      preview: 'project6.svg',
      liveUrl: 'https://maisonember.restaurant',
      features: ['Food Menu & Prices', 'Special Offers', 'Opening Hours & Map', 'Table Reservation UI'],
      review: 'The website gives our restaurant a professional online presence. Customers can easily view our menu, opening hours and contact information.',
      clientLabel: '— Sample Restaurant Client'
    },
    '4': {
      title: 'Eddy Naboulet Studio',
      category: 'CREATIVE FRONTEND DEV',
      categoryIcon: 'fas fa-code',
      location: 'France',
      rating: '5.0',
      ratingText: 'Client Review',
      desc: 'Bespoke creative frontend portfolio featuring custom French typography, interactive canvas avatar art, and WebGL digital architecture.',
      preview: 'project1.svg',
      liveUrl: 'https://eddynaboulet-studio.design',
      features: ['Creative Frontend Dev', 'Custom Typography', 'WebGL & Canvas Art', 'French Art Direction'],
      review: 'Eddy Naboulet built an extraordinarily unique portfolio experience. The custom typography and interactive canvas aesthetics are world-class.',
      clientLabel: '— French Creative Studio'
    },
    '5': {
      title: 'Lil-Boxes Web Agency',
      category: 'CREATIVE AGENCY',
      categoryIcon: 'fas fa-paint-brush',
      location: 'United Kingdom',
      rating: '5.0',
      ratingText: 'Client Review',
      desc: 'High-impact crimson editorial web agency layout featuring bold headlines, conversion audit strategies, and digital campaign showcases.',
      preview: 'project2.svg',
      liveUrl: 'https://lilboxes-agency.com',
      features: ['Editorial Web Design', 'High-Impact Headlines', 'Conversion Strategy', 'Bold Crimson Palette'],
      review: 'Lil-Boxes transformed our brand identity completely. The bold editorial layout and high-converting campaign pages boosted our client leads.',
      clientLabel: '— Lil-Boxes Agency Client'
    },
    '6': {
      title: 'HaroonR Studio',
      category: 'FULL-STACK & RETRO LABS',
      categoryIcon: 'fas fa-gamepad',
      location: 'Canada',
      rating: '5.0',
      ratingText: 'Client Review',
      desc: 'Creative developer showcase featuring split finance/code headers, retro pixel arcade games, audio visualizer consoles, and dark gold UI.',
      preview: 'project3.svg',
      liveUrl: 'https://haroonr-studio.dev',
      features: ['Finance & Code Split', 'Retro Pixel Arcade', 'Web Audio Visualizer', 'Gold & Dark UI Theme'],
      review: 'HaroonR Studio delivers creative technical mastery. The retro arcade components and code vault features bring incredible personality.',
      clientLabel: '— HaroonR Creative Client'
    }
  };

  const modalLiveBtn = document.getElementById('modalLiveBtn');
  let currentLiveUrl = '';

  // Open Modal with EXACT Selected Project Data ONLY
  document.querySelectorAll('.btn-order-now, .featured-card, .view-project-btn, .portfolio-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.btn-order-now, .view-project-btn');
      const id = targetBtn ? targetBtn.getAttribute('data-id') : card.getAttribute('data-id');

      if (id && projectData[id] && modal) {
        // If clicking on external link and user wants to visit directly, can allow, but modal offers both options
        e.preventDefault();
        e.stopPropagation();
        const data = projectData[id];
        currentLiveUrl = data.liveUrl;
        
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalDesc) modalDesc.textContent = data.desc;
        if (modalPreviewImg) modalPreviewImg.src = data.preview;
        if (modalReviewQuote) modalReviewQuote.textContent = `"${data.review}"`;
        if (modalReviewClient) modalReviewClient.textContent = data.clientLabel;

        if (modalFeatures) {
          modalFeatures.innerHTML = (data.features || []).map(f => `<span style="background: rgba(0, 240, 255, 0.1); border: 1px solid var(--border-cyan); color: var(--primary-cyan); padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">✓ ${f}</span>`).join('');
        }

        modal.classList.add('active');
      }
    });
  });

  if (modalLiveBtn) {
    modalLiveBtn.addEventListener('click', () => {
      if (currentLiveUrl) {
        window.open(currentLiveUrl, '_blank');
      }
    });
  }


  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackBtn) modalBackBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // 6. Client Reviews Auto Slider / Carousel
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');
  const dotsContainer = document.getElementById('sliderDots');
  let autoSlideInterval;
  let currentIndex = 0;

  function initSlider() {
    if (!track) return;
    const slides = Array.from(track.children);
    if (!slides.length) return;

    function getSlidesPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalDots = Math.max(1, slides.length - getSlidesPerView() + 1);
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateSlider() {
      const slide = slides[0];
      if (!slide) return;
      const slideWidth = slide.getBoundingClientRect().width + 30;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      if (dotsContainer) {
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      const maxIndex = Math.max(0, slides.length - getSlidesPerView());
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateSlider();
    }

    function nextSlide() {
      const maxIndex = Math.max(0, slides.length - getSlidesPerView());
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateSlider();
    }

    function prevSlide() {
      const maxIndex = Math.max(0, slides.length - getSlidesPerView());
      if (currentIndex <= 0) {
        currentIndex = maxIndex;
      } else {
        currentIndex--;
      }
      updateSlider();
    }

    if (nextBtn) {
      nextBtn.onclick = () => { nextSlide(); resetAutoSlide(); };
    }
    if (prevBtn) {
      prevBtn.onclick = () => { prevSlide(); resetAutoSlide(); };
    }

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 3500);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    createDots();
    updateSlider();
    startAutoSlide();

    window.onresize = () => {
      createDots();
      updateSlider();
    };
  }

  initSlider();

  // 8. Dynamic localStorage Data Loader (Admin Panel Sync) & Admin Routing
  const DATA_VERSION = 'v5_scrolling_websites';

  function loadDynamicPortfolioData() {
    const savedData = localStorage.getItem('kamran_portfolio_data');
    if (!savedData) return;

    try {
      const data = JSON.parse(savedData);
      // If outdated version, clear so default synchronized data is used
      if (data.dataVersion !== DATA_VERSION) {
        localStorage.removeItem('kamran_portfolio_data');
        return;
      }
      
      // Update Hero Section
      if (data.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroDesc = document.querySelector('.hero-desc');
        if (heroTitle && data.hero.headline) heroTitle.innerHTML = data.hero.headline;
        if (heroDesc && data.hero.subtext) heroDesc.textContent = data.hero.subtext;
      }

      // Update Services
      if (data.services && data.services.length) {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
          servicesGrid.innerHTML = data.services.map(s => `
            <div class="service-card highlight-glow">
              <div class="service-icon"><i class="${s.icon || 'fas fa-code'}"></i></div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          `).map(item => item.trim()).join('');
        }
      }

      // Update Portfolio Projects (Our Featured Works)
      if (data.projects && data.projects.length) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
          portfolioGrid.innerHTML = data.projects.map(p => `
            <div class="featured-card" data-id="${p.id}">
              <div class="featured-mockup-box">
                <div class="laptop-mockup">
                  <div class="laptop-cam"></div>
                  <div class="laptop-browser-bar">
                    <div class="browser-dots">
                      <span class="b-dot b-red"></span>
                      <span class="b-dot b-yellow"></span>
                      <span class="b-dot b-green"></span>
                    </div>
                    <div class="browser-url-pill">${p.liveUrl || 'https://' + p.title.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}</div>
                  </div>
                  <div class="laptop-screen-viewport">
                    <img src="${p.preview || 'project4.svg'}" alt="${p.title}" class="mockup-scroll-img" loading="lazy">
                  </div>
                  <div class="laptop-base-bar">
                    <div class="laptop-base-notch"></div>
                  </div>
                </div>
                <div class="phone-mockup">
                  <div class="phone-notch"></div>
                  <div class="phone-screen-viewport">
                    <img src="${p.preview || 'project4.svg'}" alt="${p.title} Mobile" class="mockup-scroll-img mockup-scroll-phone" loading="lazy">
                  </div>
                </div>
              </div>
              <div class="featured-card-body">
                <div class="featured-meta-row">
                  <span class="featured-cat-badge"><i class="${p.categoryIcon || 'fas fa-globe'}"></i> ${p.category}</span>
                  <div class="featured-rating">
                    <span class="featured-stars">${renderStars(p.rating)}</span>
                    <span class="featured-rating-score">${p.rating || '5.0'} (${p.ratingText || 'Client Review'})</span>
                  </div>
                </div>
                <h3 class="featured-title">${p.title}</h3>
                <div class="featured-location">
                  <span class="location-pin-icon"><i class="fas fa-map-marker-alt"></i></span>
                  <span class="location-country">${p.location || 'Global'}</span>
                </div>
                <a href="${p.liveUrl || '#contact'}" class="btn-order-now" data-id="${p.id}">
                  <span>ORDER NOW</span> <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          `).map(item => item.trim()).join('');

          // Update local projectData map for modal popup
          data.projects.forEach(p => {
            projectData[p.id] = {
              title: p.title,
              category: p.category,
              categoryIcon: p.categoryIcon || 'fas fa-globe',
              location: p.location || 'Global',
              rating: p.rating || '5.0',
              ratingText: p.ratingText || 'Client Review',
              desc: p.desc,
              preview: p.preview || 'project4.svg',
              liveUrl: p.liveUrl || 'https://urbancart.store',
              features: p.features || ['Custom Web Development', 'Responsive Design', 'Clean UI'],
              review: p.review || '',
              clientLabel: p.clientLabel || `— ${p.title} Client`
            };
          });

          // Re-bind modal click handlers for cards
          document.querySelectorAll('.btn-order-now, .featured-card, .view-project-btn, .portfolio-card').forEach(card => {
            card.onclick = (e) => {
              const targetBtn = e.target.closest('.btn-order-now, .view-project-btn');
              const id = targetBtn ? targetBtn.getAttribute('data-id') : card.getAttribute('data-id');

              if (id && projectData[id] && modal) {
                e.preventDefault();
                e.stopPropagation();
                const p = projectData[id];
                modalTitle.textContent = p.title;
                modalCategory.textContent = p.category;
                modalDesc.textContent = p.desc;
                modalPreviewImg.src = p.preview;
                modalPreviewImg.alt = p.title;
                modalFeatures.innerHTML = (p.features || []).map(f => `<span class="badge-pill" style="font-size:0.75rem;">${f}</span>`).join('');
                modalReviewQuote.textContent = `"${p.review}"`;
                modalReviewClient.textContent = p.clientLabel;
                currentLiveUrl = p.liveUrl || '#';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
              }
            };
          });
        }

        // Update Client Reviews Carousel (EXACT MATCH WITH DASHBOARD)
        if (track) {
          track.innerHTML = data.projects.map(p => `
            <div class="review-card-slide">
              <div class="stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="review-quote">"${p.review}"</p>
              <div>
                <h4 class="reviewer-name">${p.title}</h4>
                <span class="reviewer-role">${p.clientLabel}</span>
              </div>
            </div>
          `).join('');

          initSlider();
        }
      }

      // Update Contact Information
      if (data.contact) {
        const phoneElem = document.querySelector('.contact-item:nth-child(1) p');
        const emailElem = document.querySelector('.contact-item:nth-child(2) p');
        const locElem = document.querySelector('.contact-item:nth-child(3) p');
        if (phoneElem && data.contact.phone) phoneElem.textContent = data.contact.phone;
        if (emailElem && data.contact.email) emailElem.textContent = data.contact.email;
        if (locElem && data.contact.location) locElem.textContent = data.contact.location;
      }
    } catch (e) {
      console.warn('Failed to parse localStorage kamran_portfolio_data:', e);
    }
  }

  loadDynamicPortfolioData();

  // Listen for storage changes from dashboard in real-time
  window.addEventListener('storage', (e) => {
    if (e.key === 'kamran_portfolio_data') {
      loadDynamicPortfolioData();
    }
  });

  // Admin routing check: redirect to admin.html if URL contains #admin, #web-admin, /admin, or /web-admin
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (hash === '#admin' || hash === '#web-admin' || path.endsWith('/admin') || path.endsWith('/web-admin')) {
    window.location.href = 'admin.html';
  }
});


