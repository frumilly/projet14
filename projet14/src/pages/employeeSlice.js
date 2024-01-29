// employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    getEmployees: (state, action) => {
      // Cette action est destinée à mettre à jour la liste des employés dans le Redux store
      return action.payload;
    },
  },
});

export const { addEmployee, getEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
