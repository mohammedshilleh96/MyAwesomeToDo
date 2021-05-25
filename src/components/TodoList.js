import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Todo from "./Todo";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function TodoList() {
  const { currentUser } = useAuth();
  const userTodosRef = firestore.collection(`users/${currentUser.uid}/todos`);
  const [todos] = useCollectionData(userTodosRef, { idField: "id" });

  return (
    <div className="flex flex-col justify-center w-2/3 container mt-4">
      {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
    </div>
  );
}
