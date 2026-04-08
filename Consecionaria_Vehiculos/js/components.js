/**
 * Script Principal de Componentes y Configuración Global
 * Maneja la configuración de Dark Mode, menú móvil y otras utilidades compartidas.
 */

// Configuración global de Tailwind (Para Tailwind vía CDN)
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#135bec",
        "background-light": "#f8f9fc",
        "background-dark": "#101622",
      },
      fontFamily: {
        display: ["Public Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
};

/**
 * Inicializa la lógica del Header (menú móvil, tema, etc.)
 */
function initializeHeaderLogic() {
  // Menú Móvil
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      document.body.style.overflow = "hidden"; // Prevenir scroll exterior
    });

    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      document.body.style.overflow = "";
    });
  }

  // Toggle de Tema (Dark/Light)
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  if (themeToggleBtns.length > 0) {
    themeToggleBtns.forEach((btn) =>
      btn.addEventListener("click", toggleTheme),
    );
  }
}

/**
 * Inicializa la lógica compartida del Footer
 */
function initializeFooterLogic() {
  const yearSpan = document.querySelector(".current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Manejo del Tema Claro/Oscuro
 */
function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

function initTheme() {
  // Respetar la preferencia del usuario si ya fue configurada, sino chequear sistema
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Inicialización general al cargar el DOM completo
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initializeHeaderLogic();
  initializeFooterLogic();
});
