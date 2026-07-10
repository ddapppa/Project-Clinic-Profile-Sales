/* ===== SALES CONFIGURATION ===== */
var SALES_CONFIG = {
  phoneNumber: '6285864234079',
  salesName: 'Risvi Afriyanti'
};

/* ===== WHATSAPP LINK BUILDER ===== */
function buildWaLink(message) {
  var encodedMessage = encodeURIComponent(message);
  return 'https://wa.me/' + SALES_CONFIG.phoneNumber + '?text=' + encodedMessage;
}

/* ===== SET GENERAL WA LINKS ===== */
function setGeneralWaLinks() {
  var generalMessage = 'Halo ' + SALES_CONFIG.salesName + ', saya tertarik untuk konsultasi treatment di Sozo Skin Clinic. Bisa dibantu infonya?';
  var waLink = buildWaLink(generalMessage);

  var waElements = ['heroWaBtn', 'promoWaBtn', 'floatWaBtn', 'stepsWaBtn'];
  for (var i = 0; i < waElements.length; i++) {
    var el = document.getElementById(waElements[i]);
    if (el) { el.href = waLink; }
  }
}

/* ===== SET TREATMENT WA LINKS ===== */
function setTreatmentWaLinks() {
  var buttons = document.querySelectorAll('.btn-tanya');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      var treatment = this.getAttribute('data-treatment');
      var message = 'Halo ' + SALES_CONFIG.salesName + ', saya ingin tanya harga dan info lebih lanjut tentang treatment ' + treatment + ' di Sozo Skin Clinic.';
      window.open(buildWaLink(message), '_blank');
    });
  }
}

/* ===== CATEGORY CARD CLICK ===== */
function initCategoryCards() {
  // Fitur klik menuju WA dimatikan, card hanya memberikan efek pop up (hover) dari CSS
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  var anchors = document.querySelectorAll('a');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.charAt(0) === '#' && href.length > 1) {
        var targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          var navHeight = document.querySelector('.navbar').offsetHeight;
          var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
          closeMobileMenu();
        }
      }
    });
  }
}

/* ===== NAVBAR ACTIVE LINK ON SCROLL ===== */
function initActiveNavLink() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActive() {
    var scrollY = window.pageYOffset;
    var navHeight = document.querySelector('.navbar').offsetHeight;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var sectionTop = section.offsetTop - navHeight - 100;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        var id = section.getAttribute('id');
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove('active');
          if (navLinks[j].getAttribute('href') === '#' + id) {
            navLinks[j].classList.add('active');
          }
        }
      }
    }
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
}

/* ===== NAVBAR SCROLL EFFECT ===== */
function initNavbarScroll() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ===== HAMBURGER MENU ===== */
function initHamburgerMenu() {
  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

function closeMobileMenu() {
  var navMenu = document.getElementById('navMenu');
  var hamburger = document.getElementById('hamburger');
  if (navMenu) { navMenu.classList.remove('active'); }
  if (hamburger) { hamburger.classList.remove('active'); }
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  var revealElements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        // Staggered animation
        var delay = entries[i].target.dataset.delay || 0;
        entries[i].target.style.transitionDelay = delay + 'ms';
        entries[i].target.classList.add('active');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  for (var j = 0; j < revealElements.length; j++) {
    observer.observe(revealElements[j]);
  }
}

/* ===== STAGGER REVEAL FOR GRIDS ===== */
function addStaggerDelay() {
  var grids = document.querySelectorAll('.category-grid, .best-grid, .testi-grid, .features-inner, .trust-badges');
  for (var i = 0; i < grids.length; i++) {
    var children = grids[i].children;
    for (var j = 0; j < children.length; j++) {
      if (children[j].classList.contains('reveal')) {
        children[j].dataset.delay = j * 80;
      }
    }
  }
}

/* ===== COUNTER ANIMATION ===== */
function initCounterAnimation() {
  var counters = document.querySelectorAll('.counter');

  var counterObserver = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        animateCounter(entries[i].target);
        counterObserver.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.5 });

  for (var j = 0; j < counters.length; j++) {
    counterObserver.observe(counters[j]);
  }
}

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target'), 10);
  var duration = 1800;
  var stepTime = 16;
  var steps = duration / stepTime;
  var increment = target / steps;
  var current = 0;

  var timer = setInterval(function () {
    current = current + increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

/* ===== WISHLIST TOGGLE ===== */
function initWishlist() {
  var wishlistBtns = document.querySelectorAll('.wishlist-btn');
  for (var i = 0; i < wishlistBtns.length; i++) {
    wishlistBtns[i].addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('active');
      var icon = this.querySelector('i');
      if (this.classList.contains('active')) {
        icon.className = 'fa-solid fa-heart';
      } else {
        icon.className = 'fa-regular fa-heart';
      }
    });
  }
}

/* ===== PARALLAX EFFECT ON HERO IMAGE ===== */
function initHeroParallax() {
  var heroImg = document.querySelector('.hero-img img');
  if (!heroImg) return;

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset;
    if (scrollY < 600) {
      heroImg.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
    }
  });
}

/* ===== SET CURRENT YEAR ===== */
function setCurrentYear() {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ===== INIT ALL ===== */
document.addEventListener('DOMContentLoaded', function () {
  setGeneralWaLinks();
  setTreatmentWaLinks();
  initCategoryCards();
  initSmoothScroll();
  initActiveNavLink();
  initNavbarScroll();
  initHamburgerMenu();
  addStaggerDelay();
  initScrollReveal();
  initCounterAnimation();
  initWishlist();
  initHeroParallax();
  setCurrentYear();
});
