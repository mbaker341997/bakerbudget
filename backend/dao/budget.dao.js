const Budget = require('../models/budget.model');

// MongoDB query/save methods 
// all calls that produce off-box calls to MongoDB should occur here 

// find all budgets 
const getAllBudgets = () => {
  return Budget.find().lean()
    .then((budgets) => budgets)
    .catch((err) => { 
      console.log(`Error retrieving all budgets: ${err}`);
      throw err;
    });
};

// find by id, note the use of lean() to return pure JSON off the query
// this improves latency 
const getBudget = (id) => {
  return Budget.findById(id).lean()
    .then((budget) => budget)
    .catch((err) => { 
      console.log(`Error retrieving budget. id: ${id}, error: ${err}`);
      throw err;
    });
}; 

// finds by id and returns MongoDB object, note lack of lean()
// this is to take advantage of the document's methods 
// try to limit its use within this class to hide mongoDB knowledge from
// upper layers
const getBudgetNonLean = (id) => {
  return Budget.findById(id)
    .then((budget) => budget)
    .catch((err) => { 
      console.log(`Error retrieving budget. id: ${id}, error: ${err}`);
      throw err;
    });
}

// find by id and delete
const deleteBudget = (id) => {
  return Budget.findByIdAndDelete(id)
    .then(() => id)
    .catch((err) => {
      console.log(`Error deleting budget. id: ${id}, error: ${err}`);
      throw err;
    });
};

// find by id and update
const updateBudget = (id, newBudgetInfo) => {
  return Budget.findByIdAndUpdate(id, newBudgetInfo)
    .then((budget) => budget)
    .catch((err) => {
      console.log(`Error updating budget. id: ${id}, error: ${err}`);
      throw err;
    });
}; 

// save budget 
const saveBudget = (budget) => {
  return budget
    .save()
    .then((saved) => saved._id)
    .catch((err) => {
      console.log(`Error saving budget: ${err}`);
      throw err;
    });
};

module.exports = {
  getAllBudgets: getAllBudgets,
  getBudget: getBudget,
  getBudgetNonLean: getBudgetNonLean,
  deleteBudget: deleteBudget,
  updateBudget: updateBudget,
  saveBudget: saveBudget
};
