/**
 * Antixor Ocean - Boats Listing & Search Controller
 * Filtering, Sorting, URL Query Parsing, Dynamic Grid Rendering
 */

document.addEventListener("DOMContentLoaded", () => {
  initBoatsCatalog();
});

function initBoatsCatalog() {
  const gridContainer = document.getElementById("boatsGrid");
  const resultsCountEl = document.getElementById("resultsCount");
  const sortSelect = document.getElementById("sortBoats");
  const resetBtn = document.getElementById("resetFiltersBtn");
  const searchInput = document.getElementById("keywordSearch");
  const destinationSelect = document.getElementById("filterDestination");
  const guestInput = document.getElementById("filterGuests");
  const guestValueDisplay = document.getElementById("guestValueDisplay");
  const priceSlider = document.getElementById("filterMaxPrice");
  const priceValueDisplay = document.getElementById("priceValueDisplay");
  const categoryCheckboxes = document.querySelectorAll("input[name='categoryFilter']");

  if (!gridContainer || !window.getAllBoats) return;

  const allBoats = window.getAllBoats();

  // Read URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category");
  const initialLocation = urlParams.get("location");
  const initialSearch = urlParams.get("search");
  const initialGuests = urlParams.get("guests");
  const initialMaxPrice = urlParams.get("maxPrice");
  const initialTab = urlParams.get("tab");

  // Apply initial parameters to UI form controls
  if (initialLocation && destinationSelect) {
    destinationSelect.value = initialLocation;
  }

  if (initialCategory && categoryCheckboxes.length > 0) {
    categoryCheckboxes.forEach(cb => {
      cb.checked = (cb.value === initialCategory);
    });
  }

  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }

  if (initialGuests && guestInput) {
    guestInput.value = initialGuests;
    if (guestValueDisplay) guestValueDisplay.textContent = `${initialGuests}+ Guests`;
  }

  if (initialMaxPrice && priceSlider) {
    priceSlider.value = initialMaxPrice;
    if (priceValueDisplay) priceValueDisplay.textContent = `$${parseInt(initialMaxPrice).toLocaleString()}`;
  }

  // Handle Tab intent from homepage
  if (initialTab && !initialCategory && categoryCheckboxes.length > 0) {
    if (initialTab === "fishing-tours" || initialTab === "day-trips") {
      // Preselect speed boats
      categoryCheckboxes.forEach(cb => {
        if (cb.value === "speed-boats") cb.checked = true;
      });
    }
  }

  // Main Filtering Logic
  const getFilteredBoats = () => {
    let filtered = [...allBoats];

    // 1. Keyword search (Name, description, location, builder)
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchTerm) ||
        b.location.toLowerCase().includes(searchTerm) ||
        b.categoryName.toLowerCase().includes(searchTerm) ||
        b.description.toLowerCase().includes(searchTerm) ||
        b.builder.toLowerCase().includes(searchTerm)
      );
    }

    // 2. Category Filter (Checkboxes)
    const checkedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    if (checkedCategories.length > 0 && !checkedCategories.includes("all")) {
      filtered = filtered.filter(b => checkedCategories.includes(b.category));
    }

    // 3. Destination Filter
    const dest = destinationSelect ? destinationSelect.value : "";
    if (dest && dest !== "all") {
      filtered = filtered.filter(b => b.location.toLowerCase() === dest.toLowerCase());
    }

    // 4. Guest Capacity Filter
    const minGuests = guestInput ? parseInt(guestInput.value) || 0 : 0;
    if (minGuests > 0) {
      filtered = filtered.filter(b => b.capacity >= minGuests);
    }

    // 5. Max Price Filter
    const maxPrice = priceSlider ? parseInt(priceSlider.value) || 10000 : 10000;
    filtered = filtered.filter(b => b.pricePerDay <= maxPrice);

    // 6. Sorting
    const sortVal = sortSelect ? sortSelect.value : "popular";
    if (sortVal === "price-asc") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortVal === "price-desc") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortVal === "capacity-desc") {
      filtered.sort((a, b) => b.capacity - a.capacity);
    } else if (sortVal === "length-desc") {
      filtered.sort((a, b) => parseFloat(b.length) - parseFloat(a.length));
    } else {
      // Default: Featured / Popular first
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  };

  // Render Function
  const renderCatalog = () => {
    const boats = getFilteredBoats();

    // Update count display
    if (resultsCountEl) {
      resultsCountEl.innerHTML = `Showing <strong>${boats.length}</strong> of ${allBoats.length} luxury vessels`;
    }

    if (boats.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </div>
          <h3>No Vessels Found</h3>
          <p>We could not find any luxury yachts matching your selected search criteria.</p>
          <button type="button" class="btn btn-primary btn-sm" id="emptyResetBtn">Reset All Filters</button>
        </div>
      `;

      const emptyReset = document.getElementById("emptyResetBtn");
      if (emptyReset) {
        emptyReset.addEventListener("click", resetAllFilters);
      }
      return;
    }

    gridContainer.innerHTML = "";
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
      gridContainer.appendChild(card);
    });
  };

  // Reset Filters Function
  const resetAllFilters = () => {
    if (searchInput) searchInput.value = "";
    if (destinationSelect) destinationSelect.value = "all";
    if (guestInput) {
      guestInput.value = "1";
      if (guestValueDisplay) guestValueDisplay.textContent = "Any Guests";
    }
    if (priceSlider) {
      priceSlider.value = "6000";
      if (priceValueDisplay) priceValueDisplay.textContent = "$6,000 / day";
    }
    if (sortSelect) sortSelect.value = "popular";
    categoryCheckboxes.forEach(cb => {
      cb.checked = (cb.value === "all");
    });

    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
    renderCatalog();
    window.showToast("Filters reset to default fleet inventory.", "info");
  };

  // Attach Event Listeners
  if (sortSelect) sortSelect.addEventListener("change", renderCatalog);
  if (destinationSelect) destinationSelect.addEventListener("change", renderCatalog);
  if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);

  categoryCheckboxes.forEach(cb => {
    cb.addEventListener("change", (e) => {
      if (e.target.value === "all" && e.target.checked) {
        categoryCheckboxes.forEach(other => {
          if (other.value !== "all") other.checked = false;
        });
      } else if (e.target.value !== "all" && e.target.checked) {
        const allCb = document.querySelector("input[name='categoryFilter'][value='all']");
        if (allCb) allCb.checked = false;
      }
      renderCatalog();
    });
  });

  if (guestInput) {
    guestInput.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      if (guestValueDisplay) {
        guestValueDisplay.textContent = val > 1 ? `${val}+ Guests` : "Any Guests";
      }
      renderCatalog();
    });
  }

  if (priceSlider) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      if (priceValueDisplay) {
        priceValueDisplay.textContent = `$${val.toLocaleString()} / day`;
      }
      renderCatalog();
    });
  }

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(renderCatalog, 250);
    });
  }

  // Initial render
  renderCatalog();
}
