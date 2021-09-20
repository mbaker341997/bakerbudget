const Budget = require('../models/budget.model');

const getAllBudgets = () => {
  return Budget.find()
    .then((budgets) => budgets)
    .catch((err) => { 
      console.log(`Error retrieving all budgets: ${err}`);
      throw err;
    });
};

// find by id 

// find by id and delete 

// find by id and update 

module.exports = {
  getAllBudgets: getAllBudgets
};
