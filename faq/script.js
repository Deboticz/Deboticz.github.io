(function () {
    function preventDevTools() {
      if (window.devtools.open) {
        window.location.reload();
      }
    }

    window.devtools = { open: false };
    window.addEventListener("devtoolschange", preventDevTools);

    (function () {
      var devtools = window.devtools;
      var element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          devtools.open = true;
          window.dispatchEvent(new Event("devtoolschange"));
        },
      });
      return;
    })();
  })();

  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key == "F12") {
      event.preventDefault();
    }
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.keyCode == "I".charCodeAt(0)
    ) {
      event.preventDefault();
    }
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.keyCode == "J".charCodeAt(0)
    ) {
      event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode == "U".charCodeAt(0)) {
      event.preventDefault();
    }
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.keyCode == 67
    ) {
      event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 83) {
      event.preventDefault();
    }
  });


document.addEventListener("click", (e) => {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

const buttons = document.querySelectorAll(".dropdown-button");

const cbtn = document.querySelector(".close-btn");

const obtn = document.querySelector("#activeIcon");

const tit = document.querySelector("nav .logo");

const dropdowns = document.querySelectorAll(".dropdown");

buttons.forEach((button) => {
  const icon = button.querySelector("i");

  button.addEventListener("click", function (event) {
    event.stopPropagation();

    buttons.forEach((otherButton) => {
      const otherIcon = otherButton.querySelector("i");
      if (otherIcon !== icon) {
        otherIcon.classList.remove("ri-arrow-drop-up-line");
        otherIcon.classList.add("ri-arrow-drop-down-line");
      }
    });

    if (icon.classList.contains("ri-arrow-drop-down-line")) {
      icon.classList.remove("ri-arrow-drop-down-line");
      icon.classList.add("ri-arrow-drop-up-line");
    } else {
      icon.classList.remove("ri-arrow-drop-up-line");
      icon.classList.add("ri-arrow-drop-down-line");
    }
  });
});

document.addEventListener("click", function (event) {
  buttons.forEach((button) => {
    const icon = button.querySelector("i");
    if (!button.contains(event.target)) {
      icon.classList.remove("ri-arrow-drop-up-line");
      icon.classList.add("ri-arrow-drop-down-line");
      if (window.matchMedia("(max-width: 992px)").matches) {
        obtn.style.display = "block";
        tit.style.fontSize = "18px";
      }
    }
  });
});

cbtn.addEventListener("click", function (event) {
  event.stopPropagation();

  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) {
      dropdown.classList.toggle("active");
    }
  });
  if (window.matchMedia("(max-width: 992px)").matches) {
    obtn.style.display = "block";
    tit.style.fontSize = "18px";
  }
});

obtn.addEventListener("click", function (event) {
  event.stopPropagation();
  dropdowns.forEach((dropdown) => {
    dropdown.classList.toggle("active");
  });
  obtn.style.display = "none";
  tit.style.fontSize = "22px";
});

function toggleDropdown(id) {
  event.stopPropagation();

  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) {
      dropdown.classList.toggle("active");
    } else {
      dropdown.classList.remove("active");
    }
  });
}

const searchBar = document.querySelector(".search-bar");

const allbtns = document.querySelector("#btn-all");

allbtns.addEventListener("click", (e) => {
  searchBar.value = "";
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".service-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
const sortSelect = document.querySelector("select");
sortSelect.addEventListener("change", (e) => {
  const cards = Array.from(document.querySelectorAll(".service-card"));
  const container = document.querySelector(".services-grid");

  cards.sort((a, b) => {
    const titleA = a.querySelector("h3").textContent;
    const titleB = b.querySelector("h3").textContent;

    if (e.target.value === "Alphabetical A-Z") {
      return titleA.localeCompare(titleB);
    } else if (e.target.value === "Alphabetical Z-A") {
      return titleB.localeCompare(titleA);
    }
  });

  container.innerHTML = "";
  cards.forEach((card) => container.appendChild(card));
});

function toggleFaq(button) {
  const faqItem = button.closest(".faq-item");
  const allFaqItems = document.querySelectorAll(".faq-item");

  allFaqItems.forEach((item) => {
    if (item !== faqItem && item.classList.contains("active")) {
      item.classList.remove("active");
      item.querySelector(".faq-content").style.maxHeight = null;
    }
  });

  faqItem.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const firstFaqButton = document.querySelector(".faq-item button");
  if (firstFaqButton) {
    toggleFaq(firstFaqButton);
  }
});
