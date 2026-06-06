const express = require("express");

require("./config/db");

const app = express();

app.use(express.json());

app.use(
    require("./routes/orderRoutes")
);

app.listen(3000, () => {
    console.log(
        "Server Running on Port 3000"
    );
});
