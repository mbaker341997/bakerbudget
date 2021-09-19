import {
  ADD_CATEGORY,
  ADD_TRANSACTION,
  ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_SUCCESS,
  REMOVE_TRANSACTION,
  SET_LOADING_BUDGET,
  REMOVE_CATEGORY
} from './budgetActionTypes';

const addTransactionToBudget = (transaction, budget) => {
  const catIndex = budget.categories.findIndex(category => category._id === transaction.categoryId);
  const cat = budget.categories[catIndex];
  const newCategories = budget.categories;
  newCategories.splice(catIndex, 1, {
    ...cat,
    actual: cat.actual + transaction.amount
  });
  return {
    ...budget,
    transactions: [...budget.transactions, { ...transaction, categoryName: cat.title, isExpense: cat.isExpense }],
    categories: newCategories,
    incomeTotal: cat.isExpense ? budget.incomeTotal : budget.incomeTotal + transaction.amount,
    expenseTotal: cat.isExpense ? budget.expenseTotal + transaction.amount : budget.expenseTotal
  };
};

const removeTransactionFromBudget = (transactionId, budget) => {
  const transaction = budget.transactions.find(transaction => transaction._id === transactionId);
  const catIndex = budget.categories.findIndex(category => category._id === transaction.categoryId);
  const cat = budget.categories[catIndex];
  const newCategories = budget.categories;
  newCategories.splice(catIndex, 1, {
    ...cat,
    actual: cat.actual - transaction.amount
  });
  return {
    ...budget,
    transactions: budget.transactions.filter(budgetTrans => budgetTrans._id !== transactionId),
    categories: newCategories,
    incomeTotal: cat.isExpense ? budget.incomeTotal : budget.incomeTotal - transaction.amount,
    expenseTotal: cat.isExpense ? budget.expenseTotal - transaction.amount : budget.expenseTotal
  };
};

const addCategoryToBudget = (category, budget) => {
  return {
    ...budget,
    categories: [...budget.categories, { ...category, actual: 0}],
    incomeTarget: category.isExpense ? budget.incomeTarget : budget.incomeTarget + category.target,
    expenseTarget: category.isExpense ? budget.expenseTarget + category.target : budget.expenseTarget
  }
}

const removeCategoryFromBudget = (categoryId, budget) => {
  const deadCat = budget.categories.find(category => category._id === categoryId);
  return {
    ...budget,
    categories: budget.categories.filter(category => category._id !== categoryId),
    incomeTarget: deadCat.isExpense ? budget.incomeTarget : budget.incomeTarget - deadCat.target,
    expenseTarget: deadCat.isExpense ? budget.expenseTarget - deadCat.target : budget.expenseTarget
  }
}

const budgetReducer = (state, { payload, type }) => {
  switch(type) {
    case ADD_TRANSACTION: {
      return {
        ...state,
        budget: addTransactionToBudget(payload, state.budget)
      };
    }
    case REMOVE_TRANSACTION: {
      return {
        ...state,
        budget: removeTransactionFromBudget(payload, state.budget)
      };
    }
    case ADD_CATEGORY: {
      return {
        ...state,
        budget: addCategoryToBudget(payload, state.budget)
      }
    }
    case REMOVE_CATEGORY: {
      return {
        ...state,
        budget: removeCategoryFromBudget(payload, state.budget)
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