let bookName = document.getElementById("nameBook");
let priceBook = document.getElementById("PriceBook");
let editIndex = null;

// save all data in that website
let data;
if(localStorage.getItem('dataBook')){
    data = JSON.parse(localStorage.getItem('dataBook'));
}else{
    data = [];
}


// function for create item.
function addBook() {

    if(bookName.value !== ""  && isNaN(parseInt(bookName.value)) && priceBook.value !== "") {

    

    let dataItem = {
        name : bookName.value,
        priceBook : priceBook.value,
        buy:false,
    }; 

    if (editIndex !== null) {

        data[editIndex] = dataItem;
        editIndex = null;
    } else {
        // default mood
        data.push(dataItem);
    }

    localStorage.setItem('dataBook',JSON.stringify(data));

    // call back functions
    clearInputs();
    printData(); 
    scrollButton();

   }
}

function clearInputs() {

    bookName.value = "";
    priceBook.value = "";

}

function printData() {
    let tr = '';
    let total = document.getElementById('total');
    let price = 0 ;
    for (let i = 0 ; i < data.length ; i++) {
        tr += `
        <tr>
        <td class="nameBook ${data[i].buy ? 'active' : ''}" ondblclick = "complete(${i} , this)">${data[i].name}</td>
        <td class="price">${data[i].priceBook} <span>جنية</span></td>
        <td><button class="delete-btn" onclick = "deleteItem(${i})">Delete</button></td>
        <td><button class="updata-btn" onclick = "updataItem(${i})">updata</button></td>
        <td>${i + 1}</td>
        </tr>
        `;
        price += +data[i].priceBook;
    }
    
    if(price  > 1 ){
      total.textContent = price;
      total.parentElement.style.background = "green";
    }else{
      total.parentElement.style.background = "maroon";
    }

    document.getElementById('parent').innerHTML = tr;
    // show delete all button
    if(data.length > 1){
        document.querySelector(".delete-all").innerHTML = `
        <button class="btn" onclick="removeAll()">Remove all</button>
        `;
    }
}
printData(); 


function complete(i , active) {
    data[i].buy = !data[i].buy;
    localStorage.setItem('dataBook',JSON.stringify(data));
    printData();
}

function deleteItem(i) {
    data.splice(i , 1);
    localStorage.setItem('dataBook',JSON.stringify(data));
    printData(); 
}

function updataItem(i){
   
    bookName.value = data[i].name;
    priceBook.value = data[i].priceBook;
    editIndex = i;

}
 
function removeAll() {
  let askYou = confirm("Are You Sure About Delete All ?");
  
  if(askYou === true){
    
    data = [];
    localStorage.setItem('dataBook',JSON.stringify(data));
    printData();

    askYou = false;
  }

}

function scrollButton() {
  window.scrollTo({
  top: document.body.scrollHeight,
  behavior: "smooth",
});
}

function goUp() {
    window.scrollTo({
        top:0,
        behavior:"smooth",
    });
}
 

 
 