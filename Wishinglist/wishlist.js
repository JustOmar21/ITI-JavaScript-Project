const products = [];

function setup() {
  let products = document.querySelectorAll(".addtowishlist");
  for (const prod of products) {
    prod.onclick = function (e) {
      Additems(e);
    };
  }
}
function Additems(e) {
  window.addToWishlist = function (productId) {
    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist.push(selectedProduct);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      displayWishlist();
    }
  };
}
function Removeitems(productid) {}

window.addEventListener("load", setup);
