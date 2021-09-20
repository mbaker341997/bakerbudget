const budgetNoIds =   {
  title: "test budget",
  description: "a test budget",
  categories: [
    {
      title: "Income",
      description: "Money brought in",
      target: 3000,
      isExpense: false
    },
    {
      title: "Expense",
      description: "Money spent",
      target: 2000,
      isExpense: true
    }
  ]
};

const testBudgetOne =   {
  _id: "budget_one",
  title: "test budget one",
  description: "a test budget",
  categories: [
    {
      _id: "budget_one_income",
      title: "Income",
      description: "Money brought in",
      target: 6000,
      isExpense: false
    },
    {
      _id: "budget_one_expense",
      title: "Expense",
      description: "Money spent",
      target: 4000,
      isExpense: true
    }
  ]
};

const testBudgetTwo =   {
  _id: "budget_two",
  title: "test budget two",
  description: "a test budget two",
  categories: [
    {
      _id: "budget_two_income",
      title: "Income",
      description: "Money brought in",
      target: 1000,
      isExpense: false
    },
    {
      _id: "budget_two_expense",
      title: "Expense",
      description: "Money spent",
      target: 500,
      isExpense: true
    }
  ]
};

module.exports = {
  budgetArray: [
    testBudgetOne,
    testBudgetTwo
  ],
  budgetNoIds
}