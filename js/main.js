document.addEventListener("componentsLoaded", () => {
  // =====================================================
  // 1. MOBILE MENU
  // =====================================================

  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const isOpen = !mobileMenu.classList.contains("hidden");

      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");

        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =====================================================
  // 2. FAQ ACCORDION
  // =====================================================

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

      faqItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".faq-button");

        const otherAnswer = otherItem.querySelector(".faq-answer");

        const otherIcon = otherItem.querySelector(".faq-icon");

        if (!otherButton || !otherAnswer || !otherIcon) {
          return;
        }

        otherButton.setAttribute("aria-expanded", "false");

        otherAnswer.classList.remove("grid-rows-[1fr]");

        otherAnswer.classList.add("grid-rows-[0fr]");

        otherIcon.classList.remove("rotate-45");
      });

      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");

        answer.classList.remove("grid-rows-[0fr]");

        answer.classList.add("grid-rows-[1fr]");

        icon.classList.add("rotate-45");
      }
    });
  });

  // =====================================================
  // 3. TESTIMONIAL CAROUSEL
  // =====================================================

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

  // =====================================================
  // 4. SCROLL REVEAL
  // =====================================================

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

  // =====================================================
  // 5. HEADER SHOW / HIDE ON SCROLL
  // =====================================================

  const header = document.getElementById("site-header");

  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      () => {
        const currentScrollY = window.scrollY;

        // Saat berada di paling atas
        if (currentScrollY <= 10) {
          header.style.transform = "translateY(0)";
        }

        // Scroll ke bawah
        else if (currentScrollY > lastScrollY) {
          header.style.transform = "translateY(-100%)";
        }

        // Scroll ke atas
        else if (currentScrollY < lastScrollY) {
          header.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;
      },
      {
        passive: true,
      },
    );
  } else {
    console.error("Header #site-header tidak ditemukan.");
  }
});
