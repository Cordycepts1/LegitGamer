document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("#primary-navigation");
const backToTopButton = document.querySelector("[data-back-to-top]");

function setMenuState(isOpen) {
  if (!menuButton || !header) {
    return;
  }

  menuButton.setAttribute("aria-expanded", String(isOpen));
  header.classList.toggle("is-menu-open", isOpen);
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 821px)");
  const closeOnDesktop = (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  };

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", closeOnDesktop);
  } else {
    desktopQuery.addListener(closeOnDesktop);
  }
}

if (backToTopButton) {
  const updateBackToTop = () => {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 480);
  };

  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
