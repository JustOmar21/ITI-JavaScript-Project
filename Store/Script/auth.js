// function checkLogin() {
//   // Retrieve the users array from Local Storage
//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   // Check if there are any users in the array
//   if (users.length > 0) {
//     // Assuming you want to get the value of isLoggedIn for the user at index 0
//     let isLoggedInValue = users[0].isLoggedIn;

//     if (!isLoggedInValue) {
//       window.location.href = "../index.html";
//     }
//   } else {
//     // Redirect to the login page if there are no users in the array
//     window.location.href = "../index.html";
//   }
// }

// window.onload = checkLogin;
