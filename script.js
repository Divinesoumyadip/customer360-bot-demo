// Smooth scroll to sections
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// navbar links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });
});

// demo button → scroll to contact (so user is close to chat + form)
const demoBtn = document.getElementById("demo-btn");
if (demoBtn) {
  demoBtn.addEventListener("click", () => {
    smoothScrollTo("#contact");
  });
}

// highlight active nav link based on scroll position
const sections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let currentId = "home";

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120 && sec.id) {
      currentId = sec.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute("href") || "";
    const id = href.replace("#", "");
    link.classList.toggle("active", id === currentId);
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
