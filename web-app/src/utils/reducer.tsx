import { createSlice } from "@reduxjs/toolkit";
import { auth } from "./FireBaseConfig";

// Define initial state for user
const initialState = {
  email: '',
  loggedIn: auth.currentUser !== null // Check if the user is already logged in,
};

const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Action to set user details
    setUser: (state, action) => {
      const { email, loggedIn } = action.payload;
      if (email !== undefined && typeof loggedIn === 'boolean') {
        state.email = email;
        state.loggedIn = loggedIn;
      } else {
        console.error("Invalid user payload:", action.payload);
      }
      
    },
    // Action to log out the user and reset state
    logoutUser: (state) => {
        auth.signOut(); // Sign out the user
        state.email = '';
        state.loggedIn = false; // Reset the state to its initial values
    }
  }
});

// Export actions generated from the slice
export const { setUser, logoutUser } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
