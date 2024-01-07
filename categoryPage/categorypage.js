let container = document.querySelector(".containerCategory");

console.log(container);

getData();

if (sessionStorage.getItem("currentUserID") == null) {
  alert("You are not logged In");
  location.assign("../Store/index.html");
}

function getData() {
  let categories = localStorage.getItem("category");
  categories = JSON.parse(categories) || [];

  let products = localStorage.getItem("product");
  products = JSON.parse(products) || [];

  for (let singleCat of categories) {
    let notEmpty = false;
    for (let prod of products) {
      if (prod.categoryID == singleCat.id) {
        notEmpty = true;
      }
    }
    if (notEmpty) {
      categoryBuilder(singleCat);
    }
  }
}

function categoryBuilder(Category) {
  let gallaryDiv = document.createElement("div");
  gallaryDiv.classList.add("gallary");

  let categoryName = document.createElement("h2");
  categoryName.innerHTML = Category.name;
  gallaryDiv.appendChild(categoryName);

  let products = localStorage.getItem("product");
  products = JSON.parse(products) || [];

  let counter = 0;
  for (let prod of products) {
    if (prod.categoryID == Category.id && counter < 3) {
      productBuilder(prod, gallaryDiv);
      counter++;
    }
  }

  let seeMoreLink = document.createElement("a");
  seeMoreLink.innerHTML = "See More";

  let seeMoreH = document.createElement("h5");
  seeMoreH.addEventListener("click", () => categoryPage(Category.id));

  seeMoreH.appendChild(seeMoreLink);
  gallaryDiv.appendChild(seeMoreH);

  container.appendChild(gallaryDiv);
}

function productBuilder(prod, gallaryDiv) {
  let productDiv = document.createElement("div");
  productDiv.classList.add("contant");
  productDiv.addEventListener("click", () => productPage(prod.id));

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

  productDiv.appendChild(productImg);
  productDiv.appendChild(productName);
  productDiv.appendChild(productDesc);
  productDiv.appendChild(productPrice);
//   productDiv.appendChild(cartBtn);

  gallaryDiv.appendChild(productDiv);
}

function productPage(prodID) {
   localStorage.setItem("currentProductID", prodID);
   location.assign("../productDetails.html");
 }

function categoryPage(catID) {
  localStorage.setItem("selectedCatID", catID);
  location.assign("../singleCategoryPage/singleCategoryPage.html");
}

const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.assign("../Store/index.html");
});
