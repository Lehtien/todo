"use client";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-[500px]">
      <h1 className="text-4xl font-bold mb-4 text-center">My Tasks</h1>
      <div className="text-center">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}
