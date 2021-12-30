const express = require("express");
const logic = require("../business-logic-layer/customers-logic");
const CustomerModel = require("../models/customer-model");
const {nanoid} = require("nanoid");
const router = express.Router();

// GET http://localhost:3001/api/customers
router.get("/", async (request, response) => {
    try {
        const customers = await logic.getAllActiveCustomersAsync();
        response.json(customers);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3001/api/customers-active-and-not-active
router.get("/", async (request, response) => {
    try {
        const customers = await logic.getAllCustomersAsync();
        response.json(customers);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3001/api/customers/the_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;

        const customer = await logic.getOneCustomerAsync(_id);
        if (!customer) return response.status(404).send(`_id ${_id} not found.`);

        response.json(customer);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3001/api/customers
router.post("/", async (request, response) => {
    try {
        const customer = new CustomerModel(request.body);
        customer.customerNumber = nanoid();
        // Validation:
        const errors = customer.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedCustomer = await logic.addNewCustomerAsync(customer);
        response.status(201).json(addedCustomer);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3001/api/customers/the_id
router.put("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const customer = new CustomerModel(request.body);
        
        const updatedCustomer = await logic.updateCustomerAsync(customer);

        if (!updatedCustomer) return response.status(404).send(`_id ${_id} not found.`);

        response.json("Customer has been updated.");
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3001/api/customer/the_id
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await logic.deleteCustomerAsync(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;