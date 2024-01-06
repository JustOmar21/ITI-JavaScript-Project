// Add event listeners after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
   // Get the buyer and seller elements
   var buyerElement = document.getElementById("buyer");
   var sellerElement = document.getElementById("seller");

   buyerElement.addEventListener("click", function () {
      // Get the email parameter from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      // Retrieve the array of objects from local storage
      let userRecords = JSON.parse(localStorage.getItem("user")) || [];

      // Find the user object with the matching email
      let matchingUser = userRecords.find((user) => user.email === email);

      // Set session storage
      sessionStorage.setItem("currentUserID",matchingUser.id);

      // Update the user type
      matchingUser.type = false;

      // Update the user record in the array
      const updatedUserRecords = userRecords.map((user) =>
         user.email === email ? matchingUser : user
      );

      // Store the updated array back to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserRecords));
      // Construct the URL with the email parameter
      const url = "landingPage.html?email=" + encodeURIComponent(email);

      // Redirect to the constructed URL
      window.location.href = url;
   });

   sellerElement.addEventListener("click", function () {
      // Get the email parameter from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      // Retrieve the array of objects from local storage
      let userRecords = JSON.parse(localStorage.getItem("user")) || [];

      // Find the user object with the matching email
      let matchingUser = userRecords.find((user) => user.email === email);

      // Update the user type
      matchingUser.type = true;

      // Update the user record in the array
      const updatedUserRecords = userRecords.map((user) =>
         user.email === email ? matchingUser : user
      );

      // Store the updated array back to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserRecords));

      window.location.assign("../dashboard/index.html");
   });
});
