const budgetDao = require('../dao/budget.dao');

const getAllBudgets = async (res) => {
  try {
    res.json(await budgetDao.getAllBudgets());
  } catch(err) {
    res.status(500).json(`Error: ${err}`);
  }  
};

const getBudget = async (id, res) => {
  try {
    const budget = await budgetDao.getBudget(id);
    budget
        ? res.json(budget)
        : res.status(404).json(`No budget found of id ${req.params.id}`);
  } catch(err) {
    res.status(500).json(`Error retrieving budget. id: ${id}, error: ${err}`)
  }
}

// create budget 

// delete budget (also deletes all its transactions)

// update budget 

// create category 

// update category 

// delete category 

// generate report 

module.exports = {
  getAllBudgets: getAllBudgets,
  getBudget: getBudget
};
