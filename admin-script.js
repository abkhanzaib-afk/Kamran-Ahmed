// Admin Control Panel Script for Kamran Ahmed Portfolio

// ── Helper: render FA star icons based on decimal rating ───────────────
function renderStars(rating) {
  const r = parseFloat(rating) || 5;
  let out = '';
  for (let i = 1; i <= 5; i++) {
    if (r >= i) {
      out += '<i class="fas fa-star"></i>';
    } else if (r >= i - 0.5) {
      out += '<i class="fas fa-star-half-alt"></i>';
    } else {
      out += '<i class="far fa-star"></i>';
    }
  }
  return out;
}

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'kamran_portfolio_data';
  const AUTH_KEY = 'kamran_admin_auth';

  // Default Website Data Initialization
  const defaultData = {
    hero: {
      badge: 'AVAILABLE FOR GLOBAL PROJECTS',
      headline: 'I BUILD WEBSITES & DESIGNS THAT MAKE BRANDS STAND OUT.',
      subtext: 'Modern websites with stunning UI and digital graphic solutions built to help businesses worldwide grow and make a lasting impact. Web Developer, UI/UX Designer & Canva Expert.'
    },
    services: [
      { id: '1', title: 'WEB DEVELOPMENT', desc: 'Custom websites built with modern technologies, fully responsive and optimized for speed and SEO search ranking.' },
      { id: '2', title: 'GRAPHIC & CANVA DESIGN', desc: 'Eye-catching visual designs for brands, social media templates, banners, logos, and Canva marketing materials.' },
      { id: '3', title: 'DIGITAL CREATIVE & UI/UX', desc: 'Innovative UI/UX web designs that deliver smooth user experiences, intuitive navigation, and drive customer retention.' }
    ],
    projects: [
      {
        id: '1',
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
      {
        id: '2',
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
      {
        id: '3',
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
      {
        id: '4',
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
      {
        id: '5',
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
      {
        id: '6',
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
    ],
    pricing: {
      p1Sub: 'For individuals and small projects.',
      p2Sub: 'For businesses and growing brands.',
      p3Sub: 'For complete professional digital solutions.'
    },
    contact: {
      phone: '03262297067',
      email: 'kamranahmedzain7@gmail.com',
      mapUrl: 'https://maps.app.goo.gl/Az2DwGNyQw7Ri3sv7'
    }
  };

  const DATA_VERSION = 'v5_scrolling_websites';

  // Get or Load Data
  function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      defaultData.dataVersion = DATA_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
    try {
      const parsed = JSON.parse(raw);
      if (parsed.dataVersion !== DATA_VERSION) {
        defaultData.dataVersion = DATA_VERSION;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        return defaultData;
      }
      return parsed;
    } catch (e) {
      defaultData.dataVersion = DATA_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
  }

  function saveData(data) {
    data.dataVersion = DATA_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    showToast('Changes saved successfully!');
  }

  function showToast(msg) {
    const toast = document.getElementById('toastMsg');
    const toastText = document.getElementById('toastText');
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
  }

  // 1. Authentication Check
  const loginScreen = document.getElementById('loginScreen');
  const dashboardLayout = document.getElementById('dashboardLayout');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  function checkAuth() {
    const isAuth = sessionStorage.getItem(AUTH_KEY);
    if (isAuth === 'true') {
      loginScreen.style.display = 'none';
      dashboardLayout.classList.add('active');
      initDashboard();
    } else {
      loginScreen.style.display = 'flex';
      dashboardLayout.classList.remove('active');
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('loginUser').value.trim();
      const pass = document.getElementById('loginPass').value.trim();

      if (user === 'admin' && pass === 'Kamran@123') {
        sessionStorage.setItem(AUTH_KEY, 'true');
        loginError.style.display = 'none';
        checkAuth();
      } else {
        loginError.style.display = 'block';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(AUTH_KEY);
      checkAuth();
    });
  }

  // Navigation Panel Switching
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const panelViews = document.querySelectorAll('.panel-view');
  const topbarTitle = document.getElementById('topbarTitle');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPanel = link.getAttribute('data-panel');
      
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      panelViews.forEach(view => {
        if (view.id === targetPanel) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      if (topbarTitle) {
        topbarTitle.textContent = link.querySelector('span').textContent;
      }
    });
  });

  // Init & Populate Dashboard Data
  function initDashboard() {
    const data = loadData();

    // Stats
    document.getElementById('statProjects').textContent = data.projects.length;
    document.getElementById('statReviews').textContent = data.projects.length;
    document.getElementById('statServices').textContent = data.services.length;

    // Hero Form
    document.getElementById('heroBadge').value = data.hero.badge;
    document.getElementById('heroHeadline').value = data.hero.headline;
    document.getElementById('heroSubtext').value = data.hero.subtext;

    // Services Table
    renderServicesTable(data.services);

    // Portfolio Projects Table
    renderPortfolioTable(data.projects);

    // Reviews Table
    renderReviewsTable(data.projects);

    // Pricing Form
    document.getElementById('p1Sub').value = data.pricing.p1Sub;
    document.getElementById('p2Sub').value = data.pricing.p2Sub;
    document.getElementById('p3Sub').value = data.pricing.p3Sub;

    // Contact Form
    document.getElementById('adminPhone').value = data.contact.phone;
    document.getElementById('adminEmail').value = data.contact.email;
    document.getElementById('adminMapUrl').value = data.contact.mapUrl;
  }

  // Hero Form Submit
  const heroForm = document.getElementById('heroForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = loadData();
      data.hero.badge = document.getElementById('heroBadge').value;
      data.hero.headline = document.getElementById('heroHeadline').value;
      data.hero.subtext = document.getElementById('heroSubtext').value;
      saveData(data);
    });
  }

  // Render Services Table
  function renderServicesTable(services) {
    const tbody = document.getElementById('servicesTableBody');
    if (!tbody) return;
    tbody.innerHTML = services.map(s => `
      <tr>
        <td><strong>${s.title}</strong></td>
        <td>${s.desc}</td>
        <td><button class="btn-danger" onclick="deleteService('${s.id}')"><i class="fas fa-trash"></i> Delete</button></td>
      </tr>
    `).join('');
  }

  window.deleteService = function(id) {
    const data = loadData();
    data.services = data.services.filter(s => s.id !== id);
    saveData(data);
    renderServicesTable(data.services);
  };

  // Render Portfolio Table & Live Cards Preview
  function renderPortfolioTable(projects) {
    const previewGrid = document.getElementById('adminPortfolioPreviewGrid');
    if (previewGrid) {
      previewGrid.innerHTML = projects.map(p => `
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
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="btn-cyan" style="flex: 1; padding: 8px 12px; font-size: 0.82rem;" onclick="editProject('${p.id}')">
                <i class="fas fa-edit"></i> Edit Project
              </button>
              <a href="${p.liveUrl || '#'}" target="_blank" class="btn-outline" style="padding: 8px 12px; font-size: 0.82rem; display: inline-flex; align-items: center; justify-content: center;">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      `).join('');
    }

    const tbody = document.getElementById('portfolioTableBody');
    if (!tbody) return;
    tbody.innerHTML = projects.map(p => `
      <tr>
        <td>
          <img src="${p.preview || 'project4.svg'}" alt="${p.title}" style="width: 55px; height: 38px; object-fit: contain; background: #070d18; border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 4px; padding: 2px;">
        </td>
        <td><strong>${p.title}</strong></td>
        <td><span style="color: var(--primary-cyan); font-weight: 600;"><i class="${p.categoryIcon || 'fas fa-globe'}" style="margin-right: 5px;"></i>${p.category}</span></td>
        <td><i class="fas fa-map-marker-alt" style="color: #00f0ff; margin-right: 5px;"></i>${p.location || 'Global'}</td>
        <td><span style="color: #ffd700;">★</span> ${p.rating || '5.0'}</td>
        <td>
          <button class="btn-outline" style="padding: 6px 12px; margin-right: 6px;" onclick="editProject('${p.id}')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-danger" style="padding: 6px 12px;" onclick="deleteProject('${p.id}')"><i class="fas fa-trash"></i> Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // Render Reviews Table
  function renderReviewsTable(projects) {
    const tbody = document.getElementById('reviewsTableBody');
    if (!tbody) return;
    tbody.innerHTML = projects.map(p => `
      <tr>
        <td><strong>${p.title}</strong></td>
        <td style="font-style: italic;">"${p.review}"</td>
        <td><span style="color: var(--primary-cyan);">${p.clientLabel}</span></td>
        <td>
          <button class="btn-outline" style="padding: 6px 12px;" onclick="editReview('${p.id}')"><i class="fas fa-edit"></i> Edit</button>
          <button class="btn-danger" style="padding: 6px 12px; margin-left: 6px;" onclick="deleteProject('${p.id}')"><i class="fas fa-trash"></i> Delete</button>
        </td>
      </tr>
    `).join('');
  }

  // ── Review Star Picker (Decimal Support) ────────────────────────
  function initReviewStarPicker(initialRating) {
    const stars = document.querySelectorAll('#reviewStarPicker .star-btn');
    const ratingInput = document.getElementById('editReviewRating');

    function updateStarVisual(val) {
      const num = parseFloat(val) || 5;
      stars.forEach((s, i) => {
        s.style.color = num >= i + 0.5 ? '#f59e0b' : '#334155';
        s.style.opacity = num >= i + 0.5 ? '1' : '0.3';
      });
    }

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const n = parseInt(star.dataset.val);
        stars.forEach((s, i) => {
          s.style.color = i < n ? '#f59e0b' : '#334155';
          s.style.opacity = i < n ? '1' : '0.3';
        });
      });
      star.addEventListener('mouseleave', () => updateStarVisual(ratingInput.value));
      star.addEventListener('click', () => {
        ratingInput.value = parseFloat(star.dataset.val).toFixed(1);
        updateStarVisual(ratingInput.value);
      });
    });

    ratingInput.addEventListener('input', () => updateStarVisual(ratingInput.value));
    ratingInput.value = parseFloat(initialRating).toFixed(1);
    updateStarVisual(ratingInput.value);
  }

  if (addReviewBtn) {
    addReviewBtn.addEventListener('click', () => {
      document.getElementById('reviewModalTitle').textContent = 'Add New Client Review';
      document.getElementById('editReviewProjectId').value = '';
      reviewModalForm.reset();
      reviewEditModal.classList.add('active');
      initReviewStarPicker(5);
    });
  }

  if (closeReviewModal) {
    closeReviewModal.addEventListener('click', () => {
      reviewEditModal.classList.remove('active');
    });
  }

  window.editReview = function(id) {
    const data = loadData();
    const p = data.projects.find(proj => proj.id === id);
    if (p) {
      document.getElementById('reviewModalTitle').textContent = 'Edit Client Review';
      document.getElementById('editReviewProjectId').value = p.id;
      document.getElementById('editReviewClientName').value = p.title;
      document.getElementById('editReviewQuote').value = p.review;
      document.getElementById('editReviewRoleLabel').value = p.clientLabel;
      reviewEditModal.classList.add('active');
      initReviewStarPicker(Math.round(parseFloat(p.rating) || 5));
    }
  };

  if (reviewModalForm) {
    reviewModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = loadData();
      const id = document.getElementById('editReviewProjectId').value;
      const clientName = document.getElementById('editReviewClientName').value.trim();
      const quote = document.getElementById('editReviewQuote').value.trim();
      const roleLabel = document.getElementById('editReviewRoleLabel').value.trim();
      const reviewRating = parseFloat(document.getElementById('editReviewRating').value) || 5.0;

      if (id) {
        const p = data.projects.find(proj => proj.id === id);
        if (p) {
          p.title = clientName;
          p.review = quote;
          p.clientLabel = roleLabel;
          p.rating = reviewRating;
        }
      } else {
        const newId = String(Date.now());
        data.projects.push({
          id: newId,
          title: clientName,
          category: 'Web Development',
          categoryIcon: 'fas fa-laptop-code',
          location: 'Global',
          rating: reviewRating,
          ratingText: 'Client Review',
          desc: 'Professional project delivered with modern responsive design and clean UI.',
          preview: 'project4.svg',
          liveUrl: '#',
          features: ['Custom Web Development', 'Responsive Design', 'Clean UI'],
          review: quote,
          clientLabel: roleLabel
        });
      }

      saveData(data);
      reviewEditModal.classList.remove('active');
      renderPortfolioTable(data.projects);
      renderReviewsTable(data.projects);
      document.getElementById('statReviews').textContent = data.projects.length;
      document.getElementById('statProjects').textContent = data.projects.length;
    });
  }


  // Add/Edit Project Modal Handling
  const projectEditModal = document.getElementById('projectEditModal');
  const addProjectBtn = document.getElementById('addProjectBtn');
  const closeProjectModal = document.getElementById('closeProjectModal');
  const projectModalForm = document.getElementById('projectModalForm');

  // ── Star Picker Logic (Decimal Support: 4.5, 4.9, 3.5 etc.) ──────────
  function initStarPicker(initialRating) {
    const stars = document.querySelectorAll('#starPicker .star-btn');
    const ratingInput = document.getElementById('editProjectRating');

    function updateStarVisual(val) {
      const num = parseFloat(val) || 5;
      stars.forEach((s, i) => {
        if (num >= i + 1) {
          s.style.color = '#f59e0b';   // full
        } else if (num >= i + 0.5) {
          s.style.color = '#f59e0b';   // treat .5+ as lit
          s.style.opacity = '0.6';
        } else {
          s.style.color = '#334155';   // empty
          s.style.opacity = '1';
        }
        s.style.opacity = num >= i + 0.5 ? '1' : '0.3';
      });
    }

    // Click star → set whole number, update input
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const n = parseInt(star.dataset.val);
        stars.forEach((s, i) => {
          s.style.color = i < n ? '#f59e0b' : '#334155';
          s.style.opacity = i < n ? '1' : '0.3';
        });
      });
      star.addEventListener('mouseleave', () => updateStarVisual(ratingInput.value));
      star.addEventListener('click', () => {
        ratingInput.value = parseFloat(star.dataset.val).toFixed(1);
        updateStarVisual(ratingInput.value);
      });
    });

    // Typing in number box → update stars live
    ratingInput.addEventListener('input', () => updateStarVisual(ratingInput.value));

    ratingInput.value = parseFloat(initialRating).toFixed(1);
    updateStarVisual(ratingInput.value);
  }

  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
      document.getElementById('projectModalTitle').textContent = 'Add New Project';
      document.getElementById('editProjectId').value = '';
      projectModalForm.reset();
      if (document.getElementById('editProjectCategoryIcon')) document.getElementById('editProjectCategoryIcon').value = 'fas fa-laptop-code';
      if (document.getElementById('editProjectLocation')) document.getElementById('editProjectLocation').value = 'Global';
      if (document.getElementById('editProjectPreview')) document.getElementById('editProjectPreview').value = 'project4.svg';
      if (document.getElementById('editProjectLiveUrl')) document.getElementById('editProjectLiveUrl').value = 'https://urbancart.store';
      projectEditModal.classList.add('active');
      initStarPicker(5);
    });
  }

  if (closeProjectModal) {
    closeProjectModal.addEventListener('click', () => {
      projectEditModal.classList.remove('active');
    });
  }

  window.editProject = function(id) {
    const data = loadData();
    const p = data.projects.find(proj => proj.id === id);
    if (p) {
      document.getElementById('projectModalTitle').textContent = 'Edit Project';
      document.getElementById('editProjectId').value = p.id;
      document.getElementById('editProjectTitle').value = p.title || '';
      document.getElementById('editProjectCategory').value = p.category || '';
      if (document.getElementById('editProjectCategoryIcon')) {
        document.getElementById('editProjectCategoryIcon').value = p.categoryIcon || 'fas fa-globe';
      }
      if (document.getElementById('editProjectLocation')) {
        document.getElementById('editProjectLocation').value = p.location || 'Global';
      }
      if (document.getElementById('editProjectLiveUrl')) {
        document.getElementById('editProjectLiveUrl').value = p.liveUrl || 'https://urbancart.store';
      }
      document.getElementById('editProjectPreview').value = p.preview || '';
      document.getElementById('editProjectDesc').value = p.desc || '';
      document.getElementById('editProjectReview').value = p.review || '';
      document.getElementById('editProjectClientLabel').value = p.clientLabel || '';
      projectEditModal.classList.add('active');
      initStarPicker(Math.round(parseFloat(p.rating) || 5));
    }
  };


  window.deleteProject = function(id) {
    const data = loadData();
    data.projects = data.projects.filter(p => p.id !== id);
    saveData(data);
    renderPortfolioTable(data.projects);
    renderReviewsTable(data.projects);
    document.getElementById('statReviews').textContent = data.projects.length;
    document.getElementById('statProjects').textContent = data.projects.length;
  };

  if (projectModalForm) {
    projectModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = loadData();
      const id = document.getElementById('editProjectId').value;
      const title = document.getElementById('editProjectTitle').value.trim();
      const category = document.getElementById('editProjectCategory').value.trim();
      const categoryIcon = document.getElementById('editProjectCategoryIcon') ? document.getElementById('editProjectCategoryIcon').value.trim() : 'fas fa-globe';
      const location = document.getElementById('editProjectLocation') ? document.getElementById('editProjectLocation').value.trim() : 'Global';
      const ratingRaw = document.getElementById('editProjectRating') ? document.getElementById('editProjectRating').value.trim() : '5.0';
      let rating = parseFloat(ratingRaw) || 5.0;
      let ratingText = 'Client Review';
      const preview = document.getElementById('editProjectPreview').value.trim();
      const liveUrl = document.getElementById('editProjectLiveUrl') ? document.getElementById('editProjectLiveUrl').value.trim() : '#';
      const desc = document.getElementById('editProjectDesc').value.trim();
      const review = document.getElementById('editProjectReview').value.trim();
      const clientLabel = document.getElementById('editProjectClientLabel').value.trim();

      if (id) {
        // Edit existing
        const p = data.projects.find(proj => proj.id === id);
        if (p) {
          p.title = title;
          p.category = category;
          p.categoryIcon = categoryIcon;
          p.location = location;
          p.rating = rating;
          p.ratingText = ratingText;
          p.desc = desc;
          p.preview = preview;
          p.liveUrl = liveUrl;
          p.review = review;
          p.clientLabel = clientLabel;
        }
      } else {
        // Add new
        const newId = String(Date.now());
        data.projects.push({
          id: newId,
          title,
          category,
          categoryIcon,
          location,
          rating,
          ratingText,
          desc,
          preview,
          liveUrl,
          features: ['Custom Web Development', 'Responsive Design', 'Clean UI'],
          review,
          clientLabel
        });
      }

      saveData(data);
      projectEditModal.classList.remove('active');
      renderPortfolioTable(data.projects);
      renderReviewsTable(data.projects);
      document.getElementById('statReviews').textContent = data.projects.length;
      document.getElementById('statProjects').textContent = data.projects.length;
    });
  }

  // Pricing Form Submit
  const pricingForm = document.getElementById('pricingForm');
  if (pricingForm) {
    pricingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = loadData();
      data.pricing.p1Sub = document.getElementById('p1Sub').value;
      data.pricing.p2Sub = document.getElementById('p2Sub').value;
      data.pricing.p3Sub = document.getElementById('p3Sub').value;
      saveData(data);
    });
  }

  // Contact Form Submit
  const contactFormAdmin = document.getElementById('contactFormAdmin');
  if (contactFormAdmin) {
    contactFormAdmin.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = loadData();
      data.contact.phone = document.getElementById('adminPhone').value;
      data.contact.email = document.getElementById('adminEmail').value;
      data.contact.mapUrl = document.getElementById('adminMapUrl').value;
      saveData(data);
    });
  }

  // Initial Auth Check
  checkAuth();
});
