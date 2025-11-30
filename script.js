// Smooth scroll for nav links and demo button

// helper to scroll to target nicely
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// nav links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });
});

// "Try the live demo" button -> scroll to contact section (or wherever you want)
const demoBtn = document.getElementById("demo-btn");
if (demoBtn) {
  demoBtn.addEventListener("click", () => {
    smoothScrollTo("#contact");
  });
}

// highlight active nav link on scroll
const sections = document.querySelectorAll("main .section, main#home");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let currentId = "home";

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      if (sec.id) currentId = sec.id;
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
