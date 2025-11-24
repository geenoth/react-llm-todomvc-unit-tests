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

export function EditTodoInput({ onSaveEdit, onBlur, defaultValue = "" }) {
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();

                if (!hasValidMin(value, 2)) return;

                onSaveEdit(sanitize(value));
            }
        },
        [onSaveEdit]
    );

    const handleBlur = useCallback(() => {
        if (onBlur) onBlur();
    }, [onBlur]);

    return (
        <div className="input-container">
            <input
                className="edit"
                id="edit-todo-input"
                type="text"
                data-testid="edit-todo-input"
                autoFocus
                defaultValue={defaultValue}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            <label className="visually-hidden" htmlFor="edit-todo-input">
                Edit Todo Input
            </label>
        </div>
    );
}
