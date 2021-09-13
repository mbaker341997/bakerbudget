import {
  ADD_EXPENSE,
  ADD_INCOME,
  ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_SUCCESS,
  REMOVE_EXPENSE,
  REMOVE_INCOME,
  SET_LOADING_BUDGET
} from './budgetActionTypes';

// TODO: these methods feel very not DRY
// doesn't feel too DRY with the backend. are we calculating too much there?
const addIncomeToBudget = (income, budget) => {
  const newCat = budget.incomeCategories.find(category => category._id === income.categoryId);
  return {
    ...budget,
    incomeTransactions: [...budget.incomeTransactions, { ...income, categoryName: newCat.title }],
    incomeCategories: [
      ...budget.incomeCategories.filter(category => category._id !== income.categoryId), 
      {
        ...newCat,
        actual: newCat.actual + income.amount
      }
    ],
    incomeTotal: budget.incomeTotal + income.amount,
    netSavings: budget.incomeTotal + income.amount - budget.expenseTotal  
  };
};

const addExpenseToBudget = (expense, budget) => {
  const newCat = budget.expenseCategories.find(category => category._id === expense.categoryId);
  return {
    ...budget,
    expenseTransactions: [...budget.expenseTransactions, { ...expense, categoryName: newCat.title }],
    expenseCategories: [
      ...budget.expenseCategories.filter(category => category._id !== expense.categoryId), 
      {
        ...newCat,
        actual: newCat.actual + expense.amount
      }
    ],
    expenseTotal: budget.expenseTotal + expense.amount,
    netSavings: budget.incomeTotal - (budget.expenseTotal + expense.amount) 
  };
};

const removeIncomeFromBudget = (incomeId, budget) => {
  const income = budget.incomeTransactions.find(transaction => transaction._id === incomeId);
  const cat = budget.incomeCategories.find(category => category._id === income.categoryId);
  return {
    ...budget,
    incomeTransactions: budget.incomeTransactions.filter(transaction => transaction._id !== income._id),
    incomeCategories: [
      ...budget.incomeCategories.filter(category => category._id !== income.categoryId), 
      {
        ...cat,
        actual: cat.actual - income.amount
      }
    ],
    incomeTotal: budget.incomeTotal - income.amount,
    netSavings: budget.incomeTotal - income.amount - budget.expenseTotal  
  };
};

const removeExpenseFromBudget = (expenseId, budget) => {
  const expense = budget.expenseTransactions.find(transaction => transaction._id === expenseId);
  const cat = budget.expenseCategories.find(category => category._id === expense.categoryId);
  return {
    ...budget,
    expenseTransactions: budget.expenseTransactions.filter(transaction => transaction._id !== expense._id),
    expenseCategories: [
      ...budget.expenseCategories.filter(category => category._id !== expense.categoryId), 
      {
        ...cat,
        actual: cat.actual - expense.amount
      }
    ],
    expenseTotal: budget.expenseTotal - expense.amount,
    netSavings: budget.incomeTotal - (budget.expenseTotal - expense.amount)
  };
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