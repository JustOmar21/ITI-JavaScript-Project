const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // if form not valid do nothing
  if (!validateForm(form)) return;
});

const validateForm = (form) => {
  let valid = true;
  let name = form.querySelector(".name");
  let message = form.querySelector(".message");
  let email = form.querySelector(".email");
  if (name.value === "") {
    giveError(name, "Please Enter Your Name");
    valid = false;
  }
  if (message.value === "") {
    giveError(message, "Please Enter Your message");
    valid = false;
  }
  // email validation
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailValue = email.value;
  if (!emailRegex.test(emailValue)) {
    giveError(email, "Please Enter Valid Email ");
    valid = false;
  }
  return valid;
};

const giveError = (field, message) => {
  let parentElement = field.parentElement;
  parentElement.classList.add("error");
  let existingError = parentElement.querySelector(".err-msg");
  if (existingError) {
    existingError.remove();
  }
  let error = document.createElement("span");
  error.textContent = message;
  error.classList.add("err-msg");
  parentElement.appendChild(error);
};
