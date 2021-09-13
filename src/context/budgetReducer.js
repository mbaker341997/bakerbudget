import {
  ERROR,
  EDIT_BUDGET_SUCCESS,
  FETCH_BUDGET_SUCCESS,
  SET_LOADING_BUDGET
} from './budgetActionTypes';

const budgetReducer = (state, { payload, type }) => {
  switch(type) {
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