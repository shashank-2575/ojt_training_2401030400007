const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orders", async (req, res) => {
    try {
        // Generate an orderNo if one is not provided in the request body
        if (!req.body.orderNo) {
            const lastOrder = await Order.findOne().sort({ orderNo: -1 });
            req.body.orderNo = lastOrder && lastOrder.orderNo ? lastOrder.orderNo + 1 : 104;
        }

        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
