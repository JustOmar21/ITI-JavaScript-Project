// DOM elements
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const errorMessageElement = document.getElementById("error-message");
const loginErrorMessageElement = document.getElementById("error-message-login");

// Event listeners for register and login buttons
registerBtn.addEventListener("click", () => {
   // Activate registration container
   container.classList.add("active");
   // Hide general and login-specific error messages on register click
   hideErrorMessage(errorMessageElement);
   hideErrorMessage(loginErrorMessageElement);
});

loginBtn.addEventListener("click", () => {
   // Deactivate registration container
   container.classList.remove("active");
   // Hide general and login-specific error messages on login click
   hideErrorMessage(errorMessageElement);
   hideErrorMessage(loginErrorMessageElement);
});

// Event listener for sign-up button
document.getElementById("sign-up-btn").addEventListener("click", function () {
   // Retrieve input values
   let ID = localStorage.getItem("userID") || 0;
   localStorage.setItem("userID", Number(ID) + 1);
   let signUpName = document.getElementById("sign-up-name").value;
   let signUpEmail = document.getElementById("sign-up-email").value;
   let signUpPassword = document.getElementById("sign-up-password").value;
   let userRecords = JSON.parse(localStorage.getItem("user")) || [];

   // Validate name
   if (!signUpName) {
      displayErrorMessage("Please enter your name.", errorMessageElement);
      return;
   }

   // Validate email
   if (!validateEmail(signUpEmail)) {
      displayErrorMessage(
         "Invalid email address for Sign Up. Please enter a valid email.",
         errorMessageElement
      );
      return;
   }

   // Validate password
   if (!validatePassword(signUpPassword)) {
      displayErrorMessage(
         "Invalid password for Sign Up. Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
         errorMessageElement
      );
      return;
   }

   // Check if the email already exists
   if (userRecords.some((v) => v.email === signUpEmail)) {
      displayErrorMessage(
         "Email already in use. Please use a different email.",
         errorMessageElement
      );
      return;
   }

   // Add the new user
   userRecords.push({
      id:ID,
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      type: false,
   });

   localStorage.setItem("user", JSON.stringify(userRecords));
   hideErrorMessage(errorMessageElement); // Hide error message on success

   // Construct the URL with the email parameter
   const url = "userType.html?email=" + encodeURIComponent(signUpEmail);

   // Redirect to the constructed URL
   window.location.href = url;
});

// Event listener for sign-in button
document.getElementById("sign-in-btn").addEventListener("click", function () {
   // Retrieve input values
   let signInEmail = document.getElementById("sign-in-email").value;
   let signInPassword = document.getElementById("sign-in-password").value;

   // Validate email
   if (!validateEmail(signInEmail)) {
      displayErrorMessage(
         "Invalid email address for Sign In. Please enter a valid email.",
         loginErrorMessageElement
      );
      return;
   }

   // Validate password
   if (!validatePassword(signInPassword)) {
      displayErrorMessage(
         "Invalid password for Sign In. Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.",
         loginErrorMessageElement
      );
      return;
   }

   // Retrieve the array of objects from local storage
   let userRecords = JSON.parse(localStorage.getItem("user")) || [];

   // Find the user object with the matching email
   let matchingUser = userRecords.find((user) => user.email === signInEmail);

   // Set session storage
   sessionStorage.setItem("currentUserID",matchingUser.id);

   // Update the user record in the array
   const updatedUserRecords = userRecords.map((user) =>
      user.email === signInEmail ? matchingUser : user
   );

   // Store the updated array back to localStorage
   localStorage.setItem("users", JSON.stringify(updatedUserRecords));
   // Check if a matching user was found
   if (matchingUser.type) {
      window.location.assign("../dashboard/index.html");
   } else {
      // Construct the URL with the email parameter
      const url = "landingPage.html?email=" + encodeURIComponent(signInEmail);

      // Redirect to the constructed URL
      window.location.href = url;
   }
});

// Function to validate email format
function validateEmail(email) {
   // Regular expression for a standard email format
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // Check if the email matches the regular expression
   return emailRegex.test(email);
}

// Function to validate password
function validatePassword(password) {
   return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
   );
}

// Function to display error message
function displayErrorMessage(message, element) {
   element.innerText = message;
   element.style.display = "block";
   element.style.color = "red";
   element.style.marginTop = "5px";
}

// Function to hide error message
function hideErrorMessage(element) {
   element.style.display = "none";
}
