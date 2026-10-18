/**
 * Antixor Ocean - Individual Yacht Details Page Controller
 * Dynamic Lookup, Image Gallery Switcher, Specifications, Amenities, Dynamic Booking Widget
 */

document.addEventListener("DOMContentLoaded", () => {
  initBoatDetails();
});

function initBoatDetails() {
  const container = document.getElementById("boatDetailsContainer");
  if (!container || !window.getBoatById) return;

  const urlParams = new URLSearchParams(window.location.search);
  const boatId = urlParams.get("id");

  const boat = window.getBoatById(boatId);

  // If boat not found, show helpful error state
  if (!boat) {
    container.innerHTML = `
      <div class="empty-state" style="margin: 60px 0;">
        <div class="empty-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <h2>Vessel Not Found</h2>
        <p>We could not locate the yacht profile you requested. It may have been relocated or entered incorrectly.</p>
        <a href="boats.html" class="btn btn-primary">Browse Active Fleet</a>
      </div>
    `;
    return;
  }

  // Update Page Title
  document.title = `${boat.name} — Luxury Yacht Charter | Antixor Ocean`;

  // Update Breadcrumb if present
  const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = boat.name;

  // Render Full Details Page
  container.innerHTML = `
    <div class="yacht-detail-layout">
      <!-- Left Column: Media & Specifications -->
      <div class="detail-content-col">
        
        <!-- Gallery -->
        <div class="detail-gallery">
          <div class="detail-main-img-wrap">
            <img src="${boat.gallery[0] || boat.image}" alt="${boat.name}" id="mainGalleryImg" class="detail-main-img" />
            ${boat.badge ? `<span class="badge badge-gold yacht-card-badge" style="top:24px; left:24px;">${boat.badge}</span>` : ""}
          </div>
          <div class="detail-thumbnails" id="thumbnailList">
            ${boat.gallery.map((imgUrl, idx) => `
              <div class="thumbnail-item ${idx === 0 ? "is-active" : ""}" data-src="${imgUrl}">
                <img src="${imgUrl}" alt="${boat.name} angle ${idx + 1}" loading="lazy" />
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Title & Overview -->
        <div style="margin-bottom: 32px;">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <span class="badge badge-soft">${boat.categoryName}</span>
            <span style="font-size:0.875rem; color:var(--text-secondary); display:flex; align-items:center; gap:4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${boat.location}, ${boat.locationCountry}
            </span>
          </div>
          <h1 style="font-size:clamp(2.2rem, 4vw, 3rem); margin-bottom: 8px;">${boat.name}</h1>
          <p style="font-size:1.15rem; color:var(--ocean-teal); font-style:italic; margin-bottom:18px;">${boat.subtitle}</p>
          <p style="font-size:1.0625rem; line-height:1.7;">${boat.description}</p>
        </div>

        <!-- Technical Specifications Table -->
        <div style="margin-bottom: 40px;">
          <h3 style="font-size:1.5rem; margin-bottom: 16px;">Vessel Specifications</h3>
          <table class="specs-table">
            <tbody>
              ${Object.entries(boat.specifications).map(([key, val]) => `
                <tr>
                  <td>${key}</td>
                  <td><strong>${val}</strong></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Luxury Amenities -->
        <div style="margin-bottom: 40px;">
          <h3 style="font-size:1.5rem; margin-bottom: 16px;">Luxury Onboard Amenities</h3>
          <div class="amenities-grid">
            ${boat.amenities.map(a => `
              <div class="amenity-card">
                <div class="amenity-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <span>${a.name}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Included In Charter Rate -->
        <div style="margin-bottom: 40px;">
          <h3 style="font-size:1.5rem; margin-bottom: 16px;">Included in Charter Package</h3>
          <ul class="included-list">
            ${boat.includedServices.map(srv => `
              <li>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${srv}</span>
              </li>
            `).join("")}
          </ul>
        </div>

      </div>

      <!-- Right Column: Interactive Booking Widget -->
      <aside class="detail-sidebar-col">
        <div class="detail-booking-widget">
          <div class="widget-price-head">
            <div class="daily-price">$${boat.pricePerDay.toLocaleString()} <small>/ day</small></div>
            <span style="font-size:0.75rem; color:var(--text-light); text-transform:uppercase;">Demonstrative Rate • All Inclusive Package</span>
          </div>

          <form id="widgetBookingForm" class="widget-form">
            <div class="form-group">
              <label for="widgetDate">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Charter Date
              </label>
              <div class="input-with-icon">
                <input type="date" id="widgetDate" required />
              </div>
            </div>

            <div class="form-group">
              <label for="widgetDuration">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Duration
              </label>
              <div class="input-with-icon">
                <select id="widgetDuration">
                  <option value="1" data-multiplier="1">1 Full Day (8 Hours)</option>
                  <option value="0.5" data-multiplier="0.6">Half Day (4 Hours)</option>
                  <option value="2" data-multiplier="2">2 Days (Weekend Cruise)</option>
                  <option value="3" data-multiplier="2.9">3 Days (Long Weekend)</option>
                  <option value="7" data-multiplier="6.2">7 Days (Full Week Charter)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="widgetGuests">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                Guest Count (Max ${boat.capacity})
              </label>
              <div class="input-with-icon">
                <select id="widgetGuests">
                  ${Array.from({ length: boat.capacity }, (_, i) => `<option value="${i + 1}">${i + 1} Guest${i > 0 ? "s" : ""}</option>`).join("")}
                </select>
              </div>
            </div>

            <!-- Price Breakdown Calculation -->
            <div class="price-estimate-box">
              <div class="price-row">
                <span id="rateLabel">1 Day Charter</span>
                <span id="baseAmount">$${boat.pricePerDay.toLocaleString()}</span>
              </div>
              <div class="price-row">
                <span>Crew & Welcome Service</span>
                <span style="color:var(--turquoise);">Included</span>
              </div>
              <div class="price-row">
                <span>Port Fees & Amenities</span>
                <span style="color:var(--turquoise);">Included</span>
              </div>
              <div class="price-row total">
                <span>Estimated Total</span>
                <span id="totalEstimate" style="color:var(--navy-deep); font-size:1.25rem;">$${boat.pricePerDay.toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn-lg" style="width: 100%;">
              Book This Yacht
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <p style="font-size:0.75rem; text-align:center; color:var(--text-light); margin-top:8px;">
              No payment required today. Submit a tailored charter inquiry.
            </p>
          </form>
        </div>
      </aside>
    </div>

    <!-- Related Vessels Section -->
    <section class="section" style="padding-top: 60px;">
      <div class="section-header">
        <span class="eyebrow">CURATED SELECTION</span>
        <h2>You May Also Like</h2>
        <p>Similar luxury vessels available for private charter.</p>
      </div>
      <div class="yacht-grid" id="relatedBoatsGrid"></div>
    </section>
  `;

  // Initialize Gallery switcher
  const mainImg = document.getElementById("mainGalleryImg");
  const thumbs = document.querySelectorAll(".thumbnail-item");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
      const newSrc = thumb.getAttribute("data-src");
      if (mainImg && newSrc) {
        mainImg.src = newSrc;
      }
    });
  });

  // Initialize Date Input
  const widgetDate = document.getElementById("widgetDate");
  if (widgetDate) {
    const today = new Date().toISOString().split("T")[0];
    widgetDate.min = today;
    widgetDate.value = today;
  }

  // Interactive Price Calculator
  const durationSelect = document.getElementById("widgetDuration");
  const rateLabel = document.getElementById("rateLabel");
  const baseAmount = document.getElementById("baseAmount");
  const totalEstimate = document.getElementById("totalEstimate");

  const updateEstimate = () => {
    if (!durationSelect || !totalEstimate) return;
    const selectedOption = durationSelect.options[durationSelect.selectedIndex];
    const multiplier = parseFloat(selectedOption.getAttribute("data-multiplier")) || 1;
    const days = parseFloat(durationSelect.value);

    let calculatedTotal = Math.round(boat.pricePerDay * multiplier);
    if (days === 0.5 && boat.priceHalfDay) {
      calculatedTotal = boat.priceHalfDay;
    }

    if (rateLabel) {
      rateLabel.textContent = days === 0.5 ? "Half Day (4h)" : `${days} Day${days > 1 ? "s" : ""}`;
    }
    if (baseAmount) baseAmount.textContent = `$${calculatedTotal.toLocaleString()}`;
    if (totalEstimate) totalEstimate.textContent = `$${calculatedTotal.toLocaleString()}`;
  };

  if (durationSelect) durationSelect.addEventListener("change", updateEstimate);

  // Widget Booking Submission
  const widgetForm = document.getElementById("widgetBookingForm");
  if (widgetForm) {
    widgetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dateVal = widgetDate ? widgetDate.value : "";
      const durVal = durationSelect ? durationSelect.value : "1";
      const guestVal = document.getElementById("widgetGuests") ? document.getElementById("widgetGuests").value : "2";

      // Redirect to booking page carrying yacht ID and specs
      const params = new URLSearchParams();
      params.set("id", boat.id);
      params.set("date", dateVal);
      params.set("duration", durVal);
      params.set("guests", guestVal);

      window.location.href = `booking.html?${params.toString()}`;
    });
  }

  // Render Related Yachts
  const relatedGrid = document.getElementById("relatedBoatsGrid");
  if (relatedGrid && window.getRelatedBoats) {
    const related = window.getRelatedBoats(boat.id, 3);
    related.forEach(rel => {
      const relCard = document.createElement("article");
      relCard.className = "yacht-card";
      relCard.innerHTML = `
        <div class="yacht-card-img-wrap">
          <img src="${rel.image}" alt="${rel.name}" class="yacht-card-img" loading="lazy" />
          <span class="yacht-card-location">${rel.location}</span>
        </div>
        <div class="yacht-card-body">
          <span class="yacht-card-category">${rel.categoryName}</span>
          <h3 class="yacht-card-title"><a href="boat-details.html?id=${rel.id}">${rel.name}</a></h3>
          <div class="yacht-card-footer">
            <div class="price-tag">
              <span class="label">From</span>
              <div class="amount">$${rel.pricePerDay.toLocaleString()} <small>/ day</small></div>
            </div>
            <a href="boat-details.html?id=${rel.id}" class="btn btn-sm btn-outline-navy">View Details</a>
          </div>
        </div>
      `;
      relatedGrid.appendChild(relCard);
    });
  }
}
