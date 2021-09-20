const testBudgets = require("./test-budgets");

const transactionNoId = {
  title: "test transaction title",
  description: "test transaction description",
  amount: 400,
  budgetId: testBudgets.budgetArray[0]._id,
  categoryId: testBudgets.budgetArray[0].categories[0]._id,
  date: "2021-09-08T00:00:00.000Z"
};

const testTransactionOne = {
  _id: "test_transaction_one",
  title: "test transaction title 1",
  description: "test transaction description",
  amount: 500,
  budgetId: testBudgets.budgetArray[0]._id,
  categoryId: testBudgets.budgetArray[0].categories[0]._id,
  date: "2021-09-13T00:00:00.000Z"
};

const testTransactionTwo = {
  _id: "test_transaction_two",
  title: "test transaction title 1",
  description: "test transaction description",
  amount: 600,
  budgetId: testBudgets.budgetArray[1]._id,
  categoryId: testBudgets.budgetArray[1].categories[0]._id,
  date: "2021-09-19T00:00:00.000Z"
};

module.exports = {
  transactionArray: [
    testTransactionOne,
    testTransactionTwo
  ],
  transactionNoId
}