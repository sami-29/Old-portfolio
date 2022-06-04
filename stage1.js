const stage1 = document.getElementById("stage-1");
const Main = document.getElementById("main-page");

const MainPage = () => {
  stage1.remove();
  Main.style.display = "block";
};

if (localStorage.getItem("done") === "true") {
  MainPage();
} else {
  const skip = document.getElementsByClassName("skip");
  skip[0].addEventListener("click", MainPage);
  localStorage.setItem("done", "true");
  setTimeout(MainPage, 13000);
}
