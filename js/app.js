/**
 * Antixor Ocean - Global Application Logic
 * Navigation, Sticky Header, Mobile Drawer, Search Modal, Newsletter, Toasts
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileDrawer();
  initSearchModal();
  initNewsletter();
  highlightActiveNav();
  initDatePickers();
});

/* --------------------------------------------------------------------------
   Sticky Header on Scroll
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Trigger initial state
}

/* --------------------------------------------------------------------------
   Active Navigation Highlighting
   -------------------------------------------------------------------------- */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .drawer-links a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("?")[0].split("/").pop();

    if (
      (currentPath === "" && linkPath === "index.html") ||
      linkPath === currentPath ||
      (currentPath.includes("boat") && linkPath === "boats.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Drawer Menu
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const closeBtn = document.querySelector(".drawer-close");

  if (!hamburgerBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    hamburgerBtn.classList.add("is-active");
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    hamburgerBtn.classList.remove("is-active");
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  hamburgerBtn.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  // Close when nav links are tapped
  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", closeDrawer);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   Global Search Modal
   -------------------------------------------------------------------------- */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll(".btn-search-trigger, .drawer-search-btn");
  const modalBackdrop = document.querySelector(".search-modal-backdrop");
  const closeBtn = document.querySelector(".search-close-btn");
  const searchInput = document.querySelector(".search-modal-input");
  const searchForm = document.querySelector(".search-modal-form");
  const quickTags = document.querySelectorAll(".quick-tag");

  if (!modalBackdrop) return;

  const openModal = () => {
    modalBackdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 150);
  };

  const closeModal = () => {
    modalBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  searchTriggers.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `boats.html?search=${encodeURIComponent(query)}`;
      }
    });
  }

  quickTags.forEach(tag => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      const term = tag.getAttribute("data-tag") || tag.textContent.trim();
      window.location.href = `boats.html?search=${encodeURIComponent(term)}`;
    });
  });
}

/* --------------------------------------------------------------------------
   Newsletter Subscription Form
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const forms = document.querySelectorAll(".footer-newsletter-form, .newsletter-card-form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const msg = form.querySelector(".newsletter-msg");

      if (!input) return;
      const email = input.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (msg) {
          msg.textContent = "Please enter a valid luxury email address.";
          msg.className = "newsletter-msg is-error";
        } else {
          showToast("Please enter a valid email address.", "error");
        }
        input.focus();
        return;
      }

      // Demo success response
      input.value = "";
      if (msg) {
        msg.textContent = "Thank you! You are now subscribed to Antixor Ocean dispatch (Demo mode).";
        msg.className = "newsletter-msg is-success";
      }
      showToast("Thank you! You are subscribed to Antixor Ocean dispatches.", "success");
    });
  });
}

/* --------------------------------------------------------------------------
   Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconSvg = type === "success" 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : type === "error"
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-content">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --------------------------------------------------------------------------
   Date Picker Defaults & Prevention of Past Dates
   -------------------------------------------------------------------------- */
function initDatePickers() {
  const dateInputs = document.querySelectorAll("input[type='date']");
  const today = new Date().toISOString().split("T")[0];

  dateInputs.forEach(input => {
    input.min = today;
    if (!input.value) {
      input.value = today;
    }
  });
}

// Make accessible globally
window.showToast = showToast;
