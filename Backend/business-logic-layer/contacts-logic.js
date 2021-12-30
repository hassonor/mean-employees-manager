const mongoose = require("mongoose");
require("../data-access-layer/dal");
const ContactModel = require("../models/contacts-model");

function getAllContactsAsync() {
    return ContactModel.find().exec();
}

function getOneContactAsync(_id) {
    return ContactModel.findById(_id).exec();
}

function addNewContactAsync(contact) {
    return contact.save();
}

async function updateContactAsync(contact) {
    const info = await ContactModel.updateOne({_id: contact._id}, contact).exec();
    return info;
}

function deleteContactAsync(_id) {
    return ContactModel.findByIdAndUpdate({_id}, {isDeleted: true}).exec();
}

module.exports = {
    getAllContactsAsync,
    getOneContactAsync,
    addNewContactAsync,
    updateContactAsync,
    deleteContactAsync
};