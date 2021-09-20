const budgetDao = require('../dao/budget.dao');

const getAllBudgets = async (res) => {
  try {
    res.json(await budgetDao.getAllBudgets());
  } catch(err){
    res.status(500).json("Error: " + err);
  }  
};

// create budget 

// delete budget 

// update budget 

// create category 

// update category 

// delete category 

// generate report 

module.exports = {
  getAllBudgets: getAllBudgets
};
