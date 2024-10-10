import { Todo } from "../atoms";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
