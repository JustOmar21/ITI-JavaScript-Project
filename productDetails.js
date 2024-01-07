document.addEventListener("DOMContentLoaded", function () {
  const bigWrapper = document.querySelector(".big-wrapper");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  if (hamburgerMenu) {
    // Check if the element is found
    hamburgerMenu.addEventListener("click", function () {
      bigWrapper.classList.toggle("active");
    });
  }
});

const signOutBtn = document.getElementById("signout-btn");
signOutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("currentUserID");
  window.location.href = "Store/index.html";
});

if (sessionStorage.getItem("currentUserID") == null) {
  alert("You are not logged In");
  location.assign("../Store/index.html");
}

//constants

//set Product Id in localStorage
// document.querySelectorAll(".details-product-Btn").forEach((detailsBtn) => {
//   detailsBtn.addEventListener("click" , function() {

//     const productId = detailsBtn.getAttribute("data-id");

//     localStorage.setItem("currentProductId" , productId);

//     location.assign("/productDetails.html");

//   });
// });

let productId;

//get productId from localStorage
if (localStorage.getItem("currentProductID")) {
  productId = JSON.parse(localStorage.getItem("currentProductID"));
} else {
  alert(
    "You cannot access this page directly, please enter from the Category Page"
  );
  location.assign("singleCategoryPage/singleCategoryPage.html");
}

//get all data from localStorage
function getSingleProductById(id) {
  if (localStorage.getItem("product")) {
    const allProducts = JSON.parse(localStorage.getItem("product"));
    //get target product by id
    const filterArr = allProducts.filter((product) => {
      return product.id == id;
    });
    console.log(filterArr);
    if (filterArr.length == 0) {
      alert("Product has been deleted");
      location.assign("singleCategoryPage/singleCategoryPage.html");
    }
    const currentProduct = filterArr[0];

    return currentProduct;
  }
}

//setup product is details page
function generateProduct() {
  //get currentProduct from localStorage using my method.
  const currentProduct = getSingleProductById(productId);

  document.getElementById("product-img").src = currentProduct.image;
  document.getElementById(
    "product-name"
  ).textContent = `${currentProduct.name}`;
  document.getElementById(
    "product-price"
  ).textContent = `Price: ${currentProduct.price}$`;
  document.getElementById("product-description").textContent =
    currentProduct.description;
}

generateProduct();

//handle add to cart

document.getElementById("add-to-cart").addEventListener("click", function () {
  const currentProduct = getSingleProductById(productId);
  addToCartHandle(currentProduct);
});

//handle add current product to shopping cart arr in localStorage
function addToCartHandle(currentProduct) {
  let shoppingCartArr = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  //check if product already found in shopping Cart
  if (
    !shoppingCartArr.some((product) => {
      return (
        product.productID == currentProduct.id &&
        product.userID == sessionStorage.getItem("currentUserID")
      );
    })
  ) {
    let cartID = localStorage.getItem("cartID") || 0;
    localStorage.setItem("cartID", Number(cartID) + 1);
    let product = new ShoppingCart(
      cartID,
      currentProduct.id,
      1,
      sessionStorage.getItem("currentUserID")
    );
    shoppingCartArr.push(product);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));

    // redirect to shopping cart page
    window.location.assign("shoppingCart.html");
  } else {
    alert("product is already in shopping cart");
  }
}

// handle add to wishlist
document
  .getElementById("add-to-wishlist")
  .addEventListener("click", function () {
    const currentProduct = getSingleProductById(productId);
    addToWishlistHandle(currentProduct);
  });

function addToWishlistHandle(currentProduct) {
  let Wishlists = JSON.parse(localStorage.getItem("wishlist")) || [];

  //check if product already found in wishlist
  if (
    !Wishlists.some((wishlist) => {
      return (
        wishlist.productID == currentProduct.id &&
        wishlist.userID == sessionStorage.getItem("currentUserID")
      );
    })
  ) {
    let wishlistID = localStorage.getItem("wishlistID") || 0;
    localStorage.setItem("wishlistID", Number(wishlistID) + 1);
    let product = new Wishlist(
      wishlistID,
      currentProduct.id,
      sessionStorage.getItem("currentUserID")
    );
    Wishlists.push(product);
    localStorage.setItem("wishlist", JSON.stringify(Wishlists));

    // redirect to wishlist page
    window.location.assign("Wishinglist/wishlist.html");
  } else {
    alert("product is already in wishlist");
  }
}

class ShoppingCart {
  constructor(id, productID, quantity, userID) {
    this.id = id;
    this.productID = productID;
    this.quantity = quantity;
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
