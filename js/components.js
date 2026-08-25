const components = [
  "header",
  "hero",
  "features",
  "flights",
  "hotels",
  "adventages",
  "programs",
  "partnership",
  "testimonials",
  "faq",
  "cta",
  "whatsapp",

  "about_hero",
  "about_about",
  "about_history",
  "about_legalitas",
  "about_garuda",
  "about_vision",
  "about_mission",
  "about_values",
  "about_statistics",
  "about_certificates",
  "about_gallery",
  "about_cta",

  "package_hero",
  "package_intro",
  "package_cards",
  "package_facilities",
  "package_cta",

  "footer",
];

async function loadComponent(name) {
  const container = document.getElementById(name);

  if (!container) {
    return;
  }

  try {
    const isPagesDirectory = window.location.pathname.includes("/pages/");

    const componentPath = isPagesDirectory
      ? `../components/${name}.html`
      : `./components/${name}.html`;

    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`Gagal memuat ${name}.html`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function setupPageLinks() {
  const isPagesDirectory = window.location.pathname.includes("/pages/");

  const pagePaths = {
    home: isPagesDirectory ? "../index.html" : "./index.html",

    about: isPagesDirectory
      ? "./tentang_kami.html"
      : "./pages/tentang_kami.html",

    umrah: isPagesDirectory ? "./paket_umrah.html" : "./pages/paket_umrah.html",

    gallery: isPagesDirectory ? "./galeri.html" : "./pages/galeri.html",

    contact: isPagesDirectory ? "./kontak.html" : "./pages/kontak.html",
  };

  const pageLinks = document.querySelectorAll("[data-page]");

  pageLinks.forEach((link) => {
    const page = link.dataset.page;

    if (pagePaths[page]) {
      link.href = pagePaths[page];
    }
  });
}

async function loadComponents() {
  for (const component of components) {
    await loadComponent(component);
  }

  setupPageLinks();

  // Beritahu main.js bahwa semua komponen
  // sudah selesai dimuat
  document.dispatchEvent(new Event("componentsLoaded"));
}

loadComponents();
