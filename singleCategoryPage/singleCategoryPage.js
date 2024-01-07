let container = document.querySelector(".containerCategory");

console.log(container);

getData();
//////////////////////////////////////////////////////////////////
if (sessionStorage.getItem("currentUserID") == null) {
  alert("You are not logged In");
  location.assign("../Store/index.html");
}
////////////////////////////////////////////////////////////////////
function getData() {
  let categoryTitle = document.querySelector(".productName");
  let gallary = document.querySelector(".gallary");

  let categories = localStorage.getItem("category");
  categories = JSON.parse(categories) || [];

  let categoryID = localStorage.getItem("selectedCatID");
  if (categoryID == null) {
    alert(
      "you cannot access this page directly, please enter from the Categories Page"
    );
    location.assign("../categoryPage/categorypage.html");
  }

  for (let singleCat of categories) {
    if (singleCat.id == categoryID) {
      categoryTitle.innerHTML = singleCat.name;
    }
  }

  let products = localStorage.getItem("product");
  products = JSON.parse(products) || [];

  for (let prod of products) {
    if (prod.categoryID == categoryID) {
      productBuilder(prod, gallary);
    }
  }
}

function productBuilder(prod, gallaryDiv) {
  let productDiv = document.createElement("div");
  productDiv.classList.add("contant");

  let divContain = document.createElement("div");
  divContain.classList.add("ProductDetails");
  divContain.addEventListener("click", () => productPage(prod.id));

  let productImg = document.createElement("img");
  productImg.classList.add("images");
  productImg.src = prod.image;

  let productName = document.createElement("h3");
  productName.innerHTML = prod.name;

  let productDesc = document.createElement("p");
  productDesc.innerHTML = prod.description;

  let productPrice = document.createElement("h6");
  productPrice.innerHTML = `${prod.price}$`;

//   let cartBtn = document.createElement("button");
//   cartBtn.classList.add("Addtocart");
//   cartBtn.innerHTML = "Add to Cart";

  divContain.appendChild(productImg);
  divContain.appendChild(productName);
  divContain.appendChild(productDesc);
  divContain.appendChild(productPrice);
  productDiv.appendChild(divContain);
//   productDiv.appendChild(cartBtn);

  gallaryDiv.appendChild(productDiv);
}

function productPage(prodID) {
  localStorage.setItem("currentProductID", prodID);
  location.assign("../productDetails.html");
}

const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("../Store/index.html");
});
