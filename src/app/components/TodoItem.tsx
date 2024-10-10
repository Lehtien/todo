import { Todo } from "../atoms";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  return (
    <li className="mb-2 border border-black text-left">
      <p className="w-[320px] min-h-[120px] break-words">
        <span className="mr-2 w-14 inline-block">
          {todo.completed ? "完了" : "未完了"}
        </span>
        <span>
          タイトル: <span>{todo.title}</span>
        </span>
        <p>
          Description: <span>{todo.text}</span>
        </p>
      </p>
      <div className="flex justify-end p-2">
        <button
          onClick={() => onUpdate(todo.id, !todo.completed)}
          className={"mr-2 py-2 px-1 rounded bg-green-500 text-white w-[60px]"}
        >
          更新
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-gray-500 text-white py-2 px-1 rounded w-[60px]"
        >
          削除
        </button>
      </div>
    </li>
  );
}
