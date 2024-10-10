"use client";

import { useRecoilState } from "recoil";
import { todosState, Todo } from "./atoms";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";

export default function Home() {
  const [todos, setTodos] = useRecoilState(todosState);

  const addTodo = (title: string, text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number, completed: boolean) => {
    const updateTodo: Todo = {
      id: id,
      completed: completed,
      title: todos.find((todo) => todo.id === id)?.title || "",
      text: todos.find((todo) => todo.id === id)?.text || "",
    };
    setTodos(todos.map((todo) => (todo.id === id ? updateTodo : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">ToDo App</h1>
      <div className="text-center">
        <TodoForm onAdd={addTodo} />
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}
