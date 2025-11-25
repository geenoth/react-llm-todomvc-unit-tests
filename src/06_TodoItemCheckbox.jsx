import { useCallback } from "react";

export function TodoItemCheckbox({ completed = false, onToggle, todoId }) {
    const handleChange = useCallback(() => {
        onToggle(todoId);
    }, [onToggle, todoId]);

    return (
        <input
            className="toggle"
            type="checkbox"
            data-testid="todo-item-checkbox"
            checked={completed}
            onChange={handleChange}
            aria-label={`Mark todo ${todoId} as ${completed ? "incomplete" : "complete"}`}
        />
    );
}
