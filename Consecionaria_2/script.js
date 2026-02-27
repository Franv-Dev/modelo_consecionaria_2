document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation Background on Scroll
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  };

  mobileBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // 3. Inventory Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const inventoryItems = document.querySelectorAll(".vehicle-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      inventoryItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50);
        } else {
          if (item.classList.contains(`item-${filterValue}`)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, 50);
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300); // Matches transition duration roughly
          }
        }
      });
    });
  });

  // 4. Reveal Elements on Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealOnScroll.observe(el);
  });

  // 5. Hero Parallax Effect (subtle)
  const heroImage = document.getElementById("hero-image");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
      // Move the image slightly down as user scrolls down
      heroImage.style.transform = `translateY(${scrollPosition * 0.3}px) scale(1.05)`;
    }
  });
});
