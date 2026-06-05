// ── AUTH HELPERS ──────────────────────────────────────────────
function getToken() { return localStorage.getItem('ses_token'); }
function setToken(t) { localStorage.setItem('ses_token', t); }
function clearToken() { localStorage.removeItem('ses_token'); }
function getCurrentUser() { try { return JSON.parse(localStorage.getItem('ses_user')); } catch { return null; } }
function setCurrentUser(u) { localStorage.setItem('ses_user', JSON.stringify(u)); }
function clearCurrentUser() { localStorage.removeItem('ses_user'); }
function isLoggedIn() { return !!getToken(); }

// ── SVG ICONS ──────────────────────────────────────────────────
const icons = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  graduation: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 9-10-5L2 9l10 5 10-5z"/><path d="M6 11.54V18a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-6.46"/><path d="M22 9v6"/></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  dollar: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
  grad28: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 9-10-5L2 9l10 5 10-5z"/><path d="M6 11.54V18a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-6.46"/><path d="M22 9v6"/></svg>`,
  brief28: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  users28: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  buildSm: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>`,
  mapPin12: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  brief12: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
};

// ── TOAST ──────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) { container = document.createElement('div'); container.id = 'toast-container'; document.body.appendChild(container); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${message}</span>`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(() => t.remove(), 400); }, 3500);
}

// ── HELPERS ──────────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  const diff = Math.floor((Date.now() - date) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return `${diff} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatJobType(type) {
  const map = { full_time: 'Full-time / Waqti Buuxa', part_time: 'Part-time / Waqti Dhiman', contract: 'Contract / Heshiis', internship: 'Internship / Tababar', remote: 'Remote / Fogaan' };
  return map[type] || type;
}

// ── JOB CARD HTML ──────────────────────────────────────────────
function jobCardHTML(j) {
  return `
    <div class="job-card" onclick="window.location.href='job-detail.html?id=${j.id}'" style="cursor:pointer">
      <div class="job-card-header">
        <div class="job-card-top">
          <div class="job-card-logo-name">
            <div class="company-logo-box">${icons.building}</div>
            <div>
              <div class="job-title">${j.title}</div>
              <div class="job-company">${j.companyName}</div>
            </div>
          </div>
          ${j.isFeatured ? `<span class="badge-featured">Featured</span>` : ''}
        </div>
      </div>
      <div class="job-card-body">
        <div class="job-badges">
          <span class="badge-outline">${icons.mapPin} ${j.location}</span>
          <span class="badge-outline">${icons.clock} ${formatJobType(j.type)}</span>
          ${j.salary ? `<span class="badge-outline">${icons.dollar} ${j.salary}</span>` : ''}
        </div>
        <p class="job-desc">${j.description}</p>
      </div>
      <div class="job-card-footer">
        <span class="job-date">Posted ${formatDate(j.createdAt)}</span>
        <button class="btn-view-details">View Details</button>
      </div>
    </div>`;
}

// ── COMPANY CARD HTML ──────────────────────────────────────────
function companyCardHTML(c) {
  return `
    <div class="company-card" onclick="window.location.href='jobs.html?search=${encodeURIComponent(c.name)}'" style="cursor:pointer">
      <div class="company-logo">${icons.buildSm}</div>
      <div class="company-name">${c.name}</div>
      <div class="company-meta">
        ${c.industry ? `${icons.brief12}<span>${c.industry}</span>` : ''}
        ${c.industry && c.location ? `<span style="width:3px;height:3px;border-radius:50%;background:var(--border);margin:0 2px;display:inline-block"></span>` : ''}
        ${c.location ? `${icons.mapPin12}<span>${c.location}</span>` : ''}
      </div>
      <a class="company-positions">${c.openPositions} Open Position${c.openPositions !== 1 ? 's' : ''}</a>
    </div>`;
}

// ── NAVBAR ──────────────────────────────────────────────────────
function renderNavbar(activePage) {
  const user = getCurrentUser();
  const links = [
    { href: 'jobs.html', label: 'Jobs', key: 'jobs' },
    { href: 'internship.html', label: 'Internships', key: 'internship' },
    { href: 'shaqotag.html', label: 'Shaqo-Tag', key: 'shaqotag' },
    { href: 'membership.html', label: 'Membership', key: 'membership' },
    { href: 'about.html', label: 'About Us', key: 'about' },
  ];

  const desktopLinks = links.map(l =>
    `<a href="${l.href}" class="${activePage === l.key ? 'active' : ''}">${l.label}</a>`
  ).join('');

  const mobileLinks = links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');

  let desktopActions = '';
  let mobileActions = '';

  if (user) {
    desktopActions = `
      ${user.role === 'employer' ? `<a href="post-job.html" class="btn-nav-gold" style="text-decoration:none;display:inline-flex;align-items:center">Post a Job</a>` : ''}
      <div class="nav-user-menu">
        <button class="nav-user-btn" onclick="toggleDropdown()">
          ${icons.user} ${user.fullName} ${icons.chevronDown}
        </button>
        <div class="nav-dropdown" id="user-dropdown">
          <div class="nav-dropdown-label">My Account</div>
          <div class="nav-dropdown-label" style="color:var(--fg);font-weight:400;font-size:13px;padding-top:0">${user.email}</div>
          <hr>
          <button class="logout-btn" onclick="handleLogout()">Log out</button>
        </div>
      </div>`;
    mobileActions = `
      <div style="font-size:13px;color:var(--muted-fg);padding:4px 0">Signed in as ${user.fullName}</div>
      ${user.role === 'employer' ? `<a href="post-job.html" class="btn btn-secondary" style="width:100%;text-align:center">Post a Job</a>` : ''}
      <button onclick="handleLogout()" style="width:100%;padding:10px 16px;border:1px solid var(--border);border-radius:var(--radius);background:none;color:hsl(0,84%,45%);font-size:14px;cursor:pointer;text-align:left">Log out</button>`;
  } else {
    desktopActions = `
      <button class="btn-nav-ghost" onclick="window.location.href='login.html'">Log in</button>
      <button class="btn-nav-gold" onclick="window.location.href='create-account.html'">Sign up</button>`;
    mobileActions = `
      <a href="login.html" class="btn btn-outline" style="width:100%;text-align:center">Log in</a>
      <a href="create-account.html" class="btn btn-secondary" style="width:100%;text-align:center">Sign up</a>`;
  }

  const navbar = document.createElement('header');
  navbar.innerHTML = `
    <nav class="navbar">
      <div class="nav-inner">
        <div class="nav-left">
          <a href="index.html" class="nav-logo">Smart<span>Employment</span></a>
          <div class="nav-links">${desktopLinks}</div>
        </div>
        <div class="nav-right">${desktopActions}</div>
        <button class="mobile-btn" onclick="openMobileMenu()" aria-label="Menu">${icons.menu}</button>
      </div>
    </nav>
    <div class="mobile-sheet" id="mobile-sheet">
      <div class="mobile-sheet-overlay" onclick="closeMobileMenu()"></div>
      <div class="mobile-sheet-panel">
        <button class="mobile-sheet-close" onclick="closeMobileMenu()">✕</button>
        <div class="mobile-sheet-logo">Smart<span>Employment</span></div>
        <nav>${mobileLinks}</nav>
        <div class="mobile-sheet-actions">${mobileActions}</div>
      </div>
    </div>`;
  document.body.insertBefore(navbar, document.body.firstChild);

  // Close dropdown on outside click
  document.addEventListener('click', e => {
    const dd = document.getElementById('user-dropdown');
    if (dd && !dd.closest('.nav-user-menu').contains(e.target)) dd.classList.remove('open');
  });
}

function toggleDropdown() {
  const dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.toggle('open');
}
function openMobileMenu() { const s = document.getElementById('mobile-sheet'); if (s) s.classList.add('open'); }
function closeMobileMenu() { const s = document.getElementById('mobile-sheet'); if (s) s.classList.remove('open'); }

// ── FOOTER ──────────────────────────────────────────────────────
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div>
          <div class="footer-logo">Smart<span>Employment</span></div>
          <p class="footer-tagline">BARO, TIJAABI, SHAQO HEL. Connecting Somalia's growing workforce with meaningful opportunities.</p>
        </div>
        <div class="footer-col">
          <h3>Candidates</h3>
          <a href="jobs.html">Find a Job</a>
          <a href="internship.html">Internship Program</a>
          <a href="shaqotag.html">Shaqo-Tag</a>
          <a href="membership.html">Membership</a>
        </div>
        <div class="footer-col">
          <h3>Employers</h3>
          <a href="post-job.html">Post a Job</a>
          <a href="membership.html">HR Policy Consulting</a>
          <a href="create-account.html">Create Employer Account</a>
        </div>
        <div class="footer-col">
          <h3>Company</h3>
          <a href="about.html">About Us</a>
          <a href="about.html#contact">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} Smart Employment Service. All rights reserved.</p>
      </div>
    </div>`;
  document.body.appendChild(footer);
}

// ── LOGOUT ──────────────────────────────────────────────────────
async function handleLogout() {
  clearToken(); clearCurrentUser();
  showToast('Logged out successfully', 'success');
  setTimeout(() => window.location.href = 'index.html', 700);
}
