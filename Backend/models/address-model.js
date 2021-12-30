const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    city: {
        type: String,
        required: [true, "Missing city"],
    },
    street: {
        type: String,
        required: [true, "Missing street"],
    },
    postCode: {
        type: String,
        required: [true, "Missing post Code"],
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
}, {versionKey: false, toJSON: {virtuals: true}, id: false, timestamps: true});

AddressSchema.virtual("customers", {
    ref: "CustomerModel", // Model?
    localField: "_id", // relation's local field
    foreignField: "addressId" // relation's foreign field
});

const AddressModel = mongoose.model("AddressModel", AddressSchema, "addresses");

module.exports = AddressModel;
