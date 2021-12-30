const mongoose = require("mongoose");
require("../data-access-layer/dal");
const AddressesModel = require("../models/address-model");

function getAllAddressesAsync() {
    return AddressesModel.find().exec();
}

function getOneAddressAsync(_id) {
    return AddressesModel.findById(_id).exec();
}

function addNewAddressAsync(address) {
    return address.save();
}

async function updateAddressAsync(address) {
    const info = await AddressesModel.updateOne({_id: address._id}, address).exec();
    return info;
}

function deleteAddressAsync(_id) {
    return AddressesModel.findByIdAndUpdate({_id}, {isDeleted: true}).exec();
}

module.exports = {
    getAllAddressesAsync,
    getOneAddressAsync,
    addNewAddressAsync,
    updateAddressAsync,
    deleteAddressAsync
};