import { A_A_A, B_B_B, C_C_C } from './types';

let initialState = {
  prop1: '',
  prop2: [],
  prop3: null,
  prop4: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case A_A_A:
      return { ...state, x: payload };
    case B_B_B:
      return { ...state, x: payload };
    case C_C_C:
      return { ...state, x: payload };

    default:
      return state;
  }
};
