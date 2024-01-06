document
  .getElementById("resetPasswordBtn")
  .addEventListener("click", function () {
    document.getElementById("container").classList.toggle("container-visible");
    document.getElementById("popup").classList.toggle("open-popup");
  });

document.getElementById("popup-btn").addEventListener("click", function () {
  window.location.href = "../index.html";
});
