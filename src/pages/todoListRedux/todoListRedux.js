import React, { useState } from "react";
import classes from "./todolistRedux.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodos,
  editTodos,
} from "../../redux/slices/todosSlices";



const TodoListRedux = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const { todos } = useSelector((state) => state?.todos);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const onEditTodoChange = (e) => {

    setEditTodo(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!todo) {
      return;
    }

    let newObj = {
      id: Math.random() * 10,
      value: todo,
    };
    setAllTodos([...allTodos, newObj]);
    dispatch(addTodo(newObj));
    setTodo("");
  };

  const handleSubmitEdit = () => {
    dispatch(editTodos({ ...selectedItem, value: editTodo }));
    setSelectedItem(null);
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
        <button
          onClick={(e) => {
            setSelectedItem(null);
            handleOnSubmit(e);
          }}
        >
          Add
        </button>
      </form>
      <div className={classes.body}>
        <h3>All Todos</h3>
        <ul className={classes.list}>
          {todos.map((data, index) => (
            <li key={data.id} className={classes.li}>
              {index + 1} : {data?.value}
              <div className={classes.edit}>
                <button
                  onClick={() => {
                    dispatch(deleteTodos(data));
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(data);
                    setEditTodo(data?.value);
                  }}
                >
                  Edit
                </button>
              </div>
              {selectedItem?.id === data?.id && (
                <>
                  <p className={classes.edit}>Edit:</p>
                  <input
                    type="text"
                    className={classes.edit}
                    value={editTodo}
                    onChange={onEditTodoChange}
                  />
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setEditTodo("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSubmitEdit();
                    }}
                  >
                    Submit editing
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoListRedux;
