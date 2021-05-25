import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import firebase, { firestore } from "../firebase";
import TodoList from "./TodoList";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const newTodoTitle = useRef();
  const userTodosRef = firestore.collection(`users/${currentUser.uid}/todos`);

  function addTodo(e) {
    e.preventDefault();
    userTodosRef.add({
      text: newTodoTitle.current.value,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <div className="flex flex-col items-center my-4">
      <form className="flex flex-row w-full px-24">
        <input
          className="w-5/6"
          required
          type="text"
          placeholder="What's New?"
          ref={newTodoTitle}
        ></input>
        <button
          className="w-1/6 mx-1 border rounded-md font-bold bg-green-400 hover:bg-green-500"
          onClick={addTodo}
        >
          Add
        </button>
      </form>
      <TodoList />
    </div>
  );
  // TODO: Add signout button
}
