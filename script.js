function openMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("open");

  const icon = document.getElementById("menuButton");
  const old = document.getElementById("old");

  old.style.display = "none";

  if (nav.classList.contains("open")) {
    icon.classList.remove("ri-menu-fill");
    icon.classList.add("ri-close-fill");
  } else {
    icon.classList.remove("ri-close-fill");
    icon.classList.add("ri-menu-fill");
  }
}

function scrollToElement(elementSelector, instance = 0) {
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length > instance) {
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

function offMenü() {
  const n = document.querySelector("nav");
  n.classList.toggle("open");

  const i = document.querySelector(".ri-close-fill");
  i.classList.remove("ri-close-fill");
  const o = document.getElementById("old");
  o.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const link1 = document.getElementById("informations");
  const link2 = document.getElementById("hostinginfos");
  const link3 = document.getElementById("reviews");

  link1.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement("#skills");
    offMenü();
  });

  link2.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement("#portfolio");
    offMenü();
  });

  link3.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToElement(".feedback");
    offMenü();
  });
});

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

var options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, options);

var targets = document.querySelectorAll(".pricing .card");
targets.forEach(function (target) {
  observer.observe(target);
});

//e

var targets = document.querySelectorAll(".card");
targets.forEach(function (target) {
  observer.observe(target);
});
