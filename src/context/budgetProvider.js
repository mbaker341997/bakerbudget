import React, { createContext, useReducer } from "react";
import budgetInitialState from "./budgetInitialState";
import budgetReducer from "./budgetReducer";

export const BudgetContext = createContext({});

export const BudgetProvider = ({ children }) => {
  const [budgetState, budgetDispatch] = useReducer(
    budgetReducer,
    budgetInitialState
  );

  return (
    <BudgetContext.Provider
      value={{
        budgetState,
        budgetDispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
