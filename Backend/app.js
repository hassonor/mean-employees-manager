global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const customersController = require("./controllers-layer/customers-controller");
const addressesController = require("./controllers-layer/addresses-controller");
const contactsController = require("./controllers-layer/contacts-controller");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use("/api/customers", customersController);
server.use("/api/addresses", addressesController);
server.use("/api/contacts", contactsController);

server.use(function (req, res) {
    const err = new Error('Not Found');
    res.status(404).send(err.message);
})

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
