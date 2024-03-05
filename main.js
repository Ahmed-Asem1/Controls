import { data } from './data.js';


let selectMenu = document.querySelector("select");

let paginationNumbers = document.getElementById("paginationNumbers");
let tbody = document.querySelector("tbody");
let nextIcon = document.querySelector("i.next");
let prevIcon = document.querySelector("i.prev");


let selectValue;


function  drawDataInTable (){
    tbody.innerHTML = "";
    for(let i=0; i<data.length; i++){
        let tRow = document.createElement("tr");
        tRow.id = data[i].id;
        tRow.innerHTML = `
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
        `
        tbody.append(tRow);
    }
}

drawDataInTable();




// Global Variable
let paginationLimit = selectMenu.value; // how many items we want displayed on each page
let pageCount = Math.ceil(data.length / paginationLimit); //how many pages there will be based on the paginationLimit
let currentPage =1 ;  //store the value of the currentPage


selectMenu.addEventListener("change", ()=>{
    selectValue = selectMenu.value;
    paginationLimit = selectValue;
    pageCount = Math.ceil(data.length / paginationLimit);
    getPaginationNumbers();
    setCurrentPage(currentPage);
    handlePageButtonsStatus
    handleActivePageNumber();
    document.querySelectorAll(".pagination-numbers button").forEach((button)=>{

        let pageIndex = Number(button.getAttribute("page-index"));
        if(pageIndex){
            button.addEventListener("click",()=>{
                setCurrentPage(pageIndex);
            })
        }
    })
    
})



// Make Arrow Fumction to disable Button
let disableButton = (button)=>{
    button.classList.add("disabled");
    button.setAttribute("disabled",true);
}

// Make Arrow Function to enable Button
let enableButton = (button)=>{
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
}

// Make Arrow Function to handle Page Buttons Status
let handlePageButtonsStatus = ()=>{
    if(currentPage ===1){
        disableButton(prevIcon);
    }else{
        enableButton(prevIcon);
    }

    if(pageCount === currentPage){
        disableButton(nextIcon);
    }else{
        enableButton(nextIcon);
    }
}

// Make Arrow Function to handle Active Page Number
let handleActivePageNumber = () =>{
    document.querySelectorAll(".pagination-numbers button").forEach((button)=>{
        button.classList.remove("active");

    const pageIndex = Number(button.getAttribute("page-index"));
        if(pageIndex == currentPage){
            button.classList.add("active");
        }
    })
}


// 1- Make Arrow Function to Create a New Button For The Page Number And Append
let appendPageNumber = (index) =>{
    let pageNumber = document.createElement("button");
    pageNumber.className = "pagination-button";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page" + index);
    paginationNumbers.append(pageNumber);

    // console.log(pageNumber);
}

// 2- Add buttons to paginationNumbers Container
let getPaginationNumbers = () =>{
    paginationNumbers.innerHTML = "";
    for(let i=1; i<=pageCount; i++){
        appendPageNumber(i);
    }
}



let setCurrentPage = (pageNum)=>{
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum -1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    console.log(prevRange, currRange);


    document.querySelectorAll("tbody tr").forEach((item, index) =>{
        item.classList.add("hidden");
        if(index >= prevRange && index <currRange){
            item.classList.remove("hidden");
        }
    })

    // tbody.innerHTML = "";
    // data.forEach((item,index) =>{

    //     if(index >=prevRange && index <currRange){

    //         let tRow = document.createElement("tr");
    //         tRow.id = item.id;
    //         tRow.innerHTML = `
    //         <td>${index+1}</td>
    //         <td>${item.name}</td>
    //         <td>${item.age}</td>
    //         `
    //         tbody.append(tRow);
    //     }
    // })

}




prevIcon.addEventListener("click", ()=>{
    // setCurrentPage(currentPage -1);
    if(currentPage == 1){
        handlePageButtonsStatus();
    }else{
        currentPage = currentPage -1;
        setCurrentPage(currentPage);
    }
})

nextIcon.addEventListener("click", ()=>{
    if(currentPage ==  pageCount){
        handlePageButtonsStatus();
    }else{
        currentPage = currentPage +1;
        setCurrentPage(currentPage);
    }
})






window.addEventListener("load",()=>{
    getPaginationNumbers();
    setCurrentPage(1);
    document.querySelectorAll(".pagination-numbers button").forEach((button)=>{

        let pageIndex = Number(button.getAttribute("page-index"));
        if(pageIndex){
            button.addEventListener("click",()=>{
                setCurrentPage(pageIndex);
            })
        }
    })
})