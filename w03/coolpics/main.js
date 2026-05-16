(() => {
  /* ─────────────────────────────────────────
     MOBILE MENU
  ───────────────────────────────────────── */
  const header   = document.querySelector('.site-header');
  const nav      = document.querySelector('.site-nav');
  const menuLabel = document.querySelector('.menu-label');
 
  // Wrap the menu label in a button for accessibility
  const menuBtn = document.createElement('button');
  menuBtn.className   = 'menu-toggle';
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-controls', 'site-nav');
  menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
  menuBtn.innerHTML   = menuLabel.innerHTML; // "Menu"
  menuLabel.replaceWith(menuBtn);
 
  nav.id = 'site-nav';
 
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.classList.toggle('menu-toggle--open', isOpen);
  });
 
  // Close menu when a nav link is tapped on mobile
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.classList.remove('menu-toggle--open');
    });
  });
 
  /* ─────────────────────────────────────────
     MODAL
  ───────────────────────────────────────── */
  // Build modal DOM
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Photo viewer');
  overlay.hidden = true;
 
  overlay.innerHTML = `
    <div class="modal-inner">
      <button class="modal-close" aria-label="Close photo viewer">&#x2715;</button>
      <div class="modal-img-wrap">
        <img class="modal-img" src="" alt="">
        <div class="modal-spinner" aria-hidden="true"></div>
      </div>
    </div>
  `;
 
  document.body.appendChild(overlay);
 
  const modalImg     = overlay.querySelector('.modal-img');
  const modalSpinner = overlay.querySelector('.modal-spinner');
  const closeBtn     = overlay.querySelector('.modal-close');
  const modalInner   = overlay.querySelector('.modal-inner');
 
  let previouslyFocused = null;
 
  function openModal(src, alt) {
    previouslyFocused = document.activeElement;
 
    // Reset state
    modalImg.classList.remove('modal-img--loaded');
    modalSpinner.hidden = false;
    modalImg.src  = '';
    modalImg.alt  = alt || '';
 
    overlay.hidden = false;
    document.body.classList.add('modal-active');
 
    // Load high-res image
    const hi = new Image();
    hi.onload = () => {
      modalImg.src = src;
      modalImg.classList.add('modal-img--loaded');
      modalSpinner.hidden = true;
    };
    hi.onerror = () => {
      modalSpinner.hidden = true;
      modalImg.alt = 'Image could not be loaded.';
      modalImg.classList.add('modal-img--loaded');
    };
    hi.src = src;
 
    // Trap focus on close button
    closeBtn.focus();
  }
 
  function closeModal() {
    overlay.hidden = true;
    document.body.classList.remove('modal-active');
    if (previouslyFocused) previouslyFocused.focus();
  }
 
  // Clicking the backdrop (outside the image box) closes the modal
  overlay.addEventListener('click', e => {
    if (!modalInner.contains(e.target)) closeModal();
  });
 
  closeBtn.addEventListener('click', closeModal);
 
  // Esc key closes the modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });
 
  // Wire up gallery cards
  document.querySelectorAll('.card img').forEach(img => {
    // Make cards keyboard-accessible
    img.closest('.card').setAttribute('tabindex', '0');
    img.closest('.card').setAttribute('role', 'button');
    img.closest('.card').setAttribute('aria-label', `View full size: ${img.alt || 'photo'}`);
 
    const openHandler = () => openModal('modal_coolpic.jpg', img.alt);
 
    img.closest('.card').addEventListener('click', openHandler);
    img.closest('.card').addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler();
      }
    });
  });
 
  /* ─────────────────────────────────────────
     INJECT STYLES
  ───────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* ── Menu toggle button ── */
    .menu-toggle {
      background: none;
      border: none;
      color: #fff;
      font-family: inherit;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      transition: background 0.18s;
      letter-spacing: 0.01em;
    }
    .menu-toggle:hover,
    .menu-toggle:focus-visible {
      background: rgba(255,255,255,0.18);
      outline: none;
    }
 
    /* ── Mobile nav slide-down ── */
    @media screen and (max-width: 999px) {
      #site-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        overflow: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.25s ease;
        padding: 0;
        width: 100%;
      }
      #site-nav.nav-open {
        max-height: 300px;
        opacity: 1;
        padding: 0.5rem 0 0.25rem;
      }
      #site-nav a {
        display: block;
        width: 100%;
        text-align: center;
        padding: 0.55rem 1rem;
        font-size: 1rem;
        color: #fff;
        transition: background 0.15s;
        border-radius: 4px;
      }
      #site-nav a:hover {
        background: rgba(255,255,255,0.15);
      }
    }
 
    /* On desktop, the toggle button itself is hidden */
    @media screen and (min-width: 1000px) {
      .menu-toggle { display: none; }
    }
 
    /* ── Card pointer ── */
    .card {
      cursor: pointer;
    }
    .card:focus-visible {
      outline: 3px solid #3b82f6;
      outline-offset: 3px;
    }
 
    /* ── Modal overlay ── */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      animation: modal-fade-in 0.2s ease;
    }
    .modal-overlay[hidden] {
      display: none;
    }
 
    @keyframes modal-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
 
    /* ── Modal box ── */
    .modal-inner {
      position: relative;
      max-width: min(92vw, 900px);
      max-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: modal-scale-in 0.22s cubic-bezier(0.34, 1.3, 0.64, 1);
    }
 
    @keyframes modal-scale-in {
      from { transform: scale(0.88); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }
 
    /* ── Modal image ── */
    .modal-img-wrap {
      position: relative;
      min-width: 120px;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-img {
      display: block;
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
      box-shadow: 0 12px 50px rgba(0,0,0,0.7);
      border: 2px solid rgba(255,255,255,0.1);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .modal-img.modal-img--loaded {
      opacity: 1;
    }
 
    /* ── Spinner ── */
    .modal-spinner {
      position: absolute;
      width: 38px;
      height: 38px;
      border: 3px solid rgba(255,255,255,0.2);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    .modal-spinner[hidden] { display: none; }
 
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
 
    /* ── Close button ── */
    .modal-close {
      position: absolute;
      top: -2.4rem;
      right: -0.25rem;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.25);
      color: #fff;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      font-size: 1rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s, transform 0.18s;
      z-index: 10;
    }
    .modal-close:hover {
      background: rgba(255,255,255,0.28);
      transform: scale(1.1);
    }
    .modal-close:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
 
    /* ── Prevent scroll when modal open ── */
    body.modal-active {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
})();
 