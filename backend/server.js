const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// app setup
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established.");
});

// middleware
const logger = require("./middleware/logger");
app.use(logger);

// routers
const budgetsRouter = require("./routes/budgets");
const transactionsRouter = require("./routes/transactions");
app.use("/api/budgets", budgetsRouter);
app.use("/api/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
