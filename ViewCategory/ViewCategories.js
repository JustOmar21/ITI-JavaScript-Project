let table = document.querySelector("table");




retrieveData();


function retrieveData()
{
    let categories = localStorage.getItem("category");
    categories = categories ? JSON.parse(categories) : [];
    for(let cat of categories)
    {
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
    editBtn.innerHTML = "Edit";


    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
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




function categoryNumberCheck() {
    const categoryNumber = document.querySelector(".categoryNumber");
    let categories = localStorage.getItem("category");
    categories = categories ? JSON.parse(categories) : 0;
    categoryNumber.innerText = categories.length;
}

categoryNumberCheck();

// #region Local Storage Classes

class Category {

    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

}

// #endregion