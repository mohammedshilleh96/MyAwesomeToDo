import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase";

// eslint-disable-next-line react/prop-types
export default function Todo({ id, complete, text }) {
  const [title] = useState(text);
  const { currentUser } = useAuth();
  const userTodosRef = firestore.collection(`users/${currentUser.uid}/todos`);

  function deleteTodo(e) {
    e.preventDefault();

    userTodosRef.doc(id).delete();
  }
  function completeTodo(e) {
    e.preventDefault();

    userTodosRef.doc(id).set({ complete: !complete }, { merge: true });
  }

  return (
    <div className="flex flex-row border-b-2 my-1">
      {complete ? (
        <span className="w-2/3">{title}</span>
      ) : (
        <span className="w-2/3 line-through">{title}</span>
      )}
      <button
        className="w-1/6 mx-1 border rounded-md font-bold bg-blue-400 hover:bg-blue-500"
        onClick={completeTodo}
      >
        Complete
      </button>
      <button
        className="w-1/6 mx-1 border rounded-md font-bold bg-red-400 hover:bg-red-500"
        onClick={deleteTodo}
      >
        Delete
      </button>
    </div>
  );
}
