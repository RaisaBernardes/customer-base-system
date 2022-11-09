'use strict'

//Modal logic
const openModal = () => {
    document.getElementById('modal').classList.add('active')
}
const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

const temporaryCustomer = {
    name: "Raisa",
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


//Events
document.getElementById('registerCustomer').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);