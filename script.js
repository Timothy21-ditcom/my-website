/* =====================================================
   TIMTECH | VIRTUAL - MAIN JAVASCRIPT
   Accessible, Responsive, Scalable
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSmoothScroll();
  initForms();
});

/* =====================================================
   NAVIGATION & DROPDOWNS
===================================================== */
function initNavigation() {
  const nav = document.querySelector("nav");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Create mobile toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "nav-toggle";
  toggleBtn.setAttribute("aria-label", "Toggle navigation menu");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.innerHTML = "☰";
  nav.prepend(toggleBtn);

  const navList = nav.querySelector("ul");

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("nav-open");
  });

  // Dropdown behavior (click + keyboard)
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      closeOtherDropdowns(dropdown);

      const expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      menu.style.display = expanded ? "none" : "block";
    });

    // Keyboard accessibility
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) {
      closeAllDropdowns();
    }
  });
}

function closeOtherDropdowns(current) {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (dropdown !== current) {
      const trigger = dropdown.querySelector("a");
      const menu = dropdown.querySelector(".dropdown-menu");
      trigger.setAttribute("aria-expanded", "false");
      menu.style.display = "none";
    }
  });
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector("a");
    const menu = dropdown.querySelector(".dropdown-menu");
    trigger.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
  });
}

/* =====================================================
   SMOOTH SCROLLING
===================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

/* =====================================================
   FORM HANDLING (NEWSLETTER & FOOTER FORM)
===================================================== */
function initForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      showFormFeedback(form);
      form.reset();
    });
  });
}

function showFormFeedback(form) {
  let message = form.querySelector(".form-feedback");

  if (!message) {
    message = document.createElement("p");
    message.className = "form-feedback";
    message.style.marginTop = "12px";
    message.style.color = "#00e5ff";
    message.style.fontWeight = "600";
    form.appendChild(message);
  }

  message.textContent = "Thank you! Your message has been successfully sent.";
}

/* =====================================================
   ACCESSIBILITY ENHANCEMENTS
===================================================== */

// Close dropdowns with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllDropdowns();
  }
});
