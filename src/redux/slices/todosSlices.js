import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      let temp = [...state?.todos, action.payload];
      state.todos = temp;
    },
    deleteTodos: (state, action) => {
      let temp = [...state.todos];
      const index = temp.findIndex((ele) => ele?.id === action?.payload?.id);
      temp.splice(index, 1);
      state.todos = temp;
    },
    editTodos: (state, action) => {
      let temp = [...state.todos];
      const index = temp.findIndex((ele) => ele?.id === action?.payload?.id);
      temp.splice(index, 1, action?.payload);
      state.todos = temp;
    },
  },
});

export const { addTodo, deleteTodos, editTodos } = todosSlice.actions;
export default todosSlice.reducer;
