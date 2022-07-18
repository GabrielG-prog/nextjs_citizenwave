import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  organizations: [],
};

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrganizations: (state, action) => {
      state.organizations = [...state.organizations, action.payload];
    },
  },
});

export const { addOrganizations } = organizationsSlice.actions;

export default organizationsSlice.reducer;
