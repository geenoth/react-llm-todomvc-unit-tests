
import { useCallback } from "react";

export function DestroyButton({ onDestroy, todoId }) {
    const handleClick = useCallback(() => {
        onDestroy(todoId);
    }, [onDestroy, todoId]);

    return (
        <button
            className="destroy"
            data-testid="destroy-button"
            onClick={handleClick}
            aria-label={`Delete todo ${todoId}`}
        />
    );
}
