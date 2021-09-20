const router = require("express").Router();
const Budget = require("../models/budget.model");
const Transaction = require("../models/transaction.model");
const budgetController = require("../controllers/budgets.controller");

router.route("/").get(async (_, res) => await budgetController.getAllBudgets(res));

router.route("/").post((req, res) => {
  const budget = new Budget(req.body);
  budget
    .save()
    .then((saved) => res.json({ id: saved._id }))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Budget.findById(req.params.id)
    .then((budget) =>
      budget
        ? res.json(budget)
        : res.status(404).json(`No budget found of id ${req.params.id}`)
    )
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Budget.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Deleted budget: ${req.params.id}`))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Budget.findByIdAndUpdate(req.params.id, req.body)
    .then((budget) => {
      if (!budget) {
        res.status(404).json(`No budget found of id ${req.params.id}`);
      } else {
        res.json({ id: budget._id });
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// Create Category
router.route("/:id/categories").post((req, res) => {
  Budget.findById(req.params.id)
    .then((budget) => {
      if (budget) {
        const catLength = budget.categories.push(req.body);
        const newCategory = budget.categories[catLength - 1].toObject();
        budget
          .save()
          .then((_) => res.json(newCategory))
          .catch((err) => res.status(500).json("Error: " + err));
      } else {
        res.status(404).json(`No budget found of id ${req.params.id}`);
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// Update Category
router.route("/:budgetId/categories/:categoryId").put((req, res) => {
  Budget.findById(req.params.budgetId)
    .then((budget) => {
      if (budget) {
        const category = budget.categories.id(req.params.categoryId);
        if (category) {
          category.set(req.body);
          budget
            .save()
            .then((_) => res.json(category))
            .catch((err) => res.status(500).json("Error: " + err));
        } else {
          res
            .status(404)
            .json(`No category found of id ${req.params.categoryId}`);
        }
      } else {
        res.status(404).json(`No budget found of id ${req.params.budgetId}`);
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// Delete Category
router.route("/:budgetId/categories/:categoryId").delete((req, res) => {
  Budget.findById(req.params.budgetId)
    .then((budget) => {
      if (budget) {
        const category = budget.categories.id(req.params.categoryId);
        if (category) {
          // query transactions for one of that category
          Transaction.find({ categoryId: req.params.categoryId })
            .lean()
            .then((transactions) => {
              if (transactions === null || transactions.length === 0) {
                budget.categories.id(req.params.categoryId).remove();
                budget
                  .save()
                  .then((_) =>
                    res.json(`Deleted budget: ${req.params.categoryId}`)
                  )
                  .catch((err) => res.status(500).json("Error: " + err));
              } else {
                res
                  .status(400)
                  .json("Cannot delete category with transactions attached");
              }
            })
            .catch((err) => res.status(500).json("Error: " + err));
        } else {
          res
            .status(404)
            .json(`No category found of id ${req.params.categoryId}`);
        }
      } else {
        res.status(404).json(`No budget found of id ${req.params.budgetId}`);
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

// calculates all the sums, returns all the transactions
router.route("/:id/report").get((req, res) => {
  Budget.findById(req.params.id)
    .then((budget) => {
      if (budget) {
        Transaction.find({ budgetId: req.params.id })
          .then((transactions) =>
            res.json(generateReport(budget, transactions))
          )
          .catch((err) => res.status(500).json("Error: " + err));
      } else {
        res.status(404).json(`No budget found of id ${req.params.id}`);
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

const generateReport = (budget, transactions) => {
  const categoryMap = {};
  const transactionsWithCategoryInfo = [];
  transactions.forEach((transaction) => {
    const category = budget.categories.id(transaction.categoryId);
    const currentCategorySum = categoryMap[category._id];
    categoryMap[category._id] =
      currentCategorySum > 0
        ? currentCategorySum + transaction.amount
        : transaction.amount;

    // adding isExpense to the individual category saves us time having to perform a lookup on the client side
    transactionsWithCategoryInfo.push({
      ...transaction.toObject(),
      categoryName: category.title,
      isExpense: category.isExpense,
    });
  });

  let expenseTotal = 0; // total money spent
  let expenseTarget = 0;
  let incomeTotal = 0; // total money saved
  let incomeTarget = 0;
  const categoriesWithActuals = [];
  budget.categories.forEach((category) => {
    const actual = categoryMap[category._id] ? categoryMap[category._id] : 0;

    if (category.isExpense) {
      expenseTotal += actual;
      expenseTarget += category.target;
    } else {
      incomeTotal += actual;
      incomeTarget += category.target;
    }

    categoriesWithActuals.push({
      ...category.toObject(),
      actual,
    });
  });

  return {
    _id: budget._id,
    title: budget.title,
    description: budget.description,
    createdAt: budget.createdAt,
    updatedAt: budget.updatedAt,
    categories: categoriesWithActuals,
    transactions: transactionsWithCategoryInfo,
    expenseTarget,
    expenseTotal,
    incomeTarget,
    incomeTotal,
  };
};

module.exports = router;
