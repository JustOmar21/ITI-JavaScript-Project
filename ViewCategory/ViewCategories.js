let table = document.querySelector("table");

retrieveData();

// if (sessionStorage.getItem("currentUserID") == null) {
//   alert("You are not logged In");
//   location.assign("../Store/index.html");
// }

function retrieveData() {
  let categories = localStorage.getItem("category");
  categories = categories ? JSON.parse(categories) : [];
  for (let cat of categories) {
    codeBuilderTR(cat);
  }
}

function codeBuilderTR(cat) {
  let IDTD = document.createElement("td");
  IDTD.innerHTML = cat.id;

  let titleTD = document.createElement("td");
  titleTD.innerHTML = cat.name;

  let descTD = document.createElement("td");
  descTD.innerHTML = cat.description;

  let operationTD = document.createElement("td");

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.addEventListener("click", updateCategory);
  editBtn.innerHTML = "Edit";

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", removeCategory);
  deleteBtn.innerHTML = "Delete";

  operationTD.appendChild(editBtn);
  operationTD.appendChild(document.createTextNode(" "));
  operationTD.appendChild(deleteBtn);

  let TR = document.createElement("tr");
  TR.appendChild(IDTD);
  TR.appendChild(titleTD);
  TR.appendChild(descTD);
  TR.appendChild(operationTD);

  table.firstElementChild.appendChild(TR);
}

// function categoryNumberCheck() {
//   const categoryNumber = document.querySelector(".categoryNumber");
//   let categories = localStorage.getItem("category");
//   categories = categories ? JSON.parse(categories) : [];
//   categoryNumber.innerText = categories.length;
// }

function updateCategory(e) {
  let catID =
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  localStorage.setItem("updateCatID", catID);
  window.location.assign("../UpdateCategories/updateCategories.html");
}

function removeCategory(e) {
  let catID =
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.innerText;
  e.target.parentElement.parentElement.remove();
  let categories = localStorage.getItem("category");
  categories = categories ? JSON.parse(categories) : [];

  for (let singleCat in categories) {
    if (categories[singleCat].id == catID) {
      removeProduct(categories[singleCat]);
      categories.splice(singleCat, 1);
    }
  }
  localStorage.setItem("category", JSON.stringify(categories));
//   categoryNumberCheck();
}

function removeProduct(singleCat) {
  let products = localStorage.getItem("product");
  products = products ? JSON.parse(products) : [];
  for (let singleProduct in products) {
    if (singleCat.id == products[singleProduct].categoryID) {
      removeWish(products[singleProduct]);
      products.splice(singleProduct, 1);
    }
  }
  localStorage.setItem("product", JSON.stringify(products));
}

function removeWish(singleProduct) {
  let wishlists = localStorage.getItem("wishlist");
  wishlists = wishlists ? JSON.parse(wishlists) : [];
  for (let singleWish in wishlists) {
    if (singleProduct.id == wishlists[singleWish].productID) {
      wishlists.splice(singleWish, 1);
    }
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlists));
}

// categoryNumberCheck();

// #region Local Storage Classes

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

class Order {
  constructor(id, productID, quantity, status, userID) {
    this.id = id;
    this.productID = productID;
    this.quantity = quantity;
    this.status = status;
    this.userID = userID;
  }
}

class Wishlist {
  constructor(id, productID, userID) {
    this.id = id;
    this.productID = productID;
    this.userID = userID;
  }
}
// #endregion
