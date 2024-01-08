// Get form and input fields
const form = document.querySelector(".Form");

const productID = document.getElementById("productID");

const productName = document.getElementById("productName");
const productNameVali = document.querySelector(".productNameVali");
let productNameStatus = false;

const categoryID = document.getElementById("categoryID");
const categoryVali = document.querySelector(".categoryVali");
let categoryStatus = false;

const image = document.getElementById("image");
const imgVali = document.querySelector(".imgVali");
let imgValiStatus = false;

const quantity = document.getElementById("Quantity");
const quanVali = document.querySelector(".quanVali");
let quanValiStatus = false;

const productPrice = document.getElementById("productprice");
const priceVali = document.querySelector(".priceVali");
let priceValiStatus = false;

const description = document.getElementById("description");

// #region Local Storage Classes
if (localStorage.getItem("categoryID") == null) {
  localStorage.setItem("categoryID", 0);
}

if (localStorage.getItem("productID") == null) {
  localStorage.setItem("productID", 0);
}

function getData() {
  let products = localStorage.getItem("product");
  products = products ? JSON.parse(products) : [];
  let prodID = localStorage.getItem("updateProdID");
  if(prodID == null)
  {
    alert("you cannot access this page directly");
    location.assign("../ViewProduct/Viewproduct.html");

  }
  for (let prod of products) {
    if (prod.id == prodID) {
      productID.value = prod.id;
      productName.value = prod.name;
      image.value = prod.image;
      productPrice.value = prod.price;
      description.value = prod.description
      quantity.value = prod.quantity;
      categoryID.value = prod.categoryID;
    }
  }
}

// function categoryNumberCheck() {
//   const categoryNumber = document.querySelector(".categoryNumber");
//   let categories = localStorage.getItem("category");
//   categories = categories ? JSON.parse(categories) : [];
//   categoryNumber.innerText = categories.length;
// }
// function productNumberCheck() {
//   const productNumber = document.querySelector(".productNumbers");
//   let products = localStorage.getItem("product");
//   products = products ? JSON.parse(products) : [];
//   productNumber.innerText = products.length;
// }

getData();
// categoryNumberCheck();
// productNumberCheck();

class Category {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

class Product {
  constructor(id, name, image, price, description, quantity, categoryID) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
    this.categoryID = categoryID;
  }
}

// #endregion

productName.addEventListener("input", validateName);
image.addEventListener("input", validateImg);
quantity.addEventListener("input", validateQuantitiy);
productPrice.addEventListener("input", validatePrice);
categoryID.addEventListener("input", validateCategory);

// Regular expressions for validation
const patterns = {
  productName: /^[a-z0-9A-Z\s]+$/,
  image: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i,
  productprice: /^\d+(\.\d{1,2})?$/,
  Quantity: /^\d+$/,
};

// Validation function
function validateName() {
  let regex = patterns.productName;
  if (regex.test(productName.value)) {
    productNameVali.innerHTML = "";
    productNameStatus = true;
  } else {
    productNameVali.innerHTML = "Letters and numbers only";
    productNameStatus = false;
  }
}

function validateImg() {
  let regex = patterns.image;
  if (regex.test(image.value)) {
    imgVali.innerHTML = "";
    imgValiStatus = true;
  } else {
    imgVali.innerHTML = "Valid links only";
    imgValiStatus = false;
  }
}

function validateQuantitiy() {
  let regex = patterns.Quantity;
  if (regex.test(quantity.value) && quantity.value > 0) {
    quanVali.innerHTML = "";
    quanValiStatus = true;
  } else {
    quanVali.innerHTML = "Only postive numbers";
    quanValiStatus = false;
  }
}

function validatePrice() {
  let regex = patterns.productprice;
  if (regex.test(productPrice.value) && productPrice.value > 0) {
    priceVali.innerHTML = "";
    priceValiStatus = true;
  } else {
    priceVali.innerHTML = "Only postive numbers";
    priceValiStatus = false;
  }
}

function validateCategory() {
  let selectedOpt = categoryID.selectedIndex;
  if (categoryID.options[selectedOpt].value != "") {
    categoryVali.innerHTML = "";
    categoryStatus = true;
  } else {
    categoryVali.innerHTML = "Select a Category";
    categoryStatus = false;
  }
}

function validateAll() {
  validateName();
  validateImg();
  validateQuantitiy();
  validatePrice();
  validateCategory();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  validateAll();
  let status =
    productNameStatus && imgValiStatus && quanValiStatus && priceValiStatus && categoryStatus;

  if (status) {
    let products = localStorage.getItem("product")
    products = products ? JSON.parse(products) : [];
    let prodID = localStorage.getItem("updateProdID");
    for (let prod of products) {
      if (prodID == prod.id) 
      {
        prod.id = productID.value;
        prod.name = productName.value;
        prod.image = image.value;
        prod.price = productPrice.value;
        prod.description = description.value;
        prod.quantity = quantity.value;
        prod.categoryID = categoryID.value;
      }
    }
    localStorage.setItem("product", JSON.stringify(products));
    localStorage.removeItem("updateProdID");
    location.assign("../ViewProduct/Viewproduct.html");
  }
});

getCategories();

function getCategories() {
  let categories = localStorage.getItem("category");
  categories = categories ? JSON.parse(categories) : [];
  if (categories.length == 0) {
    alert("you cannot add a product without adding a category");
    location.assign("../InsertCategories/InsertCategories.html");
  }

  for (let singleCat of categories) {
    let opt = document.createElement("option");
    opt.value = singleCat.id;
    opt.innerHTML = singleCat.name;
    categoryID.appendChild(opt);
  }
}
