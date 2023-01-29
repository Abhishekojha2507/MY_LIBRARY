console.log("this is Es6 version of project");
if (localStorage.getItem("t") == null) {
  localStorage.setItem("t", 0);
}

//  step4 if page get refreshed content sholud not be vanished
// function refresh ()
// {
//     let storedBook=JSON.parse(localStorage.getItem('allData'))
//     let uiString="";
//     console.log(storedBook)
//     if(storedBook!=null)//will not be null only lenght reduces.
//     {if(storedBook.length!=0)//hence this becomes important
//    { storedBook.forEach(function(book,i){
//         let tablebody = document.getElementById("tablebody");
//         uiString += `<tr id=${book.id}>
//         <th scope="row">${i+1}</th>
//         <td>${book.name}</td>
//         <td>${book.author}</td>
//         <td >${book.type}</td>
//         <td><button class="button" onclick="del(event)" id=${i}>Delete</button></td>
//         </tr>`;

//         tablebody.innerHTML = uiString;
//         if(i>3)
//     {

//        divTable.style.border='5px solid';
//        divTable.style.overflowY='scroll';
//        divTable.style.overflowX='hidden';
//        thead.style.position='sticky'
//        thead.style.top='-1px'
//     }
//     else
//     {
//       divTable.style.border='';
//        divTable.style.overflowY='';
//        divTable.style.overflowX='';
//        thead.style.position=''
//        thead.style.top=''

//     }
//       })
//     }
//       else

//       { console.log('NO element in localStorage')
//         document.getElementById("tablebody").innerHTML="";}
//     }
//     }

// step2 constructor to create object book
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
let tablebody = document.getElementById("tablebody");
// step3 creating methods to br inherited for using in book object
class Display {
  add=function() {
    let storedBook = JSON.parse(localStorage.getItem("allData"));
    let uiString = "";
    // console.log(storedBook)
    if (storedBook != null) {
      //will not be null only lenght reduces.
      if (storedBook.length != 0) {
        //hence this becomes important
        storedBook.forEach(function (book, i) {
          let tablebody = document.getElementById("tablebody");
          uiString += `<tr id=${book.id}> 
          <th scope="row">${i + 1}</th>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.type}</td>
          <td><button class="button" onclick="del(event)" id=${i}>Delete</button></td>
          </tr>`;

          tablebody.innerHTML = uiString;
          if (i > 3) {
            divTable.style.border = "5px solid";
            divTable.style.overflowY = "scroll";
            divTable.style.overflowX = "hidden";
            thead.style.position = "sticky";
            thead.style.top = "-1px";
          } else {
            divTable.style.border = "";
            divTable.style.overflowY = "";
            divTable.style.overflowX = "";
            thead.style.position = "";
            thead.style.top = "";
          }
        });
      } else {
        console.log("NO element in localStorage");
        document.getElementById("tablebody").innerHTML = "";
      }
    } else {
      console.log("localStorage has empty data of 'alldata'");
    }
  }

  clear() {
    libraryForm.reset();
    libBookName.focus();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) return false;
    else return true;
  }
  // message for successfull submision else error
  show = function (type, displayMessage) {
    let boldText;
    let message = document.getElementById("message");
    if (type === "success") {
      boldText = "Success!";
    } else {
      boldText = "Error!";
    }
    message.style.display="block"
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${boldText}</strong> ${displayMessage}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    setTimeout(function () {
      message.style.display="none"
      // message.innerHTML = "";
    }, 2000);
  };
}

// step1 (create book content)
let libraryForm = document.getElementById("libraryForm");
let libBookName = document.getElementById("BookName");
let id = "table";
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
  console.log(this); //returns form object
  let name = document.getElementById("BookName").value;
  let author = document.getElementById("Author").value;
  let Fiction = document.getElementById("Fiction");
  // can do this operation --> Fiction.checked=false
  // false
  let Programming = document.getElementById("Programming");
  let Sports = document.getElementById("Sports");
  let type;
  let book = new Book(name, author, type);
  if (Fiction.checked) {
    type = Fiction.value;
  } else if (Programming.checked) {
    type = Programming.value;
  } else if (Sports.checked) {
    type = Sports.value;
  }
  e.preventDefault();
  // console.log(this);

  // storing data to localStorage for refreshed page
  let dataRetrieved = JSON.parse(localStorage.getItem("allData"));
  if (dataRetrieved == null) {
    allData = [];
    //  localStorage.setItem('allData',JSON.stringify(allData))
  } else {
    allData = JSON.parse(localStorage.getItem("allData"));
  }
  
  // validation
  // using Display constructor for object's prototype
  let display = new Display();
  if (display.validate(book)) {
    let t = localStorage.getItem("t");
    t++;
    localStorage.setItem("t", t);
    id = id + t;
    book.id = id;
    allData.push(book); //then adding after being data gets varified
    display.clear();
    localStorage.setItem("allData", JSON.stringify(allData));
    display.add();
    display.show("success", "your book has been successfully added");
    console.log(book);
  } else {
    display.show("danger", "Sorry you cannot add this book (lenght of Name or Author should be more than one character)");
  }
}

let refresh = new Display();
refresh.add();
//step5 Selective Deletion
function del(i) {
  s = i.target.id;
  refinedData = JSON.parse(localStorage.getItem("allData"));
  refinedData.splice(s, 1); //this will just reduce the length of array,hence will not be null
  localStorage.setItem("allData", JSON.stringify(refinedData));
  refresh.add();
  console.log(i); //returnd window object global
}

// experiments
// class chl{
//   constructor(name,exp)
//   {
//     this.name=name;
//     this.exp=exp;
//   }
//     dd=function(name,exp)
//     {
//         console.log(this.name,name,exp)
//         return this.exp-20
//     }
// }
// newVar=new chl('vivek',10)
// console.log(newVar)

// a=['assd',"qwq",34,43]
// function d(x,y){
//     console.log(x,y)
// }
// a.forEach(d)
// setTimeout(d,3000,"sa","libraryName")
