// ============================================
// KONFIGURASI - GANTI DENGAN DATA SALES KAMU
// ============================================
const SALES_CONFIG = {
  phoneNumber: "62XXXXXXXXXX", // Ganti [NOMOR_WA_SALES], format: 62 diikuti nomor tanpa 0 di depan
  salesName: "[NAMA_SALES]"
};

// ============================================
// GENERATE WHATSAPP LINK
// ============================================
function buildWaLink(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SALES_CONFIG.phoneNumber}?text=${encodedMessage}`;
}

// Set link untuk tombol WA umum (navbar, hero, promo, float button)
function setGeneralWaLinks() {
  const generalMessage = `Halo ${SALES_CONFIG.salesName}, saya tertarik untuk konsultasi treatment di Sozo Skin Clinic. Bisa dibantu infonya?`;
  const waLink = buildWaLink(generalMessage);

  document.getElementById("navCta").href = waLink;
  document.getElementById("heroWaBtn").href = waLink;
  document.getElementById("promoWaBtn").href = waLink;
  document.getElementById("floatWaBtn").href = waLink;
}

// Set link dinamis untuk setiap tombol "Tanya Harga"
function setTreatmentWaLinks() {
  const buttons = document.querySelectorAll(".btn-tanya");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const treatment = btn.getAttribute("data-treatment");
      const message = `Halo ${SALES_CONFIG.salesName}, saya ingin tanya harga dan info lebih lanjut tentang treatment "${treatment}" di Sozo Skin Clinic.`;
      window.open(buildWaLink(message), "_blank");
    });
  });
}

// ============================================
// SMOOTH SCROLL UNTUK ANCHOR LINK
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          closeMobileMenu();
        }
      }
    });
  });
}

// ============================================
// HAMBURGER MENU MOBILE
// ============================================
function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

function closeMobileMenu() {
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.getElementById("hamburger");
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ============================================
// COUNTER ANIMATION UNTUK STATISTIK
// ============================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const duration = 1500;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ============================================
// SET TAHUN OTOMATIS DI FOOTER
// ============================================
function setCurrentYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

// ============================================
// INIT SEMUA FUNGSI SAAT DOM READY
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  setGeneralWaLinks();
  setTreatmentWaLinks();
  initSmoothScroll();
  initHamburgerMenu();
  initScrollReveal();
  initCounterAnimation();
  setCurrentYear();
});