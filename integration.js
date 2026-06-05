// All API calls use window.API_BASE from config.js

async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${window.API_BASE}${endpoint}`;
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  const token = getToken();
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (data) opts.body = JSON.stringify(data);
  const res = await fetch(url, opts);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || json.message || `HTTP ${res.status}`);
  return json;
}

// ── AUTH ────────────────────────────────────────────────────────
const auth = {
  register: (d) => apiRequest('/api/auth/register', 'POST', d),
  login: (d) => apiRequest('/api/auth/login', 'POST', d),
  logout: () => apiRequest('/api/auth/logout', 'POST'),
  me: () => apiRequest('/api/auth/me'),
};

// ── JOBS ────────────────────────────────────────────────────────
const jobs = {
  list: (params = {}) => {
    const q = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([,v]) => v)));
    return apiRequest(`/api/jobs${q.toString() ? '?' + q : ''}`);
  },
  featured: () => apiRequest('/api/jobs/featured'),
  get: (id) => apiRequest(`/api/jobs/${id}`),
  create: (d) => apiRequest('/api/jobs', 'POST', d),
};

// ── COMPANIES ────────────────────────────────────────────────────
const companies = {
  list: () => apiRequest('/api/companies'),
};

// ── APPLICATIONS ────────────────────────────────────────────────
const applications = {
  createInternship: (d) => apiRequest('/api/internship-applications', 'POST', d),
  createShaqotag: (d) => apiRequest('/api/shaqotag-applications', 'POST', d),
};

// ── MEMBERSHIPS ─────────────────────────────────────────────────
const memberships = {
  plans: () => apiRequest('/api/membership-plans'),
  create: (d) => apiRequest('/api/memberships', 'POST', d),
};

// ── STATS ────────────────────────────────────────────────────────
const stats = {
  summary: () => apiRequest('/api/stats/summary'),
};
