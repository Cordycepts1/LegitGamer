document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("#primary-navigation");
const backToTopButton = document.querySelector("[data-back-to-top]");
const paymentPanel = document.querySelector("[data-payment-panel]");

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

if (paymentPanel) {
  const paymentSelect = paymentPanel.querySelector("[data-payment-select]");
  const paymentSummary = paymentPanel.querySelector("[data-payment-summary]");
  const paymentMailto = paymentPanel.querySelector("[data-payment-mailto]");

  const paymentOptions = {
    start: {
      title: "Gridkind Start deposit",
      detail: "PayPal checkout link pending. Request the payment link and confirm the final scope before paying.",
    },
    grow: {
      title: "Gridkind Grow deposit",
      detail: "Use this when your quote confirms the Grow package deposit and launch scope.",
    },
    scale: {
      title: "Gridkind Scale deposit",
      detail: "Use this for payment-ready builds, automation, ecommerce, or deeper integrations after written scope approval.",
    },
    support: {
      title: "Monthly hosting and support",
      detail: "Use this for the agreed monthly hosting/support payment after setup is confirmed.",
    },
    custom: {
      title: "Custom agreed project payment",
      detail: "Use this when a custom quote, invoice, or staged project payment has been agreed in writing.",
    },
  };

  const updatePaymentRequest = () => {
    if (!paymentSelect || !paymentSummary || !paymentMailto) {
      return;
    }

    const selected = paymentOptions[paymentSelect.value] || paymentOptions.start;
    paymentSummary.innerHTML = `
      <p class="package-card__label">Selected payment</p>
      <h3>${selected.title}</h3>
      <p>${selected.detail}</p>
    `;

    const subject = encodeURIComponent(`Payment link request - ${selected.title}`);
    const body = encodeURIComponent(
      `Hi Gridkind Studio,\n\nPlease send me the PayPal payment link for ${selected.title}.\n\nMy name:\nMy business:\nProject notes:\n`
    );

    paymentMailto.setAttribute("href", `mailto:Maxcashgrid@gmail.com?subject=${subject}&body=${body}`);
  };

  updatePaymentRequest();
  paymentSelect?.addEventListener("change", updatePaymentRequest);
}
