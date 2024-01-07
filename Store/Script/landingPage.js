// Select The Elements
var toggle_btn;
var big_wrapper;
var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

let dark = false;

function toggleAnimation() {
  // Clone the wrapper
  dark = !dark;
  let clone = big_wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove("light");
    clone.classList.add("dark");
  } else {
    clone.classList.remove("dark");
    clone.classList.add("light");
  }
  clone.classList.add("copy");
  main.appendChild(clone);

  document.body.classList.add("stop-scrolling");

  clone.addEventListener("animationend", () => {
    document.body.classList.remove("stop-scrolling");
    big_wrapper.remove();
    clone.classList.remove("copy");
    // Reset Variables
    declare();
    events();
  });
}

function events() {
  toggle_btn.addEventListener("click", toggleAnimation);
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();

const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("Store/index.html");

//   // Get the email parameter from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const email = urlParams.get("email");
//   // Retrieve the array of objects from local storage
//   let userRecords = JSON.parse(localStorage.getItem("users")) || [];

//   // Find the user object with the matching email
//   let matchingUser = userRecords.find((user) => user.email === email);
//   console.log(matchingUser);

//   // Update the user isLoggedIn
//   matchingUser.isLoggedIn = false;
//   // Update the user record in the array
//   const updatedUserRecords = userRecords.map((user) =>
//     user.email === email ? matchingUser : user
//   );

//   // Store the updated array back to localStorage
//   localStorage.setItem("users", JSON.stringify(updatedUserRecords));
});
