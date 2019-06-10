document.addEventListener('DOMContentLoaded',function(){
    var modals = document.querySelector('.modal');
    M.Modal.init(modals);
});

//add data to data base
const addForm = document.querySelector('#add-info');
addForm.addEventListener('submit', addData);
function addData(event){
    event.preventDefault();
    console.log('hello');
    db.collection('Ticket Registration').add({
        name: addForm.name.value,
        email: addForm.email.value,
        country: addForm.country.value,
        contactNo: addForm.number.value,
    });
    const modal = document.querySelector('#adddata');
    M.Modal.getInstance(modal).close();
    addForm.reset();
};


//get data
const ticketList = document.querySelector('#connectmain');
db.collection('Ticket Registration').get().then((item) => {
    item.docs.forEach(show => {
        console.log(show.data());
        makeTickets(show);
    });
});

function makeTickets(doc){
    const firstDiv = document.createElement('div');
    firstDiv.setAttribute('class','col s12 m6');
    const secondDiv = document.createElement('div');
    secondDiv.setAttribute('class','card blue-grey darken-1');
    const thirdDiv = document.createElement('div');
    thirdDiv.setAttribute('class','card-content white-text');
  //  thirdDiv.innerHTML += '<h1> Hello </h1>';
    const li = document.createElement('li');
    const name = document.createElement('span');
    const email = document.createElement('span');
    const country = document.createElement('span');
    const contactNo = document.createElement('span');
    const delIcon = document.createElement('i');
    delIcon.setAttribute('class','material-icons grey-text right');
    delIcon.textContent = 'delete';
    let cross = document.createElement('div');
    cross.textContent = 'x';
    li.setAttribute('data-id',doc.id);
    li.style.listStyleType = 'none';
    li.innerHTML += `<i class="material-icons prefix icons">account_circle</i>${doc.data().name} <br> <i class="material-icons icons">flag</i>${doc.data().country} <br>
    <i class="material-icons prefix icons">email</i> ${doc.data().email} <br> <i class="material-icons prefix icons">contacts</i> ${doc.data().contactNo}`;
    thirdDiv.appendChild(li);
    thirdDiv.appendChild(delIcon);
    secondDiv.appendChild(thirdDiv);
    firstDiv.appendChild(secondDiv);
    ticketList.appendChild(firstDiv);

    //delete the data
    delIcon.addEventListener('click',deleteData);
    function deleteData(event){
        event.stopPropagation();
        console.log('delete');
        let id = event.target.previousSibling;
        console.log(id);
        let idd = event.target.previousSibling.getAttribute('data-id');
       // console.log(id);
        db.collection('Ticket Registration').doc(idd).delete();
       
}}
