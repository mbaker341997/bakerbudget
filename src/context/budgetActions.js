import axios from 'axios';
import {
  ADD_TRANSACTION_ERROR,
  SET_LOADING_BUDGET,
  EDIT_BUDGET_ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_ERROR,
  FETCH_BUDGET_SUCCESS,
  DELETE_BUDGET_SUCCESS,
  DELETE_BUDGET_ERROR,
} from './budgetActionTypes';

export const fetchBudgetAction = (id, dispatch) => {
  dispatch({
    type: SET_LOADING_BUDGET
  });

  axios.get(`http://localhost:5000/budgets/${id}/report`).then(result => {
    dispatch({
      type: FETCH_BUDGET_SUCCESS,
      payload: result.data
    });
  })
  .catch((err) => {
    dispatch({
      type: FETCH_BUDGET_ERROR,
      payload: err.response ? err.response.data : "ERROR FETCHING BUDGET"
    });
  });
};

export const editBudgetAction = (id, data, dispatch) => {
  dispatch({
    type: SET_LOADING_BUDGET
  });

  axios.put(`http://localhost:5000/budgets/${id}`, {
    ...data
  }).then(_ => {
      dispatch({
        type: EDIT_BUDGET_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: EDIT_BUDGET_ERROR,
        payload: err.response ? err.response.data : "ERROR EDITING BUDGET"
      });
    });
} 

export const deleteBudgetAction = (id, dispatch) => {
  dispatch({
    type: SET_LOADING_BUDGET
  });

  axios.delete(`http://localhost:5000/budgets/${id}`)
    .then(_ => {
      dispatch({
        type: DELETE_BUDGET_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_BUDGET_ERROR,
        payload: err.response ? err.response.data : "ERROR DELETING BUDGET"
      });
    });
}

export const addTransactionAction = (data, dispatch) => {
  // axios POST call 
  axios.post('http://localhost:5000/transactions', {
    ...data
  })
    .then(_ => {
      // a lot of the calculation is pushed to the backend so it's easier to re-fetch the list
      fetchBudgetAction(data.budgetId, dispatch);
    })
    .catch(err => {
      dispatch({
        type: ADD_TRANSACTION_ERROR,
        payload: err.response ? err.response.data : "ERROR ADDING TRANSACTION"
      });
    });
}