let fName = document.querySelector("#fName");
let fNameVali = document.querySelector(".fNameVali");
let fNameState = false;

let lName = document.querySelector("#lName");
let lNameVali = document.querySelector(".lNameVali");
let lNameState = false;

let street = document.querySelector("#address");
let streetVali = document.querySelector(".addressVali");
let streetState = false;

let city = document.querySelector("#city");
let cityVali = document.querySelector(".cityVali");
let cityState = false;

let state = document.querySelector("#state");
let stateVali = document.querySelector(".stateVali");
let stateState = false;

let zipcode = document.querySelector("#zipcode");
let zipcodeVali = document.querySelector(".zipcodeVali");
let zipcodeState = false;

let country = document.querySelector("#country");
let countryVali = document.querySelector(".countryVali");
let countryState = false;

let phone = document.querySelector("#phone");
let phoneVali = document.querySelector(".phoneVali");
let phoneState = false;

let submit = document.querySelector(".shippingForm");

fName.addEventListener("input" , validateFirstName);
lName.addEventListener("input" , validateLastName);
street.addEventListener("input",validateStreet);
city.addEventListener("input", validateCity);
state.addEventListener("input", validateState);
zipcode.addEventListener("input", validateZipcode);
country.addEventListener("input", validateCountry);
phone.addEventListener("input", validatePhone);
submit.addEventListener("submit", submitFun);


function validateAll(){
    validateFirstName();
    validateLastName();
    validateStreet();
    validateCity();
    validateState();
    validateZipcode();
    validateCountry();
    validatePhone();
}



function submitFun(e){
    e.preventDefault();
    validateAll();
}




function validateFirstName(){
    let pattern = /^[a-zA-Z ]{2,30}$/;

    if(pattern.test(fName.value))
    {
        fNameState = true;
        fNameVali.innerHTML = ""
    }
    else
    {
        fNameState = false;
        fNameVali.innerHTML = "Letters Only, 2 - 30 Character";
    }
}

function validateLastName(){
    let pattern = /^[a-zA-Z ]{2,30}$/;

    if(pattern.test(lName.value))
    {
        lNameState = true;
        lNameVali.innerHTML = "";
    }
    else
    {
        lNameState = false;
        lNameVali.innerHTML = "Letters Only, 2 - 30 Character";
    }
}

function validateStreet(){
    let pattern = /^[#.0-9a-zA-Z\s,-]+$/;

    if(pattern.test(street.value))
    { 
        streetState = true ;
        streetVali.innerHTML = "";
    }
    else
    {
        streetState = false;
        streetVali.innerHTML = "No Special Characters Allowed";
    }
}

function validateCity() {
    let pattern = /^[0-9a-zA-Z\s]+$/;

    if(pattern.test(city.value))
    { 
        cityState = true ;
        cityVali.innerHTML = "";
    }
    else
    {
        cityState = false;
        cityVali.innerHTML = "Letters and Numbers Only";
    }
}

function validateState() {
    let pattern = /^[0-9a-zA-Z\s]+$/;

    if(pattern.test(state.value))
    { 
        stateState = true ;
        stateVali.innerHTML = "";
    }
    else
    {
        stateState = false;
        stateVali.innerHTML = "Letters and Numbers Only";
    }
}

function validateZipcode() {
    let pattern = /^[0-9]+$/;

    
    if(pattern.test(zipcode.value))
    { 
        zipcodeState = true ;
        zipcodeVali.innerHTML = "";
    }
    else
    {
        zipcodeState = false;
        zipcodeVali.innerHTML = "Numbers Only";
    }
}

function validateCountry(){
    if(country.value =='')
    {
        countryState = true;
        countryVali.innerHTML = "Select A Country";
    }
    else
    {
        countryState = false;
        countryVali.innerHTML = "";
    }
}

function validatePhone(){
    let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gmi;

    if(pattern.test(phone.value))
    {
        phoneState = true;
        phoneVali.innerHTML ="";
    }
    else
    {
        phoneState = false;
        phoneVali.innerHTML = "Enter A Valid Number";
    }
}