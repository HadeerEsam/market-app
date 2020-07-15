var productName,productPrice,productCategory,productDescription,productSearch,productList,submitBtn,currentIndex;
//get all input of product
productName=document.getElementById("ProductNameInput");
productPrice=document.getElementById("ProductPriceInput");
productCategory=document.getElementById("ProductCategoryInput");
productDescription=document.getElementById("ProductDescriptionInput");
productSearch=document.getElementById("searchInput");

//get input button of add and update
submitBtn=document.getElementById("submitBtn");

//set warning message to display none at beginning
document.getElementById("emptyWarning").style.display="none";

//check the contant of local storage (empty or not)
if(localStorage.getItem("Product List")==null){
    productList=[];
}else{
    productList=JSON.parse(localStorage.getItem("Product List"));
    displayProduct();
    setValues();

}

//initialize the input data of product
function setValues(){
    productName.value="";
    productPrice.value=0;
    productCategory.value="";
    productDescription.value="";
}

//add click event on add & update btn
submitBtn.addEventListener("click",function(){
    if(submitBtn.innerHTML=="Add Product"){
        addProduct();
    }else{
        saveUpdate();
    }
});

//add new product in product list and local storage
function addProduct(){
   if( productName.value==""&& productPrice.value==0 && productCategory.value==""){
       document.getElementById("emptyWarning").style.display="inline";
       document.getElementById("emptyWarning").innerHTML="Write your Product info";
    }
   else{
    if(productPrice.value>0){
        var product={
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            description:productDescription.value
        };
        productList.push(product);
        localStorage.setItem("Product List",JSON.stringify(productList));
        displayProduct();
        setValues();
        document.getElementById("emptyWarning").style.display="none";
    }else{
        document.getElementById("emptyWarning").innerHTML="Enter correct price";
        document.getElementById("emptyWarning").style.display="inline";
    }
}
}

//display products info in table
function displayProduct(){

    var tableRows="",i,order=1;
    for(i=0;i<productList.length;i++){
        tableRows+=`<tr>
        <td>`+order+`</td>
        <td>`+productList[i].name+`</td>
        <td>`+productList[i].price+`</td>
        <td>`+productList[i].category+`</td>
        <td>`+productList[i].description+`</td>
        <td><button onclick="updateProduct(`+i+`); " class="btn btn-success">Update</button></td>
        <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button></td>

        </tr>`
        order++;
    }
    document.getElementById("tableBody").innerHTML=tableRows;
}

//delete specific product
function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem("Product List",JSON.stringify(productList));
    displayProduct();
}

//update and save the update of specific product
function updateProduct(index){
    currentIndex=index;
    productName.value=productList[index].name;
    productPrice.value=productList[index].price;
    productCategory.value=productList[index].category;
    productDescription.value=productList[index].description;
    submitBtn.innerHTML="Update Product";
    document.getElementById("emptyWarning").style.display="none";
}

function saveUpdate(){

    if( productName.value==""&& productPrice.value==0 && productCategory.value==""){
        document.getElementById("emptyWarning").style.display="inline";
        document.getElementById("emptyWarning").innerHTML="Write your Product info";
    }
    else{
    if(productPrice.value>0){
        var product={
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            description:productDescription.value
        };
        productList[currentIndex]=product;
        localStorage.setItem("Product List",JSON.stringify(productList));
        displayProduct();
        submitBtn.innerHTML="Add Product"
        setValues();
        document.getElementById("emptyWarning").style.display="none";
    }
    else{
        document.getElementById("emptyWarning").innerHTML="Enter correct price";
        document.getElementById("emptyWarning").style.display="inline";
    }
  }

}

//search product
productSearch.addEventListener("keyup",search);
function search(){
    var searchValue=productSearch.value;

    var tableRows="",i,order=1;
    for( i=0;i<productList.length;i++){
        if(productList[i].name.includes(searchValue.trim())){

             tableRows+=`<tr>
             <td>`+order+`</td>
             <td>`+productList[i].name.replace(searchValue,`<span class="text-danger">`+searchValue+`</span>`)+`</td>
             <td>`+productList[i].price+`</td>
             <td>`+productList[i].category+`</td>
             <td>`+productList[i].description+`</td>
             <td><button onclick="updateProduct(`+i+`); " class="btn btn-success">Update</button></td>
             <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button></td>
             </tr>`
             order++;

        }
    }
    document.getElementById("tableBody").innerHTML=tableRows;

}