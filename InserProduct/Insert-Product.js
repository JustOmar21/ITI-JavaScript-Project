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
if(localStorage.getItem("categoryID") == null)
{
  localStorage.setItem("categoryID",0);
}
if(localStorage.getItem("productID") == null)
{
  localStorage.setItem("productID",0);
}

function categoryNumberCheck()
{
    const categoryNumber = document.querySelector(".categoryNumber");
    let categories = localStorage.getItem("category");
    categories = categories ? JSON.parse(categories) : 0;
    categoryNumber.innerText=categories.length;
}

class Category {

  constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
  }

}

class Product {
  
  constructor(id , name , image , price , description , quantity , categoryID){
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

productName.addEventListener("input" , validateName);
image.addEventListener("input" , validateImg);
quantity.addEventListener("input" , validateQuantitiy);
productPrice.addEventListener("input" , validatePrice);
categoryID.addEventListener("input" , validateCategory);

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
  if (categoryID.options[selectedOpt].value !="") {
    categoryVali.innerHTML = "";
    categoryStatus = true;
  } else {
    categoryVali.innerHTML = "Select a Category";
    categoryStatus = false;
  }
}

function validateAll(){
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
  productNameStatus && imgValiStatus && quanValiStatus && priceValiStatus;

  if (status)
  {
    alert("succuess");
  }
});




// const form = document.querySelector(".Form");

// // Regular expressions for validation
// const patterns = {
//   productID: /^[0-9]+$/,
//   productName: /^[A-Za-z0-9\s]+$/,
//   produccategoryID: /^[A-Za-z0-9]+$/,
//   Statues: /^[A-Za-z\s]+$/,
// };

// function validate(field, regex) {
//   if (regex.test(field.value)) {
//     field.classList.remove("invalid");
//     field.classList.add("valid");
//   } else {
//     field.classList.remove("valid");
//     field.classList.add("invalid");
//   }
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   for (let key in patterns) {
//     const inputField = document.getElementById(key);
//     validate(inputField, patterns[key]);
//   }

//   // Check if all fields are valid before submitting
//   const isValid = Object.keys(patterns).every((key) =>
//     patterns[key].test(document.getElementById(key).value)
//   );

//   if (isValid) {
//     // Submit the form or perform other actions
//     console.log("Form submitted successfully!");
//   } else {
//     console.log("Form has invalid fields. Please correct them.");
//   }
// });

// // Validate fields on input
// for (let key in patterns) {
//   const inputField = document.getElementById(key);

//   inputField.addEventListener("input", (e) => {
//     validate(e.target, patterns[key]);
//   });
// }

// fetch('https://dummyjson.com/products/1')
// .then(res => res.json())
// .then(
//   res => {
//     let catID = document.querySelector("#categoryID");
//     let opt = document.createElement("option");
//     opt.value = 4
//     opt.innerHTML =`${res.category}`;
//     catID.appendChild(opt);
//     console.log(res);
//   }
//   );