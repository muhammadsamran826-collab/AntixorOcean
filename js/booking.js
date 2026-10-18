/**
 * Antixor Ocean - Booking Request Page Controller
 * Form Validation, Dynamic Price Estimation, Live Summary, Confirmation Modal
 */

document.addEventListener("DOMContentLoaded", () => {
  initBookingPage();
});

function initBookingPage() {
  const yachtSelect = document.getElementById("bookingYachtSelect");
  const yachtPreviewEl = document.getElementById("yachtSummaryPreview");
  const dateInput = document.getElementById("bookingDate");
  const durationSelect = document.getElementById("bookingDuration");
  const guestsSelect = document.getElementById("bookingGuests");
  const bookingForm = document.getElementById("charterBookingForm");
  const modal = document.getElementById("bookingConfirmationModal");

  if (!bookingForm || !window.getAllBoats) return;

  const allBoats = window.getAllBoats();
  const urlParams = new URLSearchParams(window.location.search);
  const initialId = urlParams.get("id");
  const initialDate = urlParams.get("date");
  const initialDuration = urlParams.get("duration");
  const initialGuests = urlParams.get("guests");

  // Populate Yacht Dropdown
  if (yachtSelect) {
    yachtSelect.innerHTML = "";
    allBoats.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.id;
      opt.textContent = `${b.name} (${b.categoryName} • ${b.location} • $${b.pricePerDay.toLocaleString()}/day)`;
      yachtSelect.appendChild(opt);
    });

    if (initialId && window.getBoatById(initialId)) {
      yachtSelect.value = initialId;
    } else {
      yachtSelect.value = allBoats[0].id;
    }
  }

  // Prepopulate Date
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    dateInput.value = (initialDate && initialDate >= today) ? initialDate : today;
  }

  // Prepopulate Duration if matching
  if (durationSelect && initialDuration) {
    Array.from(durationSelect.options).forEach(opt => {
      if (opt.value === initialDuration) opt.selected = true;
    });
  }

  // Update Yacht Info & Pricing Breakdown
  const updateBookingState = () => {
    const selectedBoatId = yachtSelect ? yachtSelect.value : (initialId || allBoats[0].id);
    const boat = window.getBoatById(selectedBoatId) || allBoats[0];

    // Populate Guests Dropdown if capacity changed
    if (guestsSelect) {
      const currentSelectedGuest = parseInt(guestsSelect.value) || 2;
      guestsSelect.innerHTML = "";
      for (let i = 1; i <= boat.capacity; i++) {
        const gOpt = document.createElement("option");
        gOpt.value = i;
        gOpt.textContent = `${i} Guest${i > 1 ? "s" : ""} (Max ${boat.capacity})`;
        if (i === currentSelectedGuest || (initialGuests && parseInt(initialGuests) === i)) {
          gOpt.selected = true;
        }
        guestsSelect.appendChild(gOpt);
      }
    }

    // Update Summary Card Preview
    if (yachtPreviewEl) {
      yachtPreviewEl.innerHTML = `
        <img src="${boat.image}" alt="${boat.name}" class="summary-thumb" />
        <div class="summary-meta">
          <h4>${boat.name}</h4>
          <span>${boat.categoryName}</span>
          <div style="font-size:0.8125rem; color:var(--text-secondary); margin-top:4px;">
            Port: <strong>${boat.location}, ${boat.locationCountry}</strong>
          </div>
        </div>
      `;
    }

    // Calculate Price Estimate
    const duration = durationSelect ? parseFloat(durationSelect.value) : 1;
    let multiplier = 1;
    let durationLabel = "1 Full Day";

    if (duration === 0.5) {
      multiplier = 0.6;
      durationLabel = "Half Day (4h)";
    } else if (duration === 1) {
      multiplier = 1;
      durationLabel = "1 Full Day (8h)";
    } else if (duration === 2) {
      multiplier = 2;
      durationLabel = "Weekend (2 Days)";
    } else if (duration === 3) {
      multiplier = 2.9;
      durationLabel = "3 Days Cruise";
    } else if (duration === 7) {
      multiplier = 6.2;
      durationLabel = "Weekly Charter (7 Days)";
    }

    let baseRate = Math.round(boat.pricePerDay * multiplier);
    if (duration === 0.5 && boat.priceHalfDay) {
      baseRate = boat.priceHalfDay;
    }

    const estimatedTax = Math.round(baseRate * 0.05); // Demo 5% maritime conservation & port fee
    const estimatedTotal = baseRate + estimatedTax;

    // Update Price Rows
    const durationLabelEl = document.getElementById("summaryDurationLabel");
    const baseRateEl = document.getElementById("summaryBaseRate");
    const portFeeEl = document.getElementById("summaryPortFee");
    const grandTotalEl = document.getElementById("summaryGrandTotal");

    if (durationLabelEl) durationLabelEl.textContent = `${boat.name} (${durationLabel})`;
    if (baseRateEl) baseRateEl.textContent = `$${baseRate.toLocaleString()}`;
    if (portFeeEl) portFeeEl.textContent = `$${estimatedTax.toLocaleString()}`;
    if (grandTotalEl) grandTotalEl.textContent = `$${estimatedTotal.toLocaleString()}`;
  };

  // Listeners for dynamic updates
  if (yachtSelect) yachtSelect.addEventListener("change", updateBookingState);
  if (durationSelect) durationSelect.addEventListener("change", updateBookingState);

  // Initial Calculation
  updateBookingState();

  // Form Submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedBoatId = yachtSelect.value;
    const boat = window.getBoatById(selectedBoatId);
    const dateVal = dateInput.value;
    const durationText = durationSelect.options[durationSelect.selectedIndex].text;
    const guestsVal = guestsSelect.value;
    const fullName = document.getElementById("custName").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const notes = document.getElementById("custNotes").value.trim();
    const agreeTerms = document.getElementById("agreeTerms").checked;

    if (!agreeTerms) {
      window.showToast("Please review and agree to the charter demonstration terms.", "error");
      return;
    }

    // Generate Demo Booking Reference
    const randomRef = "AO-" + Math.floor(100000 + Math.random() * 900000);
    const grandTotalText = document.getElementById("summaryGrandTotal").textContent;

    // Fill Modal Data
    const modalContent = document.getElementById("modalConfirmationContent");
    if (modalContent) {
      modalContent.innerHTML = `
        <span class="booking-ref-badge">Charter Reference: ${randomRef}</span>
        <h3>Booking Request Received!</h3>
        <p style="color:var(--text-secondary); margin-bottom:24px;">
          Thank you, <strong>${fullName}</strong>. Your tailored charter request for the <strong>${boat.name}</strong> has been logged in demonstration mode.
        </p>

        <div class="confirmation-details-box">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Vessel:</span>
            <strong>${boat.name}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Destination:</span>
            <strong>${boat.location}, ${boat.locationCountry}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Charter Date:</span>
            <strong>${dateVal}</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-secondary);">Duration & Party:</span>
            <strong>${durationText} • ${guestsVal} Guests</strong>
          </div>
          <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--border-color); padding-top:8px; margin-top:4px;">
            <span style="color:var(--text-secondary);">Estimated Total:</span>
            <strong style="color:var(--navy-deep); font-size:1.1rem;">${grandTotalText}</strong>
          </div>
        </div>

        <div class="demo-disclaimer-alert" style="margin-bottom:24px; text-align:left;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div>
            <strong>Demonstration Notice:</strong>
            <p style="font-size:0.75rem; margin-top:2px;">No payment card has been charged and no live booking system is connected. In production, this request would be routed to the charter concierge.</p>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:center;">
          <a href="boats.html" class="btn btn-primary btn-sm">Explore More Yachts</a>
          <button type="button" class="btn btn-outline-navy btn-sm" id="closeModalBtn">Close Window</button>
        </div>
      `;
    }

    if (modal) {
      modal.classList.add("is-open");
      const closeBtn = document.getElementById("closeModalBtn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.classList.remove("is-open"));
      }
    }

    // Reset Form
    bookingForm.reset();
    updateBookingState();
    window.showToast("Charter request submitted successfully!", "success");
  });

  // Modal Backdrop Close
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("is-open");
    });
  }
}
