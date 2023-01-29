console.log("this is index.js");
showRefresh()
// todos
// Store all the data to the localStorage
// Give another column as an option to delete the book
// Add a scroll bar to the view
function Book(title, author, type) {
    (this.name = title), (this.author = author), (this.type = type);
}
function Display() {}
Display.prototype.add = function (book) {
    console.log("added to ui");
    // template string
    let tablebody = document.getElementById("tablebody");
    let uiString = `<tr> 
    <th scope="row">1</th>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
    </tr>`;
    tablebody.innerHTML += uiString;
};


function showRefresh()
{
    let storedBook=JSON.parse(localStorage.getItem('allData'))
    if(storedBook!=null)
   { storedBook.forEach(function(book,i){
        let tablebody = document.getElementById("tablebody");
        let uiString = `<tr> 
        <th scope="row">1</th>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        </tr>`;
        tablebody.div.innerHTML += uiString;

    })}

}


let libraryForm = document.getElementById("libraryForm");
let libBookName = document.getElementById("BookName");
// clearing
Display.prototype.clear = function () {
  libraryForm.reset();
   libBookName.focus();
};
// validation
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) 
  return false;
  else 
  return true;
};
Display.prototype.show = function (type,displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
<strong>Message:</strong> ${displayMessage}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
setTimeout(function() {
    message.innerHTML="";
}, 2000);
};

libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {

  let name = document.getElementById("BookName").value;
  let author = document.getElementById("Author").value;
  let Fiction = document.getElementById("Fiction");
  let Programming = document.getElementById("Programming");
  let Sports = document.getElementById("Sports");
  let type;
  if (Fiction.checked) {
    type = Fiction.value;
  } else if (Programming.checked) {
    type = Programming.value;
  } else if (Sports.checked) {
    type = Sports.value;
  }
  e.preventDefault();
  let book = new Book(name, author, type);
  console.log(book);

// storing data to localStorage for refreshed page
  let dataRetrieved=JSON.parse(localStorage.getItem('allData'))
  if(dataRetrieved==null)
  {
     allData=[]
}
  else
  {
     allData=JSON.parse(localStorage.getItem('allData'));
  }
  obj={
  name:name,
  author:author,
  type:type
}
//   validation
let display = new Display();
if (display.validate(book)) {
    display.add(book);
    allData.push(obj);//then adding after being data gets varified
    display.clear(book);
    display.show('success','your book has been successfully added')
      localStorage.setItem('allData',JSON.stringify(allData))
  } else {
    display.show("danger",'Sorry you cannot add this book');
   
  }
}










































// Book.na=function()
// {
    //     return "name of book is "+ this.name;
    // }//this acts as static function to maake it usable in its object use prototype As(Book.prototype.na)
    // let k=new Book('bindu','Bindu',"Comic")
    // // k.na()//error
    // console.log(k)
    
    // libraryForm.onsubmit=function libraryFormSubmit(e)
    // console.log(e.currentTarget);//shows the event is attached to
    // console.log(e.target);//shows where the event actually happened inside somewhere
    
    // for clearing
    // let name = document.getElementById("BookName").value="";
    // let author = document.getElementById("Author").value="";
    // libraryForm.reset()//can replace above two lines
    
//     document.body.innerHTML=`<div class="form-check">
//      <input
//        class="form-check-input"
//    type="radio"
//    name="type"
//    id="Fiction"
//    value="Fiction"
//    checked
//  />
//  <label class="form-check-label" for="Fiction"> Fiction </label>
//  </div>`//it doesnt leave any space but innerText makes is visiblle as put in comma

// obj = {
//     nam: "Rohan das",
//     get fullName() {
//         return `full name is ${this.firstName} ${this.lastName}`;
//     }, //can be used as property and called without ()
//     set fullName(value) {
//         const parts = value.split(" ");
//         this.firstName = parts[0];
//         this.lastName = parts[1];
//     },
// };
// obj.fullName = "Vivek Malhotra";
// // object(target) propertyName property descriptors
// let la = Object.defineProperty(obj, "prop", {
//     value: 1,
//     writable: false,
//     enumerable: true,
//     configurable: false,
// });
// accessor
// getters=> access properties
// setters=> change(mutate) properties
Object.defineProperty(obj, "prop2", {
    get: function () {
        return "id is " + this.id;
  },
  set: function () {},
  enumerable: true,
});
// for (let key in obj) {
//     console.log(key);
// }
// let log = console.log;
// log(obj);

// arrow function is expression
let k=(a)=>{return 'well'}
    k=(a)=> a+'well';//after removing bracels return is implied(auto matic) if one line code only but in multi lines code bracels and return required
    k=a=> a+'well';// parenthesis is not required if only one argument but required if one or more arg or if no arg