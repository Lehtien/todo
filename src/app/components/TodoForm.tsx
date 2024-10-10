import React from "react";
import { useRecoilState, useRecoilCallback } from "recoil";
import { todosState, todoFormState, todoFormErrorState } from "../atoms";
import { TodoData } from "../types/todo";
import { createTodo } from "@/utils/api";
import { v4 as uuidv4 } from "uuid";

const TodoForm: React.FC = () => {
  const [formState, setFormState] = useRecoilState(todoFormState);
  const [errorText, setErrorText] = useRecoilState(todoFormErrorState);

  const addTodo = useRecoilCallback(({ set }) => async (newTodo: TodoData) => {
    try {
      const addedTodo = await createTodo(newTodo);
      set(todosState, (prevTodos) => [...prevTodos, addedTodo]);
      return addedTodo;
    } catch (error) {
      throw error;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");
    const { title, text } = formState;
    if (title.trim() === "" || text.trim() === "") {
      setErrorText("タイトルと内容は必須です");
      return;
    }
    try {
      const newTodo = {
        id: uuidv4(),
        title: title.trim(),
        text: text.trim(),
        completed: false,
      };
      await addTodo(newTodo);
      setFormState({ title: "", text: "" });
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : String(err));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleChange}
          placeholder="タイトル"
          className="border border-black p-2 mr-2 w-[300px]"
        />
        <textarea
          name="text"
          value={formState.text}
          onChange={handleChange}
          placeholder="内容"
          className="border border-black p-2 mr-2 my-2 w-[300px] h-[150px]"
        />
        <p className="text-red-500 text-sm pb-2">{errorText}</p>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-[250px]"
      >
        ADD
      </button>
    </form>
  );
};

export default TodoForm;
