'use strict'

//Modal logic
const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active')
}


//GET AND SET LocalStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_customer')) ?? [];
const setLocalStorage = (dbCustomer) => localStorage.setItem('db_customer', JSON.stringify(dbCustomer));


//CRUD
const createCustomer = (customer) => {
    const dbCustomer = getLocalStorage();
    dbCustomer.push(customer);
    setLocalStorage(dbCustomer)
}

const readCustomer = () => getLocalStorage();

const updateCustomer = (index, customer) => {
    const dbCustomer = readCustomer();
    dbCustomer[index] = customer;
    setLocalStorage(dbCustomer);
}

const deleteCustomer = (index) => {
    const dbCustomer = readCustomer();
    dbCustomer.splice(index, 1);
    setLocalStorage(dbCustomer);
}
//end of CRUD




//Layout interaction
const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveRecord = () => {
    if(isValidFields()){
        const customer = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value
        }
        const index = document.getElementById('name').dataset.index;
        if(index == 'new'){
            createCustomer(customer);
            updateTable();
            closeModal();
        }else{
            updateCustomer(index, customer);
            updateTable();
            closeModal();
        }
        
    }
}

const createRow = (customer, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>${customer.city}</td>
        <td>
            <button type="button" class="button-edit" data-action="edit"><i class="fa-solid fa-pencil" id="edit-${index}"></i></button>
            <button type="button"class="button-delete" data-action="delete"><i class="fa-solid fa-trash" id="delete-${index}"></i></button>
        </td>
    `
    document.querySelector('#tableCustomer>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCustomer>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row));
}


const updateTable = () => {
    const dbCustomer = readCustomer();
    clearTable(); //para não duplicar os dados da tabela sempre que der um update.
    dbCustomer.forEach(createRow)
}

const fillFields = (customer) => {
    document.getElementById('name').value = customer.name;
    document.getElementById('email').value = customer.email;
    document.getElementById('phone').value = customer.phone;
    document.getElementById('city').value = customer.city;
    document.getElementById('name').dataset.index = customer.index;
}

const editCustomer = (index) => {
    const customer = readCustomer()[index]
    customer.index = index;
    fillFields(customer)
    openModal();
}

const editDelete = (event) => {
    const [action, index] = event.target.id.split('-')  // console.log(event.target.dataset.action)
        if(action == 'edit'){
            editCustomer(index)
        } else if (action == 'delete'){
            const customer = readCustomer()[index];
            const response = confirm(`Are you sure you want to delete customer ${customer.name}`)
            if(response){
                deleteCustomer(index);
                updateTable();
            } 
        }    
}

updateTable();


//Events
document.getElementById('registerCustomer').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('saveButton').addEventListener('click', saveRecord);
document.getElementById('clearButton').addEventListener('click', clearFields);
document.querySelector('#tableCustomer>tbody').addEventListener('click', editDelete);