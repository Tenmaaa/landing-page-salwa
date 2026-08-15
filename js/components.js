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
    const response = await fetch(`./components/${name}.html`);

    if (!response.ok) {
      throw new Error(`Gagal memuat ${name}.html`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

async function loadComponents() {
  for (const component of components) {
    await loadComponent(component);
  }

  document.dispatchEvent(new Event("componentsLoaded"));
}

loadComponents();
