import { A_A_A, B_B_B, C_C_C } from './types';

export const aaa = () => ({ type: A_A_A });

export const bbb = (bool) => (dispatch) => dispatch({ type: B_B_B, payload: bool });

export const ccc = (a, b) => async (dispatch, getState) => {
  const state = getState();
  await new Promise(); //some asynchronous process
  dispatch({ type: C_C_C, payload: { a, b } });
};
