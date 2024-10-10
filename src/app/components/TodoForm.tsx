import { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string, text: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoText, setNewTodoText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim() === "" || newTodoText.trim() === "") {
      setErrorText("タイトル及び内容を入力してください");
      return;
    }
    onAdd(newTodoTitle.trim(), newTodoText.trim());
    setNewTodoTitle("");
    setNewTodoText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="タイトル"
          className="border border-black p-2 mr-2 w-[300px]"
        />
        <textarea
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
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
}
