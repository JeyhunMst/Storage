//HTML elements
const products=[];
const btnAdd=document.querySelector(".add-btn");
const tableElements=document.querySelector(".elements-table");
const categories=[];
const selection=document.querySelector("#category-filt");
const btnSearch=document.querySelector(".searchBtn");
const btnDefaultValue=document.querySelector(".back-def");
const btnClearLocalStrg=document.querySelector(".clear");

const btnLogIn=document.querySelector(".login");
const btnLogOut=document.querySelector(".logout");
const addProductSec=document.querySelector(".input-product");
const filters=document.querySelector(".filters");
const prod=document.querySelector(".products");
const userName=document.querySelector(".username");
const pass=document.querySelector(".pass");

const userLog={
    username:"Ceyhun",
    password:"123456"
}

btnClearLocalStrg.addEventListener("click",()=>{
    localStorage.clear();
});
localStorage.setItem("user",JSON.stringify(userLog));
btnLogIn.addEventListener("click",()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    
    if (userName.value==="Ceyhun" && pass.value==="123456" ) {
        
        btnLogOut.classList.remove("d-none");
        addProductSec.classList.remove("d-none");
        filters.classList.remove("d-none");
        prod.classList.remove("d-none");
        btnLogIn.classList.add("d-none");
        userName.classList.add("d-none");
        pass.classList.add("d-none");
        pass.classList.remove("warn");
        userName.classList.remove("warn");
        userName.value="";
        pass.value="";
    }
    else{
        alert("PLease enter valid login or password!")
        userName.classList.add("warn");
        pass.classList.add("warn");
    }
});
btnLogOut.addEventListener("click",()=>{
    btnLogOut.classList.add("d-none");
    addProductSec.classList.add("d-none");
    filters.classList.add("d-none");
    prod.classList.add("d-none");
    btnLogIn.classList.remove("d-none");
    userName.classList.remove("d-none");
    pass.classList.remove("d-none");
});


btnAdd.addEventListener("click",()=>{
   const namePrd=document.querySelector("#product-name").value;
   const categoryPrd=document.querySelector("#category").value;
   const pricePrd=document.querySelector("#price").value;

   const spanName=document.querySelector(".error-name");
   const spanPrc=document.querySelector(".error-price")
   const spanCtg=document.querySelector(".error-categories");
    if (isNaN(pricePrd)|| pricePrd==="") {
        spanPrc.classList.remove("d-none")
    }
    else{
        if (!spanPrc.classList.contains("d-none")) {
            spanPrc.classList.add("d-none");
        }
    }
    if (namePrd.trim()==="") {
        spanName.classList.remove("d-none");
    }
    else{
        if (!spanName.classList.contains("d-none")) {
            spanName.classList.add("d-none");
        }
    }
    if (categoryPrd.trim()==="") {
        spanCtg.classList.remove("d-none");
    }
    else{
        if (!spanCtg.classList.contains("d-none")) {
            spanCtg.classList.add("d-none");
        }
    }
    
    if (spanPrc.classList.contains("d-none") && spanName.classList.contains("d-none") && spanCtg.classList.contains("d-none")) {
        if (existInList(products,namePrd,categoryPrd,pricePrd)) {
            alert("This product exists!")
        }
        else{
            products.push({namePrd:namePrd,pricePrd:pricePrd,categoryPrd:categoryPrd,id:products.length+1});       
        }
    }
    
    products.forEach((product)=>{
        if (categories.includes(product.categoryPrd)) {
            categories.pop(product.categoryPrd);
        }
        categories.push(product.categoryPrd);
    });

    addOptions(categories);
    tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
    sendElementstoStorage(products);
    addAllElementsToTable(JSON.parse(localStorage.getItem("products")));
})

function sendElementstoStorage(array){
    localStorage.setItem("products",JSON.stringify(array));
}
function getElementsfromStorage(array){
    return JSON.parse(localStorage.getItem("products"));
}

const intervalProducts=setInterval(()=>{
    if (localStorage.getItem("products")) {
        tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
        btnLogOut.classList.remove("d-none");
        addProductSec.classList.remove("d-none");
        filters.classList.remove("d-none");
        prod.classList.remove("d-none");
        btnLogIn.classList.add("d-none");
        userName.classList.add("d-none");
        pass.classList.add("d-none");
        pass.classList.remove("warn");
        userName.classList.remove("warn");
        userName.value="";
        pass.value="";
        addAllElementsToTable(JSON.parse(localStorage.getItem("products")));
        clearInterval(intervalProducts);
    }
})

function addAllElementsToTable(products){
    for (let i = 0; i < products.length; i++) {
        const product=products[i];
        const generalPart=document.createElement("tr");
        const pricePart=document.createElement("td");
        const ctgPart=document.createElement("td");
        const nameInp=document.createElement("td");
        nameInp.classList.add("changable");
        nameInp.classList.add(`inp${product.id}`);


        nameInp.innerText=product.namePrd;
        pricePart.innerText=product.pricePrd;
        ctgPart.innerText=product.categoryPrd;
        generalPart.append(nameInp,pricePart,ctgPart);
        tableElements.append(generalPart);
    }
}
function addOptions(categories){

    categories.forEach((category)=>{
        const option=document.createElement("option");
        option.innerText=category;
        option.value=category;
        selection.append(option);
    })
}


function existInList(products,namePr,category,price){
    for (let i = 0; i < products.length; i++) {
        if (products[i].namePrd.toLowerCase()===namePr.toLowerCase() && products[i].categoryPrd.toLowerCase()===category.toLowerCase() && Number(products[i].pricePrd)===Number(price)) {
            return true;
        }
        
    }
    return false;
}


const  aToZ=document.querySelector(".ato-z");
const zToA=document.querySelector(".zto-a");

aToZ.addEventListener("click",()=>{
    tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
    const azProducts=[...products];
    azProducts.sort((a,b)=>{
        {
            if (a.namePrd < b.namePrd) {
              return -1;
            }
            if (a.namePrd > b.namePrd) {
              return 1;
            }
            return 0;
          }
    })
    addAllElementsToTable(azProducts);
})
zToA.addEventListener("click",()=>{
    tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
    const azProducts=[...products];
    azProducts.sort((a,b)=>{
        {
            if (a.namePrd < b.namePrd) {
                return -1;
            }
            if (a.namePrd > b.namePrd) {
                return 1;
            }
            return 0;
            }
    })
    azProducts.reverse();
    addAllElementsToTable(azProducts);
    
})

const btnCategory=document.querySelector(".category-filt");


btnCategory.addEventListener("click",()=>{
    const filtArray=[];
    products.forEach((product)=>{
        if (product.categoryPrd===selection.value) {
            filtArray.push(product);
        }
    })
    tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
    addAllElementsToTable(filtArray);
})

const btnPrice=document.querySelector(".price-filt");
const spanMin=document.querySelector(".minSpan");
const spanMax=document.querySelector(".maxSpan");

btnPrice.addEventListener("click",()=>{
    const filtPrice=[];
    const minPrc=document.querySelector(".min").value;
    const maxPrc=document.querySelector(".max").value;
    if (isNaN(minPrc) && isNaN(maxPrc)) {
        products.forEach((product)=>{
            if (Number(product.pricePrd)>=Number(minPrc) && Number(product.pricePrd)<=Number(maxPrc)) {
                filtPrice.push(product);
            }
        })
        tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
        addAllElementsToTable(filtPrice);
    }
    else{
        alert("Please enter number in min-max area!");
    }
});


btnSearch.addEventListener("click",()=>{
    const searchInp=document.querySelector(".search-inp").value;
    const searchFilt=[];
    products.forEach((product)=>{
        if (product.namePrd.toLowerCase()===searchInp.toLowerCase()) {
            searchFilt.push(product);
        }
    })
    tableElements.innerHTML=`
        <tr class="head-tr">
            <th>Product name</th>
            <th>Price</th>
            <th>Category</th>
        </tr>`;
    addAllElementsToTable(searchFilt);
})


btnDefaultValue.addEventListener("click",()=>{
    tableElements.innerHTML=`
        <tr class="head-tr">
            <th>Product name</th>
            <th>Price</th>
            <th>Category</th>
        </tr>`;
    addAllElementsToTable(products);
});





