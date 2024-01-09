const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("../Store/index.html");
});

// if (sessionStorage.getItem("currentUserID") == null) {
//   alert("You are not logged In");
//   location.assign("../Store/index.html");
// }
