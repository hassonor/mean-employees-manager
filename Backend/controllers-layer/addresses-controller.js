const express = require("express");
const logic = require("../business-logic-layer/addresses-logic");
const AddressModel = require("../models/address-model");
const router = express.Router();

// GET http://localhost:3001/api/addresses
router.get("/", async (request, response) => {
    try {
        const addresses = await logic.getAllAddressesAsync();
        response.json(addresses);
    } catch (err) {
        response.status(500).send(err.message);
    }
});


// GET http://localhost:3001/api/addresses/the_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const address = await logic.getOneAddressAsync(_id);
        if (!address) return response.status(404).send(`_id ${_id} not found.`);

        response.json(address);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3001/api/addresses
router.post("/", async (request, response) => {
    try {
        const address = new AddressModel(request.body);

        // Validation:
        const errors = address.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedAddress = await logic.addNewAddressAsync(address);
        response.status(201).json(addedAddress);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3001/api/addresses/the_id
router.put("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const address = new AddressModel(request.body);

        // Validation:
        const errors = address.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const updatedAddress = await logic.updateAddressAsync(address);

        if (!updatedAddress) return response.status(404).send(`_id ${_id} not found.`);

        response.json("Address has been updated.");
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3001/api/addresses/the_id
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await logic.deleteAddressAsync(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;