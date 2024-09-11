import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlices';

const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});

export default store;
