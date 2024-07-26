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

document.addEventListener("DOMContentLoaded", async function () {
  setTimeout(() => {
    document.querySelector(".all-load").style.display = "none";
    document.querySelector(".loading-footer").style.display = "none";
    document.querySelector(".all").style.display = "block";
    document.body.classList.add("fade-in");
  }, 3000);
});

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
