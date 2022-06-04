document.addEventListener("mousemove", function (e) {
  var xPos = e.pageX - 30;
  var yPos = e.pageY - 30;
  let circle = document.querySelector("#circle");
  circle.style.left = xPos + "px";
  circle.style.top = yPos + "px";

  let circle2 = document.querySelector("#circle-in");
  var xPos2 = e.pageX;
  var yPos2 = e.pageY;
  circle2.style.left = xPos2 + "px";
  circle2.style.top = yPos2 + "px";
});
