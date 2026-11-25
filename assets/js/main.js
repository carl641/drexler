/* Drexler Glass Co. — site interactions */
(function () {
  document.documentElement.classList.remove('no-js');

  // Sticky header state
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.documentElement.style.setProperty('--menu-top', header.getBoundingClientRect().bottom + 'px');
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav .dropdown a, .nav__item:not(.has-dropdown) > .nav__link').forEach((a) => {
      a.addEventListener('click', () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', false); });
    });
    document.querySelectorAll('.nav__item.has-dropdown > .nav__link').forEach((link) => {
      link.addEventListener('click', (e) => {
        if (window.matchMedia('(max-width: 1080px)').matches) {
          e.preventDefault();
          link.parentElement.classList.toggle('is-open');
        }
      });
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // Testimonial slider
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = slider.querySelectorAll('.t-slide');
    const count = slider.querySelector('.t-count');
    let i = 0, timer;
    const show = (n) => {
      slides[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      if (count) count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 8000); };
    slider.querySelector('[data-prev]')?.addEventListener('click', () => { show(i - 1); auto(); });
    slider.querySelector('[data-next]')?.addEventListener('click', () => { show(i + 1); auto(); });
    show(0); auto();
  });

  // Sub-navigation active state (product pages)
  const subLinks = document.querySelectorAll('.subnav a');
  if (subLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    subLinks.forEach((a) => { const t = document.querySelector(a.getAttribute('href')); if (t) map.set(t, a); });
    const so = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          subLinks.forEach((a) => a.classList.remove('is-active'));
          const a = map.get(entry.target);
          a.classList.add('is-active');
          a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, t) => so.observe(t));
  }

  // Gallery filter + lightbox
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    document.querySelectorAll('.gallery-filters button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-filters button').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.dataset.filter;
        gallery.querySelectorAll('.figure').forEach((fig) => {
          fig.classList.toggle('is-hidden', f !== 'all' && fig.dataset.cat !== f);
        });
      });
    });
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<button aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    const close = () => lb.classList.remove('is-open');
    gallery.querySelectorAll('.figure img').forEach((img) => {
      img.parentElement.tabIndex = 0;
      const open = () => { lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add('is-open'); lb.querySelector('button').focus(); };
      img.parentElement.addEventListener('click', open);
      img.parentElement.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
    });
    lb.addEventListener('click', (e) => { if (e.target !== lbImg) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Quote form (front-end only — wire to your form handler)
  document.querySelectorAll('form[data-quote]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.classList.add('is-sent');
      form.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
