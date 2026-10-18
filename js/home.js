/**
 * Antixor Ocean - Homepage Specific Logic
 * Tabbed Booking Panel, Dynamic Featured Yachts, Categories, Destinations, Testimonial Carousel
 */

document.addEventListener("DOMContentLoaded", () => {
  initBookingSearchPanel();
  renderFeaturedYachts();
  renderBoatCategories();
  renderDestinations();
  renderStatistics();
  initTestimonialCarousel();
  initVideoModal();
});

/* --------------------------------------------------------------------------
   1. Floating Booking Search Panel
   -------------------------------------------------------------------------- */
function initBookingSearchPanel() {
  const tabButtons = document.querySelectorAll(".booking-tab-btn");
  const durationSelect = document.getElementById("searchDuration");
  const bookingForm = document.getElementById("homeBookingForm");
  const dateInput = document.getElementById("searchDate");
  const locationSelect = document.getElementById("searchLocation");

  let activeTab = "yacht-charter";

  // Tab configurations for duration dropdown
  const tabDurations = {
    "yacht-charter": [
      { value: "full-day", label: "Full Day Charter (8h)" },
      { value: "half-day", label: "Half Day (4h)" },
      { value: "2-days", label: "Weekend Cruise (2 Days)" },
      { value: "3-5-days", label: "Extended Voyage (3-5 Days)" },
      { value: "weekly", label: "Weekly Charter (7 Days)" }
    ],
    "boat-tours": [
      { value: "2-hours", label: "Coastal Express Tour (2h)" },
      { value: "half-day", label: "Half Day Scenic Tour (4h)" },
      { value: "sunset", label: "Romantic Sunset Cruise (3h)" }
    ],
    "day-trips": [
      { value: "half-day", label: "Half Day Island Hop (4h)" },
      { value: "full-day", label: "Full Day Adventure (8h)" },
      { value: "lagoon-snorkeling", label: "Snorkeling Lagoon Day (6h)" }
    ],
    "fishing-tours": [
      { value: "half-day-fishing", label: "Morning Coastal Angling (4h)" },
      { value: "deep-sea", label: "Deep Sea Big Game (8h)" },
      { value: "all-day-expedition", label: "Extreme Offshore Expedition (10h)" }
    ]
  };

  const updateDurationOptions = (tabKey) => {
    if (!durationSelect) return;
    const options = tabDurations[tabKey] || tabDurations["yacht-charter"];
    durationSelect.innerHTML = "";
    options.forEach(opt => {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      durationSelect.appendChild(optionEl);
    });
  };

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeTab = btn.getAttribute("data-tab");
      updateDurationOptions(activeTab);
    });
  });

  // Initialize default durations
  updateDurationOptions("yacht-charter");

  // Prevent selecting dates in the past
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const location = locationSelect ? locationSelect.value : "";
      const date = dateInput ? dateInput.value : "";
      const duration = durationSelect ? durationSelect.value : "";

      if (!location) {
        window.showToast("Please select your preferred ocean destination.", "error");
        if (locationSelect) locationSelect.focus();
        return;
      }

      if (!date) {
        window.showToast("Please choose a charter start date.", "error");
        if (dateInput) dateInput.focus();
        return;
      }

      // Build Query String
      const params = new URLSearchParams();
      params.set("tab", activeTab);
      params.set("location", location);
      params.set("date", date);
      params.set("duration", duration);

      // Redirect to boats.html with search parameters
      window.location.href = `boats.html?${params.toString()}`;
    });
  }
}

/* --------------------------------------------------------------------------
   2. Render Featured Yachts (Section C)
   -------------------------------------------------------------------------- */
function renderFeaturedYachts() {
  const container = document.getElementById("featuredYachtsGrid");
  if (!container || !window.getFeaturedBoats) return;

  const boats = window.getFeaturedBoats();
  container.innerHTML = "";

  boats.forEach(boat => {
    const card = document.createElement("article");
    card.className = "yacht-card";
    card.innerHTML = `
      <div class="yacht-card-img-wrap">
        <img src="${boat.image}" alt="${boat.name} luxury yacht charter" class="yacht-card-img" loading="lazy" />
        ${boat.badge ? `<span class="badge badge-gold yacht-card-badge">${boat.badge}</span>` : ""}
        <span class="yacht-card-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${boat.location}
        </span>
      </div>
      <div class="yacht-card-body">
        <span class="yacht-card-category">${boat.categoryName}</span>
        <h3 class="yacht-card-title">
          <a href="boat-details.html?id=${boat.id}">${boat.name}</a>
        </h3>
        
        <div class="yacht-specs-strip">
          <div class="spec-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <strong>${boat.capacity} Guests</strong>
            <span>Capacity</span>
          </div>
          <div class="spec-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
            <strong>${boat.cabins} Cabins</strong>
            <span>Layout</span>
          </div>
          <div class="spec-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            <strong>${boat.length.split(" ")[0]}</strong>
            <span>Length</span>
          </div>
        </div>

        <div class="yacht-card-footer">
          <div class="price-tag">
            <span class="label">Demo Daily Rate</span>
            <div class="amount">$${boat.pricePerDay.toLocaleString()} <small>/ day</small></div>
          </div>
          <div class="card-actions">
            <a href="boat-details.html?id=${boat.id}" class="btn btn-sm btn-outline-navy" aria-label="View details for ${boat.name}">Details</a>
            <a href="booking.html?id=${boat.id}" class="btn-arrow-icon" title="Book ${boat.name}" aria-label="Book ${boat.name}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   3. Render Boat Categories (Section D)
   -------------------------------------------------------------------------- */
function renderBoatCategories() {
  const container = document.getElementById("categoriesGrid");
  if (!container || !window.SITE_DATA || !window.SITE_DATA.categories) return;

  container.innerHTML = "";
  window.SITE_DATA.categories.forEach(cat => {
    const card = document.createElement("a");
    card.href = `boats.html?category=${cat.id}`;
    card.className = "category-card";
    card.setAttribute("aria-label", `Explore ${cat.name} fleet`);
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" class="category-card-bg" loading="lazy" />
      <div class="category-card-overlay"></div>
      <div class="category-card-content">
        <span class="category-card-count">${cat.count}</span>
        <h3 class="category-card-title">${cat.name}</h3>
        <p class="category-card-desc">${cat.description}</p>
        <div class="category-card-link">
          Explore Fleet
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   4. Render Popular Destinations (Section F)
   -------------------------------------------------------------------------- */
function renderDestinations() {
  const container = document.getElementById("destinationsGrid");
  if (!container || !window.DESTINATIONS_DATA) return;

  container.innerHTML = "";
  window.DESTINATIONS_DATA.forEach(dest => {
    const card = document.createElement("a");
    card.href = `boats.html?location=${encodeURIComponent(dest.name)}`;
    card.className = "destination-card";
    card.setAttribute("aria-label", `Explore yachts in ${dest.name}`);
    card.innerHTML = `
      <img src="${dest.image}" alt="${dest.name} luxury yacht destination" class="destination-card-bg" loading="lazy" />
      <div class="destination-card-overlay"></div>
      <div class="destination-card-content">
        <span class="destination-fleet-pill">${dest.yachtCount}+ Yachts Available</span>
        <h3 class="destination-card-title">${dest.name}</h3>
        <p class="destination-card-desc">${dest.shortDescription}</p>
        <div class="destination-card-link">
          Charter in ${dest.name}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   5. Render Fleet Statistics (Section G)
   -------------------------------------------------------------------------- */
function renderStatistics() {
  const container = document.getElementById("statisticsGrid");
  if (!container || !window.SITE_DATA || !window.SITE_DATA.statistics) return;

  container.innerHTML = "";
  window.SITE_DATA.statistics.forEach(stat => {
    const item = document.createElement("div");
    item.className = "stat-item";
    item.innerHTML = `
      <div class="stat-number">${stat.value}</div>
      <div class="stat-title">${stat.label}</div>
      <div class="stat-desc">${stat.description}</div>
    `;
    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   6. Customer Testimonials Carousel (Section H)
   -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  const dotsContainer = document.getElementById("carouselDots");

  if (!track || !window.SITE_DATA || !window.SITE_DATA.testimonials) return;

  const items = window.SITE_DATA.testimonials;
  track.innerHTML = "";
  if (dotsContainer) dotsContainer.innerHTML = "";

  items.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "testimonial-slide";
    slide.innerHTML = `
      <div class="testimonial-card">
        <div class="testimonial-quote-icon">“</div>
        <div class="star-rating" aria-label="5 out of 5 stars">
          ${Array(item.rating).fill('<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>').join("")}
        </div>
        <h4 class="testimonial-headline">"${item.headline}"</h4>
        <p class="testimonial-text">${item.quote}</p>
        <div class="testimonial-author-row">
          <div class="author-info">
            <img src="${item.avatar}" alt="${item.name}" class="author-avatar" loading="lazy" />
            <div class="author-meta">
              <h5>${item.name}</h5>
              <span>${item.location}</span>
            </div>
          </div>
          <span class="testimonial-yacht-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            ${item.yachtChartered}
          </span>
        </div>
      </div>
    `;
    track.appendChild(slide);

    if (dotsContainer) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${index === 0 ? "is-active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    }
  });

  let currentIndex = 0;
  const totalSlides = items.length;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".carousel-dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === currentIndex);
      });
    }
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel();
  };

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  // Keyboard navigation
  track.parentElement.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToSlide(currentIndex - 1);
    if (e.key === "ArrowRight") goToSlide(currentIndex + 1);
  });

  // Touch Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) goToSlide(currentIndex + 1); // Swiped left
    if (touchEndX - touchStartX > 50) goToSlide(currentIndex - 1); // Swiped right
  }, { passive: true });

  // Auto-play with pause on hover
  let autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 7000);
  const wrapper = track.closest(".testimonial-carousel-wrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
    wrapper.addEventListener("mouseleave", () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 7000);
    });
  }
}

/* --------------------------------------------------------------------------
   7. Interactive Video Experience Modal
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const triggers = document.querySelectorAll(".video-play-btn, .explore-video-btn");
  triggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Show an elegant modal showcasing the yacht lifestyle video preview
      let modal = document.getElementById("yachtVideoModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "yachtVideoModal";
        modal.className = "modal-backdrop";
        modal.innerHTML = `
          <div class="confirmation-card" style="max-width: 800px; padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <h3 style="font-size:1.3rem; margin:0;">Antixor Ocean Cinematography</h3>
              <button class="search-close-btn" id="closeVideoModal" aria-label="Close video">&times;</button>
            </div>
            <div style="position:relative; width:100%; aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden;">
              <img src="assets/images/lifestyle-deck.jpg" alt="Antixor Ocean Experience" style="width:100%; height:100%; object-fit:cover;" />
              <div style="position:absolute; inset:0; background:rgba(6,26,43,0.5); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding:20px;">
                <div class="badge-icon-gold" style="width:64px; height:64px; font-size:24px; margin-bottom:16px;">▶</div>
                <h4 style="font-size:1.4rem; color:#fff; margin-bottom:8px;">Bespoke Private Yacht Charter Preview</h4>
                <p style="font-size:0.9rem; color:rgba(255,255,255,0.85); max-width:500px;">Cinematic Mediterranean & Maldivian expedition footage. Connect with our concierge to arrange an itinerary preview.</p>
                <a href="boats.html" class="btn btn-gold btn-sm" style="margin-top:16px;">Browse Charter Fleet</a>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector("#closeVideoModal").addEventListener("click", () => {
          modal.classList.remove("is-open");
        });
        modal.addEventListener("click", (evt) => {
          if (evt.target === modal) modal.classList.remove("is-open");
        });
      }
      modal.classList.add("is-open");
    });
  });
}
