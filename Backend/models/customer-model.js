const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name must be minimum 2 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    customerNumber: {
        type: String,
        required: [true, "Missing customer number"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: [true, "Missing isDeleted field"],
    },
    deletedOn: {
        type: String,
        default: ""
    },
    addressId: { // Foreign Key to address collection.
        type: mongoose.Schema.Types.ObjectId,// MongoDB Primary Key Type
        require: true
    },
    contactId: // Foreign Key to contact collection.
        [{type: mongoose.Schema.Types.ObjectId}] // MongoDB Primary Key Type

}, {versionKey: false, toJSON: {virtuals: true}, id: false, timestamps: true});

// Virtual Field
CustomerSchema.virtual("address", {
    ref: "AddressModel", // Which model to create relation to?
    localField: "addressId", // Which local filed connects to that relation.
    foreignField: "_id", // Which foreign filed connects to tha relation.
    justOne: true // category field should be one object and not array.
});

CustomerSchema.virtual("contact", {
    ref: "ContactModel", // Which model to create relation to?
    localField: "contactId", // Which local filed connects to that relation.
    foreignField: "_id", // Which foreign filed connects to tha relation.
});

const CustomerModel = mongoose.model("CustomerModel", CustomerSchema, "customers");

module.exports = CustomerModel;
