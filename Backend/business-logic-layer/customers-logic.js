const mongoose = require("mongoose");
require("../data-access-layer/dal");
const CustomerModel = require("../models/customer-model.js");
const AddressesModel = require("../models/address-model");

function getAllCustomersAsync() {

    return CustomerModel.find().populate("address contact").exec();
}

function getAllActiveCustomersAsync() {
    return CustomerModel.find({isDeleted: false}).populate("address contact").exec();
}

function getOneCustomerAsync(_id) {
    return CustomerModel.findById(_id).populate("address contact").exec();
}

function addNewCustomerAsync(customer) {
    return customer.save();
}

async function updateCustomerAsync(customer) {
    const info = await CustomerModel.updateOne({_id: customer._id}, customer).exec();
    return info;
}

function deleteCustomerAsync(_id) {
    return CustomerModel.updateOne({_id}, {isDeleted: true}).exec();
}

module.exports = {
    getAllCustomersAsync,
    getAllActiveCustomersAsync,
    getOneCustomerAsync,
    addNewCustomerAsync,
    updateCustomerAsync,
    deleteCustomerAsync
};