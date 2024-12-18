import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_data: {},
  token: '',
  chatState: {}
}


export const commonSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { user_data, token } = action.payload;
      state.user_data = user_data
      state.token = token
    },
    setChatState: (state, action) => {        
      state.chatState = action.payload
    },
    setInitialUserData: (state, action) => {
      state.user_data = {}
      state.token = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserData, setInitialUserData, setChatState } = commonSlice.actions

export default commonSlice.reducer