import { useCallback } from "react";

export function ClearCompletedButton({ onClearCompleted, disabled = false }) {
    const handleClick = useCallback(() => {
        onClearCompleted();
    }, [onClearCompleted]);

    return (
        <button
            className="clear-completed"
            data-testid="clear-completed-button"
            disabled={disabled}
            onClick={handleClick}
        >
            Clear completed
        </button>
    );
}
