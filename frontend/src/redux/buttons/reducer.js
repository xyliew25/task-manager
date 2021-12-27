import {
  TOGGLE_SEARCH,
  TOGGLE_ADD
} from './types';

const initialState = {
  isOpenSearch: false,
  isOpenAdd: false
};

const buttonReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return {
        ...state,
        isOpenSearch: !state.isOpenSearch
      };

    case TOGGLE_ADD:
      return {
        ...state,
        isOpenAdd: !state.isOpenAdd
      };

    default:
      return state;
  }
};

export default buttonReducer;
