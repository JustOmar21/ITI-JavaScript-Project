const forma = document.querySelector(".Form");

const catID = document.querySelector("#categoryID");

const catName = document.querySelector("#categoryName");
const catNameVali = document.querySelector(".nameVali");
let catNameStatus = false;

const catDesc = document.querySelector("#categoryDescription");

if (localStorage.getItem("categoryID") == null) {
  localStorage.setItem("categoryID", 0);
}
// ////////////////////////////////////////////////////////
// if (localStorage.getItem("updateCatID") == null) {
//   alert("You cannot access this page directly");
//   location.assign("../ViewCategory/ViewCategories.html");
// }
// //////////////////////////////////////////////////////
// function categoryNumberCheck() {
//   const categoryNumber = document.querySelector(".categoryNumber");
//   let categories = localStorage.getItem("category");
//   categories = categories ? JSON.parse(categories) : [];
//   categoryNumber.innerText = categories.length;
// }

// categoryNumberCheck();

catName.addEventListener("input", validateName);

catData();

function catData() {
  catID.value = JSON.parse(localStorage.getItem("updateCatID"));
  let categories = localStorage.getItem("category");
  categories = categories ? JSON.parse(categories) : [];
  for (let singleCat of categories) {
    if (singleCat.id == catID.value) {
      catName.value = singleCat.name;
      catDesc.value = singleCat.description;
    }
  }
}

forma.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAll();
  let status = catNameStatus;
  if (status) {
    localStorage.removeItem("updateCatID");
    let categories = localStorage.getItem("category");
    categories = categories ? JSON.parse(categories) : [];
    for (let singleCat of categories) {
      if (singleCat.id == catID.value) {
        singleCat.name = catName.value;
        singleCat.description = catDesc.value;
      }
    }
    localStorage.setItem("category", JSON.stringify(categories));
    location.assign("../ViewCategory/ViewCategories.html");
  }
});

function validateAll() {
  validateName();
}

function validateName() {
  catID.value = JSON.parse(localStorage.getItem("updateCatID"));
  let regex = /^[a-z0-9A-Z\s]+$/;
  if (regex.test(catName.value)) {
    catNameVali.innerHTML = "";
    catNameStatus = true;
  } else {
    catNameVali.innerHTML = "Letters and numbers only";
    catNameStatus = false;
  }
}

// #region Local Storage Classes

class Category {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

// #endregion
