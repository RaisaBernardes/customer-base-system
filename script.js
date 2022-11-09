'use strict'

//Modal logic
const openModal = () => {
    document.getElementById('modal').classList.add('active')
}
const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

const temporaryCustomer = {
    name: "Nicholas",
    email: "raisa.rmro@gmail.com",
    phone: "1234598778",
    city: "Recife"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_customer')) ?? [];
const setLocalStorage = (dbCustomer) => localStorage.setItem('db_customer', JSON.stringify(dbCustomer));

//CRUD

//Create
const createCustomer = (customer) => {
    const dbCustomer = getLocalStorage();
    dbCustomer.push(customer);
    setLocalStorage(dbCustomer)
}

//read
const readCustomer = () => getLocalStorage();

//update
const updateCustomer = (index, customer) => {
    const dbCustomer = readCustomer();
    dbCustomer[index] = customer;
    setLocalStorage(dbCustomer);
}

//delete
const deleteCustomer = (index) => {
    const dbCustomer = readCustomer();
    dbCustomer.splice(index, 1);
    setLocalStorage(dbCustomer);
}

//Events
document.getElementById('registerCustomer').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);