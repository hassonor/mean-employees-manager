const mongoose = require("mongoose");
const {Schema} = require("mongoose");


const ContactsSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Missing fullName"],
    },
    officeNumber: {
        type: String,
    },
    email: {
        type: String,
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
    isForeignContact: {type: Boolean, default: false},
    israeliContact: {
        israelId: {
            type: String,
            required: function () {
                return !this.isForeignContact
            },
            minLength: 9,
            maxLength: 9
        }, faxNumber: {type: String},
        mobileNumber: {type: String}
    },
    foreignContact: {
        passportNumber: {
            type: Number, required: function () {
                return this.isForeignContact
            }
        },
    }
}, {versionKey: false, toJSON: {virtuals: true}, id: false, timestamps: true});

ContactsSchema.virtual("customers", {
    ref: "CustomerModel", // Model?
    localField: "_id", // relation's local field
    foreignField: "contactId" // relation's foreign field
});

let ContactModel = mongoose.model("ContactModel", ContactsSchema, "contacts");


module.exports = ContactModel;
