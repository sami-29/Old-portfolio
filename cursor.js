let circle = document.querySelector("#circle");
let circle2 = document.querySelector("#circle-in");
document.addEventListener("mousemove", function (e) {
  var xPos = e.pageX - circle.offsetWidth / 2;
  var yPos = e.pageY - circle.offsetHeight / 2;
  circle.style.left = xPos + "px";
  circle.style.top = yPos + "px";

  var xPos2 = e.pageX;
  var yPos2 = e.pageY;
  circle2.style.left = xPos2 + "px";
  circle2.style.top = yPos2 + "px";
});

// if cursor leaves the window
document.addEventListener("mouseout", function (e) {
  circle.style.display = "none";

  circle2.style.display = "none";
});

// if cursor enters the window
document.addEventListener("mouseover", function (e) {
  circle.style.display = "block";

  circle2.style.display = "block";
});
