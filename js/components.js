const components = [
  "header",
  "hero",
  "features",
  "flights",
  "hotels",
  "adventages",
  "programs",
  "testimonials",
  "faq",
  "cta",
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

    umrah: isPagesDirectory ? "./paket-umrah.html" : "./pages/paket-umrah.html",

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

  document.dispatchEvent(new Event("componentsLoaded"));
}

loadComponents();
