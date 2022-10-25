
const products=[];
const btnAdd=document.querySelector(".add-btn");
const tableElements=document.querySelector(".elements-table");
const categories=[];
const selection=document.querySelector("#category-filt");
const btnLogIn=document.querySelector(".login");
const btnLogOut=document.querySelector(".logout");
localStorage.setItem("username","Ceyhun");
localStorage.setItem("password","123456");
btnLogIn.addEventListener("click",()=>{
    const userName=document.querySelector(".username");
    const pass=document.querySelector(".pass");
     
        if (userName===localStorage.getItem("username") && pass===JSON.parse(localStorage.getItem("password"))) {
            const logOut=document.querySelector(".logout");
            logOut.classList.remove("d-none");
            const addProductSec=document.querySelector(".input-product");
            addProductSec.classList.remove("d-none");
            const filters=document.querySelector(".filters");
            filters.classList.remove("d-none");
            const prod=document.querySelector(".products");
            prod.classList.remove("d-none");

        }
});


btnAdd.addEventListener("click",()=>{
   const namePrd=document.querySelector("#product-name").value;
   const categoryPrd=document.querySelector("#category").value;
   const pricePrd=document.querySelector("#price").value;

   const spanName=document.querySelector(".error-name");
   const spanPrc=document.querySelector(".error-price")
   const spanCtg=document.querySelector(".error-categories");
    if (!priceValidation(pricePrd) || pricePrd==="") {
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
    
    products.forEach((product) => {
        if (!categories.includes(product.categoryPrd)) {
            categories.push(product.categoryPrd);
        }
    });
    addOptions(categories);
    tableElements.innerHTML=`
            <tr class="head-tr">
                <th>Product name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>`;
    addAllElementsToTable(products);
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
    
function priceValidation(price){
    let count=0;
    for (let i = 0; i < price.length; i++) {
        let priceElement=price[i];
        switch (priceElement) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                count++;
                break;       
            default:
                return false;
        }
        
    }
    return true;
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
    if (priceValidation(minPrc) && priceValidation(maxPrc)) {
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

const btnSearch=document.querySelector(".searchBtn");

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


const btnDefaultValue=document.querySelector(".back-def");

btnDefaultValue.addEventListener("click",()=>{
    tableElements.innerHTML=`
        <tr class="head-tr">
            <th>Product name</th>
            <th>Price</th>
            <th>Category</th>
        </tr>`;
    addAllElementsToTable(products);
});





