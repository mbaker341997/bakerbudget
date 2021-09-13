const router = require('express').Router();
const Budget = require('../models/budget.model');
const Transaction = require('../models/transaction.model');

router.route('/').get((req, res) => {
  Budget.find()
    .then(budgets => res.json(budgets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const budget = new Budget(req.body);
  budget.save()
    .then(saved => res.json({ id: saved._id }))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => budget ? res.json(budget) : res.status(404).json(`No budget found of id ${req.params.id}`))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Deleted budget: ${req.params.id}`))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  Budget.findByIdAndUpdate(req.params.id, req.body)
    .then(budget => {
      if(!budget) {
        res.status(404).json(`No budget found of id ${req.params.id}`)
      } else {
        res.json({ id: budget._id });
      }
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:id/transactions').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => {
      if(budget) {
        Transaction.find({budgetId: req.params.id})
          .then(transactions => res.json(transactions))
          .catch(err => res.status(500).json('Error: ' + err));
      } else {
        res.status(404).json(`No budget found of id ${req.params.id}`);
      }
    })
    .catch(err => res.status(500).json('Error: ' + err));
});

// calculates all the sums, returns all the transactions
router.route('/:id/report').get((req, res) => {
  Budget.findById(req.params.id)
    .then(budget => {
      if(budget) {
        Transaction.find({budgetId: req.params.id})
          .then(transactions => res.json(generateReport(budget, transactions)))
          .catch(err => res.status(500).json('Error: ' + err));
      } else {
        res.status(404).json(`No budget found of id ${req.params.id}`);
      }
    })
    .catch(err => res.status(500).json('Error: ' + err));
}); 

const generateReport = (budget, transactions) => {
  const categoryMap = {};
  const incomeTransactions = [];
  const expenseTransactions = [];
  transactions.forEach(transaction => {
    const category = budget.categories.id(transaction.categoryId);
    const currentCategorySum = categoryMap[category._id];
    categoryMap[category._id] = currentCategorySum > 0 ? currentCategorySum + transaction.amount : transaction.amount;
    
    if(category.isExpense) {
      expenseTransactions.push({
        ...transaction.toObject(),
        categoryName: category.title
      });
    } else {
      incomeTransactions.push({
        ...transaction.toObject(),
        categoryName: category.title
      });
    }
    
  });

  var expenseTotal = 0; // total money spent
  var expenseTarget = 0; 
  var incomeTotal = 0; // total money saved 
  var incomeTarget = 0;
  const incomeCategories = [];
  const expenseCategories = [];
  budget.categories.forEach(category => {
    const actual = categoryMap[category._id] ? categoryMap[category._id] : 0;

    if(category.isExpense) {
      expenseTotal += actual;
      expenseTarget += category.target;
      expenseCategories.push({
        ...category.toObject(),
        actual,
      });
    } else {
      incomeTotal += actual;
      incomeTarget += category.target;
      incomeCategories.push({
        ...category.toObject(),
        actual,
      }); 
    }
  });

  return {
    _id: budget._id,
    title: budget.title,
    description: budget.description,
    createdAt: budget.createdAt,
    updatedAt: budget.updatedAt, 
    expenseCategories,
    incomeCategories,
    expenseTransactions,
    incomeTransactions,
    expenseTarget,
    expenseTotal,
    incomeTarget,
    incomeTotal,
    netTarget: incomeTarget - expenseTarget,
    netSavings: incomeTotal - expenseTotal
  }
};

module.exports = router;