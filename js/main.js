document.addEventListener("componentsLoaded", () => {
  /* =====================================================
     1. MOBILE MENU
     ===================================================== */

  const menuButton = document.querySelector("#menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const isOpen = !mobileMenu.classList.contains("hidden");

      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    // Menutup menu ketika link diklik
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");

        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =====================================================
     2. FAQ ACCORDION
     ===================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-button");

    const answer = item.querySelector(".faq-answer");

    const icon = item.querySelector(".faq-icon");

    if (!button || !answer || !icon) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      // Tutup semua FAQ
      faqItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".faq-button");

        const otherAnswer = otherItem.querySelector(".faq-answer");

        const otherIcon = otherItem.querySelector(".faq-icon");

        otherButton.setAttribute("aria-expanded", "false");

        otherAnswer.classList.remove("grid-rows-[1fr]");

        otherAnswer.classList.add("grid-rows-[0fr]");

        otherIcon.classList.remove("rotate-45");
      });

      // Buka FAQ yang dipilih
      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");

        answer.classList.remove("grid-rows-[0fr]");

        answer.classList.add("grid-rows-[1fr]");

        icon.classList.add("rotate-45");
      }
    });
  });

  /* =====================================================
     3. TESTIMONIAL CAROUSEL
     ===================================================== */

  const track = document.getElementById("testimonial-track");

  const prevButton = document.getElementById("testimonial-prev");

  const nextButton = document.getElementById("testimonial-next");

  if (track && prevButton && nextButton) {
    const getScrollAmount = () => {
      const card = track.querySelector(".testimonial-card");

      if (!card) {
        return 0;
      }

      return card.offsetWidth + 24;
    };

    nextButton.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });

    prevButton.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });
  }

  /* =====================================================
     4. SCROLL REVEAL
     ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* =====================================================
     5. MOBILE MENU ANIMATION
     ===================================================== */

  const menuToggle = document.getElementById("menu-toggle");

  const animatedMobileMenu = document.getElementById("mobile-menu");

  const menuIcon = document.getElementById("menu-icon");

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (menuToggle && animatedMobileMenu && menuIcon) {
    const openMenu = () => {
      animatedMobileMenu.classList.remove("grid-rows-[0fr]", "opacity-0");

      animatedMobileMenu.classList.add("grid-rows-[1fr]", "opacity-100");

      menuIcon.textContent = "×";

      menuToggle.setAttribute("aria-expanded", "true");

      menuToggle.setAttribute("aria-label", "Tutup menu");
    };

    const closeMenu = () => {
      animatedMobileMenu.classList.remove("grid-rows-[1fr]", "opacity-100");

      animatedMobileMenu.classList.add("grid-rows-[0fr]", "opacity-0");

      menuIcon.textContent = "☰";

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Buka menu");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
});
