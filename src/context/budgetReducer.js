import {
  ADD_EXPENSE,
  ADD_INCOME,
  ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_SUCCESS,
  REMOVE_EXPENSE,
  REMOVE_INCOME,
  SET_LOADING_BUDGET,
  ADD_EXPENSE_CATEGORY,
  ADD_INCOME_CATEGORY,
  REMOVE_EXPENSE_CATEGORY,
  REMOVE_INCOME_CATEGORY
} from './budgetActionTypes';

// TODO: major need of a cleanup + tests (not a giant switch for one )
// TODO: these methods feel very not DRY
// doesn't feel too DRY with the backend. are we calculating too much there?
const addIncomeToBudget = (income, budget) => {
  const catIndex = budget.incomeCategories.findIndex(category => category._id === income.categoryId);
  const newCat = budget.incomeCategories[catIndex];
  const newCategories = budget.incomeCategories;
  newCategories.splice(catIndex, 1, {
    ...newCat,
    actual: newCat.actual + income.amount
  });
  return {
    ...budget,
    incomeTransactions: [...budget.incomeTransactions, { ...income, categoryName: newCat.title }],
    incomeCategories: newCategories,
    incomeTotal: budget.incomeTotal + income.amount,
  };
};

const addExpenseToBudget = (expense, budget) => {
  const catIndex = budget.expenseCategories.findIndex(category => category._id === expense.categoryId);
  const newCat = budget.expenseCategories[catIndex];
  const newCategories = budget.expenseCategories;
  newCategories.splice(catIndex, 1, {
    ...newCat,
    actual: newCat.actual + expense.amount
  });
  return {
    ...budget,
    expenseTransactions: [...budget.expenseTransactions, { ...expense, categoryName: newCat.title }],
    expenseCategories: newCategories,
    expenseTotal: budget.expenseTotal + expense.amount,
  };
};

const removeIncomeFromBudget = (incomeId, budget) => {
  const income = budget.incomeTransactions.find(transaction => transaction._id === incomeId);
  const catIndex = budget.incomeCategories.findIndex(category => category._id === income.categoryId);
  const newCat = budget.incomeCategories[catIndex];
  const newCategories = budget.incomeCategories;
  newCategories.splice(catIndex, 1, {
    ...newCat,
    actual: newCat.actual - income.amount
  });
  return {
    ...budget,
    incomeTransactions: budget.incomeTransactions.filter(transaction => transaction._id !== income._id),
    incomeCategories: newCategories,
    incomeTotal: budget.incomeTotal - income.amount,
  };
};

const removeExpenseFromBudget = (expenseId, budget) => {
  const expense = budget.expenseTransactions.find(transaction => transaction._id === expenseId);
  const catIndex = budget.expenseCategories.findIndex(category => category._id === expense.categoryId);
  const newCat = budget.expenseCategories[catIndex];
  const newCategories = budget.expenseCategories;
  newCategories.splice(catIndex, 1, {
    ...newCat,
    actual: newCat.actual - expense.amount
  });
  return {
    ...budget,
    expenseTransactions: budget.expenseTransactions.filter(transaction => transaction._id !== expense._id),
    expenseCategories: newCategories,
    expenseTotal: budget.expenseTotal - expense.amount,
  };
};

const addIncomeCategoryToBudget = (category, budget) => {
  return {
    ...budget,
    incomeCategories: [...budget.incomeCategories, { ...category, actual: 0 }],
    incomeTarget: budget.incomeTarget + category.target
  }
};

const addExpenseCategoryToBudget = (category, budget) => {
  return {
    ...budget,
    expenseCategories: [...budget.expenseCategories, { ...category, actual: 0 }],
    expenseTarget: budget.expenseTarget + category.target
  }
};

const removeIncomeCategoryFromBudget = (categoryId, budget) => {
  const deadCat = budget.incomeCategories.find(category => category._id === categoryId);
  return {
    ...budget,
    incomeCategories: budget.incomeCategories.filter(category => category._id !== categoryId),
    incomeTarget: budget.incomeTarget - deadCat.target
  }
};

const removeExpenseCategoryFromBudget = (categoryId, budget) => {
  const deadCat = budget.expenseCategories.find(category => category._id === categoryId);
  return {
    ...budget,
    expenseCategories: budget.expenseCategories.filter(category => category._id !== categoryId),
    expenseTarget: budget.expenseTarget - deadCat.target
  }
};

const budgetReducer = (state, { payload, type }) => {
  switch(type) {    
    case ADD_INCOME: {
      return {
        ...state,
        budget: addIncomeToBudget(payload, state.budget)
      };
    }
    case ADD_EXPENSE: {
      return {
        ...state,
        budget: addExpenseToBudget(payload, state.budget)
      };
    }
    case REMOVE_INCOME: {
      return {
        ...state,
        budget: removeIncomeFromBudget(payload, state.budget)
      };
    }
    case REMOVE_EXPENSE: {
      return {
        ...state,
        budget: removeExpenseFromBudget(payload, state.budget)
      };
    }
    case ADD_EXPENSE_CATEGORY: {
      return {
        ...state,
        budget: addExpenseCategoryToBudget(payload, state.budget)
      }
    }
    case ADD_INCOME_CATEGORY: {
      return {
        ...state,
        budget: addIncomeCategoryToBudget(payload, state.budget)
      }
    }
    case REMOVE_INCOME_CATEGORY: {
      return {
        ...state,
        budget: removeIncomeCategoryFromBudget(payload, state.budget)
      };
    }
    case REMOVE_EXPENSE_CATEGORY: {
      return {
        ...state,
        budget: removeExpenseCategoryFromBudget(payload, state.budget)
      };
    }
    case SET_LOADING_BUDGET:
      return {
        ...state,
        error: false,
        loading: true
      };
    case EDIT_BUDGET_SUCCESS: 
      return {
        ...state,
        budget: {
          ...state.budget,
          ...payload
        },
        error: false,
        loading: false
      }
    case FETCH_BUDGET_SUCCESS: 
      return {
        ...state, 
        budget: payload,
        error: false,
        loading: false  
      }
    case ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}

export default budgetReducer;