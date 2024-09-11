import React, { useState } from "react";
import classes from "./todolist.module.css";
import { useDispatch } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [allTodos, setAllTodos] = useState([]);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onEditTodoChange = (e) => {
    setEditTodo(e.target.value);
  };

  const handleOnSubmit = (e) => {
    if (!todo) {
      return;
    }
    e.preventDefault();
    setAllTodos([...allTodos, todo]);
    setTodo("");
  };

  const handleDeleteTodo = (itemIndex) => {
    setAllTodos(allTodos.filter((ele, index) => index !== itemIndex));
  };

  const handleEditTodo = (itemIndex) => {
    setEditingIndex(itemIndex);
    setEditTodo(allTodos[itemIndex]);
  };

  const handleSubmitEdit = () => {
    const updatedTodos = [...allTodos];
    updatedTodos[editingIndex] = editTodo;
    setAllTodos(updatedTodos);
    setEditingIndex(null);
    setEditTodo("");
  };

  const cancelEditTodo = () => {
    setEditingIndex(null);
    setEditTodo("");
  };

  return (
    <div className={classes.body}>
      <h3>Enter new task</h3>
      <form>
        <input
          type="text"
          placeholder="Enter todo task"
          required
          value={todo}
          onChange={handleInputChange}
        />
        <button onClick={handleOnSubmit}>Add</button>
      </form>
      <div className={classes.body}>
        <h3>All Todos</h3>
        <ul className={classes.list}>
          {allTodos
            .sort((a, b) => b - a)
            .map((data, index) => (
              <li key={index} className={classes.li}>
                {index + 1} : {data}
                <div className={classes.edit}>
                  <button onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditTodo(index)}>Edit</button>
                </div>
                {editingIndex === index && (
                  <>
                    <p className={classes.edit}>Edit:</p>
                    <input
                      type="text"
                      className={classes.edit}
                      value={editTodo}
                      onChange={onEditTodoChange}
                    />
                    <button onClick={cancelEditTodo}>Cancel</button>
                    <button onClick={handleSubmitEdit}>Submit editing</button>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
