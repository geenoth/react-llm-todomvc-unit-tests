import { useCallback } from "react";

const sanitize = (string) => {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

const hasValidMin = (value, min) => {
    return value.length >= min;
};

export function AddTodoInput({ onAddTodo, placeholder = "What needs to be done?" }) {
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();

                if (!hasValidMin(value, 2)) return;

                onAddTodo(sanitize(value));
                e.target.value = "";
            }
        },
        [onAddTodo]
    );

    return (
        <div className="input-container">
            <input
                className="new-todo"
                id="add-todo-input"
                type="text"
                data-testid="add-todo-input"
                autoFocus
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
            />
            <label className="visually-hidden" htmlFor="add-todo-input">
                Add Todo Input
            </label>
        </div>
    );
}
