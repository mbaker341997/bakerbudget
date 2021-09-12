import axios from 'axios';
import {
  SET_LOADING,
  EDIT_BUDGET_ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_ERROR,
  FETCH_BUDGET_SUCCESS,
  DELETE_BUDGET_SUCCESS,
  DELETE_BUDGET_ERROR
} from './budgetActionTypes';

export const fetchBudgetAction = (id, dispatch) => {
  dispatch({
    type: SET_LOADING
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
    type: SET_LOADING
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
    type: SET_LOADING
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