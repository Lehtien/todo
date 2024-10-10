import { useCallback, useEffect } from "react";
import TodoItem from "./TodoItem";
import { errorState, loadingState, todosState } from "../atoms";
import { useRecoilState } from "recoil";
import { fetchTodos } from "@/utils/api";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError("Failed to load todos. Please try again later.");
      console.error("Error loading todos:", err);
    } finally {
      setIsLoading(false);
    }
  }, [setTodos, setIsLoading, setError]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-green-500 text-3xl p-4">LIST</h2>

      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
