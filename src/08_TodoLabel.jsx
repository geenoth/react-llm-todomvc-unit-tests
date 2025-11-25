import { useCallback } from "react";

export function TodoLabel({ title = "", onEdit, todoId }) {
    const handleDoubleClick = useCallback(() => {
        if (onEdit) onEdit(todoId);
    }, [onEdit, todoId]);

    return (
        <label
            data-testid="todo-label"
            onDoubleClick={handleDoubleClick}
            role="button"
            tabIndex={0}
        >
            {title}
        </label>
    );
}

