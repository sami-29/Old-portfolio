const HAC = document.querySelector(".hamburger-closed");
const HAO = document.querySelector(".hamburger-open");
const navbar = document.querySelector(".nav-bar");
const li = document.querySelectorAll("li");

const open = () => {
  navbar.classList.add("nav-bar-open");
  navbar.classList.remove("nav-bar-closed");
  HAC.style.display = "block";
  HAO.style.display = "none";
};

const close = () => {
  navbar.classList.remove("nav-bar-open");
  navbar.classList.add("nav-bar-closed");
  HAC.style.display = "none";
  HAO.style.display = "block";
};

// if the user clicks outside the navbar when the navbar is open it will close the navbar
window.addEventListener("click", function (e) {
  if (navbar.classList.contains("nav-bar-open")) {
    if (
      !navbar.contains(e.target) &&
      !HAC.contains(e.target) &&
      !HAO.contains(e.target)
    ) {
      console.log("clicked outside");
      close();
    }
  }
});

HAC.addEventListener("click", () => {
  close();
});

HAO.addEventListener("click", () => {
  console.log("clicked");
  open();
});

// add a click event listener to every li element

li.forEach((element) => {
  element.addEventListener("click", () => {
    console.log("clicked outside");
    close();
  });
});

window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    return;
  } else {
    if (e.key === "n") {
      open();
    } else if (e.key === "c") {
      close();
    }
  }
});
