import React from "react";
import { TodoData } from "../types/todo";
import { useSetRecoilState } from "recoil";
import { todosState } from "../atoms";
import { deleteTodo, updateTodo } from "@/utils/api";

interface TodoItemProps {
  todo: TodoData;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const setTodos = useSetRecoilState(todosState);

  const handleToggle = async () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    try {
      await updateTodo(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <li className="mb-2 border border-black text-left list-none bg-white">
      <p className="w-[320px] min-h-[120px] break-words">
        <span className="mr-2 w-14 inline-block">
          {todo.completed ? "完了" : "未完了"}
        </span>
        <span>
          タイトル: <span>{todo.title}</span>
        </span>
        <br />
        <span>
          Description: <span>{todo.text}</span>
        </span>
      </p>
      <div className="flex justify-end p-2">
        <button
          onClick={handleToggle}
          className={
            "bg-green-500 text-white mr-2 py-2 px-2 rounded-xl  w-[60px]"
          }
        >
          更新
        </button>
        <button
          onClick={handleDelete}
          className="bg-gray-500 text-white py-2 px-2 rounded-xl w-[60px]"
        >
          削除
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
