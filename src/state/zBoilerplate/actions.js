import { A_A_A, B_B_B, C_C_C } from './types';

export const aaa = () => (dispatch) => dispatch({ type: A_A_A });

export const bbb = (bool) => (dispatch) =>
  dispatch({ type: B_B_B, payload: bool });

export const ccc = (a, b) => (dispatch) =>
  dispatch({ type: C_C_C, payload: { a, b } });
