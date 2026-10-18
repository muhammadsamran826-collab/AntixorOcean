/**
 * Antixor Ocean - Contact Page Logic
 * Form Validation, Inquiry Handling, Demo Feedback Modal/Toast
 */

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById("contactInquiryForm");
  const feedbackBox = document.getElementById("contactFeedbackMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      window.showToast("Please complete all required fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.showToast("Please enter a valid email address.", "error");
      return;
    }

    // Show Demo Success State
    if (feedbackBox) {
      feedbackBox.style.display = "block";
      feedbackBox.className = "demo-disclaimer-alert";
      feedbackBox.style.background = "rgba(42, 157, 143, 0.12)";
      feedbackBox.style.borderColor = "var(--turquoise)";
      feedbackBox.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--turquoise);"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <div>
          <strong style="color:var(--navy-deep); font-size:1rem;">Inquiry Logged (Demo Mode)</strong>
          <p style="font-size:0.875rem; color:var(--text-secondary); margin-top:4px;">
            Thank you, <strong>${name}</strong>. Your charter consultation request regarding "<strong>${subject}</strong>" has been recorded. In a production environment, our 24/7 concierge would reply to <strong>${email}</strong> within 2 hours.
          </p>
        </div>
      `;
    }

    form.reset();
    window.showToast("Thank you! Your message has been received.", "success");
  });
}
