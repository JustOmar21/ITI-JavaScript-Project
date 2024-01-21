const signOutBtn = document.getElementById("signout-btn");

signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("Store/index.html");
});

class ShippingInfo {
  constructor(street, city, state, zipcode, country, phone, userID) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.country = country;
    this.phone = phone;
    this.userID = userID;
  }
}

let street = document.querySelector("#address");
let streetVali = document.querySelector(".addressVali");
let streetState = false;

let city = document.querySelector("#city");
let cityVali = document.querySelector(".cityVali");
let cityState = false;

let state = document.querySelector("#state");
let stateVali = document.querySelector(".stateVali");
let stateState = false;

let zipcode = document.querySelector("#zipcode");
let zipcodeVali = document.querySelector(".zipcodeVali");
let zipcodeState = false;

let country = document.querySelector("#country");
let countryVali = document.querySelector(".countryVali");
let countryState = false;

let phone = document.querySelector("#phone");
let phoneVali = document.querySelector(".phoneVali");
let phoneState = false;

let submit = document.querySelector(".shippingForm");

street.addEventListener("input", validateStreet);
city.addEventListener("input", validateCity);
state.addEventListener("input", validateState);
zipcode.addEventListener("input", validateZipcode);
country.addEventListener("input", validateCountry);
phone.addEventListener("input", validatePhone);
submit.addEventListener("submit", submitFun);

getData();

function getData() {
  if (sessionStorage.getItem("order") == null) {
    alert("you cannot access this page directly, Please place an order first!");
    location.assign("shoppingCart.html");
  }
  /////////////////////////////////////////////////////////
  if (sessionStorage.getItem("currentUserID") == null) {
    alert("you are not logged in");
    location.assign("Store/index.html");
  }
  ////////////////////////////////////////////////////
  let userShips = JSON.parse(localStorage.getItem("shippingInfo")) || [];
  let currentUserID = sessionStorage.getItem("currentUserID");

  let singleUserShip = userShips.filter(
    (user) => user.userID == currentUserID
  )[0];

  street.value = singleUserShip.street || "";
  city.value = singleUserShip.city || "";
  state.value = singleUserShip.state || "";
  zipcode.value = singleUserShip.zipcode || "";
  country.value = singleUserShip.country || "";
  phone.value = singleUserShip.phone || "";
}

function validateAll() {
  validateStreet();
  validateCity();
  validateState();
  validateZipcode();
  validateCountry();
  validatePhone();
}

function submitFun(e) {
  e.preventDefault();
  validateAll();

  let stateValidation =
    streetState &&
    cityState &&
    stateState &&
    zipcodeState &&
    countryState &&
    phoneState;

  if (stateValidation) {
    let userShips = JSON.parse(localStorage.getItem("shippingInfo")) || [];
    let singleUser = userShips.filter(
      (ship) => ship.userID == sessionStorage.getItem("currentUserID")
    )[0];
    if (singleUser) {
      for (let user of userShips) {
        if (user.userID == sessionStorage.getItem("currentUserID")) {
          user.street = street.value;
          user.city = city.value;
          user.state = state.value;
          user.zipcode = zipcode.value;
          user.country = country.value;
          user.phone = phone.value;
          break;
        }
      }
    } else {
      let singleUserShip = new ShippingInfo(
        street.value,
        city.value,
        state.value,
        zipcode.value,
        country.value,
        phone.value,
        sessionStorage.getItem("currentUserID")
      );
      userShips.push(singleUserShip);
    }

    localStorage.setItem("shippingInfo", JSON.stringify(userShips));

    placeOrder();
  }
}

function placeOrder() {
  let tempOrder = JSON.parse(sessionStorage.getItem("order"));
  tempOrder = tempOrder.filter(
    (order) =>
      Number(order.userID) == Number(sessionStorage.getItem("currentUserID"))
  );
  console.log(tempOrder);

  orderNumber = tempOrder.length;

  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  let products = JSON.parse(localStorage.getItem("product")) || [];
  let count = 0;
  for (let order of tempOrder) {
    for (let prod of products) {
      if (order.productID == prod.id) {
        let orderPrice = tempOrder[count++].productPrice;
        if (!(orderPrice == prod.price)) {
          alert("A product price have been updated, redirecting the page");
          location.assign("shoppingCart.html");
        }
        console.log(Number(order.quantity) > Number(prod.quantity));
        if (Number(order.quantity) > Number(prod.quantity)) {
          alert(
            `the "${prod.name}" product has only ${prod.quantity} units, please lower your order quantity`
          );
          location.assign("shoppingCart.html");
        }
      }
    }
  }
  let cartCount = shoppingCart.filter(
    (item) => item.userID == sessionStorage.getItem("currentUserID")
  );
  console.log(cartCount + " " + orderNumber + " " + tempOrder);
  cartCount = cartCount.length;
  if (cartCount != orderNumber) {
    alert("A product may have been deleted, refreshing now");
    location.assign("shoppingCart.html");
    return;
  }

  for (let order of tempOrder) {
    for (let prod of products) {
      if (order.productID == prod.id) {
        prod.quantity = Number(prod.quantity) - Number(order.quantity);
      }
    }
  }

  for (let i = 0; i < shoppingCart.length; i++) {
    if (shoppingCart[i].userID == sessionStorage.getItem("currentUserID")) {
      shoppingCart.splice(i--, 1);
    }
  }

  let orders = JSON.parse(localStorage.getItem("order")) || [];

  for (let singleOrder of tempOrder) {
    orders.push(singleOrder);
  }
  localStorage.setItem("product", JSON.stringify(products));
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  sessionStorage.removeItem("order");
  localStorage.setItem("order", JSON.stringify(orders));
  location.assign("Orders/Orders.html");
}

function validateStreet() {
  let pattern = /^[#.0-9a-zA-Z\s,-]+$/;

  if (pattern.test(street.value)) {
    streetState = true;
    streetVali.innerHTML = "";
  } else {
    streetState = false;
    streetVali.innerHTML = "No Special Characters Allowed";
  }
}

function validateCity() {
  let pattern = /^[0-9a-zA-Z\s]+$/;

  if (pattern.test(city.value)) {
    cityState = true;
    cityVali.innerHTML = "";
  } else {
    cityState = false;
    cityVali.innerHTML = "Letters and Numbers Only";
  }
}

function validateState() {
  let pattern = /^[0-9a-zA-Z\s]+$/;

  if (pattern.test(state.value)) {
    stateState = true;
    stateVali.innerHTML = "";
  } else {
    stateState = false;
    stateVali.innerHTML = "Letters and Numbers Only";
  }
}

function validateZipcode() {
  let pattern = /^[0-9]+$/;

  if (pattern.test(zipcode.value)) {
    zipcodeState = true;
    zipcodeVali.innerHTML = "";
  } else {
    zipcodeState = false;
    zipcodeVali.innerHTML = "Numbers Only";
  }
}

function validateCountry() {
  if (country.value == "") {
    countryState = false;
    countryVali.innerHTML = "Select A Country";
  } else {
    countryState = true;
    countryVali.innerHTML = "";
  }
}

function validatePhone() {
  let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim;

  if (pattern.test(phone.value)) {
    phoneState = true;
    phoneVali.innerHTML = "";
  } else {
    phoneState = false;
    phoneVali.innerHTML = "Enter A Valid Number";
  }
}
