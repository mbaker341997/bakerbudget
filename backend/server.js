const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established.");
});

app.use(cors());
app.use(express.json());

const budgetsRouter = require('./routes/budgets');
const transactionsRouter = require('./routes/transactions');

app.use('/budgets', budgetsRouter);
app.use('/transactions', transactionsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
