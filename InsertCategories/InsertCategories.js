const forma = document.querySelector(".Form");

const catID = document.querySelector("#categoryID");

const catName = document.querySelector("#categoryName");
const catNameVali = document.querySelector(".nameVali");
let catNameStatus = false;

const catDesc = document.querySelector("#categoryDescription");




if (localStorage.getItem("categoryID") == null) {
    localStorage.setItem("categoryID", 0);
}

// function categoryNumberCheck()
// {
//     const categoryNumber = document.querySelector(".categoryNumber");
//     let categories = localStorage.getItem("category");
//     categories = categories ? JSON.parse(categories) : 0;
//     categoryNumber.innerText=categories.length;
// }

// categoryNumberCheck();


catName.addEventListener("input", validateName);


catID.value = JSON.parse(localStorage.getItem("categoryID"));
forma.addEventListener("submit", (e) => {
    e.preventDefault();
    validateAll();
    let status = catNameStatus;
    if (status) {
        let categories = localStorage.getItem("category");
        categories = categories ? JSON.parse(categories) : [];
        let catID = JSON.parse(localStorage.getItem("categoryID"));
        localStorage.setItem("categoryID",catID+1);
        let singleCategory = new Category(catID,catName.value,catDesc.value);
        categories.push(singleCategory);
        localStorage.setItem("category",JSON.stringify(categories));
        location.reload();
    }
})



function validateAll() {
    validateName();
}

function validateName() {
    catID.value = JSON.parse(localStorage.getItem("categoryID"));
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