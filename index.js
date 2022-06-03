// after 13 seconds after the page loads the following function will be called
// this function will make the div with the id of stage-1 removed from the DOM
// this function will make the div with the id of stage-2 display: block

const stage1 = document.getElementById("stage-1");
const Main = document.getElementById("main-page");

document.addEventListener("mousemove", function (e) {
  var xPos = e.pageX - 30;
  var yPos = e.pageY - 30;
  console.log(xPos, yPos);
  let circle = document.querySelector("#circle");
  circle.style.left = xPos + "px";
  circle.style.top = yPos + "px";

  let circle2 = document.querySelector("#circle-in");
  var xPos2 = e.pageX;
  var yPos2 = e.pageY;
  circle2.style.left = xPos2 + "px";
  circle2.style.top = yPos2 + "px";
});

const MainPage = () => {
  stage1.remove();
  Main.style.display = "grid";
};

if (localStorage.getItem("done") === "true") {
  MainPage();
} else {
  const skip = document.getElementsByClassName("skip");
  skip[0].addEventListener("click", MainPage);
  localStorage.setItem("done", "true");
  setTimeout(MainPage, 13000);
}

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

HAC.addEventListener("click", () => {
  close();
});

HAO.addEventListener("click", () => {
  open();
});

// add a click event listener to every li element

li.forEach((element) => {
  element.addEventListener("click", () => {
    close();
  });
});

//
const sendHttpRequest = (method, file, data = null) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, file);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
    if (method === "POST") {
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
  return promise;
};
let Projects;

let plusSlides, currentSlide, showSlides;
var currentSlideModal, plusSlidesModal, showSlidesModal;

sendHttpRequest("GET", "data/projects.json").then((data) => {
  Projects = data;
  ProjectsContainer = document.querySelector("#projects-container");
  Projects.forEach((project, i) => {
    ProjectsContainer.innerHTML += `
    <div class="project-card fade">
        
        <div class="project-image">
        <div class="numbertext">${i + 1}/${Projects.length}</div>
          <img src=${project.screenshots[0]} alt=${project.name}>
          <p class="read-more">
          <span style = "display:none">
            {"id": ${project.id},
            "name": "${project.name}",
            "description": "${project.description}",
            "screenshots": [
              ${project.screenshots.map((screenshot) => `"${screenshot}"`)}
            ],
            "github": "${project.github}"
            }
          </span>
          Click for more details
          </p>
        </div>
        <h2 class="text">${project.name}</h2>
      </div>`;
  });
  ProjectsContainer.innerHTML += `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>`;

  const dots = document.querySelector(".dots");
  for (let i = 0; i < Projects.length; i++) {
    dots.innerHTML += `<span class="dot" onclick="currentSlide(${
      i + 1
    })"></span>`;
  }

  let slideIndex = 1;

  currentSlide = (n) => {
    showSlides((slideIndex = n));
  };
  // Next/previous controls
  plusSlides = (n) => {
    showSlides((slideIndex += n));
  };
  var slideInterval;
  showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("project-card");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      plusSlides(1);
    }, 7000);
  };

  showSlides(slideIndex);

  const readmore = document.querySelectorAll(".read-more");
  readmore.forEach((element) => {
    const data = JSON.parse(element.firstElementChild.innerText);
    console.log(data);

    element.parentElement.addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      modal.style.display = "block";
      const modalContent = document.querySelector(".modal-content");
      modalContent.innerHTML = `
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>${data.name}</h2>
      </div>
      <div class="modal-body">
        <div class="carousel">
          <div class="carousel-inner fade">
            ${data.screenshots.map(
              (screenshot, i) =>
                `<div class="carousel-item">
                  <div class="numbertext">${i + 1}/${
                  data.screenshots.length
                }</div>
                  <img src=${screenshot} alt=${data.name}>
                </div>`
            )}
          </div>
          <a class="prev" onclick="plusSlidesModal(-1)">&#10094;</a>
          <a class="next" onclick="plusSlidesModal(1)">&#10095;</a>
        </div>
        <div class="modal-dots" style="text-align:center"></div>
        <p>${data.description}</p>
      </div>
      <div class="modal-footer">
        <a href="${data.github}" target="_blank">Visit the project's repo</a>
      </div>
      `;

      const close = document.querySelector(".close");
      close.addEventListener("click", () => {
        modal.style.display = "none";
      });

      currentSlideModal = (n) => {
        showSlidesModal((slideIndexModal = n));
      };
      // Next/previous controls
      plusSlidesModal = (n) => {
        showSlidesModal((slideIndexModal += n));
      };

      var modalDots = document.querySelector(".modal-dots");
      for (let i = 0; i < data.screenshots.length; i++) {
        console.log(i);
        modalDots.innerHTML += `<span class="modal-dot" onclick="currentSlideModal(${
          i + 1
        })"></span>`;
      }

      let slideIndexModal = 1;

      var ModalslideInterval;
      showSlidesModal = (n) => {
        let i;
        let slides = document.getElementsByClassName("carousel-item");
        let dots = document.getElementsByClassName("modal-dot");
        if (n > slides.length) {
          slideIndexModal = 1;
        }
        if (n < 1) {
          slideIndexModal = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndexModal - 1].style.display = "block";
        dots[slideIndexModal - 1].className += " active";
        clearInterval(ModalslideInterval);
        ModalslideInterval = setInterval(() => {
          plusSlidesModal(1);
        }, 7000);
      };
      showSlidesModal(slideIndexModal);
    });

    // make it so the modal closes when you click outside of it
    const modal = document.querySelector(".modal");
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
