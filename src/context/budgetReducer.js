import {
  EDIT_BUDGET_ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_SUCCESS,
  FETCH_BUDGET_ERROR,
  SET_LOADING,
  DELETE_BUDGET_ERROR,
  DELETE_BUDGET_SUCCESS
} from './budgetActionTypes';

const budgetReducer = (state, { payload, type }) => {
  switch(type) {
    case SET_LOADING:
      return {
        ...state,
        error: false,
        loading: true
      };
    case DELETE_BUDGET_SUCCESS: 
      return {
        ...state,
        budget: null,
        error: false,
        loading: false
      }
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
    case DELETE_BUDGET_ERROR:
    case EDIT_BUDGET_ERROR:
    case FETCH_BUDGET_ERROR:
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