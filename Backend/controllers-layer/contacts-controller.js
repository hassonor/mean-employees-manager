const express = require("express");
const logic = require("../business-logic-layer/contacts-logic");
const ContactModel = require("../models/contacts-model");
const router = express.Router();

// GET http://localhost:3001/api/contacts
router.get("/", async (request, response) => {
    try {
        const contacts = await logic.getAllContactsAsync();
        response.json(contacts);
    } catch (err) {
        response.status(500).send(err.message);
    }
});


// GET http://localhost:3001/api/contacts/the_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const contact = await logic.getOneContactAsync(_id);
        if (!contact) return response.status(404).send(`_id ${_id} not found.`);

        response.json(contact);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3001/api/contacts
router.post("/", async (request, response) => {
    try {
        const contact = new ContactModel(request.body);

        // Validation:
        const errors = contact.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedContact = await logic.addNewContactAsync(contact);
        response.status(201).json(addedContact);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3001/api/contacts/the_id
router.put("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const contact = new ContactModel(request.body);

        // Validation:
        const errors = contact.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const updatedContact = await logic.updateContactAsync(contact);

        if (!updatedContact) return response.status(404).send(`_id ${_id} not found.`);

        response.json("Contact has been updated.");
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3001/api/contacts/the_id
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await logic.deleteContactAsync(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;