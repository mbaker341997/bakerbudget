const Transaction = require("../models/transaction.model");

// get all for budget
const getTransactionsForBudget = (budgetId) => {
  return Transaction.find({ budgetId })
    .lean()
    .then((transactions) => transactions)
    .catch((err) => { 
      console.log(`Error retrieving transactions for budget: ${budgetId}, error: ${err}`);
      throw err;
    });
}; 

// get all for category
const getTransactionsForCategory = (categoryId) => {
  return Transaction.find({ categoryId })
    .lean()
    .then((transactions) => transactions)
    .catch((err) => { 
      console.log(`Error retrieving transactions for category: ${categoryId}, error: ${err}`);
      throw err;
    });
}; 

// create transaction 
const saveTransaction = (transaction) => {
  return transaction
    .save()
    .then((saved) => saved._id)
    .catch((err) => {
      console.log(`Error saving transaction: ${err}`);
      throw err;
    });
};

// find by id and update
const updateTransaction = (id, newTransactionInfo) => {
  return Transaction.findByIdAndUpdate(id, newTransactionInfo)
    .then((transaction) => transaction)
    .catch((err) => {
      console.log(`Error updating transaction. id: ${id}, error: ${err}`);
      throw err;
    });
}; 

// find by id and delete
const deleteTransaction = (id) => {
  return Transaction.findByIdAndDelete(id)
    .then(() => id)
    .catch((err) => {
      console.log(`Error deleting transaction. id: ${id}, error: ${err}`);
      throw err;
    });
};

// delete all transactions for budget 
const deleteTransactionsForBudget = (budgetId) => {
  return Transaction.deleteMany({ budgetId })
    .then(() => {
      console.log(`Deleted all transactions for budget: ${budgetId}`)
      return budgetId
    })
    .catch((err) => { 
      console.log(`Error deleting transactions for budget: ${budgetId}, error: ${err}`);
      throw err;
    });
};

module.exports = {
  getTransactionsForBudget,
  getTransactionsForCategory,
  saveTransaction,
  updateTransaction,
  deleteTransaction,
  deleteTransactionsForBudget
};
