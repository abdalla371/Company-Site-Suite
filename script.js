// ── AUTH HELPERS ──────────────────────────────────────────────
function getToken() { return localStorage.getItem('ses_token'); }
function setToken(t) { localStorage.setItem('ses_token', t); }
function clearToken() { localStorage.removeItem('ses_token'); }
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('ses_user')); } catch { return null; }
}
function setCurrentUser(u) { localStorage.setItem('ses_user', JSON.stringify(u)); }
function clearCurrentUser() { localStorage.removeItem('ses_user'); }
function isLoggedIn() { return !!getToken(); }
function isEmployer() { const u = getCurrentUser(); return u && u.role === 'employer'; }

// ── TOAST ──────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || '•'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.4s'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ── NAV RENDER ──────────────────────────────────────────────────
function renderNavbar(activePage) {
  const user = getCurrentUser();
  const navLinks = [
    { href: 'index.html', label: 'Home', key: 'home' },
    { href: 'jobs.html', label: 'Jobs', key: 'jobs' },
    { href: 'internship.html', label: 'Internship', key: 'internship' },
    { href: 'shaqotag.html', label: 'Shaqo-Tag', key: 'shaqotag' },
    { href: 'membership.html', label: 'Membership', key: 'membership' },
    { href: 'about.html', label: 'About Us', key: 'about' },
  ];

  const linksHTML = navLinks.map(l =>
    `<a href="${l.href}" class="${activePage === l.key ? 'active' : ''}">${l.label}</a>`
  ).join('');

  const mobileLinksHTML = navLinks.map(l =>
    `<a href="${l.href}">${l.label}</a>`
  ).join('');

  let actionsHTML = '';
  if (user) {
    actionsHTML = `
      <div class="nav-user">
        <span>Salaan, ${user.fullName.split(' ')[0]}</span>
        ${user.role === 'employer' ? `<a href="post-job.html" class="btn-gold" style="padding:8px 16px;border-radius:8px;font-size:14px;font-weight:700;background:var(--gold);color:var(--navy);text-decoration:none;">Post a Job</a>` : ''}
        <button class="btn-logout" onclick="handleLogout()">Log Out</button>
      </div>`;
  } else {
    actionsHTML = `
      <a href="login.html" class="btn-outline">Log In</a>
      <a href="create-account.html" class="btn-gold">Sign Up</a>
      <a href="post-job.html" class="btn-outline" style="font-size:13px;">Post a Job</a>`;
  }

  const navbar = document.createElement('nav');
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">Smart<span>Employment</span></a>
      <div class="nav-links">${linksHTML}</div>
      <div class="nav-actions">${actionsHTML}</div>
      <button class="mobile-toggle" onclick="toggleMobileMenu()" aria-label="Menu">☰</button>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      ${mobileLinksHTML}
      ${user
        ? `<a href="#" onclick="handleLogout(); return false;">Log Out</a>`
        : `<a href="login.html">Log In</a><a href="create-account.html">Sign Up</a>`}
    </div>`;
  document.body.insertBefore(navbar, document.body.firstChild);
}

function toggleMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('open');
}

// ── FOOTER RENDER ──────────────────────────────────────────────
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">Smart<span>Employment</span></div>
          <p>Somalia's premier employment platform connecting job seekers, students, and employers. BARO, TIJAABI, SHAQO HEL.</p>
        </div>
        <div class="footer-col">
          <h4>Jobs</h4>
          <a href="jobs.html">Browse Jobs</a>
          <a href="post-job.html">Post a Job</a>
          <a href="create-account.html">Create Account</a>
        </div>
        <div class="footer-col">
          <h4>Programs</h4>
          <a href="internship.html">Internship Program</a>
          <a href="shaqotag.html">Shaqo-Tag Program</a>
          <a href="membership.html">Membership Plans</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="about.html#contact">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Smart Employment Service. All rights reserved.</span>
        <span>Mogadishu, Somalia</span>
      </div>
    </div>`;
  document.body.appendChild(footer);
}

// ── LOGOUT ──────────────────────────────────────────────────────
async function handleLogout() {
  clearToken();
  clearCurrentUser();
  showToast('Logged out successfully', 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
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

function typeBadge(type) {
  const map = {
    full_time: ['badge-full', 'Full-time'],
    part_time: ['badge-part', 'Part-time'],
    contract: ['badge-contract', 'Contract'],
    internship: ['badge-internship', 'Internship'],
    remote: ['badge-remote', 'Remote'],
  };
  const [cls, label] = map[type] || ['badge-full', type];
  return `<span class="badge ${cls}">${label}</span>`;
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function showLoading(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="loading"><div class="spinner"></div><p>Loading...</p></div>`;
}

function showEmpty(containerId, title, msg) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="empty"><div class="empty-icon">📋</div><h3>${title}</h3><p>${msg}</p></div>`;
}
