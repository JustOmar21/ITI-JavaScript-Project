

function CodeBuilder()
{
    let statusTD = document.createElement("td");
    
    let accBtn = document.createElement("button");
    accBtn.classList.add("Accept");
    accBtn.value = "Accept";

    let rejBtn = document.createElement("button");
    rejBtn.classList.add("Reject");
    rejBtn.value = "Reject";

    statusTD.appendChild(accBtn);
    statusTD.appendChild(document.createTextNode(" "));
    statusTD.appendChild(rejBtn);

    let tr = document.createElement("tr");
    tr.appendChild(statusTD);

    table.appendChild(tr);
}