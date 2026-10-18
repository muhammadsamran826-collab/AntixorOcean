/**
 * Antixor Ocean - Destinations Discovery Controller
 * Renders destination guides, highlights, weather/season, and yacht links
 */

document.addEventListener("DOMContentLoaded", () => {
  initDestinationsPage();
});

function initDestinationsPage() {
  const container = document.getElementById("destinationsListContainer");
  if (!container || !window.getAllDestinations) return;

  const destinations = window.getAllDestinations();
  container.innerHTML = "";

  destinations.forEach((dest, index) => {
    const isEven = index % 2 === 1;
    const item = document.createElement("article");
    item.className = "destination-detail-row";
    item.style.cssText = `
      display: grid;
      grid-template-columns: ${isEven ? "1.1fr 1fr" : "1fr 1.1fr"};
      gap: 48px;
      align-items: center;
      margin-bottom: 80px;
      padding-bottom: 80px;
      border-bottom: 1px solid var(--border-light);
    `;

    const mediaHtml = `
      <div style="position:relative; border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-lg); height:420px; order:${isEven ? "2" : "1"};">
        <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" />
        <span class="destination-fleet-pill" style="position:absolute; top:20px; left:20px; background:rgba(6,26,43,0.85); backdrop-filter:blur(8px);">
          ${dest.yachtCount}+ Available Vessels
        </span>
      </div>
    `;

    const contentHtml = `
      <div style="order:${isEven ? "1" : "2"};">
        <span class="eyebrow">${dest.country}</span>
        <h2 style="font-size:clamp(2rem, 3.5vw, 2.6rem); margin-bottom:8px;">${dest.name}</h2>
        <p style="font-size:1.15rem; color:var(--ocean-teal); font-style:italic; margin-bottom:18px;">${dest.tagline}</p>
        <p style="margin-bottom:24px; font-size:1.0625rem; line-height:1.7;">${dest.longDescription}</p>

        <!-- Highlights & Climate Grid -->
        <div style="background:var(--white); border-radius:var(--radius-lg); padding:24px; border:1px solid var(--border-color); margin-bottom:28px;">
          <h4 style="font-size:1rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--navy-dark); margin-bottom:14px;">Charter Highlights</h4>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:18px;">
            ${dest.highlights.map(h => `
              <li style="display:flex; align-items:center; gap:10px; font-size:0.9375rem; color:var(--text-primary);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--gold); flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>${h}</span>
              </li>
            `).join("")}
          </ul>

          <div style="display:flex; gap:24px; border-top:1px solid var(--border-light); padding-top:14px; font-size:0.8125rem;">
            <div>
              <span style="color:var(--text-light); text-transform:uppercase; display:block;">Optimal Season:</span>
              <strong style="color:var(--navy-deep);">${dest.season}</strong>
            </div>
            <div>
              <span style="color:var(--text-light); text-transform:uppercase; display:block;">Average Water Temp:</span>
              <strong style="color:var(--navy-deep);">${dest.waterTemp}</strong>
            </div>
          </div>
        </div>

        <a href="boats.html?location=${encodeURIComponent(dest.name)}" class="btn btn-gold">
          View Yachts in ${dest.name}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    `;

    item.innerHTML = mediaHtml + contentHtml;
    container.appendChild(item);
  });
}
