(function () {
  const hostname = window.location.hostname;
  const isGitHubPages = hostname.includes("github.io");
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  window.API_BASE = isGitHubPages || !isLocalhost
    ? "https://smart-employment-backend.onrender.com"
    : "http://localhost:5000";
})();
